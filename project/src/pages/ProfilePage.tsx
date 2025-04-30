import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Calendar, Award, Star, MessageSquare, Share2, Flag } from 'lucide-react';
import SkillCard from '../components/skills/SkillCard';

// Mock user data
const USER_DATA = {
  id: '1',
  name: 'Alex Johnson',
  username: 'alexj',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
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
      authorImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      title: 'React Development',
      description: 'Master React.js and build modern web applications with the most popular frontend library.',
      category: 'programming',
      level: 'intermediate',
      author: 'Alex Johnson',
      authorImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      rating: 4.9,
      reviews: 87,
    },
  ],
  learningSkills: [
    {
      id: 3,
      title: 'Digital Photography',
      description: 'Looking to learn photography basics, camera settings, and composition techniques.',
      category: 'photography',
      level: 'beginner',
      author: 'Alex Johnson',
      authorImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      rating: 0,
      reviews: 0,
    },
  ],
};

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState(USER_DATA);
  const [activeTab, setActiveTab] = useState('teaching');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchUser = async () => {
      setIsLoading(true);
      // In a real app, this would be an API call using the ID
      setTimeout(() => {
        setUser(USER_DATA);
        setIsLoading(false);
      }, 1000);
    };

    fetchUser();
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>
          <div className="h-8 w-1/4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="relative mb-4 md:mb-0 md:mr-6">
              <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-md">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              {user.verified && (
                <div className="absolute bottom-0 right-0 h-8 w-8 bg-teal-100 dark:bg-teal-900 rounded-full border-2 border-white dark:border-gray-700 flex items-center justify-center">
                  <Award size={16} className="text-teal-600 dark:text-teal-400" />
                </div>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                  <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>
                </div>
                
                <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
                  <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                    <MessageSquare size={16} className="mr-2" /> Message
                  </button>
                  <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <Share2 size={16} className="mr-2" /> Share Profile
                  </button>
                  <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <Flag size={16} className="mr-2" /> Report
                  </button>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <MapPin size={16} className="mr-1" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar size={16} className="mr-1" />
                  <span>Joined {user.joinedDate}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Star size={16} className="mr-1 text-yellow-500 fill-current" />
                  <span>4.9 (211 reviews)</span>
                </div>
              </div>
              
              <p className="mt-4 text-gray-700 dark:text-gray-300">{user.bio}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'teaching'
                  ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setActiveTab('teaching')}
            >
              Teaching ({user.teachingSkills.length})
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'learning'
                  ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setActiveTab('learning')}
            >
              Learning ({user.learningSkills.length})
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </nav>
        </div>
        
        {/* Tab content */}
        {activeTab === 'teaching' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Skills I Can Teach</h2>
            {user.teachingSkills.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.teachingSkills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No teaching skills listed yet.</p>
            )}
          </div>
        )}
        
        {activeTab === 'learning' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Skills I Want to Learn</h2>
            {user.learningSkills.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.learningSkills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No learning interests listed yet.</p>
            )}
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Reviews</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="text-5xl font-bold text-gray-900 dark:text-white">4.9</div>
                  <div className="flex text-yellow-500">
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">211 reviews</div>
                </div>
                <div className="flex-1">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-12">5 star</span>
                      <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full mx-2">
                        <div className="h-3 bg-yellow-500 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-12">85%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-12">4 star</span>
                      <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full mx-2">
                        <div className="h-3 bg-yellow-500 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-12">10%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-12">3 star</span>
                      <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full mx-2">
                        <div className="h-3 bg-yellow-500 rounded-full" style={{ width: '3%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-12">3%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-12">2 star</span>
                      <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full mx-2">
                        <div className="h-3 bg-yellow-500 rounded-full" style={{ width: '1%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-12">1%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-12">1 star</span>
                      <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full mx-2">
                        <div className="h-3 bg-yellow-500 rounded-full" style={{ width: '1%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-12">1%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sample Reviews */}
              <div className="space-y-6 mt-8">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <div className="flex items-center mb-3">
                    <img 
                      src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg" 
                      alt="Sarah" 
                      className="h-10 w-10 rounded-full mr-3 object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Sarah L.</div>
                      <div className="flex items-center">
                        <div className="flex text-yellow-500">
                          <Star size={14} className="fill-current" />
                          <Star size={14} className="fill-current" />
                          <Star size={14} className="fill-current" />
                          <Star size={14} className="fill-current" />
                          <Star size={14} className="fill-current" />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">2 weeks ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Alex is an amazing JavaScript teacher! He explained complex concepts in a way that was easy to understand. I went from knowing nothing to building my own web apps. Highly recommend!
                  </p>
                </div>
                
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <div className="flex items-center mb-3">
                    <img 
                      src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg" 
                      alt="Michael" 
                      className="h-10 w-10 rounded-full mr-3 object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Michael T.</div>
                      <div className="flex items-center">
                        <div className="flex text-yellow-500">
                          <Star size={14} className="fill-current" />
                          <Star size={14} className="fill-current" />
                          <Star size={14} className="fill-current" />
                          <Star size={14} className="fill-current" />
                          <Star size={14} className="fill-current" />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">1 month ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    I took Alex's React course and it was incredibly helpful. He has a deep understanding of the framework and shares practical tips that you won't find in the documentation. Thanks to his guidance, I landed my first dev job!
                  </p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <button className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 text-sm font-medium">
                  View all 211 reviews
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;