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
				MONGODB_URI: 'mongodb://test:test@localhost:63918/test',
				REDIRECT_URL: 'http://localhost:3000'
			},
			// 배포 환경
			env_production: {
				// 시스템
				NODE_ENV: 'production'
			}
		}
	]
};
