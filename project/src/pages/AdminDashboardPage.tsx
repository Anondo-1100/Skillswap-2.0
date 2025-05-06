import { useEffect, useState
} from 'react';
import { useNavigate
} from 'react-router-dom';
import {
  Users, BookOpen, AlertTriangle, Settings, Activity,
  Shield, Ban, Check, X, RefreshCw, MessageSquare, Archive, Trash2, Send
} from 'lucide-react';
import { adminService
} from '../services/adminService';
import { AdminStats, UserManagement, SkillModeration, UserMessage
} from '../types/admin';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab
  ] = useState<'overview' | 'users' | 'skills' | 'reports' | 'messages' | 'settings'>('overview');
  const [stats, setStats
  ] = useState<AdminStats | null>(null);
  const [users, setUsers
  ] = useState<UserManagement[]>([]);
  const [skills, setSkills
  ] = useState<SkillModeration[]>([]);
  const [reports, setReports
  ] = useState<any[]>([]);
  const [messages, setMessages
  ] = useState<UserMessage[]>([]);
  const [isLoading, setIsLoading
  ] = useState(true);
  const [systemSettings, setSystemSettings
  ] = useState<any>(null);
  const [replyingTo, setReplyingTo
  ] = useState<number | null>(null);
  const [replyContent, setReplyContent
  ] = useState('');

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    if (!isAdminLoggedIn) {
      navigate('/admin/login');
      return;
    }
    loadData();
  },
  [navigate
  ]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [statsData, userData, skillsData, reportsData, settingsData, messagesData
      ] = await Promise.all([
        adminService.getAdminStats(),
        adminService.getUsers(),
        adminService.getSkills(),
        adminService.getReports(),
        adminService.getSystemSettings(),
        adminService.getMessages()
      ]);

      setStats(statsData);
      setUsers(userData);
      setSkills(skillsData);
      setReports(reportsData);
      setSystemSettings(settingsData);
      setMessages(messagesData);
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
    setIsLoading(false);
  };

  const handleUserAction = async (userId: string, action: 'activate' | 'suspend' | 'delete') => {
    try {
      if (action === 'delete') {
        await adminService.deleteUser(userId);
        setUsers(users.filter(u => u.id !== userId));
        const statsData = await adminService.getAdminStats();
        setStats(statsData);
      } else {
        await adminService.updateUserStatus(userId, action === 'activate' ? 'active' : 'suspended');
        setUsers(users.map(user =>
          user.id === userId
            ? { ...user, status: action === 'activate' ? 'active' : 'suspended'
        }
            : user
        ));
      }
    } catch (error) {
      console.error('Error handling user action:', error);
    }
  };

  const handleSkillAction = async (skillId: number, action: 'approve' | 'reject' | 'delete') => {
    try {
      if (action === 'delete') {
        await adminService.deleteSkill(skillId);
        setSkills(skills.filter(s => s.id !== skillId));
        const statsData = await adminService.getAdminStats();
        setStats(statsData);
      } else {
        await adminService.updateSkillStatus(skillId, action === 'approve' ? 'active' : 'rejected');
        setSkills(skills.map(skill =>
          skill.id === skillId
            ? { ...skill, status: action === 'approve' ? 'active' : 'rejected', lastModified: new Date().toISOString()
        }
            : skill
        ));
        const statsData = await adminService.getAdminStats();
        setStats(statsData);
      }
    } catch (error) {
      console.error('Error handling skill action:', error);
    }
  };

  const handleReportAction = async (reportId: number, action: 'approve' | 'reject') => {
    try {
      await adminService.handleReport(reportId, action);
      setReports(reports.filter(r => r.id !== reportId));
      const statsData = await adminService.getAdminStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error handling report action:', error);
    }
  };

  const handleMessageAction = async (messageId: number, action: 'read' | 'archive' | 'delete' | 'reply') => {
    try {
      if (action === 'reply') {
        await adminService.replyToMessage(messageId, 'Admin', replyContent);
        setMessages(messages.map(msg => 
          msg.id === messageId 
            ? { 
                ...msg, 
                status: 'read',
                reply: {
                  id: Date.now(),
                  messageId,
                  adminName: 'Admin',
                  content: replyContent,
                  createdAt: new Date().toISOString()
          }
        }
            : msg
        ));
        setReplyingTo(null);
        setReplyContent('');
      } else if (action === 'delete') {
        await adminService.deleteMessage(messageId);
        setMessages(messages.filter(msg => msg.id !== messageId));
      } else {
        await adminService.updateMessageStatus(messageId, action);
        setMessages(messages.map(msg => 
          msg.id === messageId 
            ? { ...msg, status: action
        }
            : msg
        ));
      }
      const statsData = await adminService.getAdminStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error handling message action:', error);
    }
  };

  const updateSettings = async (newSettings: any) => {
    try {
      await adminService.updateSystemSettings(newSettings);
      setSystemSettings(newSettings);
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        { /* Admin Header */}
        <div className="mb-8">
          <h1 className="font-bold text-gray-900 dark:text-white text-3xl">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your platform and users</p>
        </div>

        { /* Navigation Tabs */}
        <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            {
    [
      { id: 'overview', name: 'Overview', icon: Activity
      },
      { id: 'users', name: 'Users', icon: Users
      },
      { id: 'skills', name: 'Skills', icon: BookOpen
      },
      { id: 'reports', name: 'Reports', icon: AlertTriangle
      },
      { id: 'messages', name: 'Messages', icon: MessageSquare
      },
      { id: 'settings', name: 'Settings', icon: Settings
      }
    ].map((tab) => (
                <button
                  key={tab.id
    }
                  onClick={() => setActiveTab(tab.id as any)
    }
                  className={`${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
      } flex items-center py-4 px-1 border-b-2 font-medium text-sm`
    }
                >
                  <tab.icon className="mr-2 h-5 w-5" />
                  {tab.name
    }
                </button>
              ))
  }
          </nav>
        </div>

        { /* Main Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              { /* Stats Cards */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-indigo-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.totalUsers
    }</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stats.activeUsers
    } active</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-indigo-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Skills</p>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.totalSkills
    }</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stats.pendingSkills
    } pending</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Reports</p>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.activeReports
    }</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Needs attention</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Activity className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">System Health</p>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white capitalize">{stats.systemHealth.status
    }</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stats.systemHealth.issues
    } issues</p>
                  </div>
                </div>
              </div>
            </div>
          )
  }

          {activeTab === 'users' && (
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">User Management</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {users.map((user) => (
                        <tr key={user.id
      }>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.name
      }</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.email
      }</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.status === 'active'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : user.status === 'suspended'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
        }`
      }>
                              {user.status
      }
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            {user.status !== 'active' && (
                              <button
                                onClick={() => handleUserAction(user.id, 'activate')
        }
                                className="text-green-600 hover:text-green-900 dark:hover:text-green-400"
                                title="Activate User"
                              >
                                <Check className="h-5 w-5" />
                              </button>
                            )
      }
                            {user.status === 'active' && (
                              <button
                                onClick={() => handleUserAction(user.id, 'suspend')
        }
                                className="text-yellow-600 hover:text-yellow-900 dark:hover:text-yellow-400"
                                title="Suspend User"
                              >
                                <Ban className="h-5 w-5" />
                              </button>
                            )
      }
                            <button
                              onClick={() => handleUserAction(user.id, 'delete')
      }
                              className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                              title="Delete User"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))
    }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
  }

          {activeTab === 'skills' && (
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Skill Management</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Author</th>
                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {skills.map((skill) => (
                        <tr key={skill.id
      }>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{skill.title
      }</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{skill.author
      }</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              skill.status === 'active'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : skill.status === 'rejected'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
        }`
      }>
                              {skill.status
      }
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            {skill.status !== 'active' && (
                              <button
                                onClick={() => handleSkillAction(skill.id, 'approve')
        }
                                className="text-green-600 hover:text-green-900 dark:hover:text-green-400"
                                title="Approve"
                              >
                                <Check className="h-5 w-5" />
                              </button>
                            )
      }
                            {skill.status === 'pending' && (
                              <button
                                onClick={() => handleSkillAction(skill.id, 'reject')
        }
                                className="text-yellow-600 hover:text-yellow-900 dark:hover:text-yellow-400"
                                title="Reject"
                              >
                                <Ban className="h-5 w-5" />
                              </button>
                            )
      }
                            <button
                              onClick={() => handleSkillAction(skill.id, 'delete')
      }
                              className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                              title="Delete"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))
    }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
  }

          {activeTab === 'reports' && (
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Report Management</h3>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id
      } className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            Report #{report.id
      } - {report.type === 'user' ? 'User Report' : 'Skill Report'
      }
                          </h4>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{report.reason
      }</p>
                          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                            Reported on: {new Date(report.createdAt).toLocaleDateString()
      }
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleReportAction(report.id, 'approve')
      }
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Take Action
                          </button>
                          <button
                            onClick={() => handleReportAction(report.id, 'reject')
      }
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
    }
                </div>
              </div>
            </div>
          )
  }

          {activeTab === 'messages' && (
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Message Management</h3>
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No messages to display.</p>
                  ) : (
                    messages.map((message) => (
                      <div 
                        key={message.id
      } 
                        className={`bg-gray-50 dark:bg-gray-700 p-4 rounded-lg ${
                          message.status === 'new' ? 'border-l-4 border-teal-500' : ''
        }`
      }
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                {message.name
      }
                              </h4>
                              {message.status === 'new' && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
                                  New
                                </span>
                              )
      }
                              {message.status === 'archived' && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200">
                                  Archived
                                </span>
                              )
      }
                            </div>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              {message.email
      }
                            </p>
                            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                              {message.message
      }
                            </p>
                            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                              Received: {new Date(message.createdAt).toLocaleString()
      }
                            </p>

                            {message.reply && (
                              <div className="mt-4 pl-4 border-l-2 border-teal-500">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    Your Reply
                                  </span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {new Date(message.reply.createdAt).toLocaleString()
        }
                                  </span>
                                </div>
                                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                  {message.reply.content
        }
                                </p>
                              </div>
                            )
      }

                            {replyingTo === message.id && (
                              <div className="mt-4">
                                <textarea
                                  value={replyContent
        }
                                  onChange={(e) => setReplyContent(e.target.value)
        }
                                  placeholder="Type your reply..."
                                  rows={
          3
        }
                                  className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                                <div className="mt-2 flex justify-end space-x-2">
                                  <button
                                    onClick={() => {
                                      setReplyingTo(null);
                                      setReplyContent('');
          }
        }
                                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-xs font-medium rounded text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleMessageAction(message.id, 'reply')
        }
                                    disabled={!replyContent.trim()
        }
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    <Send className="h-4 w-4 mr-1" />
                                    Send Reply
                                  </button>
                                </div>
                              </div>
                            )
      }
                          </div>
                          <div className="flex space-x-2">
                            {message.status === 'new' && (
                              <button
                                onClick={() => handleMessageAction(message.id, 'read')
        }
                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-teal-600 hover:bg-teal-700"
                                title="Mark as Read"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Mark as Read
                              </button>
                            )
      }
                            {!message.reply && (
                              <button
                                onClick={() => setReplyingTo(message.id)
        }
                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700"
                                title="Reply to Message"
                              >
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Reply
                              </button>
                            )
      }
                            {message.status !== 'archived' && (
                              <button
                                onClick={() => handleMessageAction(message.id, 'archive')
        }
                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500"
                                title="Archive Message"
                              >
                                <Archive className="h-4 w-4 mr-1" />
                                Archive
                              </button>
                            )
      }
                            <button
                              onClick={() => handleMessageAction(message.id, 'delete')
      }
                              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700"
                              title="Delete Message"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )
    }
                </div>
              </div>
            </div>
          )
  }

          {activeTab === 'settings' && systemSettings && (
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">System Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Maintenance Mode</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Temporarily disable the website for maintenance
                      </p>
                    </div>
                    <button
                      onClick={() => updateSettings({ ...systemSettings, maintenanceMode: !systemSettings.maintenanceMode
      })
    }
                      className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ${
                        systemSettings.maintenanceMode ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
      }`
    }
                    >
                      <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200 ${
                        systemSettings.maintenanceMode ? 'translate-x-5' : 'translate-x-0'
      }`
    } />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Allow New Registrations</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Enable or disable new user registrations
                      </p>
                    </div>
                    <button
                      onClick={() => updateSettings({ ...systemSettings, allowNewRegistrations: !systemSettings.allowNewRegistrations
      })
    }
                      className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ${
                        systemSettings.allowNewRegistrations ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
      }`
    }
                    >
                      <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200 ${
                        systemSettings.allowNewRegistrations ? 'translate-x-5' : 'translate-x-0'
      }`
    } />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Require Skill Approval</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Require admin approval for new skills
                      </p>
                    </div>
                    <button
                      onClick={() => updateSettings({ ...systemSettings, skillApprovalRequired: !systemSettings.skillApprovalRequired
      })
    }
                      className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ${
                        systemSettings.skillApprovalRequired ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
      }`
    }
                    >
                      <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200 ${
                        systemSettings.skillApprovalRequired ? 'translate-x-5' : 'translate-x-0'
      }`
    } />
                    </button>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={loadData
    }
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
  }
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;