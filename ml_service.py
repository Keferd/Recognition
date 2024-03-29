import redis
import numpy as np
import json
from deepface import DeepFace
from redis.commands.search.field import VectorField, TagField
from redis.commands.search.query import Query
from tqdm import tqdm

r = redis.Redis(host='localhost', port=6379, db=0)
print(r.ping())
print(len(r.keys()))

example = "E:\simple//test.jpg"
def get_similar_from_redis(img_path: str, k_neighbors: int = 1):
    represents = DeepFace.represent(img_path=img_path,
                                    model_name="Facenet",
                                    detector_backend="mtcnn")
    for idx, rep in enumerate(represents):
        print()
        print(f'Face №{idx}')
        embedding = rep["embedding"]
        query_vector = np.array(embedding).astype(np.float32).tobytes()
        base_query = f'*=>[KNN {k_neighbors} @embedding $query_vector AS distance]'
        query = Query(base_query).return_fields("distance").sort_by("distance").dialect(2)
        results = r.ft().search(query, query_params={"query_vector": query_vector})

        for result in results.docs:
            data_from_redis = r.hgetall(result.id)
            data = {
                'name': result.id,
                'metadata': json.loads(data_from_redis[b'metadata']),
                'similarity': result.distance
            }

            print(data)

get_similar_from_redis(img_path=example)