import { push, ref, set } from 'firebase/database';
import { capitalizeFirstLetterOfWords } from '@/utils';
import { realtimeDB } from '@/configs/firebase';

export const createCategory = (category: string) => {
  const categoriesRef = ref(realtimeDB, 'categories');
  const newCategoryDocRef = push(categoriesRef);

  const formattedCategory = capitalizeFirstLetterOfWords(category);
  set(newCategoryDocRef, {
    name: formattedCategory,
  });
  return newCategoryDocRef;
};
