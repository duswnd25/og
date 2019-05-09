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
const appRootPath = require('app-root-path');

const reqlib = appRootPath.require;

require('express-async-errors');

const app = express();

const { parseServerConfig, parseDashboardConfig } = reqlib(
	'/src/config/parse.config.js'
);

const config = reqlib('/src/config/global.config');

/** :::::::::::::::::: EXPRESS SETUP * */
app.use(timeout('20s'));
app.use(compression());
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
	return res.status(err.code || 500).send({ error: err.message });
});

if (config.isDevelopment()) {
	app.use(logger('dev'));
	console.info('SERVER START IN DEV MODE');
}

if (config.isProduction()) {
	console.info('SERVER START IN PRODUCTION');
}

module.exports = { app };
