import { Link } from 'react-router-dom';

interface CategoryProps {
  category: {
    id: number;
    name: string;
    count: number;
    image: string;
  };
}

const CategoryCard = ({ category }: CategoryProps) => {
  return (
    <Link 
      to={`/skills?category=${category.name.toLowerCase()}`}
      className="group relative block h-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all z-10"></div>
      <img 
        src={category.image} 
        alt={category.name}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <h3 className="text-xl font-bold text-white">{category.name}</h3>
        <p className="text-sm text-white/80">{category.count} skills available</p>
      </div>
    </Link>
  );
};

export default CategoryCard;