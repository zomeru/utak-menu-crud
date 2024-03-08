import { useMenu } from '@/hooks';
import ItemCard from './ItemCard';
import { useEffect, useState } from 'react';

const MenuItems = () => {
  const { menu, loading, loadMore } = useMenu();

  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    if (menu.length > 0 && !selected) {
      setSelected(menu[0].id);
    }
  }, [menu]);

  return (
    <div className='w-full flex flex-col justify-between'>
      {loading && (
        <div className='flex justify-center items-center h-96'>
          <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-neutral-500' />
        </div>
      )}
      {!loading && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
          {menu.map((item) => (
            <ItemCard
              key={item.id}
              {...item}
              isSelected={item.id === selected}
              onSelect={(id) => {
                setSelected(id);
              }}
            />
          ))}
        </div>
      )}
      <button
        id='load-more-button'
        type='button'
        onClick={loadMore}
        className='w-fit mt-10 mx-auto rounded-full border border-neutral-700 px-5 space-x-3 hover:bg-neutral-100 transition-all duration-200 py-2'
      >
        Load more
      </button>
    </div>
  );
};

export default MenuItems;
