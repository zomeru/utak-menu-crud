import { limitToFirst, query, ref, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import { useSearchParams } from 'react-router-dom';

import { Options } from '@/components/ItemOptionsModal';
import { realtimeDB } from '@/configs/firebase';
import { MENU_QUERY_LIMIT } from '@/constants';
import useCategories from './useCategories';

export type Menu = {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  createdAt: object;
  updatedAt?: object;
  image?: {
    url: string;
    ref: string;
  } | null;
  options?: Options[];
};

const useMenu = () => {
  const categories = useCategories();

  const [selectedMenuId, setSelectedMenuId] = useState<string>('');
  const [menu, setMenu] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const [searchParams] = useSearchParams();
  const searchKey = searchParams.get('search');
  const categoryKey = searchParams.get('category');

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      const menuRef = ref(realtimeDB, 'menu');
      const q = query(menuRef, limitToFirst(MENU_QUERY_LIMIT * pageNumber));

      onValue(q, (snapshot) => {
        if (snapshot.exists()) {
          const _menu = (Object.entries(snapshot.val()) as [string, Menu][]).map(([id, item]: [string, Menu]) => ({
            ...item,
            id,
          }));

          const categoryId = categories.find((c) => c.name === categoryKey)?.id;

          const _newMenu = categoryId ? _menu.filter((m) => m.category === categoryId) : _menu;

          if (searchKey) {
            const fuse = new Fuse(_newMenu, {
              keys: ['name', 'category'],
            });
            const result = fuse.search(searchKey);

            setMenu(result.map((r) => r.item));
          } else {
            setMenu(_newMenu);
          }
        } else {
          setMenu([]);
          setSelectedMenuId('');
        }

        setLoading(false);
      });
    };

    fetchMenu();
  }, [pageNumber, searchKey, categoryKey]);

  const loadMore = () => {
    setPageNumber((prev) => prev + 1);
  };

  return { menu, loading, loadMore, selectedMenuId, setSelectedMenuId };
};

export default useMenu;
