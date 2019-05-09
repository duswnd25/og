module.exports = {
	apps: [
		{
			name: 'API',
			script: './server.js',
			instances: 1,
			watch: true,
			autorestart: true,
			max_memory_restart: '384M',
			// 개발 환경
			env: {
				NODE_ENV: 'production'
			}
		}
	]
};
