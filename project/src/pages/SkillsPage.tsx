import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import SkillCard from '../components/skills/SkillCard';

// Mock data - In a real app, this would come from an API
const SKILLS_DATA = [
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
];

const categories = [
  'All Categories',
  'programming',
  'design',
  'language',
  'music',
  'cooking',
  'fitness',
  'photography',
].map(cat => cat === 'All Categories' ? cat : cat.charAt(0).toUpperCase() + cat.slice(1));

const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

const SkillsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [filteredSkills, setFilteredSkills] = useState(SKILLS_DATA);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter skills based on search term, category, and level
    const filtered = SKILLS_DATA.filter((skill) => {
      const matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'All Categories' ||
        skill.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesLevel = selectedLevel === 'All Levels' ||
        skill.level.toLowerCase() === selectedLevel.toLowerCase();

      return matchesSearch && matchesCategory && matchesLevel;
    });

    setFilteredSkills(filtered);
  }, [searchTerm, selectedCategory, selectedLevel]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSelectedLevel('All Levels');
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-indigo-600 py-12 md:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h1 className="mb-6 font-bold text-white text-3xl md:text-4xl">Explore Skills</h1>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block bg-white/10 backdrop-blur-md py-3 pr-3 pl-10 border border-transparent focus:border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-white w-full text-white leading-5 placeholder-white/75"
              placeholder="Search for skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {/* Filters Section */}
        <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <h2 className="font-semibold text-gray-900 dark:text-white text-xl">
              {filteredSkills.length} {filteredSkills.length === 1 ? 'Skill' : 'Skills'} Available
            </h2>

            {/* Applied filters - Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              {(selectedCategory !== 'All Categories' || selectedLevel !== 'All Levels' || searchTerm) && (
                <button
                  onClick={resetFilters}
                  className="text-gray-600 hover:text-teal-600 dark:hover:text-teal-400 dark:text-gray-400 text-sm"
                >
                  Clear filters
                </button>
              )}

              {selectedCategory !== 'All Categories' && (
                <span className="inline-flex items-center bg-teal-100 dark:bg-teal-900 px-3 py-1 rounded-full font-medium text-teal-800 dark:text-teal-200 text-sm">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory('All Categories')}
                    className="ml-1 text-teal-600 hover:text-teal-800 dark:hover:text-teal-200 dark:text-teal-400"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}

              {selectedLevel !== 'All Levels' && (
                <span className="inline-flex items-center bg-indigo-100 dark:bg-indigo-900 px-3 py-1 rounded-full font-medium text-indigo-800 dark:text-indigo-200 text-sm">
                  {selectedLevel}
                  <button
                    onClick={() => setSelectedLevel('All Levels')}
                    className="ml-1 text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-200 dark:text-indigo-400"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
            </div>
          </div>

          {/* Filter Button - Mobile */}
          <button
            className="md:hidden flex items-center bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md font-medium text-gray-700 dark:text-gray-300 text-sm"
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
          >
            <Filter size={16} className="mr-2" />
            Filter
          </button>

          {/* Desktop Filters */}
          <div className="hidden md:flex items-center space-x-4">
            <div>
              <select
                className="block bg-white dark:bg-gray-800 shadow-sm mt-1 py-2 pr-10 pl-3 border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:outline-none focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm text-base"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                className="block bg-white dark:bg-gray-800 shadow-sm mt-1 py-2 pr-10 pl-3 border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:outline-none focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm text-base"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Filters Menu */}
        {isFilterMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 shadow-md mb-6 p-4 rounded-lg">
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">
                Category
              </label>
              <select
                className="block bg-white dark:bg-gray-800 shadow-sm py-2 pr-10 pl-3 border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:outline-none focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm text-base"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">
                Level
              </label>
              <select
                className="block bg-white dark:bg-gray-800 shadow-sm py-2 pr-10 pl-3 border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:outline-none focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm text-base"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between">
              <button
                onClick={resetFilters}
                className="text-gray-600 hover:text-teal-600 dark:hover:text-teal-400 dark:text-gray-400 text-sm"
              >
                Reset filters
              </button>
              <button
                onClick={() => setIsFilterMenuOpen(false)}
                className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-md text-white text-sm"
              >
                Apply
              </button>
            </div>
          </div>
        )}

        {/* Skills Grid */}
        {isLoading ? (
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 shadow-sm p-6 rounded-lg h-64"></div>
            ))}
          </div>
        ) : filteredSkills.length > 0 ? (
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <h3 className="mb-2 font-medium text-gray-900 dark:text-white text-lg">No skills found</h3>
            <p className="mb-6 text-gray-500 dark:text-gray-400">Try adjusting your search or filters.</p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center bg-teal-600 hover:bg-teal-700 shadow-sm px-4 py-2 border border-transparent rounded-md font-medium text-white text-sm"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsPage;