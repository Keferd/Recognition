# Ufa2024

Как развернуть приложение:
1. docker-compose -f redis-docker-compose.yml up -d --build
2. Убедиться что есть файл redis-data/dump.rdb 
3. docker cp redis-data/dump.rdb ufa2024-redis-1:/data/dump.rdb
4. Перезапустить контейнер docker-compose -f redis-docker-compose.yml up -d
5. 