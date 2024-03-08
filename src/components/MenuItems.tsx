import ItemCard from './ItemCard';
import { useMenuContext } from '@/contexts/MenuContext';

const MenuItems = () => {
  const { menu, loading, loadMore, selectedMenuId } = useMenuContext();

  return (
    <div className='w-full flex flex-col justify-between'>
      {loading && (
        <div className='flex justify-center items-center h-96'>
          <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-neutral-500' />
        </div>
      )}
      {!loading && menu.length > 0 && (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full'>
            {menu.map((item) => (
              <ItemCard key={item.id} {...item} isSelected={item.id === selectedMenuId} />
            ))}
          </div>
          <button
            id='load-more-button'
            type='button'
            onClick={loadMore}
            className='w-fit mt-10 mx-auto rounded-full border border-neutral-700 px-5 space-x-3 hover:bg-neutral-100 transition-all duration-200 py-2'
          >
            Load more
          </button>
        </>
      )}
      {!loading && menu.length === 0 && (
        <div className='w-full h-96 flex justify-center items-center'>
          <p className='text-neutral-500 text-lg'>No items found</p>
        </div>
      )}
    </div>
  );
};

export default MenuItems;
