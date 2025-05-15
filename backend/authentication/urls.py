from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('status/', views.status, name='status'),
    path('verify-email/', views.verify_email, name='verify-email'),
    path('google/', views.google_auth, name='google-auth'),
]
