FROM python:3.9

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY flaskapp/ /app/flaskapp
COPY main.py /app/
COPY config.py /app/

CMD ["python", "main.py"]
