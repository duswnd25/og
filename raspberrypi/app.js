const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const console = require('better-console');
const RaspiCam = require('raspicam');
const rp = require('request-promise-native');
const fs = require('fs');
const moment = require('moment');

const isWin = process.platform === 'win32';
const parser = new Readline();

const baseUrl = isWin === false ? 'https://og-board.herokuapp.com' : 'http://localhost:3000';
const clientId = 'mCcaI95vzy';
const clientKey =
	'3bb8d4f4ccf57c5c927cb54191f77618e987b644d60d419f862c8f280630fff9b157422e27bd9b118921543d58c4506b2acef2d3f53544f0722187219e2a88ac';

const camera = new RaspiCam({
	width: 600,
	height: 420,
	awb: 'off',
	encoding: 'jpg',
	output: './pic.jpg',
	q: 80,
	mode: 'photo',
	nopreview: true,
	th: '0:0:0'
});

camera
	.on('start', () => {
		console.info('CAMERA START');
	})
	.on('read', (err, timestamp, filename) => {
		if (err) {
			console.error('CAMERA ERROR');
			console.error(err);
		} else {
			console.info(`TAKE PIC : ${filename} at ${timestamp}`);
		}
	})
	.on('stop', () => {
		console.info('CAMERA STOP');
	})
	.on('exit', () => {
		console.info('CAMERA EXIT');
	});

const status = {
	brightnessSetValue: 500,
	temperatureSetValue: 50,
	humiditySetValue: 50,
	brightnessValue: 500,
	temperatureValue: 24,
	humidityValue: 50,
	automode: true,
	fan: true,
	led: true,
	water: true,
	image: ''
};

const port = new SerialPort(isWin ? 'COM4' : '/dev/ttyACM0', {
	baudRate: 9600,
	autoOpen: false
});

port.open(err => {
	if (err) {
		console.error('Failed to open port.');
		console.error(err);
	} else {
		console.info('Port open Success');
	}
});

port.pipe(parser);

parser.on('data', line => {
	console.info(`> ${line}`);

	if (line.indexOf(':') !== -1) {
		const log = {
			command: '',
			value: ''
		};

		const tempLines = line.split(':');
		log.command = tempLines[0].trim();
		log.value = tempLines[1].trim();

		if (log.command === 'AUTO ENABLE') {
			status.automode = log.value === 'TRUE';
		} else if (log.command === 'FAN ENABLE') {
			status.fan = log.value === 'TRUE';
		} else if (log.command === 'LED ENABLE') {
			status.led = log.value === 'TRUE';
		} else if (log.command === 'WATER ENABLE') {
			status.water = log.value === 'TRUE';
		} else if (log.command === 'BRIGHTNESS SET') {
			status.brightnessSetValue = parseInt(log.value, 10);
		} else if (log.command === 'TEMPERATURE SET') {
			status.temperatureSetValue = parseInt(log.value, 10);
		} else if (log.command === 'BRIGHTNESS') {
			status.brightnessValue = parseInt(log.value, 10);
		} else if (log.command === 'TEMPERATURE') {
			status.temperatureValue = parseInt(log.value, 10);
		} else if (log.command === 'HUMIDITY') {
			status.humidityValue = parseInt(log.value, 10);
		}
	}
});

port.on('error', err => {
	console.error('ERROR : ', err.message);
});

function updateClientStatus() {
	return new Promise(async (resolve, reject) => {
		try {
			console.info('UPDATE STATUS');

			camera.start();

			const currentImage = fs.readFileSync('./pic.jpg');
			status.image = Buffer.from(currentImage).toString('base64');

			const options = {
				method: 'POST',
				url: `${baseUrl}/api/v1/datas/${clientId}/update/staus`,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				form: {
					key: clientKey,
					brightness: status.brightnessValue,
					humidity: status.humidityValue,
					temperature: status.temperatureValue,
					automode: status.automode,
					fan: status.fan,
					led: status.led,
					water: status.water,
					image: status.image
				}
			};

			await rp(options);
			return resolve();
		} catch (error) {
			return reject(error);
		}
	});
}

function updateHalfTimeClientStatus() {
	return new Promise(async (resolve, reject) => {
		try {
			console.info('UPDATE STATUS');
			const options = {
				method: 'POST',
				url: `${baseUrl}/api/v1/datas/${clientId}/update/halftime`,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				form: {
					key: clientKey,
					brightness: status.brightnessValue,
					humidity: status.humidity,
					temperature: status.temperatureValue,
					image: status.image
				}
			};

			await rp(options);
			return resolve();
		} catch (error) {
			return reject(error);
		}
	});
}

async function updateConfig() {
	return new Promise(async (resolve, reject) => {
		try {
			console.info('GET SERVER CONFIG');

			const options = {
				method: 'GET',
				url: `${baseUrl}/api/v1/datas/mCcaI95vzy/config`
			};

			const config = JSON.parse(await rp(options));

			status.brightnessSetValue = parseInt(config.brightnessSetValue, 10);
			status.temperatureSetValue = parseInt(config.temperatureSetValue, 10);
			status.automode = config.automode === 'true';
			status.fan = config.fan === 'true';
			status.led = config.led === 'true';
			status.water = config.water === 'true';

			const command = `${status.brightnessSetValue}/${status.temperatureSetValue}/${status.humiditySetValue}/${
				status.automode === true ? 1 : 0
			}/${status.water === true ? 1 : 0}/${status.fan === true ? 1 : 0}/${
				status.led === true ? 1 : 0
			}/${moment().format('HH')}/`;
			port.write(command);
			return resolve();
		} catch (error) {
			return reject(error);
		}
	});
}

// every 10s
setInterval(async () => {
	try {
		await Promise.all([updateClientStatus(), updateConfig()]);
	} catch (error) {
		console.error(error);
	}
}, 10 * 1000);

// every 30m
setInterval(async () => {
	try {
		await updateHalfTimeClientStatus();
	} catch (error) {
		console.error(error);
	}
}, 30 * 60 * 1000);
