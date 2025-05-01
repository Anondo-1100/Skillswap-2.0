import { AdminStats, UserManagement, SkillModeration } from '../types/admin';

// Mock data
const MOCK_USERS: UserManagement[] = [
    {
        id: '1',
        name: 'Alex Johnson',
        email: 'alex@example.com',
        status: 'active',
        joinedDate: '2023-01-15',
        lastActive: '2025-05-01',
        skillsCount: 3,
        reportCount: 0
    },
    {
        id: '2',
        name: 'Sarah Miller',
        email: 'sarah@example.com',
        status: 'pending',
        joinedDate: '2025-04-28',
        lastActive: '2025-04-28',
        skillsCount: 1,
        reportCount: 0
    },
    {
        id: '3',
        name: 'John Smith',
        email: 'john@example.com',
        status: 'suspended',
        joinedDate: '2024-12-10',
        lastActive: '2025-03-15',
        skillsCount: 5,
        reportCount: 2
    },
    {
        id: '4',
        name: 'Emma Wilson',
        email: 'emma@example.com',
        status: 'active',
        joinedDate: '2024-11-20',
        lastActive: '2025-05-01',
        skillsCount: 4,
        reportCount: 0
    }
];

const MOCK_SKILLS: SkillModeration[] = [
    {
        id: 1,
        title: 'JavaScript Fundamentals',
        author: 'Alex Johnson',
        category: 'Programming',
        status: 'active',
        reportCount: 0,
        createdAt: '2025-04-15',
        lastModified: '2025-04-15'
    },
    {
        id: 2,
        title: 'Advanced Python',
        author: 'Sarah Miller',
        category: 'Programming',
        status: 'pending',
        reportCount: 0,
        createdAt: '2025-05-01',
        lastModified: '2025-05-01'
    },
    {
        id: 3,
        title: 'Digital Marketing Basics',
        author: 'John Smith',
        category: 'Marketing',
        status: 'rejected',
        reportCount: 2,
        createdAt: '2025-04-20',
        lastModified: '2025-04-25'
    },
    {
        id: 4,
        title: 'Web Design Principles',
        author: 'Emma Wilson',
        category: 'Design',
        status: 'pending',
        reportCount: 0,
        createdAt: '2025-05-01',
        lastModified: '2025-05-01'
    }
];

const MOCK_STATS: AdminStats = {
    totalUsers: 150,
    activeUsers: 89,
    totalSkills: 245,
    pendingSkills: 12,
    totalTransactions: 567,
    revenueThisMonth: 4500,
    activeReports: 8,
    systemHealth: {
        status: 'healthy',
        lastChecked: new Date().toISOString(),
        issues: 0
    }
};

export const adminService = {
    // User Management
    getUsers: async (): Promise<UserManagement[]> => {
        return MOCK_USERS;
    },

    updateUserStatus: async (userId: string, status: UserManagement['status']): Promise<void> => {
        // In a real app, this would make an API call
        console.log(`Updated user ${userId} status to ${status}`);
    },

    deleteUser: async (userId: string): Promise<void> => {
        // In a real app, this would make an API call
        console.log(`Deleted user ${userId}`);
    },

    // Skill Management
    getSkills: async (): Promise<SkillModeration[]> => {
        return MOCK_SKILLS;
    },

    updateSkillStatus: async (skillId: number, status: SkillModeration['status']): Promise<void> => {
        // In a real app, this would make an API call
        console.log(`Updated skill ${skillId} status to ${status}`);
    },

    deleteSkill: async (skillId: number): Promise<void> => {
        // In a real app, this would make an API call
        console.log(`Deleted skill ${skillId}`);
    },

    // Analytics and Stats
    getAdminStats: async (): Promise<AdminStats> => {
        return MOCK_STATS;
    },

    // Reports
    getReports: async () => {
        return [
            {
                id: 1,
                type: 'user',
                targetId: '3',
                reason: 'Inappropriate behavior in comments',
                status: 'pending',
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                type: 'skill',
                targetId: '3',
                reason: 'Misleading content and false information',
                status: 'pending',
                createdAt: new Date().toISOString()
            },
            {
                id: 3,
                type: 'user',
                targetId: '2',
                reason: 'Spam messages',
                status: 'pending',
                createdAt: new Date().toISOString()
            }
        ];
    },

    handleReport: async (reportId: number, action: 'approve' | 'reject'): Promise<void> => {
        // In a real app, this would make an API call
        console.log(`Handled report ${reportId} with action ${action}`);
    },

    // System Settings
    getSystemSettings: async () => {
        return {
            maintenanceMode: false,
            allowNewRegistrations: true,
            skillApprovalRequired: true,
            maxSkillsPerUser: 10
        };
    },

    updateSystemSettings: async (settings: any): Promise<void> => {
        // In a real app, this would make an API call
        console.log('Updated system settings:', settings);
    }
};