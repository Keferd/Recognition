import os
import cv2
from flaskapp import app
from flask import render_template, make_response, request, Response, jsonify, json, session, redirect, url_for, \
    send_file
import json
import base64
import tempfile

from recognition.functions import facial, recognize
from recognition.models import DetectorModel

ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}
ALLOWED_VIDEO_EXTENSIONS = ['mp4', 'avi', 'mov', 'mkv']


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/video')
def video():
    return render_template('video.html')


@app.route('/api/photo', methods=['POST'])
def post_photo():
    try:
        file = request.files["file"]
        actions = request.form.get('actions')
        

        if file and get_file_extension(file.filename) in ALLOWED_EXTENSIONS:
            save_folder = "media_files"
            if not os.path.exists(save_folder):
                os.makedirs(save_folder)

            save_path = os.path.join(save_folder, file.filename)
            file.save(save_path)

            with open(save_path, "rb") as image_file:
                encoded_image = base64.b64encode(image_file.read()).decode('utf-8')

            # Указываем модель из класса DetectorModel
            detector_model = DetectorModel.OPENCV
            recognize_list = recognize(save_path, detector_model=detector_model)
            # TODO: сюда передавать что мы еще распознаем: эмоции, возраст и тд.
            # достаем из чекбокса 'age', 'gender', 'race', 'emotion'
            facial_list = facial(save_path)

            response_data = {
                'recognize_list': recognize_list,
                'facial_list': facial_list
            }

            # print(response_data)
            os.remove(save_path)
            return jsonify(response_data)

        else:
            return "Файл должен быть одного из форматов: " + ', '.join(ALLOWED_EXTENSIONS), 400

    except Exception as e:
        print(e)
        return str(e), 500


@app.route('/api/video', methods=['POST'])
def post_video():
    try:
        file = request.files["file"]

        if file and get_file_extension(file.filename) in ALLOWED_VIDEO_EXTENSIONS:
            save_folder = "media_files"
            if not os.path.exists(save_folder):
                os.makedirs(save_folder)

            save_path = os.path.join(save_folder, file.filename)
            file.save(save_path)

            detector_model = DetectorModel.OPENCV
            recognize_list = []

            cap = cv2.VideoCapture(save_path)

            frame_count = 0
            while True:
                ret, frame = cap.read()
                if not ret:
                    break

                # каждый пятый кадр
                if frame_count % 50 == 0:
                    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.jpg')
                    temp_file_path = temp_file.name
                    temp_file.close()

                    # сохраняем кадр как изображение во временный файл
                    cv2.imwrite(temp_file_path, frame)
                    recognize_list.append(recognize(temp_file_path, detector_model=detector_model))
                    os.unlink(temp_file_path)

                frame_count += 1

            cap.release()
            os.remove(save_path)
            return jsonify({'recognize_list': recognize_list})

        else:
            return "Файл должен быть одного из форматов: " + ', '.join(ALLOWED_VIDEO_EXTENSIONS), 400

    except Exception as e:
        print(e)
        return str(e), 500


def get_file_extension(filename):
    return filename.rsplit('.', 1)[1].lower() if '.' in filename else ''


def json_response(data, code=200):
    return Response(status=code, mimetype="application/json", response=json.dumps(data))


def bad_request():
    return make_response(jsonify({'error': 'Bad request'}), 400)
