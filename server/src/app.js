/** :::::::::::::::::: MODULE * */
const compression = require('compression');
const favicon = require('serve-favicon');
const helhmet = require('helmet');
const express = require('express');
const path = require('path');
const console = require('better-console');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const timeout = require('connect-timeout');
const bodyParser = require('body-parser');
const appRootPath = require('app-root-path');

const reqlib = appRootPath.require;
let bugsnagMiddleware;
let bugsnagClient;

require('express-async-errors');

const app = express();

const config = reqlib('/src/config/global.config');

if (config.isDevelopment()) {
	config.devEnvSetup();
	app.use(logger('dev'));
	console.info('SERVER START IN DEV MODE');
}


if (config.isProduction()) {
	config.prodEnvSetup();
	console.info('SERVER START IN PRODUCTION');
	// eslint-disable-next-line global-require
	const bugsnag = require('@bugsnag/js');
	// eslint-disable-next-line global-require
	const bugsnagExpress = require('@bugsnag/plugin-express');

	bugsnagClient = bugsnag(process.env.BUGSNAG_API_KEY);
	bugsnagClient.use(bugsnagExpress);
	bugsnagMiddleware = bugsnagClient.getPlugin('express');
	app.use(bugsnagMiddleware.requestHandler);
	app.use(bugsnagMiddleware.errorHandler);
}

const { parseServerConfig, parseDashboardConfig } = reqlib('/src/config/parse.config.js');

/** :::::::::::::::::: EXPRESS SETUP * */
app.use(timeout('20s'));
app.use(compression());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(favicon(path.join(`${appRootPath}/public/favicon`, 'favicon.ico')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/** :::::::::::::::::: HELMET CONFIG * */
app.use(helhmet());
app.use(helhmet.noCache());
app.use(helhmet.xssFilter());
app.use(helhmet.frameguard({ action: 'sameorigin' }));
app.use(helhmet.noSniff());
app.enable('trust proxy');

/** :::::::::::::::::: VIEW ENGINE SETUP * */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/** :::::::::::::::::: ROUTER * */
app.use('/', reqlib('/src/routes/index'));
app.use('/api', reqlib('/src/routes/api/index'));

app.use('/public', express.static(`${appRootPath}/public`));
app.use('/parse', parseServerConfig);
app.use('/dashboard', parseDashboardConfig);

/** :::::::::::::::::: ERROR HANDLING * */
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
	return res.status(404).redirect(process.env.REDIRECT_URL);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	if (config.isProduction() || err.code >= 500) {
		bugsnagClient.notify(err);
	}
	return res.status(err.code || 500).send({ error: err.message });
});

module.exports = { app };
