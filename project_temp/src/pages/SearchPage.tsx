import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
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

// Mock data - In a real app, this would come from an API
const ALL_SKILLS_DATA: Skill[] = [
  {
    id: 1,
    title: 'JavaScript Fundamentals',
    description: 'Learn the core concepts of JavaScript programming language.',
    category: 'programming',
    level: 'beginner',
    author: 'Alex Johnson',
    authorImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    rating: 4.8,
    reviews: 124,
    teachingMode: 'swap'
  },
  {
    id: 2,
    title: 'Digital Illustration',
    description: 'Master digital illustration techniques.',
    category: 'design',
    level: 'intermediate',
    author: 'Sophia Lee',
    authorImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    rating: 4.9,
    reviews: 89,
    teachingMode: 'paid',
    price: 45
  },
  {
    id: 3,
    title: 'Spanish Conversation',
    description: 'Practice conversational Spanish with a focus on everyday situations and common phrases.',
    category: 'language',
    level: 'beginner',
    author: 'Miguel Rodriguez',
    authorImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    rating: 4.7,
    reviews: 56,
    teachingMode: 'swap'
  },
  {
    id: 4,
    title: 'Piano for Beginners',
    description: 'Learn to play piano starting with basic techniques, reading music, and simple songs.',
    category: 'music',
    level: 'beginner',
    author: 'Emma Wilson',
    authorImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    rating: 4.6,
    reviews: 42,
    teachingMode: 'paid',
    price: 35
  },
  {
    id: 5,
    title: 'Italian Cuisine',
    description: 'Discover authentic Italian cooking techniques and recipes from different regions of Italy.',
    category: 'cooking',
    level: 'intermediate',
    author: 'Marco Bianchi',
    authorImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    rating: 4.9,
    reviews: 78,
    teachingMode: 'swap'
  },
  {
    id: 6,
    title: 'React Development',
    description: 'Build modern web applications using React, Redux, and related technologies.',
    category: 'programming',
    level: 'advanced',
    author: 'David Chen',
    authorImage: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    rating: 4.8,
    reviews: 112,
    teachingMode: 'paid',
    price: 60
  },
  {
    id: 7,
    title: 'Yoga Basics',
    description: 'Learn fundamental yoga poses, breathing techniques, and mindfulness practices for beginners.',
    category: 'fitness',
    level: 'beginner',
    author: 'Priya Sharma',
    authorImage: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg',
    rating: 4.7,
    reviews: 95,
    teachingMode: 'swap'
  },
  {
    id: 8,
    title: 'Photography Composition',
    description: 'Master the art of composition in photography to create more compelling and balanced images.',
    category: 'photography',
    level: 'intermediate',
    author: 'James Wilson',
    authorImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    rating: 4.8,
    reviews: 67,
    teachingMode: 'paid',
    price: 40
  },
  {
    id: 9,
    title: 'French for Travelers',
    description: 'Learn essential French phrases and vocabulary for travel, dining, and basic conversations.',
    category: 'language',
    level: 'beginner',
    author: 'Claire Dubois',
    authorImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    rating: 4.6,
    reviews: 84,
    teachingMode: 'swap'
  },
  {
    id: 10,
    title: 'Data Science with Python',
    description: 'Introduction to data analysis, visualization, and machine learning using Python libraries.',
    category: 'programming',
    level: 'intermediate',
    author: 'Robert Kim',
    authorImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    rating: 4.9,
    reviews: 156,
    teachingMode: 'paid',
    price: 55
  },
  {
    id: 11,
    title: 'Acoustic Guitar',
    description: 'Learn to play acoustic guitar with focus on chords, strumming patterns, and popular songs.',
    category: 'music',
    level: 'beginner',
    author: 'Jason Mraz',
    authorImage: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    rating: 4.8,
    reviews: 112,
    teachingMode: 'swap'
  },
  {
    id: 12,
    title: 'Watercolor Painting',
    description: 'Master watercolor techniques including washes, glazing, and creating textures and effects.',
    category: 'art',
    level: 'intermediate',
    author: 'Emily Chen',
    authorImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    rating: 4.7,
    reviews: 93,
    teachingMode: 'paid',
    price: 35
  },
];

