from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'admin/users', views.UserManagementViewSet, basename='admin-users')
router.register(r'admin/skills', views.SkillModerationViewSet, basename='admin-skills')
router.register(r'admin/messages', views.MessageViewSet, basename='admin-messages')

urlpatterns = [
    # Auth endpoints
    path('register/', views.register, name='register'),
    path('status/', views.status, name='status'),
    path('verify-email/', views.verify_email, name='verify-email'),
    path('google/', views.google_auth, name='google-auth'),

    # Admin endpoints
    path('admin/stats/', views.admin_stats, name='admin-stats'),
    path('admin/settings/', views.system_settings, name='admin-settings'),
    path('', include(router.urls)),
]
