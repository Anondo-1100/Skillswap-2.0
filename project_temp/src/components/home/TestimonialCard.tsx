import { Quote
} from 'lucide-react';
import { Link
} from 'react-router-dom';

interface TestimonialProps {
  testimonial: {
    id: number;
    content: string;
    author: string;
    role: string;
    avatar: string;
  };
}

const TestimonialCard = ({ testimonial
}: TestimonialProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4 text-teal-500 dark:text-teal-400">
        <Quote size={
    24
  } />
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-6">{testimonial.content
  }</p>
      <div className="flex items-center">
        <Link 
          to={`/profile/${testimonial.author.toLowerCase().replace(' ', '-')
    }`
  }
          className="flex items-center hover:text-teal-600 dark:hover:text-teal-400"
        >
          <img 
            src={testimonial.avatar
  } 
            alt={testimonial.author
  } 
            className="h-10 w-10 rounded-full mr-3 object-cover"
          />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">{testimonial.author
  }</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role
  }</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TestimonialCard;