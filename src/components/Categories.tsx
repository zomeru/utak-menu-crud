import { useSearchParams } from 'react-router-dom';

const CATEGORIES = ['All', 'Best Sellers', 'Main Dishes', 'Side Dishes', 'Desserts', 'Drinks', 'Snacks', 'Breakfast'];

const Categories = () => {
  const [searchParams, setQueryParams] = useSearchParams();

  const onCategoryClick = (category: string) => {
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }

    setQueryParams(searchParams);
  };

  return (
    <div className='flex justify-between items-center px-3'>
      <ul className='flex space-x-1 w-[calc(100%-60px)] overflow-x-hidden hover:overflow-x-auto py-5'>
        {CATEGORIES.map((category, index) => {
          const isSelected =
            category === searchParams.get('category') || (category === 'All' && !searchParams.get('category'));

          return (
            <li key={index}>
              <button
                className={`text-sm hover:text-neutral-700 cursor-pointer whitespace-nowrap ${isSelected ? 'text-neutral-700 bg-neutral-200 rounded-full' : 'text-neutral-500'} py-2 px-4 hover:text-neutral-700 hover:bg-neutral-200 hover:rounded-full transition-all duration-200`}
                type='button'
                onClick={() => onCategoryClick(category)}
              >
                {category}
              </button>
            </li>
          );
        })}
      </ul>
      <div className='flex space-x-3'>
        <div className='w-[1px] h-[30px] bg-neutral-300' />
        <button>Sort</button>
      </div>
    </div>
  );
};

export default Categories;
