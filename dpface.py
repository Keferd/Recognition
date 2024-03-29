from deepface import DeepFace as df
import pickle
import enum


class Model(str, enum.Enum):
    VGG_Face = "VGG-Face"
    Facenet = "Facenet"
    Facenet512 = "Facenet512"
    OpenFace = "OpenFace"
    DeepFace = "DeepFace"
    DeepID = "DeepID"
    ArcFace = "ArcFace"
    Dlib = "Dlib"
    SFace = "SFace"
    GhostFaceNet = "GhostFaceNet"


dfs = df.find(img_path="images/_-ifLxymQNw.jpg", db_path="images", model_name=Model.OpenFace)

with open('results/ds_vggface_opencv_v2.pkl', 'rb') as file:
    your_object = pickle.load(file)

# Теперь объект доступен для использования
print(your_object)
