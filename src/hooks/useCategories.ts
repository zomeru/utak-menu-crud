import { get, ref, orderByChild, query } from 'firebase/database';

import { realtimeDB } from '@/configs/firebase';
import { useEffect, useState } from 'react';

type Category = {
  id: string;
  name: string;
};
const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const categoriesRef = ref(realtimeDB, 'categories');
    const orderQuery = query(categoriesRef, orderByChild('name'));
    get(orderQuery).then((snapshot) => {
      if (snapshot.exists()) {
        const _categories = (Object.entries(snapshot.val()) as [string, Category][]).map(
          ([id, category]: [string, Category]) => ({
            id,
            name: category.name,
          }),
        );
        setCategories(_categories);
      } else {
        console.log('No categories available');
      }
    });
  }, []);

  return categories;
};

export default useCategories;
