import { CiImageOn } from 'react-icons/ci';
import { Menu } from '@/hooks/useMenu';
import { useCategories } from '@/hooks';
import { useMenuContext } from '@/contexts/MenuContext';

interface ItemCardProps extends Menu {
  isSelected: boolean;
}

const ItemCard = ({ id, category, cost, name, price, stock, image, options, isSelected }: ItemCardProps) => {
  const categories = useCategories();
  const { setSelectedMenuId } = useMenuContext();

  return (
    <button
      className={`p-2 rounded-lg w-48 text-left bg-white hover:bg-neutral-200 duration-200 transition-all ${isSelected ? 'border-neutral-700 border-2' : 'border-neutral-300 border'}`}
      onClick={() => {
        setSelectedMenuId(id);
      }}
    >
      <div className='h-32 w-full rounded-lg mb-2 flex justify-center items-center bg-neutral-200'>
        {image ? (
          <img
            src={image?.url}
            alt={image?.ref}
            className='h-full w-full object-cover object-center rounded-lg'
            loading='lazy'
          />
        ) : (
          <CiImageOn className='text-neutral-400 w-16 h-16' />
        )}
      </div>
      <div className='flex flex-col justify-between items-start'>
        <div className='space-y-1'>
          <h3 className='font-semibold text-sm'>{name}</h3>
          <p className='text-neutral-500 text-xs'>Category: {categories.find((c) => c.id === category)?.name}</p>
          <p className='font-semibold text-sm'>
            <span className='text-neutral-500 font-normal'>Price:</span> ₱{price}
          </p>
        </div>
        <div className='flex items-center justify-between w-full mt-3'>
          <p className='font-semibold text-sm'>
            <span className='text-neutral-500 font-normal'>Cost: </span>₱{cost}
          </p>
          <p className='font-semibold text-sm'>
            <span className='text-neutral-500 font-normal'>Stock:</span> {stock}
          </p>
        </div>
      </div>
    </button>
  );
};

export default ItemCard;
