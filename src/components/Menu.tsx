import AddItem from './AddItem';
import Categories from './Categories';
import MenuItems from './MenuItems';
import Search from './Search';

const Menu = () => {
  return (
    <div className='w-[75%] bg-white rounded-xl p-5 space-y-5 h-full'>
      {/* Menu header */}
      <div className='flex justify-between items-center'>
        <h2 className='font-semibold text-3xl'>Menu</h2>
        <div className='flex space-x-3 items-center'>
          <Search />
          <div className='w-[1px] h-[30px] bg-neutral-300' />
          <AddItem />
        </div>
      </div>

      {/* Categories / Sort */}
      <Categories />

      {/* MenuItems */}
      <MenuItems />
    </div>
  );
};

export default Menu;
