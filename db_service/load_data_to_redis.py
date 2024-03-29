import redis
import numpy as np
import json
from deepface import DeepFace
from redis.commands.search.field import VectorField, TagField
from redis.commands.search.query import Query
from tqdm import tqdm

r = redis.Redis(host='localhost', port=6379, db=0)
print(r.ping())
embeddings = []
#добавь сюда свою обработку дипфейсом


## сохранение в бд

pipeline = r.pipeline(transaction=False)
for img_path, embedding, metadata in tqdm(embeddings):
    key = img_path.split("/")[-1]
    value = np.array(embedding).astype(np.float32).tobytes()
    metadata_bytes = json.dumps(metadata)
    pipeline.hset(key, mapping={"embedding": value, "metadata": metadata_bytes})
pipeline_results = pipeline.execute()
r.save()

print('DATA IN DB = ', len(r.keys()))