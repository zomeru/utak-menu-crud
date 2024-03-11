import useMenu, { Menu } from '@/hooks/useMenu';
import { createContext, FC, useContext, ReactNode, useMemo, useState, useEffect } from 'react';

export interface MenuContextProps {
  menu: Menu[];
  loading: boolean;
  loadMore: () => void;
  selectedMenuId: string;
  setSelectedMenuId: React.Dispatch<React.SetStateAction<string>>;
}

export const MenuContext = createContext<MenuContextProps>({} as MenuContextProps);

export function useMenuContext() {
  return useContext(MenuContext);
}

interface MenuProviderProps {
  children: ReactNode;
}

const MenuProvider: FC<MenuProviderProps> = ({ children }) => {
  const { menu, loading, loadMore, selectedMenuId, setSelectedMenuId } = useMenu();

  console.log('menu', menu);
  console.log('selectedMenuId', selectedMenuId);

  useEffect(() => {
    const shouldChange = menu.find((m) => m.id === selectedMenuId);

    if (menu.length > 0 && !shouldChange) {
      setSelectedMenuId(menu[0].id);
    }

    if (menu.length === 0) {
      setSelectedMenuId('');
    }
  }, [menu, selectedMenuId]);

  const value = useMemo(
    () => ({ menu, loading, loadMore, selectedMenuId, setSelectedMenuId }) as MenuContextProps,
    [menu, loading, loadMore, selectedMenuId, setSelectedMenuId],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export default MenuProvider;
