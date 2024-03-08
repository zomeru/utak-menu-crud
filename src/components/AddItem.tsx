import { useState, useRef } from 'react';
import { GoPlus } from 'react-icons/go';
import { CiImageOn, CiEdit } from 'react-icons/ci';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import Modal from 'react-modal';
import { ref, set, push } from 'firebase/database';
import { toast } from 'react-toastify';

import { realtimeDB } from '@/configs/firebase';
import { capitalizeFirstLetterOfWords, formatFloat, formatOnlyNumbers } from '@/utils';
import SelectCategories from './inputs/SelectCategories';
import TextInput from './inputs/TextInput';
import { useCategories, useFileHandler } from '@/hooks';
import useUploadImage from '@/hooks/useImageUpload';
import { customModalStyles } from '@/constants';
import ItemOptionsModal, { Options } from './ItemOptionsModal';
import { Menu } from '@/hooks/useMenu';
import { createCategory } from '@/services';
import { Tooltip } from 'react-tooltip';

Modal.setAppElement('#root');

export const AddItem = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [handleMenuImage, menuFile, menuImage, clearImage] = useFileHandler();
  const { uploadImage } = useUploadImage();

  const categories = useCategories();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [optionModalIsOpen, setOptionModalIsOpen] = useState(false);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [cost, setCost] = useState(0);
  const [stock, setStock] = useState(0);
  const [allOptions, setAllOptions] = useState<Options[]>([]);

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
    setCost(0);
    setStock(0);
    setIsCustomCategory(false);
    setAllOptions([]);
    clearImage();
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !category || !price || !stock || !cost) {
      toast.info('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      let imageCover;

      if (menuFile || menuImage) {
        imageCover = await uploadImage('menu', menuFile);
      }

      // menu ref
      const newMenuDocRef = push(ref(realtimeDB, 'menu'));

      let categoryId: string | null = '';

      if (isCustomCategory) {
        // If it's a custom category, create a new category

        // But first, check if the custom category already exists
        const formattedCategory = capitalizeFirstLetterOfWords(category);
        const foundCategory = categories.find((cat) => cat.name === formattedCategory);

        if (foundCategory) {
          categoryId = foundCategory.id;
        } else {
          categoryId = createCategory(category).key;
        }
      } else {
        // Double check if the category exists
        const categoryExists = categories.find((cat) => cat.id === category);
        if (categoryExists) {
          categoryId = category;
        } else {
          categoryId = createCategory(category).key;
        }
      }

      if (!categoryId) {
        throw new Error('An error occurred');
      }

      const newMenuDoc: Omit<Menu, 'id'> = {
        name,
        category: categoryId,
        price,
        cost,
        stock,
      };

      if (imageCover) {
        newMenuDoc['image'] = imageCover;
      }

      if (allOptions.length > 0) {
        newMenuDoc['options'] = allOptions;
      }

      // Add the menu
      set(newMenuDocRef, newMenuDoc)
        .then(() => {
          resetModal();
        })
        .then(() => {
          toast.success('Item added successfully');
        });
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          if (!isSubmitting) resetModal();
        }}
        style={customModalStyles}
        contentLabel='Example Modal'
      >
        <form onSubmit={onSubmit} className='flex p-5 space-x-10'>
          <div className='flex flex-col items-center'>
            <button
              type='button'
              className='flex flex-col justify-center items-center border rounded-xl border-neutral-300 px-5 hover:bg-neutral-100 transition-all duration-200 py-2'
              onClick={() => {
                if (fileInputRef.current && !isSubmitting) {
                  fileInputRef.current.click();
                }
              }}
            >
              {menuImage ? (
                <img src={menuImage} alt='menu' className='w-64 h-64 object-cover rounded-lg' />
              ) : (
                <>
                  <CiImageOn className='w-64 h-64 mx-auto text-neutral-300' />
                  <span className='text-neutral-400'>Add Photo (Optional)</span>
                </>
              )}
            </button>
            {menuImage && (
              <button
                type='button'
                className='mt-3 text-sm hover:underline transition-all duration-200 ease-in-out'
                onClick={() => {
                  if (!isSubmitting) clearImage();
                }}
              >
                <span className='text-red-500'>Remove Photo</span>
              </button>
            )}
            <input
              disabled={isSubmitting}
              type='file'
              accept='image/jpeg, image/png, image/jpg, image/webp'
              onChange={handleMenuImage}
              ref={fileInputRef}
              hidden
            />
          </div>
          <div className='flex flex-col space-y-3'>
            <TextInput
              name='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isSubmitting}
            />
            <div className='flex space-x-3 items-end'>
              {isCustomCategory ? (
                <TextInput
                  name='Category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              ) : (
                <SelectCategories
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={isSubmitting}
                />
              )}
              <button
                data-tooltip-id='custom-category-tooltip'
                data-tooltip-content={isCustomCategory ? 'Remove custom category' : 'Add custom category'}
                type='button'
                disabled={isSubmitting}
                onClick={() => {
                  setIsCustomCategory((prev) => !prev);
                  setCategory('');
                }}
              >
                {isCustomCategory ? (
                  <IoIosCloseCircleOutline className='w-5 h-5 text-red-500' />
                ) : (
                  <CiEdit className='w-5 h-5' />
                )}
                <Tooltip id='custom-category-tooltip' />
              </button>
            </div>
            <TextInput
              disabled={isSubmitting}
              required
              name='Price'
              value={price}
              type='number'
              step={0.01}
              onChange={(e) => {
                const value = formatFloat(e.target.value);
                setPrice(value);
              }}
            />
            <TextInput
              disabled={isSubmitting}
              required
              name='Cost'
              type='number'
              step={0.01}
              value={cost}
              onChange={(e) => {
                const value = formatFloat(e.target.value);
                setCost(value);
              }}
            />
            <TextInput
              disabled={isSubmitting}
              required
              name='Stock'
              type='text'
              value={stock}
              onChange={(e) => {
                const value = formatOnlyNumbers(e.target.value);
                setStock(value);
              }}
            />
            <button
              type='button'
              disabled={isSubmitting}
              onClick={() => {
                setOptionModalIsOpen(true);
              }}
              className='text-sm hover:underline transition-all duration-200 ease-in-out mr-auto'
            >
              {allOptions.length > 0 ? 'Edit options' : 'Add options'}
            </button>
            <ItemOptionsModal
              setOptions={setAllOptions}
              options={allOptions}
              isOpen={optionModalIsOpen}
              closeModal={() => setOptionModalIsOpen(false)}
              onRequestClose={() => {
                if (!isSubmitting) {
                  setOptionModalIsOpen(false);
                }
              }}
            />
            <button
              disabled={isSubmitting}
              type='submit'
              className='w-min ml-auto flex items-center rounded-full border border-neutral-700 px-5 space-x-3 hover:bg-neutral-100 transition-all duration-200 py-2 mr-8'
            >
              {isSubmitting ? (
                <span className='whitespace-nowrap'>Adding...</span>
              ) : (
                <>
                  <span className='whitespace-nowrap'>Add Item</span>
                  <GoPlus className='w-5 h-5' />
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddItem;
