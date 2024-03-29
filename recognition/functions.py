from deepface import DeepFace

from recognition.models import RecognitionModel, DetectorModel


def recognize(image_path: str, detector_model):
    data = DeepFace.find(img_path=image_path, db_path="./flaskapp/static/db_images",
                         model_name=RecognitionModel.VGG_FACE,
                         threshold=0.9, detector_backend=detector_model)

    res = []
    for img_data in data:
        res.append({"path": img_data["identity"][0].replace("/flaskapp", ""),
                    "distance": img_data["distance"][0]})

    return res


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
