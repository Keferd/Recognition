import os
from datetime import timedelta


class Config(object):
    SEND_FILE_MAX_AGE_DEFAULT = 0

    SECRET_KEY = 'anypassword'
    SESSION_COOKIE_NAME = 'user_sid'
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SECURE = False
    PERMANENT_SESSION_LIFETIME = timedelta(minutes=30)