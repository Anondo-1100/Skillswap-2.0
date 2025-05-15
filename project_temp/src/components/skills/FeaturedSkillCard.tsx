import { Star
} from 'lucide-react';
import { Link
} from 'react-router-dom';

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

const FeaturedSkillCard = ({ skill
}: SkillProps) => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      <Link to={`/skills/${skill.id
    }`
  } className="relative h-48 overflow-hidden">
        <img 
          src={skill.image
  } 
          alt={skill.title
  } 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center mb-3">
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
              className="h-8 w-8 rounded-full mr-2 object-cover"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400 group-hover/author:text-teal-600 dark:group-hover/author:text-teal-400">
              {skill.author
  }
            </span>
          </Link>
        </div>
        <Link 
          to={`/skills/${skill.id
    }`
  }
          className="group/skill flex-grow flex flex-col"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover/skill:text-teal-600 dark:group-hover/skill:text-teal-400 transition-colors">
            {skill.title
  }
          </h3>
          <div className="flex items-center mt-auto">
            <div className="flex items-center">
              <Star size={
    16
  } className="text-yellow-500 fill-current" />
              <span className="ml-1 text-sm font-medium text-gray-900 dark:text-white">{skill.rating
  }</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">({skill.reviews
  } reviews)</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedSkillCard;