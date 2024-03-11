import { push, ref, set } from 'firebase/database';
import { ref as storageRef, deleteObject } from 'firebase/storage';
import { capitalizeFirstLetterOfWords } from '@/utils';
import { realtimeDB, storage } from '@/configs/firebase';

export const createCategory = (category: string) => {
  const categoriesRef = ref(realtimeDB, 'categories');
  const newCategoryDocRef = push(categoriesRef);

  const formattedCategory = capitalizeFirstLetterOfWords(category);
  set(newCategoryDocRef, {
    name: formattedCategory,
  });
  return newCategoryDocRef;
};

export const removeImage = async (imageUrl: string) => {
  try {
    const imageRef = storageRef(storage, imageUrl);
    await deleteObject(imageRef);
    return true;
  } catch (error: any) {
    console.error('Error removing image', error.message);
    return false;
  }
};
