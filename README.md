# Ufa2024
Данный проект представляет собой систему на базе ИИ по распознаванию лиц знаменитостей на фото/видео

##Структура проекта (возможны правки)

- **flaskapp/**
  - Project front-end
- **README.md**
  - Описание проекта.
- **requirements.txt**
  - Файл, содержащий список зависимостей Python, необходимых для запуска проекта.

## Как развернуть приложения (пока для ветки Art2)

1. docker-compose -f redis-docker-compose.yml up -d --build
2. Убедиться что есть файл redis-data/dump.rdb
3. docker cp redis-data/dump.rdb ufa2024-redis-1:/data/dump.rdb
4. Перезапустить контейнер docker-compose -f redis-docker-compose.yml up -d

