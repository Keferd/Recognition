import enum


class RecognitionModel(str, enum.Enum):
    VGG_FACE = "VGG-Face"
    FACE_NET = "Facenet"


class DetectorModel(str, enum.Enum):
    OPENCV = "opencv"
    RETINAFACE = "retinaface"
    MTCNN = "mtcnn"
    SSD = "ssd"
