import { useState, useEffect
} from 'react';
import { useParams, Link, useNavigate
} from 'react-router-dom';
import { Star, MessageCircle, Share2, DollarSign, Repeat
} from 'lucide-react';
import { SKILLS_DATA
} from '../data/skills';

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

const SkillPage = () => {
  const { id
    } = useParams<{ id: string
    }>();
  const navigate = useNavigate();
  const [skill, setSkill
    ] = useState<Skill | null>(null);
  const [isLoading, setIsLoading
    ] = useState(true);

  useEffect(() => {
        // In a real app, this would be an API call
    const foundSkill = SKILLS_DATA.find(s => s.id === Number(id));
    setSkill(foundSkill || null);
    setIsLoading(false);
    },
    [id
    ]);

  const handleContactInstructor = (authorUsername: string) => {
        // Navigate to instructor's profile with contact section open
    navigate(`/profile/${authorUsername
        }?showContact=true`);
    };

  if (isLoading) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="animate-pulse">
          <div className="bg-gray-200 dark:bg-gray-700 mb-8 rounded-lg h-64"></div>
          <div className="bg-gray-200 dark:bg-gray-700 mb-4 rounded w-1/4 h-8"></div>
          <div className="bg-gray-200 dark:bg-gray-700 mb-8 rounded w-1/2 h-4"></div>
        </div>
      </div>
    );
    }

  if (!skill) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl text-center">
        <h1 className="mb-4 font-bold text-gray-900 dark:text-white text-2xl">Skill Not Found</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">The skill you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/skills"
          className="inline-flex items-center bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-md text-white font-medium"
        >
          Browse All Skills
        </Link>
      </div>
    );
    }

  const getTeachingModeBadge = () => {
    if (skill.teachingMode === 'swap') {
      return (
        <span className="flex items-center bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full font-medium text-blue-800 dark:text-blue-200 text-sm">
          <Repeat size={
                16
            } className="mr-1" />
          Skill Swap
        </span>
      );
        }
    return (
      <span className="flex items-center bg-purple-100 dark:bg-purple-900 px-3 py-1 rounded-full font-medium text-purple-800 dark:text-purple-200 text-sm">
        <DollarSign size={
            16
        } className="mr-1" />
        ${skill.price
        }/hour
      </span>
    );
    };

  const getLevelBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'advanced':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
        }
    };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
          { /* Skill Header */}
          <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl mb-2">
                  {skill.title
    }
                </h1>
                <div className="flex flex-wrap gap-4 items-center text-sm">
                  <Link
                    to={`/profile/${skill.author.toLowerCase().replace(' ', '-')
        }`
    }
                    className="flex items-center group"
                  >
                    <img
                      src={skill.authorImage
    }
                      alt={skill.author
    }
                      className="w-8 h-8 rounded-full mr-2 object-cover"
                    />
                    <span className="font-medium text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
                      {skill.author
    }
                    </span>
                  </Link>
                  <div className="flex items-center">
                    <Star size={
        16
    } className="text-yellow-500 fill-current" />
                    <span className="ml-1 font-medium text-gray-900 dark:text-white">
                      {skill.rating
    }
                    </span>
                    <span className="ml-1 text-gray-500 dark:text-gray-400">
                      ({skill.reviews
    } reviews)
                    </span>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelBadgeColor(skill.level)
        }`
    }>
                    {skill.level
    }
                  </span>
                  {getTeachingModeBadge()
    }
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    navigator.share?.({
                      title: skill.title,
                      text: `Check out this skill on SkillSwap: ${skill.title
                }`,
                      url: window.location.href
            }).catch(() => {
                      navigator.clipboard.writeText(window.location.href);
            });
        }
    }
                  className="inline-flex items-center bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md font-medium text-gray-700 dark:text-gray-300 text-sm"
                >
                  <Share2 size={
        16
    } className="mr-2" />
                  Share
                </button>
                <button
                  onClick={() => handleContactInstructor(skill.author.toLowerCase().replace(' ', '-'))
    }
                  className="inline-flex items-center bg-teal-600 hover:bg-teal-700 px-4 py-2 border border-transparent rounded-md font-medium text-white text-sm"
                >
                  <MessageCircle size={
        16
    } className="mr-2" />
                  Contact Instructor
                </button>
              </div>
            </div>
          </div>

          { /* Skill Content */}
          <div className="p-6 sm:p-8">
            <h2 className="font-semibold text-gray-900 dark:text-white text-xl mb-4">About This Skill</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-8 whitespace-pre-line">
              {skill.description
    }
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">What You'll Learn</h3>
                <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                  <li>• Core concepts and fundamentals</li>
                  <li>• Practical, hands-on exercises</li>
                  <li>• Best practices and techniques</li>
                  <li>• Real-world applications</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">Requirements</h3>
                <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                  <li>• Basic understanding of the subject</li>
                  <li>• Computer with necessary software</li>
                  <li>• Internet connection for online sessions</li>
                  <li>• Commitment to learning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillPage;