import { Link
} from 'react-router-dom';
import { Star, Repeat, DollarSign
} from 'lucide-react';

interface SkillCardProps {
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
    teachingMode: 'swap' | 'paid';
    price?: number;
  };
}

const SkillCard = ({ skill
}: SkillCardProps) => {
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

  const getTeachingModeBadge = () => {
    if (skill.teachingMode === 'swap') {
      return (
        <span className="flex items-center bg-blue-100 dark:bg-blue-900 px-2.5 py-0.5 rounded-full font-medium text-blue-800 dark:text-blue-200 text-xs">
          <Repeat size={
        12
      } className="mr-1" />
          Skill Swap
        </span>
      );
    } else {
      return (
        <span className="flex items-center bg-purple-100 dark:bg-purple-900 px-2.5 py-0.5 rounded-full font-medium text-purple-800 dark:text-purple-200 text-xs">
          <DollarSign size={
        12
      } className="mr-1" />
          ${skill.price
      }/hour
        </span>
      );
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm hover:shadow-md rounded-lg h-full overflow-hidden transition-shadow">
      <div className="flex flex-col flex-grow p-6">
        <div className="flex justify-between items-center mb-4">
          <Link
            to={`/profile/${skill.author.toLowerCase().replace(' ', '-')
    }`
  }
            className="flex items-center group/author"
          >
            <img
              src={skill.authorImage
  }
              alt={skill.author
  }
              className="mr-3 rounded-full w-10 h-10 object-cover"
            />
            <span className="font-medium text-gray-900 dark:text-white text-sm group-hover/author:text-teal-600 dark:group-hover/author:text-teal-400">{skill.author
  }</span>
          </Link>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelBadgeColor(skill.level)
    }`
  }>
            {skill.level
  }
          </span>
        </div>

        <Link 
          to={`/skills/${skill.id
    }`
  }
          className="flex flex-col flex-grow group/skill"
        >
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-white text-lg group-hover/skill:text-teal-600 dark:group-hover/skill:text-teal-400 transition-colors">
            {skill.title
  }
          </h3>

          <p className="flex-grow mb-4 text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
            {skill.description
  }
          </p>

          <div className="flex justify-between items-center mt-auto pt-4 border-gray-100 dark:border-gray-700 border-t">
            <div className="flex items-center">
              <Star size={
    16
  } className="fill-current text-yellow-500" />
              <span className="ml-1 font-medium text-gray-900 dark:text-white text-sm">{skill.rating
  }</span>
              <span className="ml-1 text-gray-500 dark:text-gray-400 text-xs">({skill.reviews
  })</span>
            </div>
            {getTeachingModeBadge()
  }
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SkillCard;