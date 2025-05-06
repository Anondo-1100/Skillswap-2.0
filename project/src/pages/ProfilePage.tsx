import { useState, useEffect
} from 'react';
import { useParams
} from 'react-router-dom';
import { MapPin, Calendar, Award, Star, Share2, Flag, Phone, Mail, Edit2, X, Check, Upload, MessageCircle, Facebook, Clock
} from 'lucide-react';
import SkillCard from '../components/skills/SkillCard';

interface Skill {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  author: string;
  authorImage: string;
  rating: number;
  reviews: number;
  teachingMode: 'swap' | 'paid';
  price?: number;
}

interface Message {
  id: number;
  message: string;
  createdAt: string;
  reply?: {
    content: string;
    createdAt: string;
  };
  status: 'archived' | 'active';
}

interface UserData {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  whatsapp?: string;
  facebook?: string;
  avatar: string;
  location: string;
  joinedDate: string;
  verified: boolean;
  bio: string;
  teachingSkills: Skill[];
  learningSkills: Skill[];
  messages?: Message[];
}

const USER_DATA: UserData = {
  id: '1',
  name: 'Alex Johnson',
  username: 'alexj',
  email: 'alex@example.com',
  phone: '+1 (555) 123-4567',
  whatsapp: '+1 (555) 123-4567',
  facebook: 'facebook.com/alexjohnson',
  avatar: 'https: //images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  location: 'San Francisco, CA',
  joinedDate: 'January 2023',
  verified: true,
  bio: 'Full-stack developer with 5+ years of experience. Passionate about teaching coding and learning photography.',
  teachingSkills: [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      description: 'Learn the core concepts of JavaScript programming language including variables, functions, and objects.',
      category: 'programming',
      level: 'beginner',
      author: 'Alex Johnson',
      authorImage: 'https: //images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      rating: 4.8,
      reviews: 124,
      teachingMode: 'swap'
    },
    {
      id: 2,
      title: 'React Development',
      description: 'Master React.js and build modern web applications with the most popular frontend library.',
      category: 'programming',
      level: 'intermediate',
      author: 'Alex Johnson',
      authorImage: 'https: //images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      rating: 4.9,
      reviews: 87,
      teachingMode: 'paid',
      price: 50
    }
  ],
  learningSkills: [
    {
      id: 3,
      title: 'Digital Photography',
      description: 'Looking to learn photography basics, camera settings, and composition techniques.',
      category: 'photography',
      level: 'beginner',
      author: 'Alex Johnson',
      authorImage: 'https: //images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      rating: 0,
      reviews: 0,
      teachingMode: 'swap'
    }
  ],
  messages: [
    {
      id: 1,
      message: 'Can you help me with advanced React patterns?',
      createdAt: '2023-03-01T10: 00: 00Z',
      reply: {
        content: 'Sure, I can help you with that. Let’s schedule a session.',
        createdAt: '2023-03-02T12: 00: 00Z'
      },
      status: 'active'
    },
    {
      id: 2,
      message: 'I need assistance with JavaScript closures.',
      createdAt: '2023-03-05T14: 00: 00Z',
      status: 'active'
    }
  ]
};

