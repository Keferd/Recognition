from flask import Flask
from config import Config
import redis

REDIS_CLIENT = redis.Redis(host='localhost', port=6379, db=0)
print(REDIS_CLIENT.ping())
print(len(REDIS_CLIENT.keys()))

app = Flask(__name__)
app.config.from_object(Config)



from flaskapp import routes