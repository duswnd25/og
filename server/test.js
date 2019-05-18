const moment = require('moment-timezone');
const console = require('better-console');

console.info('2019-05-14T00:43:56.573Z');
console.info(
	moment()
		.utc()
		.format()
);
