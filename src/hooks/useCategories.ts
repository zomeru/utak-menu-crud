import { ref, orderByChild, query, onValue } from 'firebase/database';

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

    onValue(orderQuery, (snapshot) => {
      if (snapshot.exists()) {
        const _categories = Object.values(snapshot.val() as Category[]);
        setCategories(_categories);
      } else {
        setCategories([]);
      }
    });
  }, []);

  return categories;
};

export default useCategories;
