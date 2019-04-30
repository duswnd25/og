const debug = require('debug')('og:server');
const http = require('http');
const console = require('better-console');
const { app } = require('./src/app');

const server = http.createServer(app);

function normalizePort(val) {
	const port = parseInt(val, 10);

	if (Number.isNaN(port)) {
		return val;
	}

	if (port >= 0) {
		return port;
	}

	return false;
}

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

server.listen(port);
server.on('error', error => {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

	if (error.code === 'EACCES') {
		console.error(`${bind} requires elevated privileges`);
		process.exit(1);
	} else if (error.code === 'EADDRINUSE') {
		console.error(`${bind} is already in use`);
		process.exit(1);
	} else {
		throw error;
	}
});

server.on('listening', () => {
	const addr = server.address();
	const bind =
		typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
	debug(`Listening on ${bind}`);
});
