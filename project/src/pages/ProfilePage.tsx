import { useState, useEffect
} from 'react';
import { useParams, useNavigate
} from 'react-router-dom';
import { MapPin, Calendar, Award, Star, MessageSquare, Share2, Flag, Phone, Mail, Edit2, X, Check, Upload
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

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'payment';
  amount: number;
  description: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
}

interface UserData {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  location: string;
  joinedDate: string;
  verified: boolean;
  bio: string;
  walletBalance: number;
  transactions: Transaction[];
  teachingSkills: Skill[];
  learningSkills: Skill[];
}
// Mock user data
const USER_DATA: UserData = {
  id: '1',
  name: 'Alex Johnson',
  username: 'alexj',
  email: 'alex@example.com',
  phone: '+1 (555) 123-4567',
  avatar: 'https: //images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  location: 'San Francisco, CA',
  joinedDate: 'January 2023',
  verified: true,
  bio: 'Full-stack developer with 5+ years of experience. Passionate about teaching coding and learning photography.',
  walletBalance: 100.0,
  transactions: [
    {
      id: 'txn1',
      type: 'deposit',
      amount: 50.0,
      description: 'Initial deposit',
      timestamp: '2023-01-01T10: 00: 00Z',
      status: 'completed'
    },
    {
      id: 'txn2',
      type: 'payment',
      amount: 20.0,
      description: 'React course payment',
      timestamp: '2023-01-15T14: 30: 00Z',
      status: 'completed'
    }
  ],
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
  ]
};

const ProfilePage = () => {
  const { id
  } = useParams<{ id: string
  }>();
  const navigate = useNavigate();
  const [user, setUser
  ] = useState(USER_DATA);
  const [activeTab, setActiveTab
  ] = useState('teaching');
  const [isLoading, setIsLoading
  ] = useState(true);
  const [isEditing, setIsEditing
  ] = useState(false);
  const [editForm, setEditForm
  ] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    avatar: ''
  });

  useEffect(() => {
    // Get user data from localStorage or use mock data
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
        location: userData.location,
        bio: userData.bio,
        avatar: userData.avatar
      });
      setIsLoading(false);
    };

    fetchUser();
    
    // Scroll to top when component mounts with smooth behavior
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
      location: editForm.location,
      bio: editForm.bio,
      avatar: editForm.avatar || user.avatar
    };

    setUser(updatedUser);
    // Save complete user data including teachingSkills and learningSkills
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // If we're closing the edit mode, reset form to current user data
      setEditForm({
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
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

  // Add new function to handle avatar change
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

  const handleMessageClick = () => {
    navigate('/chat',
    { state: { selectedUserId: user.id
      }
    });
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
      { /* Profile Header */}
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
                      <h1 className="font-bold text-gray-900 dark:text-white text-2xl">{user.name
    }</h1>
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
                        onClick={handleMessageClick
    }
                        className="inline-flex justify-center items-center bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 shadow-sm px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
                      >
                        <MessageSquare size={
      16
    } className="mr-2" /> Message
                      </button>
                      <button className="inline-flex justify-center items-center bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 shadow-sm px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                        <Share2 size={
      16
    } className="mr-2" /> Share Profile
                      </button>
                      <button className="inline-flex justify-center items-center bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 shadow-sm px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
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
                      <Mail size={
      16
    } className="mr-1" />
                      <span>{user.email
    }</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Phone size={
      16
    } className="mr-1" />
                      <span>{user.phone
    }</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Star size={
      16
    } className="fill-current mr-1 text-yellow-500" />
                      <span>4.9 (211 reviews)</span>
                    </div>
                  </div>

                  <p className="mt-4 text-gray-700 dark:text-gray-300">{user.bio
    }</p>
                </>
              )
  }
            </div>
          </div>
        </div>
      </div>

      { /* Profile Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        { /* Tabs */}
        <div className="mb-8 border-gray-200 dark:border-gray-700 border-b">
          <nav className="flex space-x-8 -mb-px">
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'teaching'
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
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'learning'
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
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews'
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

        { /* Tab content */}
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

              { /* Sample Reviews */}
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
    </div>
  );
};

export default ProfilePage;