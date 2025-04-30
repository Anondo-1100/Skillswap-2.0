import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

interface SkillProps {
  skill: {
    id: number;
    title: string;
    description: string;
    category: string;
    level: string;
    author: string;
    authorImage: string;
    rating: number;
    reviews: number;
  };
}

const SkillCard = ({ skill }: SkillProps) => {
  // Function to determine the badge color based on level
  const getLevelBadgeColor = (level: string) => {
    switch(level.toLowerCase()) {
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
    <Link
      to={`/skills/${skill.id}`}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full"
    >
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={skill.authorImage}
              alt={skill.author}
              className="h-10 w-10 rounded-full mr-3 object-cover"
            />
            <span className="text-sm font-medium text-gray-900 dark:text-white">{skill.author}</span>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelBadgeColor(skill.level)}`}>
            {skill.level}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
          {skill.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
          {skill.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <Star size={16} className="text-yellow-500 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-900 dark:text-white">{skill.rating}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({skill.reviews})</span>
          </div>
          <span className="text-xs uppercase font-medium text-gray-500 dark:text-gray-400">
            {skill.category}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SkillCard;