# ----------------
# Stage 1: Build
# ----------------
FROM node:18.20-alpine AS build

# Создадим рабочую директорию
WORKDIR /app

# Скопируем package*.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальной код
COPY . .

# Собираем production-версию
RUN npm run build

# ----------------
# Stage 2: Production
# ----------------
FROM nginx:alpine as production

# Установим openssl для генерации самоподписанного сертификата (если сертификат уже есть, можно пропустить)
RUN apk add --no-cache openssl

# Создадим папку для сертификатов
RUN mkdir /etc/nginx/certs

# Генерируем самоподписанный сертификат (365 дней)
# Если у вас есть свои сертификаты, лучше скопируйте их из локальной папки certs/:
#  COPY certs/*.crt /etc/nginx/certs/
#  COPY certs/*.key /etc/nginx/certs/
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -subj "/CN=localhost/O=MyCompany/C=RU" \
    -keyout /etc/nginx/certs/self.key \
    -out /etc/nginx/certs/self.crt

# Копируем статические файлы (из собранной Stage 1) в стандартную директорию Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем наш конфиг Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 443 (HTTPS)
EXPOSE 443

# Запуск Nginx в переднем (foreground) режиме
CMD ["nginx", "-g", "daemon off;"]
