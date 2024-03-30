from deepface import DeepFace
import numpy as np
import redis
import json
import math
import pickle
from redis.commands.search.query import Query
from recognition.models import RecognitionModel, DetectorModel


def recognize(redis_client: redis.Redis, img_path: str, detector_model: str = "mtcnn", k_neighbors: int = 1) -> list[dict]:
    represents = DeepFace.represent(img_path=img_path,
                                    model_name="Facenet",
                                    detector_backend=detector_model,
                                    enforce_detection=False)
    recognized_data = []
    for idx, rep in enumerate(represents):
        embedding = rep["embedding"]
        query_vector = np.array(embedding).astype(np.float32).tobytes()
        base_query = f'*=>[KNN {k_neighbors} @embedding $query_vector AS distance]'
        query = Query(base_query).return_fields("distance").sort_by("distance").dialect(2)
        results = redis_client.ft().search(query, query_params={"query_vector": query_vector})
        item = {}
        for result in results.docs:
            data_from_redis = redis_client.hgetall(result.id)
            item = {
                'name': result.id,
                'metadata': json.loads(data_from_redis[b'metadata']),
                'similarity': f'{round((1 - float(result.distance)) * 100)}%'
            }
            if 'specialization' in item.get('metadata', {}).get('info', {}):
                if isinstance(item['metadata']['info']['specialization'], float) and math.isnan(item['metadata']['info']['specialization']):
                    item['metadata']['info']['specialization'] = ''

        recognized_data.append(item)

    return recognized_data


def facial(img: str, actions: list = None):
    if not actions:
        return []
    try:
        objs = DeepFace.analyze(img_path=img, actions=actions)
    except ValueError as e:
        print(e)
        return None
    selected_fields = ['age', 'dominant_gender', 'dominant_race', 'dominant_emotion']
    filtered_objs = []
    for obj in objs:
        filtered_obj = {field: obj.get(field) for field in selected_fields}
        filtered_objs.append(filtered_obj)
    return filtered_objs



# def recognize(image_path: str, detector_model):
#     data = DeepFace.find(img_path=image_path, db_path="./flaskapp/static/db_images",
#                          model_name=RecognitionModel.VGG_FACE,
#                          threshold=0.9, detector_backend=detector_model)
#
#     res = []
#     for img_data in data:
#         res.append({"path": img_data["identity"][0].replace("/flaskapp", ""),
#                     "distance": img_data["distance"][0]})
#
#     return res