import { AdminStats, UserManagement, SkillModeration } from '../types/admin';

// Mock data that we'll modify
let MOCK_USERS: UserManagement[] = [
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

let MOCK_SKILLS: SkillModeration[] = [
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

let MOCK_STATS: AdminStats = {
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

let MOCK_SETTINGS = {
    maintenanceMode: false,
    allowNewRegistrations: true,
    skillApprovalRequired: true,
    maxSkillsPerUser: 10
};

export const adminService = {
    // User Management
    getUsers: async (): Promise<UserManagement[]> => {
        return MOCK_USERS;
    },

    updateUserStatus: async (userId: string, status: UserManagement['status']): Promise<void> => {
        MOCK_USERS = MOCK_USERS.map(user =>
            user.id === userId ? { ...user, status } : user
        );
    },

    deleteUser: async (userId: string): Promise<void> => {
        MOCK_USERS = MOCK_USERS.filter(user => user.id !== userId);
        MOCK_STATS.totalUsers--;
        if (MOCK_USERS.find(u => u.status === 'active')) {
            MOCK_STATS.activeUsers--;
        }
    },

    // Skill Management
    getSkills: async (): Promise<SkillModeration[]> => {
        return MOCK_SKILLS;
    },

    updateSkillStatus: async (skillId: number, status: SkillModeration['status']): Promise<void> => {
        MOCK_SKILLS = MOCK_SKILLS.map(skill =>
            skill.id === skillId ? { ...skill, status, lastModified: new Date().toISOString() } : skill
        );

        // Update stats
        if (status === 'pending') MOCK_STATS.pendingSkills++;
        if (status === 'active') MOCK_STATS.pendingSkills--;
    },

    deleteSkill: async (skillId: number): Promise<void> => {
        const skill = MOCK_SKILLS.find(s => s.id === skillId);
        MOCK_SKILLS = MOCK_SKILLS.filter(skill => skill.id !== skillId);
        MOCK_STATS.totalSkills--;
        if (skill?.status === 'pending') {
            MOCK_STATS.pendingSkills--;
        }
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
        MOCK_STATS.activeReports--;
    },

    // System Settings
    getSystemSettings: async () => {
        return MOCK_SETTINGS;
    },

    updateSystemSettings: async (settings: any): Promise<void> => {
        MOCK_SETTINGS = { ...settings };
    }
};