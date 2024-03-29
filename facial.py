from deepface import DeepFace as  deep

def facial(img):
    try:
        objs = deep.analyze(img_path=img, actions=['age', 'gender', 'race', 'emotion'])
    except ValueError as e:
        print(e)
        return None
    selected_fields = ['age', 'dominant_gender', 'dominant_race', 'dominant_emotion']
    filtered_objs = []
    for obj in objs:
        filtered_obj = {field: obj.get(field) for field in selected_fields}
        filtered_objs.append(filtered_obj)
    return filtered_objs


print(facial("images/52906703e8849cc41e4e1517a0fc752a141245ad.png"))