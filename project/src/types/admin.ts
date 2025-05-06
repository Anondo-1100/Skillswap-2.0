export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'superadmin';
    lastLogin: string;
    createdAt: string;
}

export interface MessageReply {
    id: number;
    messageId: number;
    adminName: string;
    content: string;
    createdAt: string;
}

export interface UserMessage {
    id: number;
    name: string;
    email: string;
    message: string;
    createdAt: string;
    status: 'new' | 'read' | 'archived';
    reply?: MessageReply;
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
    activeReports: number;
    newMessages: number;
    systemHealth: {
        status: 'healthy' | 'warning' | 'critical';
        lastChecked: string;
        issues: number;
    };
}