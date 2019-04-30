const { ParseServer } = require('parse-server');
const ParseDashboard = require('parse-dashboard');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const config = {
	DASHBOARD: {
		DASHBOARD_ID: process.env.DASHBOARD_ID,
		DASHBOARD_PW: process.env.DASHBOARD_PW,
		COOKIE_SESSION_SECRET: process.env.COOKIE_SESSION_SECRET,
		PUSH: {
			android: {
				apiKey: process.env.FCM_API_KEY
			},
			ios: process.env.APPLE_APN || {
				pfx: '',
				passphrase: '', // optional password to your p12/PFX
				bundleId: '',
				production: IS_PRODUCTION
			}
		}
	},
	COMMON: {
		DB_URL: process.env.MONGODB_URI,
		SERVER_URL: process.env.SERVER_URL,
		APP_NAME: process.env.APP_NAME,
		APP_ID: process.env.APP_ID,
		MASTER_KEY: process.env.MASTER_KEY,
		JAVASCRIPT_KEY: process.env.JAVASCRIPT_KEY
	}
};

/** ================== PARSE SERVER * */
const parseServerConfig = new ParseServer({
	databaseURI: config.COMMON.DB_URL,
	appId: config.COMMON.APP_ID,
	masterKey: config.COMMON.MASTER_KEY,
	serverURL: config.COMMON.SERVER_URL,
	cloud: 'src/cloud/main'
	// push: config.DASHBOARD.PUSH
});

/** ================== DASHBOARD * */
const parseDashboardConfig = new ParseDashboard(
	{
		apps: [
			{
				serverURL: config.COMMON.SERVER_URL,
				appId: config.COMMON.APP_ID,
				masterKey: config.COMMON.MASTER_KEY,
				appName: config.COMMON.APP_NAME,
				iconName: 'favicon/apple-icon-180x180.png',
				supportedPushLocales: ['ko', 'en'],
				production: IS_PRODUCTION
				// "primaryBackgroundColor": "#FFA500",
				// "secondaryBackgroundColor": "#FF4500",
			}
		],
		users: [
			{
				apps: [{ appId: config.COMMON.APP_ID }],
				user: config.DASHBOARD.DASHBOARD_ID,
				pass: config.DASHBOARD.DASHBOARD_PW
			}
		],
		iconsFolder: 'public',
		trustProxy: true
	},
	{
		allowInsecureHTTP: true,
		cookieSessionSecret: process.env.COOKIE_SESSION_SECRET
	}
);

module.exports = { parseServerConfig, parseDashboardConfig };
