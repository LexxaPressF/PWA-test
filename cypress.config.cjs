const {defineConfig} =  require('cypress');

module.exports = defineConfig({
    e2e: {
        // Поскольку ваше приложение раздаётся через HTTPS, возможно, вам потребуется указать https://localhost
        baseUrl: 'https://127.0.0.1',
        // Если возникают проблемы с самоподписанным сертификатом, можно отключить проверки безопасности:
        chromeWebSecurity: false,
        setupNodeEvents(on, config) {
            // Дополнительные настройки или обработка событий
            return config;
        },
    },
});
