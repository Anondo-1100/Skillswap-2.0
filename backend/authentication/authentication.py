from django.contrib.auth.models import User
from firebase_admin import auth
from django.utils.functional import SimpleLazyObject
from django.contrib.auth.middleware import get_user
from rest_framework import authentication
from rest_framework import exceptions

class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if not auth_header:
            return None

        id_token = auth_header.split(' ').pop()
        try:
            decoded_token = auth.verify_id_token(id_token)
            uid = decoded_token['uid']
            
            try:
                user = User.objects.get(username=uid)
                return (user, None)
            except User.DoesNotExist:
                raise exceptions.AuthenticationFailed('User not found')
                
        except Exception as e:
            raise exceptions.AuthenticationFailed(str(e))

    def authenticate_header(self, request):
        return 'Bearer'