const ProfilePage = () => {
  const { id
  } = useParams<{ id: string
  }>();
  const [user, setUser
  ] = useState(USER_DATA);
  const [activeTab, setActiveTab
  ] = useState('teaching');
  const [isLoading, setIsLoading
  ] = useState(true);
  const [isEditing, setIsEditing
  ] = useState(false);
  const [showContactInfo, setShowContactInfo
  ] = useState(false);
  const [editForm, setEditForm
  ] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    whatsapp: '',
    facebook: '',
    location: '',
    bio: '',
    avatar: ''
  });
  const [showReportModal, setShowReportModal
  ] = useState(false);
  const [reportForm, setReportForm
  ] = useState({
    reason: '',
    details: ''
  });
  const [isSubmittingReport, setIsSubmittingReport
  ] = useState(false);
  const [reportStatus, setReportStatus
  ] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const storedUserData = localStorage.getItem('userData');
      const userData = storedUserData ? JSON.parse(storedUserData) : USER_DATA;
      setUser(userData);
      setEditForm({
        name: userData.name,
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        whatsapp: userData.whatsapp || '',
        facebook: userData.facebook || '',
        location: userData.location,
        bio: userData.bio,
        avatar: userData.avatar
      });
      setIsLoading(false);
    };

    fetchUser();
    window.scrollTo({ top: 0, behavior: 'smooth'
    });
  },
  [id
  ]);

  const handleEditSubmit = async () => {
    const updatedUser = {
      ...user,
      name: editForm.name,
      username: editForm.username,
      email: editForm.email,
      phone: editForm.phone,
      whatsapp: editForm.whatsapp,
      facebook: editForm.facebook,
      location: editForm.location,
      bio: editForm.bio,
      avatar: editForm.avatar || user.avatar
    };

    setUser(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setEditForm({
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        whatsapp: user.whatsapp || '',
        facebook: user.facebook || '',
        location: user.location,
        bio: user.bio,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value
    } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name
      ]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[
      0
    ];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setEditForm(prev => ({
          ...prev,
          avatar: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
  };

  const handleShare = async () => {
    const shareData = {
      title: `${user.name
      }'s SkillSwap Profile`,
      text: `Check out ${user.name
      }'s skills and expertise on SkillSwap!`,
      url: window.location.href.replace('localhost: 5173', 'skillswap')
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert('Profile link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReport(true);
    setReportStatus(null);

    try {
      await new Promise(resolve => setTimeout(resolve,
      1000));
      setReportStatus('success');
      setReportForm({ reason: '', details: ''
      });
      setTimeout(() => {
        setShowReportModal(false);
        setReportStatus(null);
      },
      2000);
    } catch (error) {
      setReportStatus('error');
    } finally {
      setIsSubmittingReport(false);
    }
  };

  const handleReportChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value
    } = e.target;
    setReportForm(prev => ({
      ...prev,
      [name
      ]: value
    }));
  };

  if (isLoading) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="animate-pulse">
          <div className="bg-gray-200 dark:bg-gray-700 mb-8 rounded-lg h-48"></div>
          <div className="bg-gray-200 dark:bg-gray-700 mb-4 rounded w-1/4 h-8"></div>
          <div className="bg-gray-200 dark:bg-gray-700 mb-8 rounded w-1/2 h-4"></div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
          <div className="flex md:flex-row flex-col items-center md:items-start">
            <div className="relative md:mr-6 mb-4 md:mb-0">
              <div className="group relative shadow-md border-4 border-white dark:border-gray-700 rounded-full w-32 h-32 overflow-hidden">
                <img
                  src={isEditing ? editForm.avatar || user.avatar : user.avatar
  }
                  alt={user.name
  }
                  className="w-full h-full object-cover"
                />
                {isEditing && (
                  <label
                    htmlFor="avatar-upload"
                    className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Upload size={
      24
    } className="text-white" />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleAvatarChange
    }
                    />
                  </label>
                )
  }
              </div>
              {user.verified && (
                <div className="right-0 bottom-0 absolute flex justify-center items-center bg-teal-100 dark:bg-teal-900 border-2 border-white dark:border-gray-700 rounded-full w-8 h-8">
                  <Award size={
      16
    } className="text-teal-600 dark:text-teal-400" />
                </div>
              )
  }
            </div>

            <div className="flex-1 md:text-left text-center">
              <div className="flex md:flex-row flex-col md:justify-between md:items-center">
                <div>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={editForm.name
    }
                          onChange={handleEditChange
    }
                          className="block bg-white dark:bg-gray-800 shadow-sm px-3 py-2 border border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">
                          Username
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={editForm.username
    }
                          onChange={handleEditChange
    }
                          className="block bg-white dark:bg-gray-800 shadow-sm px-3 py-2 border border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={editForm.email
    }
                          onChange={handleEditChange
    }
                          className="block bg-white dark:bg-gray-800 shadow-sm px-3 py-2 border border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={editForm.phone
    }
                          onChange={handleEditChange
    }
                          className="block bg-white dark:bg-gray-800 shadow-sm px-3 py-2 border border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">
                          WhatsApp
                        </label>
                        <input
                          type="text"
                          name="whatsapp"
                          value={editForm.whatsapp
    }
                          onChange={handleEditChange
    }
                          className="block bg-white dark:bg-gray-800 shadow-sm px-3 py-2 border border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">
                          Facebook
                        </label>
                        <input
                          type="text"
                          name="facebook"
                          value={editForm.facebook
    }
                          onChange={handleEditChange
    }
                          className="block bg-white dark:bg-gray-800 shadow-sm px-3 py-2 border border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={editForm.location
    }
                          onChange={handleEditChange
    }
                          className="block bg-white dark:bg-gray-800 shadow-sm px-3 py-2 border border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={editForm.bio
    }
                          onChange={handleEditChange
    }
                          rows={
      3
    }
                          className="block bg-white dark:bg-gray-800 shadow-sm px-3 py-2 border border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 
                        onClick={handleShare
    }
                        className="font-bold text-gray-900 dark:text-white text-2xl cursor-pointer hover:text-teal-600 dark:hover:text-teal-400"
                      >
                        {user.name
    }
                      </h1>
                      <p className="text-gray-500 dark:text-gray-400">@{user.username
    }</p>
                    </>
                  )
  }
                </div>

                <div className="flex sm:flex-row flex-col gap-2 mt-4 md:mt-0">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleEditSubmit
    }
                        className="inline-flex justify-center items-center bg-teal-600 hover:bg-teal-700 shadow-sm px-4 py-2 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 font-medium text-white text-sm"
                      >
                        <Check size={
      16
    } className="mr-2" /> Save Changes
                      </button>
                      <button
                        onClick={handleEditToggle
    }
                        className="inline-flex justify-center items-center bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 shadow-sm px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
                      >
                        <X size={
      16
    } className="mr-2" /> Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleEditToggle
    }
                        className="inline-flex justify-center items-center bg-teal-600 hover:bg-teal-700 shadow-sm px-4 py-2 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 font-medium text-white text-sm"
                      >
                        <Edit2 size={
      16
    } className="mr-2" /> Edit Profile
                      </button>
                      <button
                        onClick={toggleContactInfo
    }
                        className="inline-flex justify-center items-center bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 shadow-sm px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
                      >
                        <Phone size={
      16
    } className="mr-2" /> Contact Info
                      </button>
                      <button 
                        onClick={handleShare
    }
                        className="inline-flex justify-center items-center bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 shadow-sm px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
                      >
                        <Share2 size={
      16
    } className="mr-2" /> Share Profile
                      </button>
                      <button 
                        onClick={() => setShowReportModal(true)
    }
                        className="inline-flex justify-center items-center bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 shadow-sm px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
                      >
                        <Flag size={
      16
    } className="mr-2" /> Report
                      </button>
                    </>
                  )
  }
                </div>
              </div>

              {!isEditing && (
                <>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin size={
      16
    } className="mr-1" />
                      <span>{user.location
    }</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Calendar size={
      16
    } className="mr-1" />
                      <span>Joined {user.joinedDate
    }</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Star size={
      16
    } className="fill-current mr-1 text-yellow-500" />
                      <span>4.9 (211 reviews)</span>
                    </div>
                  </div>

                  {showContactInfo && (
                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                      <h3 className="font-medium text-gray-900 dark:text-white text-lg mb-4">Contact Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Mail size={
        16
      } className="mr-2" />
                          <a 
                            href={`https: //mail.google.com/mail/?view=cm&fs=1&to=${user.email}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-teal-600 dark:hover:text-teal-400"
                          >
                            {user.email
        }
                          </a>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Phone size={
          16
        } className="mr-2" />
                          <span>{user.phone
        }</span>
                        </div>
                        {user.whatsapp && (
                          <a 
                            href={`https: //wa.me/${user.whatsapp.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400"
                          >
                            <MessageCircle size={
              16
            } className="mr-2" />
                            <span>WhatsApp: {user.whatsapp
            }</span>
                          </a>
                        )
          }
                        {user.facebook && (
                          <a 
                            href={`https: //facebook.com/${user.facebook.split('facebook.com/').pop()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400"
                          >
                            <Facebook size={
                16
              } className="mr-2" />
                            <span>Facebook Profile</span>
                          </a>
                        )
            }
                      </div>
                    </div>
                  )
          }

                  <p className="mt-4 text-gray-700 dark:text-gray-300">{user.bio
          }</p>
                </>
              )
        }
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <div className="mb-8 border-gray-200 dark:border-gray-700 border-b">
          <nav className="flex space-x-8 -mb-px">
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'teaching'
                  ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
          }`
        }
              onClick={() => setActiveTab('teaching')
        }
            >
              Teaching ({user.teachingSkills.length
        })
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'learning'
                  ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
          }`
        }
              onClick={() => setActiveTab('learning')
        }
            >
              Learning ({user.learningSkills.length
        })
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'messages'
                  ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
          }`
        }
              onClick={() => setActiveTab('messages')
        }
            >
              Messages
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
          }`
        }
              onClick={() => setActiveTab('reviews')
        }
            >
              Reviews
            </button>
          </nav>
        </div>

        {activeTab === 'teaching' && (
          <div>
            <h2 className="mb-6 font-bold text-gray-900 dark:text-white text-xl">Skills I Can Teach</h2>
            {user.teachingSkills.length > 0 ? (
              <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {user.teachingSkills.map((skill) => (
                  <SkillCard key={skill.id
              } skill={skill
              } />
                ))
            }
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No teaching skills listed yet.</p>
            )
          }
          </div>
        )
        }

        {activeTab === 'learning' && (
          <div>
            <h2 className="mb-6 font-bold text-gray-900 dark:text-white text-xl">Skills I Want to Learn</h2>
            {user.learningSkills.length > 0 ? (
              <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {user.learningSkills.map((skill) => (
                  <SkillCard key={skill.id
              } skill={skill
              } />
                ))
            }
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No learning interests listed yet.</p>
            )
          }
          </div>
        )
        }

        {activeTab === 'messages' && (
          <div>
            <h2 className="mb-6 font-bold text-gray-900 dark:text-white text-xl">My Messages</h2>
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
              {user.messages?.length > 0 ? (
                user.messages.map((msg) => (
                  <div key={msg.id
            } className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <MessageCircle className="h-5 w-5 text-gray-400" />
                        <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                          Your Message
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(msg.createdAt).toLocaleString()
            }
                      </div>
                    </div>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                      {msg.message
            }
                    </p>

                    {msg.reply && (
                      <div className="mt-6 pl-4 border-l-2 border-teal-500">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <MessageCircle className="h-5 w-5 text-teal-500" />
                            <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                              Reply from Admin
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="h-4 w-4 mr-1" />
                            {new Date(msg.reply.createdAt).toLocaleString()
              }
                          </div>
                        </div>
                        <p className="mt-4 text-gray-700 dark:text-gray-300">
                          {msg.reply.content
              }
                        </p>
                      </div>
                    )
            }

                    {!msg.reply && msg.status !== 'archived' && (
                      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        Awaiting response...
                      </p>
                    )
            }
                  </div>
                ))
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-500 dark:text-gray-400">No messages yet</p>
                </div>
              )
          }
            </div>
          </div>
        )
        }

        {activeTab === 'reviews' && (
          <div>
            <h2 className="mb-6 font-bold text-gray-900 dark:text-white text-xl">Reviews</h2>
            <div className="bg-white dark:bg-gray-800 shadow-sm p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="font-bold text-gray-900 dark:text-white text-5xl">4.9</div>
                  <div className="flex text-yellow-500">
                    <Star size={
            16
          } className="fill-current" />
                    <Star size={
            16
          } className="fill-current" />
                    <Star size={
            16
          } className="fill-current" />
                    <Star size={
            16
          } className="fill-current" />
                    <Star size={
            16
          } className="fill-current" />
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">211 reviews</div>
                </div>
                <div className="flex-1">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-12 font-medium text-gray-600 dark:text-gray-400 text-sm">5 star</span>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 mx-2 rounded-full h-3">
                        <div className="bg-yellow-500 rounded-full h-3" style={
            { width: '85%'
            }
          }></div>
                      </div>
                      <span className="w-12 font-medium text-gray-600 dark:text-gray-400 text-sm">85%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-12 font-medium text-gray-600 dark:text-gray-400 text-sm">4 star</span>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 mx-2 rounded-full h-3">
                        <div className="bg-yellow-500 rounded-full h-3" style={
            { width: '10%'
            }
          }></div>
                      </div>
                      <span className="w-12 font-medium text-gray-600 dark:text-gray-400 text-sm">10%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-12 font-medium text-gray-600 dark:text-gray-400 text-sm">3 star</span>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 mx-2 rounded-full h-3">
                        <div className="bg-yellow-500 rounded-full h-3" style={
            { width: '3%'
            }
          }></div>
                      </div>
                      <span className="w-12 font-medium text-gray-600 dark:text-gray-400 text-sm">3%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-12 font-medium text-gray-600 dark:text-gray-400 text-sm">2 star</span>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 mx-2 rounded-full h-3">
                        <div className="bg-yellow-500 rounded-full h-3" style={
            { width: '1%'
            }
          }></div>
                      </div>
                      <span className="w-12 font-medium text-gray-600 dark:text-gray-400 text-sm">1%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-12 font-medium text-gray-600 dark:text-gray-400 text-sm">1 star</span>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 mx-2 rounded-full h-3">
                        <div className="bg-yellow-500 rounded-full h-3" style={
            { width: '1%'
            }
          }></div>
                      </div>
                      <span className="w-12 font-medium text-gray-600 dark:text-gray-400 text-sm">1%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 mt-8">
                <div className="pb-6 border-gray-200 dark:border-gray-700 border-b">
                  <div className="flex items-center mb-3">
                    <img
                      src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
                      alt="Sarah"
                      className="mr-3 rounded-full w-10 h-10 object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Sarah L.</div>
                      <div className="flex items-center">
                        <div className="flex text-yellow-500">
                          <Star size={
            14
          } className="fill-current" />
                          <Star size={
            14
          } className="fill-current" />
                          <Star size={
            14
          } className="fill-current" />
                          <Star size={
            14
          } className="fill-current" />
                          <Star size={
            14
          } className="fill-current" />
                        </div>
                        <span className="ml-2 text-gray-500 dark:text-gray-400 text-xs">2 weeks ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Alex is an amazing JavaScript teacher! He explained complex concepts in a way that was easy to understand. I went from knowing nothing to building my own web apps. Highly recommend!
                  </p>
                </div>

                <div className="pb-6 border-gray-200 dark:border-gray-700 border-b">
                  <div className="flex items-center mb-3">
                    <img
                      src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg"
                      alt="Michael"
                      className="mr-3 rounded-full w-10 h-10 object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Michael T.</div>
                      <div className="flex items-center">
                        <div className="flex text-yellow-500">
                          <Star size={
            14
          } className="fill-current" />
                          <Star size={
            14
          } className="fill-current" />
                          <Star size={
            14
          } className="fill-current" />
                          <Star size={
            14
          } className="fill-current" />
                          <Star size={
            14
          } className="fill-current" />
                        </div>
                        <span className="ml-2 text-gray-500 dark:text-gray-400 text-xs">1 month ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    I took Alex's React course and it was incredibly helpful. He has a deep understanding of the framework and shares practical tips that you won't find in the documentation. Thanks to his guidance, I landed my first dev job!
                  </p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button className="font-medium text-teal-600 hover:text-teal-700 dark:hover:text-teal-300 dark:text-teal-400 text-sm">
                  View all 211 reviews
                </button>
              </div>
            </div>
          </div>
        )
        }
      </div>

      {showReportModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowReportModal(false)
          } />

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)
          }
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X size={
            20
          } />
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10">
                  <Flag className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Report User</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Please provide details about why you're reporting this user. Our team will review your report and take appropriate action.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleReportSubmit
          } className="mt-6 space-y-4">
                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Reason for Report
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    value={reportForm.reason
          }
                    onChange={handleReportChange
          }
                    required
                    className="mt-1 block w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">Select a reason</option>
                    <option value="inappropriate">Inappropriate Behavior</option>
                    <option value="spam">Spam or Misleading</option>
                    <option value="fake">Fake Profile</option>
                    <option value="harassment">Harassment</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="details" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Additional Details
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    rows={
            4
          }
                    value={reportForm.details
          }
                    onChange={handleReportChange
          }
                    required
                    className="mt-1 block w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Please provide specific details about the issue..."
                  />
                </div>

                {reportStatus === 'success' && (
                  <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-md text-green-800 dark:text-green-200 text-sm">
                    Report submitted successfully. Thank you for helping keep SkillSwap safe.
                  </div>
                )
          }

                {reportStatus === 'error' && (
                  <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-md text-red-800 dark:text-red-200 text-sm">
                    There was an error submitting your report. Please try again.
                  </div>
                )
          }

                <div className="mt-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={isSubmittingReport
          }
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                  >
                    {isSubmittingReport ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Submit Report'
                    )
          }
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)
          }
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
        }
    </div>
  );
      };

export default ProfilePage;