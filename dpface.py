from deepface import DeepFace as df
import pickle


dfs = df.find(img_path = "_-ifLxymQNw.jpg", db_path = "C:/Users/krusl/Downloads/im")

with open('C:/Users/krusl/Downloads/im/ds_vggface_opencv_v2.pkl', 'rb') as file:
    your_object = pickle.load(file)

# Теперь объект доступен для использования
print(your_object)


