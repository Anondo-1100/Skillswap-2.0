import { Link } from 'react-router-dom';
import { Heart, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gradient-to-br from-teal-500 to-indigo-600 text-white">
                <span className="font-bold text-lg">S</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">SKILLSWAP</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Connect with others to exchange skills and knowledge. Learn something new today!
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
              Platform
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/skills" className="text-base text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
                  Browse Skills
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-base text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-base text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-base text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="text-base text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
              Team
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="text-base text-gray-600 dark:text-gray-400">
                Creator: Gm.Anondo
              </li>
              <li className="text-base text-gray-600 dark:text-gray-400">
                Shama Raidah
              </li>
              <li className="text-base text-gray-600 dark:text-gray-400">
                Muhtasim Hossain
              </li>
              <li className="text-base text-gray-600 dark:text-gray-400">
                Oporna Chowdhury Orpa
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col items-center">
          <p className="text-base text-gray-500 dark:text-gray-400 text-center">
            &copy; {year} SKILLSWAP. All rights reserved.
          </p>
          <p className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
            Made with <Heart size={14} className="mx-1 text-red-500" /> by the SKILLSWAP team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;