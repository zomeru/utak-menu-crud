import { useState } from 'react';
import { GoPlus } from 'react-icons/go';
import Modal from 'react-modal';
import { get, ref, set, push, orderByChild, equalTo, query } from 'firebase/database';

import { realtimeDB } from '@/configs/firebase';
import { capitalizeFirstLetterOfWords } from '@/utils';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const AddItem = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function resetModal() {
    closeModal();
    setName('');
    setCategory('');
    setPrice(0);
    setStock(0);
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !category || !price || !stock) {
      alert('All fields are required');
      return;
    }

    const formattedCategory = capitalizeFirstLetterOfWords(category);

    try {
      // menu ref
      const newMenuDocRef = push(ref(realtimeDB, 'menu'));

      // category ref -> Check if the `formattedCategory` already exists
      const categoriesRef = ref(realtimeDB, 'categories');
      const categoryQuery = query(categoriesRef, orderByChild('name'), equalTo(formattedCategory));
      const snapshot = await get(categoryQuery);

      // If it exists, get the categoryId and add the menu
      if (snapshot.val()) {
        const categoryId = Object.keys(snapshot.val())[0];
        set(newMenuDocRef, {
          name,
          category: categoryId,
          price,
          stock,
        }).then(() => {
          resetModal();
        });
        return;
      }

      // If it doesn't exist, create a new category and add the menu
      const newCategoryDocRef = push(categoriesRef);
      set(newCategoryDocRef, {
        name: formattedCategory,
      });
      const categoryId = newCategoryDocRef.key;
      set(newMenuDocRef, {
        name,
        category: categoryId,
        price,
        stock,
      }).then(() => {
        resetModal();
      });
    } catch (error) {}
  };

  return (
    <>
      <button
        onClick={openModal}
        className='flex items-center rounded-full border border-neutral-700 px-5 space-x-3 hover:bg-neutral-100 transition-all duration-200 py-2'
      >
        <span>Add Item</span>
        <GoPlus className='w-5 h-5' />
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Example Modal'>
        <form onSubmit={onSubmit}>
          <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
          <input type='text' placeholder='Category' value={category} onChange={(e) => setCategory(e.target.value)} />
          <input type='number' placeholder='Price' value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          <input type='number' placeholder='Stock' value={stock} onChange={(e) => setStock(Number(e.target.value))} />
          <button type='submit'>Add</button>
        </form>
      </Modal>
    </>
  );
};

export default AddItem;
