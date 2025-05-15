from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_admin = models.BooleanField(default=False)
    skills_count = models.IntegerField(default=0)
    last_active = models.DateTimeField(auto_now=True)

class Skill(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('pending', 'Pending'),
        ('rejected', 'Rejected'),
    ]

    title = models.CharField(max_length=200)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

class Message(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('read', 'Read'),
        ('archived', 'Archived'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    created_at = models.DateTimeField(auto_now_add=True)

class MessageReply(models.Model):
    message = models.OneToOneField(Message, on_delete=models.CASCADE, related_name='reply')
    admin = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class SystemSettings(models.Model):
    maintenance_mode = models.BooleanField(default=False)
    allow_new_registrations = models.BooleanField(default=True)
    skill_approval_required = models.BooleanField(default=True)
    max_skills_per_user = models.IntegerField(default=10)
    last_updated = models.DateTimeField(auto_now=True)
