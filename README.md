# Ufa2024


Данный проект представляет собой систему на базе ИИ по распознаванию лиц знаменитостей на фото/видео

Структура проекта (возможны правки)

- **flaskapp/**
  - Project front-end
- **flaskapp/db_service**
  - Сервис для работы с БД Redis.
- **flaskapp/recognition/functions.py**
  - Файл функций распознавания.
- **flaskapp/recognition/models.py**
  - Файл моделей распознавания.
 - **main.py**
  - Файл запуска приложения.
- **requirements.txt**
  - Файл, содержащий список зависимостей Python, необходимых для запуска проекта.

## Запуск проекта

Чтобы запустить проект, выполните следующие шаги:

1. Убедитесь, что у вас установлен Python.
2. Установите инструмент для создания изолированной среды Python 
- **pip install virtualenv**
- **pip install virtualenvwrapper-win**
3. Создайте изолированную среду в Python 
- **python3 -m venv venv**
4. Активируйте созданную виртуальную среду
- **venv\Scripts\activate** или **venv\Scripts\activate.bat**
5. Установите необходимые зависимости, выполнив следующую команду:
- **pip install -r requirements.txt**
6. Поднять БД
- **docker-compose -f redis-docker-compose.yml up -d --build**
7. Убедиться что файл dump.rdb существует в папке redis-data
8. Переместить текущую версию БД в контейнер
- **docker cp redis-data/dump.rdb recognition-redis-1:/data/dump.rdb**
9. Перезапустить контейнер
- **docker stop recognition-redis-1**
- **docker start recognition-redis-1**
10. Добавить папку datasets в корневую директорию проекта
11. Запустите приложение, выполнив следующую команду:
- **python main.py**
   
После этого ваше приложение будет доступно по адресу http://127.0.0.1:8000/

При первом запуске потребуется скачивание моделей, которое займет некоторое время
