const {defineConfig} =  require('cypress');

module.exports = defineConfig({
    e2e: {
        base_url: process.env.CYPRESS_BASE_URL,
        // Если возникают проблемы с самоподписанным сертификатом, можно отключить проверки безопасности:
        chromeWebSecurity: false,
        supportFile: false,
        pageLoadTimeout: 120000,
        setupNodeEvents(on, config) {
            return config;
        },
    },
});
