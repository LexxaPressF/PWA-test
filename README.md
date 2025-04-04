# Развёртывание Vite + Vue + TypeScript приложения с использованием Docker

## Описание проекта
Данный проект представляет собой приложение, созданное на основе Vite, Vue.js и TypeScript. Для удобного развёртывания и запуска используется Docker. В production-режиме приложение запускается с помощью Nginx с поддержкой HTTPS. HTTPS нужно для работы таких функций как стриминг изображения с камеры, доступ к Bluetooth Geoloacation API и т.д.

---

## Системные требования

- **Node.js**: версия 18.20
- **Docker**: версия 20.10 или выше

---

## Локальная разработка

1. Убедитесь, что у вас установлены **Node.js** и **npm**.
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Запустите локальный сервер разработки:
   ```bash
   npm run dev
   ```
4. Перейдите по адресу [http://localhost:5173](http://localhost:5173) для проверки приложения.

---

## Сборка Docker-образа

1. Создайте образ с помощью команды:
   ```bash
   docker build -t https-pwa .
   ```

2. Запустите контейнер с пробросом HTTPS-порта:
   ```bash
   docker run -d -p 443:443 --name https-pwa https-pwa
   ```

3. Откройте приложение в браузере:
    - Локально: [https://127.0.0.1:443](https://127.0.0.1:443)
    - По IP: [https://<IP-адрес-сервера>](https://<IP-адрес-сервера>:443)

   ⚠️ Если используется самоподписанный сертификат, браузер может выдать предупреждение. Разрешите доступ, чтобы продолжить.

---

## Основные команды

### Установка зависимостей
```bash
npm install
```

### Запуск в режиме разработки
```bash
npm run dev
```

### Сборка production-версии
```bash
npm run build
```

### Локальное тестирование production-версии
```bash
npm run preview
```

### Сборка Docker-образа
```bash
docker build -t my-vue-app-https .
```

### Запуск Docker-контейнера
```bash
docker run -d -p 443:443 --name https-pwa https-pwa
```

### Остановка и удаление контейнера
```bash
docker stop https-pwa && docker rm https-pwa
```

---