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
