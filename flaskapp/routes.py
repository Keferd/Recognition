import os

from flaskapp import app
import pandas as pd
from flask import render_template, make_response, request, Response, jsonify, json, session, redirect, url_for, send_file
import functools
import json

import base64

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
        # camera = request.form.get('camera')
        # model = request.form.get('model')
        # check = False
        # check = request.form.get('check')

        # camera = camera.replace('"', '')
        # model = model.replace('"', '')
        
        
        if file and file.filename.endswith('.jpg'):
            save_path = os.path.join(os.path.dirname(__file__), file.filename)
            file.save(save_path)

            #тут внес изменения Kashanaft для улучшения изображения
            # if check == "true":
            #     image_proccessing(save_path)

            # output_image_path, result = predict(camera, save_path, model)

            # output_image_path = "photos/2.jpg"

            os.remove(save_path)
            
            # with open(output_image_path, "rb") as image_file:
            #     encoded_image = base64.b64encode(image_file.read()).decode('utf-8')

            

            response_data = {
                "imgs": [
                    {
                        'path': "static/img/photos/2.jpg", 
                        'name': "photo2",
                        'accuracy' : "49%"
                    },
                    {
                        'path': "static/img/photos/1.jpg", 
                        'name': "photo1",
                        'accuracy' : "70%"
                    }
                ]
            }

            # os.remove(output_image_path)

            return jsonify(response_data)

        else:
            return "Файл должен быть формата .jpg", 400

    except Exception as e:
        print(e)
        return str(e), 500

def json_response(data, code=200):
    return Response(status=code, mimetype="application/json", response=json.dumps(data))


def bad_request():
    return make_response(jsonify({'error': 'Bad request'}), 400)