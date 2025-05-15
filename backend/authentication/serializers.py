from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, Skill, Message, MessageReply, SystemSettings

class UserManagementSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='get_full_name')
    status = serializers.SerializerMethodField()
    joinedDate = serializers.DateTimeField(source='date_joined')
    lastActive = serializers.SerializerMethodField()
    skillsCount = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'status', 'joinedDate', 'lastActive', 'skillsCount']

    def get_status(self, obj):
        return 'active' if obj.is_active else 'suspended'

    def get_lastActive(self, obj):
        try:
            return obj.userprofile.last_active
        except UserProfile.DoesNotExist:
            return obj.last_login

    def get_skillsCount(self, obj):
        try:
            return obj.userprofile.skills_count
        except UserProfile.DoesNotExist:
            return 0

class SkillModerationSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.get_full_name')

    class Meta:
        model = Skill
        fields = ['id', 'title', 'author', 'category', 'status', 'created_at', 'last_modified']

class MessageReplySerializer(serializers.ModelSerializer):
    adminName = serializers.CharField(source='admin.get_full_name')
    createdAt = serializers.DateTimeField(source='created_at')

    class Meta:
        model = MessageReply
        fields = ['id', 'messageId', 'adminName', 'content', 'createdAt']

class MessageSerializer(serializers.ModelSerializer):
    reply = MessageReplySerializer(read_only=True)
    createdAt = serializers.DateTimeField(source='created_at')

    class Meta:
        model = Message
        fields = ['id', 'name', 'email', 'message', 'status', 'createdAt', 'reply']

class SystemSettingsSerializer(serializers.ModelSerializer):
    maintenanceMode = serializers.BooleanField(source='maintenance_mode')
    allowNewRegistrations = serializers.BooleanField(source='allow_new_registrations')
    skillApprovalRequired = serializers.BooleanField(source='skill_approval_required')
    maxSkillsPerUser = serializers.IntegerField(source='max_skills_per_user')

    class Meta:
        model = SystemSettings
        fields = ['maintenanceMode', 'allowNewRegistrations', 'skillApprovalRequired', 'maxSkillsPerUser']