const categories = [
  'All Categories',
  'Programming',
  'Design',
  'Language',
  'Music',
  'Cooking',
  'Fitness',
  'Photography',
  'Art',
];

const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'All Categories',
    level: 'All Levels',
    minRating: 0,
  });
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>(ALL_SKILLS_DATA);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    // Filter skills based on search term and filters
    const filtered = ALL_SKILLS_DATA.filter((skill) => {
      const matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = filters.category === 'All Categories' ||
        skill.category.toLowerCase() === filters.category.toLowerCase();

      const matchesLevel = filters.level === 'All Levels' ||
        skill.level.toLowerCase() === filters.level.toLowerCase();

      const matchesRating = skill.rating >= filters.minRating;

      return matchesSearch && matchesCategory && matchesLevel && matchesRating;
    });

    setFilteredSkills(filtered);
  }, [searchTerm, filters]);

  const handleFilterChange = (name: string, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      category: 'All Categories',
      level: 'All Levels',
      minRating: 0,
    });
  };

  const hasActiveFilters = filters.category !== 'All Categories' ||
    filters.level !== 'All Levels' ||
    filters.minRating > 0 ||
    searchTerm !== '';

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Search Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
          <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4">
            <h1 className="font-bold text-gray-900 dark:text-white text-2xl">Search Skills</h1>

            <div className="relative flex-1 max-w-lg">
              <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block bg-white dark:bg-gray-700 py-2 pr-3 pl-10 border border-gray-300 dark:border-gray-600 focus:border-teal-500 rounded-md focus:outline-none focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm leading-5 placeholder-gray-500"
                placeholder="Search for any skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="right-0 absolute inset-y-0 flex items-center pr-3"
                  onClick={() => setSearchTerm('')}
                >
                  <X size={16} className="text-gray-400 hover:text-gray-500" />
                </button>
              )}
            </div>

            <button
              className="inline-flex items-center bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 shadow-sm px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md font-medium text-gray-700 dark:text-gray-300 text-sm"
              onClick={() => setIsFilterDrawerOpen(true)}
            >
              <SlidersHorizontal size={16} className="mr-2" />
              Filters
              {hasActiveFilters && (
                <span className="flex justify-center items-center bg-teal-500 ml-1 rounded-full w-5 h-5 text-white text-xs">
                  {Object.values(filters).filter(val => val !== 'All Categories' && val !== 'All Levels' && val !== 0).length + (searchTerm ? 1 : 0)}
                </span>
              )}
            </button>
          </div>

          {/* Active filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-gray-500 dark:text-gray-400 text-sm">Active filters:</span>

              {searchTerm && (
                <span className="inline-flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full font-medium text-gray-800 dark:text-gray-200 text-sm">
                  Search: {searchTerm}
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 dark:text-gray-400"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}

              {filters.category !== 'All Categories' && (
                <span className="inline-flex items-center bg-teal-100 dark:bg-teal-900 px-3 py-1 rounded-full font-medium text-teal-800 dark:text-teal-200 text-sm">
                  {filters.category}
                  <button
                    onClick={() => handleFilterChange('category', 'All Categories')}
                    className="ml-1 text-teal-600 hover:text-teal-800 dark:hover:text-teal-200 dark:text-teal-400"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}

              {filters.level !== 'All Levels' && (
                <span className="inline-flex items-center bg-indigo-100 dark:bg-indigo-900 px-3 py-1 rounded-full font-medium text-indigo-800 dark:text-indigo-200 text-sm">
                  {filters.level}
                  <button
                    onClick={() => handleFilterChange('level', 'All Levels')}
                    className="ml-1 text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-200 dark:text-indigo-400"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}

              {filters.minRating > 0 && (
                <span className="inline-flex items-center bg-amber-100 dark:bg-amber-900 px-3 py-1 rounded-full font-medium text-amber-800 dark:text-amber-200 text-sm">
                  Min Rating: {filters.minRating}
                  <button
                    onClick={() => handleFilterChange('minRating', 0)}
                    className="ml-1 text-amber-600 hover:text-amber-800 dark:hover:text-amber-200 dark:text-amber-400"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}

              <button
                onClick={resetFilters}
                className="font-medium text-teal-600 hover:text-teal-700 dark:hover:text-teal-300 dark:text-teal-400 text-sm"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="z-50 fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsFilterDrawerOpen(false)}></div>

          <div className="right-0 fixed inset-y-0 flex max-w-full">
            <div className="relative w-screen max-w-md">
              <div className="flex flex-col bg-white dark:bg-gray-800 shadow-xl h-full overflow-y-auto">
                <div className="flex justify-between items-center px-4 py-6 border-gray-200 dark:border-gray-700 border-b">
                  <h2 className="font-medium text-gray-900 dark:text-white text-lg">Filters</h2>
                  <button
                    className="focus:outline-none text-gray-400 hover:text-gray-500"
                    onClick={() => setIsFilterDrawerOpen(false)}
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-1 space-y-6 px-4 py-6">
                  <div>
                    <h3 className="mb-2 font-medium text-gray-900 dark:text-white text-sm">Category</h3>
                    <select
                      className="block bg-white dark:bg-gray-800 shadow-sm mt-1 py-2 pr-10 pl-3 border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:outline-none focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm text-base"
                      value={filters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <h3 className="mb-2 font-medium text-gray-900 dark:text-white text-sm">Level</h3>
                    <div className="gap-3 grid grid-cols-3">
                      {levels.map((level) => (
                        <button
                          key={level}
                          className={`px-4 py-2 text-sm font-medium rounded-md ${filters.level === level
                              ? 'bg-teal-600 text-white'
                              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                            }`}
                          onClick={() => handleFilterChange('level', level)}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 font-medium text-gray-900 dark:text-white text-sm">Minimum Rating</h3>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.5"
                        value={filters.minRating}
                        onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                        className="bg-gray-200 dark:bg-gray-700 rounded-lg w-full h-2 appearance-none cursor-pointer"
                      />
                      <span className="ml-4 font-medium text-gray-700 dark:text-gray-300 text-sm">
                        {filters.minRating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between px-4 py-6 border-gray-200 dark:border-gray-700 border-t">
                  <button
                    className="font-medium text-teal-600 hover:text-teal-700 dark:hover:text-teal-300 dark:text-teal-400 text-sm"
                    onClick={resetFilters}
                  >
                    Reset filters
                  </button>
                  <button
                    className="inline-flex justify-center bg-teal-600 hover:bg-teal-700 shadow-sm px-4 py-2 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 font-medium text-white text-sm"
                    onClick={() => setIsFilterDrawerOpen(false)}
                  >
                    Apply filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-gray-900 dark:text-white text-xl">
            {filteredSkills.length} {filteredSkills.length === 1 ? 'Result' : 'Results'}
          </h2>

          <div className="flex items-center">
            <span className="mr-2 text-gray-500 dark:text-gray-400 text-sm">Sort by:</span>
            <select className="bg-white dark:bg-gray-700 shadow-sm border-gray-300 dark:border-gray-600 focus:border-teal-500 rounded-md focus:ring-teal-500 text-gray-900 dark:text-white text-sm">
              <option>Relevance</option>
              <option>Rating: High to Low</option>
              <option>Rating: Low to High</option>
              <option>Most Reviews</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 shadow-sm p-6 rounded-lg h-64"></div>
            ))}
          </div>
        ) : filteredSkills.length > 0 ? (
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.map((skill: Skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow-sm p-8 rounded-lg text-center">
            <p className="text-gray-600 dark:text-gray-400">No results found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;