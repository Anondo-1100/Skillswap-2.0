import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Trophy, Search, ArrowUpRight } from 'lucide-react';
import CategoryCard from '../components/skills/CategoryCard';
import FeaturedSkillCard from '../components/skills/FeaturedSkillCard';
import TestimonialCard from '../components/home/TestimonialCard';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <section className="relative bg-gradient-to-br from-teal-500 to-indigo-600 overflow-hidden text-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 max-w-7xl">
          <div className="md:max-w-2xl lg:max-w-3xl">
            <h1 className="mb-6 font-bold text-4xl md:text-5xl lg:text-6xl leading-tight animate-fadeIn">
              Share Your Skills. <br />
              Learn New Ones.
            </h1>
            <p className="opacity-90 mb-8 max-w-lg text-lg md:text-xl animate-fadeIn animation-delay-200">
              SkillSwap connects people who want to exchange knowledge and learn from each other. Teach what you know, learn what you don't.
            </p>
            <div className="flex sm:flex-row flex-col gap-4 animate-fadeIn animation-delay-400">
              <Link to="/register" className="inline-flex justify-center items-center bg-white hover:bg-gray-50 shadow-sm px-6 py-3 border border-transparent rounded-md font-medium text-teal-700 text-base transition-colors">
                Get Started <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link to="/skills" className="inline-flex justify-center items-center hover:bg-white/10 px-6 py-3 border border-white rounded-md font-medium text-white text-base transition-colors">
                Explore Skills
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="right-0 -bottom-24 absolute bg-white/10 blur-3xl rounded-full w-96 h-96"></div>
        <div className="top-16 right-16 absolute bg-indigo-500/20 blur-3xl rounded-full w-64 h-64"></div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-900 py-16 md:py-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-gray-900 dark:text-white text-3xl md:text-4xl">How SkillSwap Works</h2>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400 text-lg">
              Exchange skills with others and learn something new in three simple steps.
            </p>
          </div>

          <div className="gap-8 md:gap-12 grid grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 hover:shadow-md p-6 rounded-lg text-center transition-shadow">
              <div className="flex justify-center items-center bg-teal-100 dark:bg-teal-900 mb-4 rounded-full w-16 h-16">
                <Search className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white text-xl">Discover Skills</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse through various skills offered by our community members or search for specific ones.
              </p>
            </div>

            <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 hover:shadow-md p-6 rounded-lg text-center transition-shadow">
              <div className="flex justify-center items-center bg-indigo-100 dark:bg-indigo-900 mb-4 rounded-full w-16 h-16">
                <Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white text-xl">Connect & Swap</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Match with others who have complementary skills and interests, then arrange to swap knowledge.
              </p>
            </div>

            <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 hover:shadow-md p-6 rounded-lg text-center transition-shadow">
              <div className="flex justify-center items-center bg-amber-100 dark:bg-amber-900 mb-4 rounded-full w-16 h-16">
                <Trophy className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white text-xl">Grow Together</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Learn new skills, build your reputation, and become part of a supportive community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 md:py-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="mb-4 font-bold text-gray-900 dark:text-white text-3xl">Popular Categories</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Explore skills by category and find what interests you the most.
              </p>
            </div>
            <Link to="/skills" className="hidden md:flex items-center text-teal-600 hover:text-teal-700 dark:hover:text-teal-300 dark:text-teal-400">
              View all categories <ArrowUpRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          <div className="md:hidden mt-8 text-center">
            <Link to="/skills" className="inline-flex items-center text-teal-600 hover:text-teal-700 dark:hover:text-teal-300 dark:text-teal-400">
              View all categories <ArrowUpRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Skills Section */}
      <section className="bg-white dark:bg-gray-900 py-16 md:py-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="mb-4 font-bold text-gray-900 dark:text-white text-3xl">Featured Skills</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Check out these highly-rated skills from our community.
              </p>
            </div>
            <Link to="/skills" className="hidden md:flex items-center text-teal-600 hover:text-teal-700 dark:hover:text-teal-300 dark:text-teal-400">
              View all skills <ArrowUpRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {featuredSkills.map((skill) => (
              <FeaturedSkillCard key={skill.id} skill={skill} />
            ))}
          </div>

          <div className="md:hidden mt-8 text-center">
            <Link to="/skills" className="inline-flex items-center text-teal-600 hover:text-teal-700 dark:hover:text-teal-300 dark:text-teal-400">
              View all skills <ArrowUpRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 md:py-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-gray-900 dark:text-white text-3xl md:text-4xl">What Our Community Says</h2>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400 text-lg">
              Hear from people who have successfully exchanged skills and grown their knowledge.
            </p>
          </div>

          <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 py-16 md:py-24 text-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <h2 className="mb-6 font-bold text-3xl md:text-4xl">Ready to Start Swapping Skills?</h2>
          <p className="opacity-90 mx-auto mb-8 max-w-2xl text-lg md:text-xl">
            Join our community today and begin your journey of teaching and learning.
          </p>
          <div className="flex sm:flex-row flex-col justify-center gap-4">
            <Link to="/register" className="inline-flex justify-center items-center bg-white hover:bg-gray-50 shadow-sm px-6 py-3 border border-transparent rounded-md font-medium text-indigo-700 text-base transition-colors">
              Sign Up Now <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link to="/skills" className="inline-flex justify-center items-center hover:bg-white/10 px-6 py-3 border border-white rounded-md font-medium text-white text-base transition-colors">
              Browse Skills
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;