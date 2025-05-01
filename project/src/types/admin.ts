export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'superadmin';
    lastLogin: string;
    createdAt: string;
}

export interface UserManagement {
    id: string;
    name: string;
    email: string;
    status: 'active' | 'suspended' | 'pending';
    joinedDate: string;
    lastActive: string;
    skillsCount: number;
    reportCount: number;
}

export interface SkillModeration {
    id: number;
    title: string;
    author: string;
    category: string;
    status: 'active' | 'pending' | 'rejected';
    reportCount: number;
    createdAt: string;
    lastModified: string;
}

export interface AdminStats {
    totalUsers: number;
    activeUsers: number;
    totalSkills: number;
    pendingSkills: number;
    totalTransactions: number;
    revenueThisMonth: number;
    activeReports: number;
    systemHealth: {
        status: 'healthy' | 'warning' | 'critical';
        lastChecked: string;
        issues: number;
    };
}