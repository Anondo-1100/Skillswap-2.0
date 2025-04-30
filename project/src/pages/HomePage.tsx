import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Trophy, Search, ArrowUpRight } from 'lucide-react';
import CategoryCard from '../components/skills/CategoryCard';
import FeaturedSkillCard from '../components/skills/FeaturedSkillCard';
import TestimonialCard from '../components/home/TestimonialCard';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { id: 1, name: 'Programming', count: 124, image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg' },
    { id: 2, name: 'Design', count: 98, image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg' },
    { id: 3, name: 'Language', count: 87, image: 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg' },
    { id: 4, name: 'Music', count: 76, image: 'https://images.pexels.com/photos/164693/pexels-photo-164693.jpeg' },
    { id: 5, name: 'Cooking', count: 65, image: 'https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg' },
    { id: 6, name: 'Fitness', count: 54, image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg' },
  ];

  const featuredSkills = [
    { 
      id: 1, 
      title: 'Python Programming', 
      author: 'Michael Chen', 
      rating: 4.9, 
      reviews: 128, 
      image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
      authorImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    },
    { 
      id: 2, 
      title: 'Graphic Design Basics', 
      author: 'Sarah Johnson', 
      rating: 4.8, 
      reviews: 94, 
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
      authorImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    },
    { 
      id: 3, 
      title: 'Japanese Language', 
      author: 'Takeshi Yamada', 
      rating: 4.7, 
      reviews: 76, 
      image: 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg',
      authorImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    },
  ];

  const testimonials = [
    {
      id: 1,
      content: "SkillSwap changed my life! I learned JavaScript by teaching someone photography. The platform is intuitive and the community is amazing.",
      author: "Alex Thompson",
      role: "Photographer & Developer",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    },
    {
      id: 2,
      content: "I've been looking for a platform like this for years. Now I can share my cooking skills while learning a new language. It's a win-win!",
      author: "Maria Rodriguez",
      role: "Chef & Language Enthusiast",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
    {
      id: 3,
      content: "The skill matching algorithm is spot on! I found the perfect mentor for my design journey, and I'm teaching them piano in return.",
      author: "David Kim",
      role: "Pianist & Design Student",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    },
  ];

  return (
    <div className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-500 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:max-w-2xl lg:max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fadeIn">
              Share Your Skills. <br />
              Learn New Ones.
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-lg animate-fadeIn animation-delay-200">
              SkillSwap connects people who want to exchange knowledge and learn from each other. Teach what you know, learn what you don't.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn animation-delay-400">
              <Link to="/register" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-teal-700 bg-white hover:bg-gray-50 transition-colors">
                Get Started <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link to="/skills" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors">
                Explore Skills
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -bottom-24 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-16 right-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">How SkillSwap Works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Exchange skills with others and learn something new in three simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Discover Skills</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse through various skills offered by our community members or search for specific ones.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Connect & Swap</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Match with others who have complementary skills and interests, then arrange to swap knowledge.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mb-4">
                <Trophy className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Grow Together</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Learn new skills, build your reputation, and become part of a supportive community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Popular Categories</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Explore skills by category and find what interests you the most.
              </p>
            </div>
            <Link to="/skills" className="hidden md:flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300">
              View all categories <ArrowUpRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/skills" className="inline-flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300">
              View all categories <ArrowUpRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Skills Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Skills</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Check out these highly-rated skills from our community.
              </p>
            </div>
            <Link to="/skills" className="hidden md:flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300">
              View all skills <ArrowUpRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSkills.map((skill) => (
              <FeaturedSkillCard key={skill.id} skill={skill} />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/skills" className="inline-flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300">
              View all skills <ArrowUpRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Community Says</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Hear from people who have successfully exchanged skills and grown their knowledge.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Swapping Skills?</h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join our community today and begin your journey of teaching and learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-gray-50 transition-colors">
              Sign Up Now <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link to="/skills" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors">
              Browse Skills
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;