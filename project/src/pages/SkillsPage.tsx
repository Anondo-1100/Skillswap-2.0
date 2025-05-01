import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import SkillCard from '../components/skills/SkillCard';
import { SKILLS_DATA } from '../data/skills';

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
const teachingModes = ['All Modes', 'Skill Swap', 'Paid'];

const SkillsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedTeachingMode, setSelectedTeachingMode] = useState('All Modes');
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
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    // Filter skills based on search term, category, level, and teaching mode
    const filtered = SKILLS_DATA.filter((skill) => {
      const matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'All Categories' ||
        skill.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesLevel = selectedLevel === 'All Levels' ||
        skill.level.toLowerCase() === selectedLevel.toLowerCase();

      const matchesTeachingMode = selectedTeachingMode === 'All Modes' ||
        (selectedTeachingMode.toLowerCase() === 'skill swap' && skill.teachingMode === 'swap') ||
        (selectedTeachingMode.toLowerCase() === 'paid' && skill.teachingMode === 'paid');

      return matchesSearch && matchesCategory && matchesLevel && matchesTeachingMode;
    });

    setFilteredSkills(filtered);
  }, [searchTerm, selectedCategory, selectedLevel, selectedTeachingMode]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSelectedLevel('All Levels');
    setSelectedTeachingMode('All Modes');
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
              {(selectedCategory !== 'All Categories' || selectedLevel !== 'All Levels' || selectedTeachingMode !== 'All Modes' || searchTerm) && (
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

              {selectedTeachingMode !== 'All Modes' && (
                <span className="inline-flex items-center bg-purple-100 dark:bg-purple-900 px-3 py-1 rounded-full font-medium text-purple-800 dark:text-purple-200 text-sm">
                  {selectedTeachingMode}
                  <button
                    onClick={() => setSelectedTeachingMode('All Modes')}
                    className="ml-1 text-purple-600 hover:text-purple-800 dark:hover:text-purple-200 dark:text-purple-400"
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

            <div>
              <select
                className="block bg-white dark:bg-gray-800 shadow-sm mt-1 py-2 pr-10 pl-3 border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:outline-none focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm text-base"
                value={selectedTeachingMode}
                onChange={(e) => setSelectedTeachingMode(e.target.value)}
              >
                {teachingModes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
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

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">
                Teaching Mode
              </label>
              <select
                className="block bg-white dark:bg-gray-800 shadow-sm py-2 pr-10 pl-3 border-gray-300 dark:border-gray-700 focus:border-teal-500 rounded-md focus:outline-none focus:ring-teal-500 w-full text-gray-900 dark:text-white sm:text-sm text-base"
                value={selectedTeachingMode}
                onChange={(e) => setSelectedTeachingMode(e.target.value)}
              >
                {teachingModes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
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