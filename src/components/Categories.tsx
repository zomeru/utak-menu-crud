import { useCategories } from '@/hooks';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

const Categories = () => {
  const [searchParams, setQueryParams] = useSearchParams();
  const categories = useCategories();

  const newCategories = useMemo(() => {
    return [
      {
        id: 'all-items-123',
        name: 'All',
      },
      ...categories,
    ];
  }, [categories]);

  const onCategoryClick = (category: string) => {
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }

    setQueryParams(searchParams);
  };

  return (
    <div className='flex justify-between items-center'>
      <ul className='flex space-x-1 w-[calc(100%-60px)] overflow-x-hidden hover:overflow-x-auto py-5'>
        {newCategories.map((category, index) => {
          const isSelected =
            category.name === searchParams.get('category') ||
            (category.name === 'All' && !searchParams.get('category'));

          return (
            <li key={index}>
              <button
                data-tooltip-id='category-button-tooltip-id'
                data-tooltip-content={category.name}
                className={`text-sm hover:text-neutral-700 cursor-pointer whitespace-nowrap ${isSelected ? 'text-neutral-700 bg-neutral-200 rounded-full' : 'text-neutral-500'} py-2 px-4 hover:text-neutral-700 hover:bg-neutral-200 hover:rounded-full transition-all duration-200`}
                type='button'
                onClick={() => onCategoryClick(category.name)}
              >
                <p className='max-w-[100px] truncate'>{category.name}</p>
              </button>
              <Tooltip id='category-button-tooltip-id' />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
