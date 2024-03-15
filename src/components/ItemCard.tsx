import { CiImageOn } from 'react-icons/ci';
import { Menu } from '@/hooks/useMenu';
import { useCategories } from '@/hooks';
import { useMenuContext } from '@/contexts/MenuContext';
import { Tooltip } from 'react-tooltip';

interface ItemCardProps extends Menu {
  isSelected: boolean;
}

const ItemCard = ({ id, category, cost, name, price, stock, image, isSelected }: ItemCardProps) => {
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
        <div className='space-y-1 w-full'>
          <h3
            data-tooltip-id='item-name-tooltip-id'
            data-tooltip-content={name}
            className='font-semibold text-sm w-full truncate overflow-hidden'
          >
            {name}
          </h3>
          <Tooltip id='item-name-tooltip-id' />
          <p
            className='text-neutral-500 text-xs w-full truncate'
            data-tooltip-id='item-name-tooltip-id'
            data-tooltip-content={categories.find((c) => c.id === category)?.name}
          >
            Category: {categories.find((c) => c.id === category)?.name}
          </p>
          <Tooltip id='item-category-tooltip-id' />
          <p
            data-tooltip-id='item-price-tooltip-id'
            data-tooltip-content={`₱${price}`}
            className='font-semibold text-sm truncate overflow-hidden'
          >
            <span className='text-neutral-500 font-normal'>Price: </span>₱{price}
          </p>
          <Tooltip id='item-price-tooltip-id' />
        </div>
        <div className='flex items-center justify-between w-full mt-3'>
          <p
            className='font-semibold text-sm w-[50%] truncate'
            data-tooltip-id='item-cost-tooltip-id'
            data-tooltip-content={`₱${cost}`}
          >
            <span className='text-neutral-500 font-normal'>Cost: </span>₱{cost}
          </p>
          <Tooltip id='item-cost-tooltip-id' />
          <p
            data-tooltip-id='item-stock-tooltip-id'
            data-tooltip-content={`₱${stock}`}
            className='font-semibold text-sm w-[50%] truncate'
          >
            <span className='text-neutral-500 font-normal'>Stock:</span> {stock}
          </p>
          <Tooltip id='item-stock-tooltip-id' />
        </div>
      </div>
    </button>
  );
};

export default ItemCard;
