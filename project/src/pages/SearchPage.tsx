import { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';
import SkillCard from '../components/skills/SkillCard';

// Mock data - In a real app, this would come from an API
const ALL_SKILLS_DATA = [
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
    title: 'Digital Illustration',
    description: 'Master digital illustration techniques using popular software like Procreate and Adobe Illustrator.',
    category: 'design',
    level: 'intermediate',
    author: 'Sophia Lee',
    authorImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    rating: 4.9,
    reviews: 89,
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
  const [filteredSkills, setFilteredSkills] = useState(ALL_SKILLS_DATA);
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
    setFilters({
      ...filters,
      [name]: value,
    });
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Search Skills</h1>
            
            <div className="relative flex-1 max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="Search for any skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setSearchTerm('')}
                >
                  <X size={16} className="text-gray-400 hover:text-gray-500" />
                </button>
              )}
            </div>
            
            <button
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              onClick={() => setIsFilterDrawerOpen(true)}
            >
              <SlidersHorizontal size={16} className="mr-2" />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 flex items-center justify-center w-5 h-5 text-xs bg-teal-500 text-white rounded-full">
                  {Object.values(filters).filter(val => val !== 'All Categories' && val !== 'All Levels' && val !== 0).length + (searchTerm ? 1 : 0)}
                </span>
              )}
            </button>
          </div>
          
          {/* Active filters */}
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Active filters:</span>
              
              {searchTerm && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  Search: {searchTerm}
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              
              {filters.category !== 'All Categories' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200">
                  {filters.category}
                  <button 
                    onClick={() => handleFilterChange('category', 'All Categories')}
                    className="ml-1 text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-200"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              
              {filters.level !== 'All Levels' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                  {filters.level}
                  <button 
                    onClick={() => handleFilterChange('level', 'All Levels')}
                    className="ml-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              
              {filters.minRating > 0 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                  Min Rating: {filters.minRating}
                  <button 
                    onClick={() => handleFilterChange('minRating', 0)}
                    className="ml-1 text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              
              <button
                onClick={resetFilters}
                className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsFilterDrawerOpen(false)}></div>
          
          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-xl overflow-y-auto">
                <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h2>
                  <button
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setIsFilterDrawerOpen(false)}
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="flex-1 px-4 py-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Category</h3>
                    <select
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
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
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Level</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {levels.map((level) => (
                        <button
                          key={level}
                          className={`px-4 py-2 text-sm font-medium rounded-md ${
                            filters.level === level
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
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Minimum Rating</h3>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.5"
                        value={filters.minRating}
                        onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="ml-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {filters.minRating}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                  <button
                    className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 text-sm font-medium"
                    onClick={resetFilters}
                  >
                    Reset filters
                  </button>
                  <button
                    className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {filteredSkills.length} {filteredSkills.length === 1 ? 'Result' : 'Results'}
          </h2>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Sort by:</span>
            <select className="text-sm border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-teal-500 focus:border-teal-500">
              <option>Relevance</option>
              <option>Rating: High to Low</option>
              <option>Rating: Low to High</option>
              <option>Most Reviews</option>
            </select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 h-64"></div>
            ))}
          </div>
        ) : filteredSkills.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
              <Search size={24} className="text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No results found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              We couldn't find any skills matching your search criteria. Try adjusting your filters or search query.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Clear all filters
            </button>
          </div>
        )}
        
        {/* Pagination */}
        {filteredSkills.length > 0 && (
          <div className="mt-8 flex justify-center">
            <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600">
                <span className="sr-only">Previous</span>
                &laquo;
              </a>
              <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-teal-600 text-sm font-medium text-white">
                1
              </a>
              <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                2
              </a>
              <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                3
              </a>
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300">
                ...
              </span>
              <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                8
              </a>
              <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600">
                <span className="sr-only">Next</span>
                &raquo;
              </a>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;