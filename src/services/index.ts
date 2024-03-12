import { child, equalTo, get, limitToFirst, orderByChild, push, query, ref, remove, set } from 'firebase/database';
import { ref as storageRef, deleteObject } from 'firebase/storage';
import { capitalizeFirstLetterOfWords } from '@/utils';
import { realtimeDB, storage } from '@/configs/firebase';

export const createCategory = (category: string) => {
  const categoriesRef = ref(realtimeDB, 'categories');
  const newCategoryDocRef = push(categoriesRef);

  const formattedCategory = capitalizeFirstLetterOfWords(category);
  set(newCategoryDocRef, {
    id: newCategoryDocRef.key,
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

export const removeCategoryIfNoMenu = (categoryId: string) => {
  const menuRef = ref(realtimeDB, 'menu');
  const q = query(menuRef, equalTo(categoryId), limitToFirst(2), orderByChild('category'));

  get(q).then((snapshot) => {
    // If there's no menu with the categoryId, remove the category
    if (!snapshot.exists()) {
      const categoryRef = ref(realtimeDB, 'categories');
      remove(child(categoryRef, categoryId));
    }
  });
};
