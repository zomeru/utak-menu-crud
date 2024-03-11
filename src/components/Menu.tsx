import AddItem from './AddItem';
import Categories from './Categories';
import MenuItems from './MenuItems';
import Search from './Search';

const Menu = () => {
  return (
    <div className='w-[65%] md:w-[70%] lg:w-[75%] bg-white rounded-xl p-5 space-y-5 h-full'>
      <div className='flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0'>
        <h2 className='font-semibold text-3xl'>Menu</h2>
        <div className='flex flex-col md:flex-row space-x-3 items-center space-y-2 md:space-y-0'>
          <Search />
          <div className='w-[1px] h-[30px] bg-neutral-300 hidden md:block' />
          <AddItem />
        </div>
      </div>
      <Categories />
      <MenuItems />
    </div>
  );
};

export default Menu;
