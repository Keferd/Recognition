import redis
from redis.commands.search.field import VectorField, TagField
from redis.commands.search.query import Query
REDIS_CLIENT = redis.Redis(host='localhost', port=6379, db=0)
print(REDIS_CLIENT.ping())
print(len(REDIS_CLIENT.keys()))
REDIS_CLIENT.ft().create_index(
    [
        VectorField(
            "embedding",
            "HNSW",
            {
                "TYPE": "FLOAT32",
                "DIM": 128,
                "DISTANCE_METRIC": "COSINE",
            },
        )
    ]
)

# скрипт для создания векторных индексов в редисе. Не запускать!!!