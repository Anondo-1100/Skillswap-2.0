export interface Skill {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  author: string;
  authorImage: string;
  rating: number;
  reviews: number;
  price?: number;
  teachingMode: 'swap' | 'paid';
}

// Base type without teaching mode
interface BaseSkill extends Omit<Skill, 'teachingMode' | 'price'> { }

const INITIAL_SKILLS: BaseSkill[] = [
  {
    id: 1,
    title: 'Python Programming',
    description: 'Learn Python from basics to advanced concepts including data structures, algorithms, and web development.',
    category: 'programming',
    level: 'beginner',
    author: 'Alex Johnson',
    authorImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    rating: 4.8,
    reviews: 324,
  },
  {
    id: 2,
    title: 'JavaScript Mastery',
    description: 'Master JavaScript including ES6+, async programming, and modern frameworks.',
    category: 'programming',
    level: 'intermediate',
    author: 'Sarah Chen',
    authorImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    rating: 4.9,
    reviews: 256,
  },
  {
    id: 6,
    title: 'Java Development',
    description: 'Learn Java programming from basics to advanced including Spring Framework and Android development.',
    category: 'programming',
    level: 'intermediate',
    author: 'David Smith',
    authorImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    rating: 4.7,
    reviews: 278,
  },
  {
    id: 7,
    title: 'React.js Mastery',
    description: 'Master React.js including hooks, context, Redux, and modern React patterns.',
    category: 'programming',
    level: 'intermediate',
    author: 'Emily Chen',
    authorImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    rating: 4.9,
    reviews: 412,
  },
  {
    id: 8,
    title: 'Node.js Backend Development',
    description: 'Build scalable backend systems with Node.js, Express, and MongoDB.',
    category: 'programming',
    level: 'advanced',
    author: 'Michael Rodriguez',
    authorImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    rating: 4.8,
    reviews: 345,
  },
  {
    id: 6,
    title: 'React.js Development',
    description: 'Master React.js and build modern web applications with hooks and context.',
    category: 'programming',
    level: 'intermediate',
    author: 'Thomas Anderson',
    authorImage: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg',
    rating: 4.9,
    reviews: 289,
  },
  {
    id: 7,
    title: 'Vue.js Essentials',
    description: 'Learn Vue.js framework from basics to advanced state management.',
    category: 'programming',
    level: 'intermediate',
    author: 'Sophie Martin',
    authorImage: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    rating: 4.7,
    reviews: 178,
  },
  {
    id: 8,
    title: 'Mandarin Chinese',
    description: 'Learn Mandarin Chinese from basic conversation to advanced writing.',
    category: 'language',
    level: 'beginner',
    author: 'Li Wei',
    authorImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    rating: 4.7,
    reviews: 189,
  },
  {
    id: 9,
    title: 'Spanish for Beginners',
    description: 'Start speaking Spanish with confidence through practical conversations.',
    category: 'language',
    level: 'beginner',
    author: 'Maria Rodriguez',
    authorImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    rating: 4.8,
    reviews: 234,
  },
  {
    id: 10,
    title: 'Japanese Language',
    description: 'Learn Japanese including Hiragana, Katakana, and basic Kanji.',
    category: 'language',
    level: 'beginner',
    author: 'Yuki Tanaka',
    authorImage: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 3,
    title: 'Spanish Conversation',
    description: 'Practice conversational Spanish with a focus on everyday situations and common phrases.',
    category: 'language',
    level: 'beginner',
    author: 'Miguel Rodriguez',
    authorImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    rating: 4.7,
    reviews: 56,
  },
  {
    id: 9,
    title: 'French Language',
    description: 'Learn French from basic conversation to advanced writing and culture.',
    category: 'language',
    level: 'beginner',
    author: 'Sophie Martin',
    authorImage: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    rating: 4.8,
    reviews: 234,
  },
  {
    id: 10,
    title: 'Spanish Immersion',
    description: 'Comprehensive Spanish language course with focus on Latin American dialects.',
    category: 'language',
    level: 'intermediate',
    author: 'Carlos Ruiz',
    authorImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    rating: 4.7,
    reviews: 189,
  },
  {
    id: 11,
    title: 'Piano Fundamentals',
    description: 'Learn piano from basics to advanced pieces, including theory and technique.',
    category: 'music',
    level: 'beginner',
    author: 'Emma Wilson',
    authorImage: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    rating: 4.9,
    reviews: 213,
  },
  {
    id: 12,
    title: 'Guitar Mastery',
    description: 'Master acoustic and electric guitar with focus on various genres.',
    category: 'music',
    level: 'intermediate',
    author: 'James Taylor',
    authorImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    rating: 4.8,
    reviews: 178,
  },
  {
    id: 4,
    title: 'Piano for Beginners',
    description: 'Learn to play piano starting with basic techniques, reading music, and simple songs.',
    category: 'music',
    level: 'beginner',
    author: 'Emma Wilson',
    authorImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    rating: 4.6,
    reviews: 42,
  },
  {
    id: 11,
    title: 'Guitar Fundamentals',
    description: 'Learn guitar from basic chords to advanced fingerpicking techniques.',
    category: 'music',
    level: 'beginner',
    author: 'James Wilson',
    authorImage: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
    rating: 4.9,
    reviews: 445,
  },
  {
    id: 12,
    title: 'Music Production',
    description: 'Learn digital music production using industry-standard DAWs and plugins.',
    category: 'music',
    level: 'intermediate',
    author: 'Alex Turner',
    authorImage: 'https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg',
    rating: 4.8,
    reviews: 312,
  },
];

// Adding teachingMode and price to all skills
export const SKILLS_DATA: Skill[] = INITIAL_SKILLS.map((skill): Skill => {
  const isPaid = Math.random() < 0.3;
  return {
    ...skill,
    teachingMode: isPaid ? 'paid' : 'swap',
    ...(isPaid && { price: Math.floor(Math.random() * (80 - 25) + 25) })
  };
});