import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { NAVBAR_ITEMS } from '@/constants';

const Navbar = () => {
  return (
    <header className='flex justify-between w-full items-center bg-white px-3 rounded-xl h-[75px]'>
      <a href='/' className='flex space-x-2 items-center'>
        <MdOutlineRestaurantMenu className='w-8 h-8' />
        <h1 className='font-semibold text-lg'>UTAK Menu CRUD</h1>
      </a>
      <nav>
        <ul className='flex space-x-10 h-full'>
          {NAVBAR_ITEMS.map(({ Icon, href, label }, index) => {
            const isMenu = label === 'Menu';

            return (
              <li key={index} className='relative'>
                <a
                  href={href}
                  className={`py-6 h-full flex items-center space-x-3 ${isMenu ? 'text-neutral-700 after:content-[""]  after:absolute after:h-[3px] after:w-full after:bg-neutral-700 after:bottom-0 after:left-0 after:transition-all after:duration-200' : 'text-neutral-500 after:width-0'} hover:text-neutral-700 transition-all duration-200 hover:after:content-[""] hover:after:absolute hover:after:h-[3px] hover:after:w-full hover:after:bg-neutral-700 hover:after:bottom-0 hover:after:left-0 hover:after:transition-all hover:after:duration-200`}
                >
                  <Icon className='w-5 h-5' />
                  <span>{label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <div>Admin</div>
    </header>
  );
};

export default Navbar;
