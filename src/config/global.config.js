/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/** :::::::::::::::::: SERVER CONFIG :::::::::::::::::: * */

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

function devEnvSetup() {
	const env = {
		// 시스템
		NODE_ENV: 'development',
		// DASHBOARD
		APP_ID: 'og-test',
		APP_NAME: 'og-test',
		COOKIE_SESSION_SECRET: 'test',
		DASHBOARD_ID: 'test',
		DASHBOARD_PW: 'test',
		PARSE_DASHBOARD_ALLOW_INSECURE_HTTP: true,
		SERVER_URL: 'http://localhost:3000/parse/',
		FCM_API_KEY: '',
		// PARSE
		MASTER_KEY: 'test',
		JAVASCRIPT_KEY: 'test',
		MONGODB_URI: '',
		REDIRECT_URL: 'http://localhost:3000'
	};

	for (const key in env) {
		process.env[key] = env[key];
	}
}

function isProduction() {
	return IS_PRODUCTION;
}

function isDevelopment() {
	return !IS_PRODUCTION;
}

module.exports = { isProduction, isDevelopment, devEnvSetup };
