# Ufa2024
Данный проект представляет собой систему на базе ИИ по распознаванию лиц знаменитостей на фото/видео

Структура проекта (возможны правки)

- **flaskapp/**
  - Project front-end
- **README.md**
  - Описание проекта.
- **requirements.txt**
  - Файл, содержащий список зависимостей Python, необходимых для запуска проекта.

## Как развернуть приложения (пока для ветки Art2)

- **Поднять БД**
  - docker-compose -f redis-docker-compose.yml up -d --build
- **Убедиться что файл dump.rdb существует в папке redis-data**
- **Переместить текущую версию БД в контейнер**
  - docker cp redis-data/dump.rdb ufa2024-redis-1:/data/dump.rdb
- **Перезапустить контейнер**
  - docker-compose -f redis-docker-compose.yml up -d
   
приложение будет доступно по ссылке http://127.0.0.1:8000/

