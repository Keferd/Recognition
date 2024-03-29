FROM python:3.9

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN pip install opencv-python-headless
COPY weights/facenet_weights.h5 /root/.deepface/weights/facenet_weights.h5
COPY flaskapp/ /app/flaskapp
COPY recognition/ /app/recognition
COPY media_files/ /app/media_files
COPY main.py /app/
COPY config.py /app/

CMD ["python", "main.py"]
