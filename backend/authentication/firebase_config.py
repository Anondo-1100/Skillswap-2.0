import os
import firebase_admin
from firebase_admin import credentials, auth
from django.conf import settings

def initialize_firebase():
    cred = credentials.Certificate(os.path.join(settings.BASE_DIR, 'credentials', 'skillswap-d3d5a-firebase-adminsdk-fbsvc-2812b52959.json'))
    try:
        firebase_admin.initialize_app(cred)
    except ValueError:
        # App already initialized
        pass
