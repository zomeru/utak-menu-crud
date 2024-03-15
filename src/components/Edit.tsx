import { useEffect, useMemo, useRef, useState } from 'react';
import { CiImageOn, CiEdit } from 'react-icons/ci';
import { ref, child, update, remove, serverTimestamp } from 'firebase/database';
import { IoIosCloseCircleOutline } from 'react-icons/io';

import { useMenuContext } from '@/contexts/MenuContext';
import ItemOptionsModal, { Options } from './ItemOptionsModal';
import TextInput from './inputs/TextInput';
import { capitalizeFirstLetterOfWords, formatFloat, formatOnlyNumbers } from '@/utils';
import SelectCategories from './inputs/SelectCategories';
import { Menu } from '@/hooks/useMenu';
import { useCategories, useFileHandler } from '@/hooks';
import { createCategory, removeCategoryIfNoMenu, removeImage } from '@/services';
import { realtimeDB } from '@/configs/firebase';
import { toast } from 'react-toastify';
import useUploadImage from '@/hooks/useImageUpload';
import { Tooltip } from 'react-tooltip';

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '1rem',
  },
};

const Edit = () => {
  const { menu, selectedMenuId } = useMenuContext();
  const categories = useCategories();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [handleMenuImage, menuFile, menuImage, clearImage] = useFileHandler();
  const { uploadImage } = useUploadImage();

  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [optionModalIsOpen, setOptionModalIsOpen] = useState(false);

  // Form
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [cost, setCost] = useState(0);
  const [stock, setStock] = useState(0);
  const [selectedMenuImage, setSelectedMenuImage] = useState<Menu['image']>();

  const [allOptions, setAllOptions] = useState<Options[]>([]);

  useEffect(() => {
    const selectedMenu = menu.find((m) => m.id === selectedMenuId);
    if (selectedMenu) {
      setSelectedMenu(selectedMenu);
      setName(selectedMenu.name);
      setCategory(selectedMenu.category);
      setPrice(selectedMenu.price);
      setCost(selectedMenu.cost);
      setStock(selectedMenu.stock);
      setAllOptions(selectedMenu.options || []);
      setSelectedMenuImage(selectedMenu.image);
    } else {
      setSelectedMenu(null);
    }

    return () => {
      clearImage();
    };
  }, [menu, selectedMenuId]);

  const hasInputChanged = useMemo(() => {
    return (
      name !== selectedMenu?.name ||
      category !== selectedMenu?.category ||
      price !== selectedMenu?.price ||
      cost !== selectedMenu?.cost ||
      stock !== selectedMenu?.stock ||
      JSON.stringify(allOptions) !== JSON.stringify(selectedMenu?.options || []) ||
      JSON.stringify(selectedMenuImage) !== JSON.stringify(selectedMenu?.image) ||
      !!menuImage
    );
  }, [name, category, price, cost, stock, selectedMenu, selectedMenuImage, allOptions, menuImage]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!hasInputChanged || !selectedMenuId) return;

    try {
      setIsSubmitting(true);
      let imageCover: { url: string; ref: string } | null = null;

      if (menuFile || menuImage) {
        imageCover = await uploadImage('menu', menuFile);
      }

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

      const updatedMenuDoc: Omit<Menu, 'createdAt'> = {
        id: selectedMenuId,
        name,
        category: categoryId,
        price,
        cost,
        stock,
        updatedAt: serverTimestamp(),
      };

      if (allOptions.length > 0) {
        updatedMenuDoc['options'] = allOptions;
      }

      if (imageCover || selectedMenuImage) {
        updatedMenuDoc['image'] = imageCover ?? selectedMenuImage; // prioritize checking for new image
      } else {
        updatedMenuDoc['image'] = null;
      }

      // Update the menu
      const menuRef = ref(realtimeDB, 'menu');
      update(child(menuRef, selectedMenuId), updatedMenuDoc)
        .then(() => {
          toast.success('Item updated successfully');
        })
        .then(async () => {
          // If there's a new image, remove the old one
          if (imageCover) {
            if (selectedMenu?.image?.url) {
              await removeImage(selectedMenu.image.url);
            }
          }

          // Find menu with the selected category, if found none, remove the category
          if (selectedMenu?.category) {
            removeCategoryIfNoMenu(selectedMenu.category);
          }

          setIsCustomCategory(false);
        });
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeItem = async () => {
    // Remove the menu
    setIsRemoving(true);
    const menuRef = ref(realtimeDB, 'menu');
    remove(child(menuRef, selectedMenuId))
      .then(async () => {
        toast.success('Item removed successfully');

        // Find menu with the selected category, if found none, remove the category
        if (selectedMenu?.category) {
          removeCategoryIfNoMenu(selectedMenu.category);
        }

        // Remove the image from storage
        if (selectedMenu?.image?.url) {
          await removeImage(selectedMenu.image.url);
        }
      })
      .catch(() => {
        toast.error('An error occurred');
      })
      .finally(() => {
        setIsRemoving(false);
      });
  };

  return (
    <form
      className='w-[35%] md:w-[30%] lg:w-[25%] bg-white rounded-xl p-5 h-full flex flex-col justify-between'
      onSubmit={handleSubmit}
    >
      <h2 className='font-semibold text-3xl'>Edit</h2>
      {selectedMenu ? (
        <div className='flex flex-col space-y-3 mt-5 justify-between'>
          <div className='flex flex-col space-y-3'>
            {/* img */}
            <div className='h-40 w-60 rounded-lg mb-2 flex justify-center items-center mx-auto flex-col'>
              {menuImage ? (
                <img src={menuImage} className='h-full w-full object-cover object-center rounded-md' loading='lazy' />
              ) : selectedMenuImage ? (
                <img
                  src={selectedMenuImage?.url}
                  className='h-full w-full object-cover object-center rounded-md'
                  loading='lazy'
                />
              ) : (
                <CiImageOn className='text-neutral-400 w-16 h-16' />
              )}
              <div className='space-x-3'>
                <button
                  onClick={() => {
                    setSelectedMenuImage(undefined);
                    clearImage();
                  }}
                  disabled={isSubmitting || (!selectedMenuImage && !menuImage)}
                  type='button'
                  className='text-red-500 underline disabled:cursor-not-allowed disabled:text-neutral-500'
                >
                  Remove
                </button>
                <button
                  disabled={isSubmitting}
                  onClick={() => {
                    if (fileInputRef.current && !isSubmitting) {
                      fileInputRef.current.click();
                    }
                  }}
                  type='button'
                  className='text-blue-500 underline'
                >
                  Change
                </button>
                <input
                  disabled={isSubmitting}
                  type='file'
                  accept='image/jpeg, image/png, image/jpg, image/webp'
                  onChange={handleMenuImage}
                  ref={fileInputRef}
                  hidden
                />
              </div>
            </div>

            <TextInput
              name='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='lg:w-full'
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
              </button>
              <Tooltip id='custom-category-tooltip' />
            </div>

            <TextInput
              required
              name='Price'
              value={price}
              type='number'
              step={0.01}
              onChange={(e) => {
                const value = formatFloat(e.target.value);
                setPrice(value);
              }}
              className='lg:w-full'
              disabled={isSubmitting}
            />
            <TextInput
              required
              name='Cost'
              type='number'
              step={0.01}
              value={cost}
              onChange={(e) => {
                const value = formatFloat(e.target.value);
                setCost(value);
              }}
              className='lg:w-full'
              disabled={isSubmitting}
            />
            <TextInput
              required
              name='Stock'
              type='text'
              value={stock}
              onChange={(e) => {
                const value = formatOnlyNumbers(e.target.value);
                setStock(value);
              }}
              className='lg:w-full'
              disabled={isSubmitting}
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
              style={customModalStyles}
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
          </div>
        </div>
      ) : (
        <div className='h-full w-full flex justify-center items-center'>
          <p className='text-neutral-500 text-lg'>No item selected</p>
        </div>
      )}

      {selectedMenuId && (
        <div className='space-y-2'>
          <button
            type='submit'
            className={`w-full mt-auto py-2 rounded-lg  text-white font-semibold transition-all duration-200 ${
              hasInputChanged ? 'bg-blue-600 hover:bg-blue-700' : 'bg-neutral-700 cursor-not-allowed'
            }`}
            disabled={!hasInputChanged || isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update Item'}
          </button>
          <button
            type='button'
            className={`w-full mt-auto py-2 rounded-lg  text-white font-semibold transition-all duration-200 bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:cursor-not-allowed`}
            disabled={isRemoving || isSubmitting}
            onClick={removeItem}
          >
            {isRemoving ? 'Removing...' : 'Remove Item'}
          </button>
        </div>
      )}
    </form>
  );
};

export default Edit;
