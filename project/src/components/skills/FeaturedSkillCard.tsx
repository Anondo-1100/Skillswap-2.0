import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SkillProps {
  skill: {
    id: number;
    title: string;
    author: string;
    rating: number;
    reviews: number;
    image: string;
    authorImage: string;
  };
}

const FeaturedSkillCard = ({ skill }: SkillProps) => {
  return (
    <Link 
      to={`/skills/${skill.id}`} 
      className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={skill.image} 
          alt={skill.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center mb-3">
          <img 
            src={skill.authorImage}
            alt={skill.author}
            className="h-8 w-8 rounded-full mr-2 object-cover"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">{skill.author}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
          {skill.title}
        </h3>
        <div className="flex items-center mt-auto">
          <div className="flex items-center">
            <Star size={16} className="text-yellow-500 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-900 dark:text-white">{skill.rating}</span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">({skill.reviews} reviews)</span>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedSkillCard;