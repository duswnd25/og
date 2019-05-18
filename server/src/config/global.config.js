/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/** :::::::::::::::::: SERVER CONFIG :::::::::::::::::: * */
const console = require('better-console');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

function envInit(nodeEnv) {
	const env = {
		// 시스템
		NODE_ENV: nodeEnv,
		PORT: 3000,
		// DASHBOARD
		APP_ID: 'og-test',
		APP_NAME: 'og-test',
		COOKIE_SESSION_SECRET: 'test',
		DASHBOARD_ID: 'test',
		DASHBOARD_PW: 'test',
		PARSE_DASHBOARD_ALLOW_INSECURE_HTTP: true,
		SERVER_URL: 'http://localhost:3000/parse/',
		// PARSE
		MASTER_KEY: 'test',
		JAVASCRIPT_KEY: 'test',
		MONGODB_URI:
			'',
		REDIRECT_URL: 'http://localhost:3000'
	};

	for (const key in env) {
		if (nodeEnv === 'development') {
			process.env[key] = env[key];
		}
	}
}

function devEnvSetup() {
	envInit('development');
}

function prodEnvSetup() {
	envInit('production');
}

function isProduction() {
	return IS_PRODUCTION;
}

function isDevelopment() {
	return !IS_PRODUCTION;
}

module.exports = { isProduction, isDevelopment, devEnvSetup, prodEnvSetup };
