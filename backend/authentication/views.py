from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from firebase_admin import auth
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .firebase_config import initialize_firebase
from .models import UserProfile, Skill, Message, MessageReply, SystemSettings
from .serializers import (
    UserManagementSerializer,
    SkillModerationSerializer,
    MessageSerializer,
    SystemSettingsSerializer
)

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

# Admin views
class IsAdmin:
    def has_permission(self, request, view):
        try:
            return bool(request.user and request.user.userprofile.is_admin)
        except UserProfile.DoesNotExist:
            return False

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def admin_stats(request):
    total_users = User.objects.count()
    active_users = User.objects.filter(is_active=True).count()
    total_skills = Skill.objects.count()
    pending_skills = Skill.objects.filter(status='pending').count()
    new_messages = Message.objects.filter(status='new').count()
    
    stats = {
        'totalUsers': total_users,
        'activeUsers': active_users,
        'totalSkills': total_skills,
        'pendingSkills': pending_skills,
        'newMessages': new_messages,
        'systemHealth': {
            'status': 'healthy',
            'lastChecked': '2025-05-15T00:00:00Z',
            'issues': 0
        }
    }
    return Response(stats)

class UserManagementViewSet(viewsets.ModelViewSet):
    serializer_class = UserManagementSerializer
    permission_classes = [IsAuthenticated, IsAdmin]
    
    def get_queryset(self):
        return User.objects.all()
    
    def partial_update(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)
        status = request.data.get('status')
        
        if status == 'active':
            user.is_active = True
        elif status == 'suspended':
            user.is_active = False
        
        user.save()
        return Response(status=status.HTTP_200_OK)

class SkillModerationViewSet(viewsets.ModelViewSet):
    serializer_class = SkillModerationSerializer
    permission_classes = [IsAuthenticated, IsAdmin]
    
    def get_queryset(self):
        return Skill.objects.all()
    
    def partial_update(self, request, pk=None):
        skill = get_object_or_404(Skill, pk=pk)
        status = request.data.get('status')
        
        if status in ['active', 'rejected']:
            skill.status = status
            skill.save()
        
        return Response(status=status.HTTP_200_OK)

class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated, IsAdmin]
    
    def get_queryset(self):
        return Message.objects.all()
    
    def partial_update(self, request, pk=None):
        message = get_object_or_404(Message, pk=pk)
        status = request.data.get('status')
        
        if status in ['read', 'archived']:
            message.status = status
            message.save()
        
        return Response(status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def reply(self, request, pk=None):
        message = get_object_or_404(Message, pk=pk)
        content = request.data.get('content')
        
        reply = MessageReply.objects.create(
            message=message,
            admin=request.user,
            content=content
        )
        message.status = 'read'
        message.save()
        
        return Response(status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated, IsAdmin])
def system_settings(request):
    settings = SystemSettings.objects.first()
    if not settings:
        settings = SystemSettings.objects.create()
    
    if request.method == 'GET':
        serializer = SystemSettingsSerializer(settings)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = SystemSettingsSerializer(settings, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
