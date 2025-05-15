import api from './api';
import { AdminStats, UserManagement, SkillModeration, UserMessage } from '../types/admin';

export const realAdminService = {
    // Stats
    getAdminStats: async (): Promise<AdminStats> => {
        const response = await api.get('/admin/stats/');
        return response.data;
    },

    // User Management
    getUsers: async (): Promise<UserManagement[]> => {
        const response = await api.get('/admin/users/');
        return response.data;
    },

    updateUserStatus: async (userId: string, status: 'active' | 'suspended'): Promise<void> => {
        await api.patch(`/admin/users/${userId}/`, { status });
    },

    deleteUser: async (userId: string): Promise<void> => {
        await api.delete(`/admin/users/${userId}/`);
    },

    // Skill Management
    getSkills: async (): Promise<SkillModeration[]> => {
        const response = await api.get('/admin/skills/');
        return response.data;
    },

    updateSkillStatus: async (skillId: number, status: 'active' | 'rejected'): Promise<void> => {
        await api.patch(`/admin/skills/${skillId}/`, { status });
    },

    deleteSkill: async (skillId: number): Promise<void> => {
        await api.delete(`/admin/skills/${skillId}/`);
    },

    // Message Management 
    getMessages: async (): Promise<UserMessage[]> => {
        const response = await api.get('/admin/messages/');
        return response.data;
    },

    updateMessageStatus: async (messageId: number, status: 'read' | 'archived'): Promise<void> => {
        await api.patch(`/admin/messages/${messageId}/`, { status });
    },

    replyToMessage: async (messageId: number, adminName: string, content: string): Promise<void> => {
        await api.post(`/admin/messages/${messageId}/reply/`, { adminName, content });
    },

    deleteMessage: async (messageId: number): Promise<void> => {
        await api.delete(`/admin/messages/${messageId}/`);
    },

    // System Settings
    getSystemSettings: async () => {
        const response = await api.get('/admin/settings/');
        return response.data;
    },

    updateSystemSettings: async (newSettings: any): Promise<void> => {
        await api.put('/admin/settings/', newSettings);
    }
};
