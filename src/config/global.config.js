/** :::::::::::::::::: SERVER CONFIG :::::::::::::::::: * */

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

function isProduction() {
	return IS_PRODUCTION;
}

function isDevelopment() {
	return !IS_PRODUCTION;
}

module.exports = { isProduction, isDevelopment };
