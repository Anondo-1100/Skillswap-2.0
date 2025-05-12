import { AdminStats, UserManagement, SkillModeration, UserMessage } from '../types/admin';

// Mock data
const MOCK_USERS: UserManagement[] = [
    {
        id: '1',
        name: 'Alex Johnson',
        email: 'alex@example.com',
        status: 'active',
        joinedDate: '2023-01-15',
        lastActive: '2025-05-01',
        skillsCount: 3
    },
    {
        id: '2',
        name: 'Sarah Miller',
        email: 'sarah@example.com',
        status: 'pending',
        joinedDate: '2025-04-28',
        lastActive: '2025-04-28',
        skillsCount: 1
    },
    {
        id: '3',
        name: 'John Smith',
        email: 'john@example.com',
        status: 'suspended',
        joinedDate: '2024-12-10',
        lastActive: '2025-03-15',
        skillsCount: 5
    },
    {
        id: '4',
        name: 'Emma Wilson',
        email: 'emma@example.com',
        status: 'active',
        joinedDate: '2024-11-20',
        lastActive: '2025-05-01',
        skillsCount: 4
    }
];

const MOCK_SKILLS: SkillModeration[] = [
    {
        id: 1,
        title: 'JavaScript Fundamentals',
        author: 'Alex Johnson',
        category: 'Programming',
        status: 'active',
        createdAt: '2025-04-15',
        lastModified: '2025-04-15'
    },
    {
        id: 2,
        title: 'Advanced Python',
        author: 'Sarah Miller',
        category: 'Programming',
        status: 'pending',
        createdAt: '2025-05-01',
        lastModified: '2025-05-01'
    },
    {
        id: 3,
        title: 'Digital Marketing Basics',
        author: 'John Smith',
        category: 'Marketing',
        status: 'rejected',
        createdAt: '2025-04-20',
        lastModified: '2025-04-25'
    },
    {
        id: 4,
        title: 'Web Design Principles',
        author: 'Emma Wilson',
        category: 'Design',
        status: 'pending',
        createdAt: '2025-05-01',
        lastModified: '2025-05-01'
    }
];

const MOCK_MESSAGES: UserMessage[] = [];

const MOCK_STATS: AdminStats = {
    totalUsers: 150,
    activeUsers: 89,
    totalSkills: 245,
    pendingSkills: 12,
    newMessages: 0,
    systemHealth: {
        status: 'healthy',
        lastChecked: new Date().toISOString(),
        issues: 0
    }
};

const MOCK_SYSTEM_SETTINGS = {
    maintenanceMode: false,
    allowNewRegistrations: true,
    skillApprovalRequired: true,
    maxSkillsPerUser: 10
};

export const adminService = {
    // Stats
    getAdminStats: async (): Promise<AdminStats> => {
        return MOCK_STATS;
    },

    // User Management
    getUsers: async (): Promise<UserManagement[]> => {
        return MOCK_USERS;
    },

    updateUserStatus: async (userId: string, status: 'active' | 'suspended'): Promise<void> => {
        const userIndex = MOCK_USERS.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            MOCK_USERS[userIndex].status = status;
        }
    },

    deleteUser: async (userId: string): Promise<void> => {
        const userIndex = MOCK_USERS.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            MOCK_USERS.splice(userIndex, 1);
        }
    },

    // Skill Management
    getSkills: async (): Promise<SkillModeration[]> => {
        return MOCK_SKILLS;
    },

    updateSkillStatus: async (skillId: number, status: 'active' | 'rejected'): Promise<void> => {
        const skillIndex = MOCK_SKILLS.findIndex(s => s.id === skillId);
        if (skillIndex !== -1) {
            MOCK_SKILLS[skillIndex].status = status;
            MOCK_SKILLS[skillIndex].lastModified = new Date().toISOString();
        }
    },

    deleteSkill: async (skillId: number): Promise<void> => {
        const skillIndex = MOCK_SKILLS.findIndex(s => s.id === skillId);
        if (skillIndex !== -1) {
            MOCK_SKILLS.splice(skillIndex, 1);
        }
    },

    // Message Management 
    getMessages: async (): Promise<UserMessage[]> => {
        return MOCK_MESSAGES;
    },

    updateMessageStatus: async (messageId: number, status: 'read' | 'archived'): Promise<void> => {
        const messageIndex = MOCK_MESSAGES.findIndex(m => m.id === messageId);
        if (messageIndex !== -1) {
            MOCK_MESSAGES[messageIndex].status = status;
        }
    },

    replyToMessage: async (messageId: number, _adminName: string, content: string): Promise<void> => {
        const messageIndex = MOCK_MESSAGES.findIndex(m => m.id === messageId);
        if (messageIndex !== -1) {
            MOCK_MESSAGES[messageIndex].reply = {
                id: Date.now(),
                messageId,
                adminName: 'Admin',
                content,
                createdAt: new Date().toISOString()
            };
        }
    },

    deleteMessage: async (messageId: number): Promise<void> => {
        const messageIndex = MOCK_MESSAGES.findIndex(m => m.id === messageId);
        if (messageIndex !== -1) {
            MOCK_MESSAGES.splice(messageIndex, 1);
        }
    },

    // System Settings
    getSystemSettings: async () => {
        return MOCK_SYSTEM_SETTINGS;
    },

    updateSystemSettings: async (newSettings: typeof MOCK_SYSTEM_SETTINGS): Promise<void> => {
        Object.assign(MOCK_SYSTEM_SETTINGS, newSettings);
    }
};