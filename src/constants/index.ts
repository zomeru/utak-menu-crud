import { MdOutlineDashboard, MdOutlineRestaurantMenu } from 'react-icons/md';
import { IoIosAnalytics } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';

export const NAVBAR_ITEMS = [
  {
    label: 'Dashboard',
    Icon: MdOutlineDashboard,
    href: '#',
  },
  {
    label: 'Menu',
    Icon: MdOutlineRestaurantMenu,
    href: '#',
  },
  {
    label: 'Analytics',
    Icon: IoIosAnalytics,
    href: '#',
  },
  {
    label: 'Settings',
    Icon: IoSettingsOutline,
    href: '#',
  },
];

export const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '1rem',
    zIndex: 1000,
  },
};

export const optionsModalSyles = {
  content: {
    ...customModalStyles.content,
    zIndex: 1000,
  },
};

export const MENU_QUERY_LIMIT = 20;
