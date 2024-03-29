import enum


class RecognitionModel(str, enum.Enum):
    VGG_FACE = "VGG-Face"
    FACE_NET = "Facenet"
    FACENET_512 = "Facenet512"
    OPEN_FACE = "OpenFace"
    DEEP_FACE = "DeepFace"
    DEEP_ID = "DeepID"
    ARC_FACE = "ArcFace"
    D_LIB = "Dlib"
    S_FACE = "SFace"
    GHOST_FACE_NET = "GhostFaceNet"


class DetectorModel(str, enum.Enum):
    OPENCV = "opencv"
    RETINAFACE = "retinaface"
    MTCNN = "mtcnn"
    SSD = "ssd"
    # TODO: дописать
