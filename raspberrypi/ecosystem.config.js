const appRootPath = require('app-root-path');

module.exports = {
	apps: [
		{
			max_memory_restart: '512',
			autorestart: true,
			name: 'OG',
			script: `${appRootPath}/app.js`,
			instances: 1,
			// 개발 환경
			env: {
				NODE_ENV: 'production'
			}
		}
	]
};
