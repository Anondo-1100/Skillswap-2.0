from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from firebase_admin import auth
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from .firebase_config import initialize_firebase

initialize_firebase()

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    try:
        id_token = request.data.get('idToken')
        if not id_token:
            return JsonResponse({
                'status': 'error',
                'message': 'No ID token provided'
            }, status=400)

        try:
            # Verify the ID token first
            decoded_token = auth.verify_id_token(id_token)
            firebase_user = auth.get_user(decoded_token['uid'])
            
            # Check if this is a new registration
            try:
                # Check if a user with this email already exists
                existing_user = User.objects.get(email=firebase_user.email)
                if existing_user:
                    return JsonResponse({
                        'status': 'error',
                        'message': 'An account already exists with this email address'
                    }, status=409)
            except User.DoesNotExist:
                # Create new Django user
                user = User.objects.create_user(
                    username=firebase_user.email,  # Use email as username
                    email=firebase_user.email,
                    password=None  # Password is managed by Firebase
                )
                user.save()

            return JsonResponse({
                'status': 'success',
                'message': 'User registered successfully',
                'data': {
                    'uid': firebase_user.uid,
                    'email': firebase_user.email,
                    'emailVerified': firebase_user.email_verified
                }
            })

        except auth.InvalidIdTokenError:
            return JsonResponse({
                'status': 'error',
                'message': 'Invalid ID token',
                'code': 'auth/invalid-token'
            }, status=401)
        except auth.UserNotFoundError:
            return JsonResponse({
                'status': 'error',
                'message': 'User not found',
                'code': 'auth/user-not-found'
            }, status=404)
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e),
                'code': 'auth/server-error'
            }, status=500)
            
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'message': str(e),
            'code': 'server/unknown-error'
        }, status=500)

@api_view(['GET'])
@permission_classes([AllowAny])
def status(request):
    try:
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return JsonResponse({
                'status': 'error',
                'message': 'No token provided'
            }, status=401)

        id_token = auth_header.split(' ')[1]
        decoded_token = auth.verify_id_token(id_token)
        firebase_user = auth.get_user(decoded_token['uid'])

        try:
            django_user = User.objects.get(email=firebase_user.email)
            return JsonResponse({
                'status': 'success',
                'data': {
                    'uid': firebase_user.uid,
                    'email': firebase_user.email,
                    'emailVerified': firebase_user.email_verified,
                    'django_id': django_user.id
                }
            })
        except User.DoesNotExist:
            return JsonResponse({
                'status': 'error',
                'message': 'User not found in Django database',
                'code': 'auth/user-not-found'
            }, status=404)

    except auth.InvalidIdTokenError:
        return JsonResponse({
            'status': 'error',
            'message': 'Invalid or expired token',
            'code': 'auth/invalid-token'
        }, status=401)
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'message': str(e),
            'code': 'auth/server-error'
        }, status=500)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    try:
        id_token = request.data.get('idToken')
        if not id_token:
            return JsonResponse({
                'status': 'error',
                'message': 'No ID token provided'
            }, status=400)

        decoded_token = auth.verify_id_token(id_token)
        user = auth.get_user(decoded_token['uid'])

        if not user.email_verified:
            return JsonResponse({
                'status': 'error',
                'message': 'Please verify your email before logging in',
                'code': 'auth/email-not-verified'
            }, status=403)

        return JsonResponse({
            'status': 'success',
            'message': 'Login successful',
            'data': {
                'uid': user.uid,
                'email': user.email,
                'emailVerified': user.email_verified
            }
        })
    except auth.InvalidIdTokenError:
        return JsonResponse({
            'status': 'error',
            'message': 'Invalid ID token',
            'code': 'auth/invalid-token'
        }, status=401)
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'message': str(e),
            'code': 'auth/server-error'
        }, status=500)

@api_view(['POST'])
@permission_classes([AllowAny])
def verify_email(request):
    try:
        id_token = request.data.get('idToken')
        if not id_token:
            return JsonResponse({
                'status': 'error',
                'message': 'No ID token provided'
            }, status=400)

        decoded_token = auth.verify_id_token(id_token)
        firebase_user = auth.get_user(decoded_token['uid'])

        # First check if the user exists in our database
        try:
            django_user = User.objects.get(email=firebase_user.email)
        except User.DoesNotExist:
            return JsonResponse({
                'status': 'error',
                'message': 'User not found in our database. Please register first.',
                'code': 'auth/user-not-found'
            }, status=404)

        # Then check if the email is verified in Firebase
        if firebase_user.email_verified:
            # Update Django user status
            django_user.is_active = True
            django_user.save()

            return JsonResponse({
                'status': 'success',
                'message': 'Email verified successfully',
                'data': {
                    'uid': firebase_user.uid,
                    'email': firebase_user.email,
                    'emailVerified': True,
                    'django_id': django_user.id
                }
            })
        else:
            # Email is not verified yet
            return JsonResponse({
                'status': 'error',
                'message': 'Email not verified. Please check your email and click the verification link.',
                'code': 'auth/email-not-verified',
                'data': {
                    'email': firebase_user.email,
                    'emailVerified': False
                }
            }, status=403)

    except auth.InvalidIdTokenError:
        return JsonResponse({
            'status': 'error',
            'message': 'Invalid or expired token. Please log in again.',
            'code': 'auth/invalid-token'
        }, status=401)
    except auth.UserNotFoundError:
        return JsonResponse({
            'status': 'error',
            'message': 'User not found in Firebase.',
            'code': 'auth/user-not-found'
        }, status=404)
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'message': str(e),
            'code': 'auth/server-error'
        }, status=500)

@api_view(['POST'])
@permission_classes([AllowAny])
def google_auth(request):
    try:
        id_token = request.data.get('idToken')
        if not id_token:
            return JsonResponse({
                'status': 'error',
                'message': 'No ID token provided'
            }, status=400)

        try:
            # Verify the ID token
            decoded_token = auth.verify_id_token(id_token)
            firebase_user = auth.get_user(decoded_token['uid'])
            
            # Try to get existing user or create new one
            try:
                user = User.objects.get(email=firebase_user.email)
            except User.DoesNotExist:
                # Create new Django user for Google authentication
                user = User.objects.create_user(
                    username=firebase_user.email,
                    email=firebase_user.email,
                    password=None  # Password not needed for Google auth
                )
                user.save()

            return JsonResponse({
                'status': 'success',
                'message': 'Google authentication successful',
                'data': {
                    'uid': firebase_user.uid,
                    'email': firebase_user.email,
                    'emailVerified': firebase_user.email_verified,
                    'displayName': firebase_user.display_name,
                    'photoURL': firebase_user.photo_url
                }
            })

        except auth.InvalidIdTokenError:
            return JsonResponse({
                'status': 'error',
                'message': 'Invalid ID token'
            }, status=401)
            
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'message': str(e)
        }, status=500)
