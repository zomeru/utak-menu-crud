import Modal, { Props } from 'react-modal';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { CiCircleRemove } from 'react-icons/ci';

import { optionsModalSyles } from '@/constants';
import { useState } from 'react';
import TextInput from './inputs/TextInput';

interface ItemOptionsModalProps extends Props {
  isOpen: boolean;
}

type NumOfOptionsOfOptions = {
  index: number;
  numOfOptions: {
    index: number;
  }[];
};

const ItemOptionsModal = ({ isOpen, ...props }: ItemOptionsModalProps) => {
  const [currentNumberOfOptions, setCurrentNumberOfOptions] = useState<number[]>([]);
  const [numOfOptionsOfOption, setNumOfOptionsOfOption] = useState<NumOfOptionsOfOptions[]>([]);

  const addOption = () => {
    setCurrentNumberOfOptions((prev) => {
      const newNumOfOptionsOfOption = [
        ...numOfOptionsOfOption,
        {
          index: prev.length,
          numOfOptions: [
            {
              index: 0,
            },
          ],
        },
      ];

      setNumOfOptionsOfOption(newNumOfOptionsOfOption);

      return [...prev, prev.length];
    });
  };

  const removeOption = (id: number) => {
    const newNumberOfOptions = currentNumberOfOptions.filter((item) => item !== id);
    setCurrentNumberOfOptions(newNumberOfOptions);

    const newNumOfOptionsOfOption = numOfOptionsOfOption.filter((item) => {
      return item.index !== id;
    });
    setNumOfOptionsOfOption(newNumOfOptionsOfOption);
  };

  const addOptionsOfOption = (id: number) => {
    const newNumOfOptionsOfOption = numOfOptionsOfOption.map((item, index) => {
      if (index === id) {
        return {
          index: item.index,
          numOfOptions: [
            ...item.numOfOptions,
            {
              index: item.numOfOptions[item.numOfOptions.length - 1].index + 1,
            },
          ],
        };
      }

      return item;
    });

    setNumOfOptionsOfOption(newNumOfOptionsOfOption);
  };

  const removeOptionOfOptions = (mainId: number, optionId: number) => {
    const newNumOfOptionsOfOption = numOfOptionsOfOption.map((item) => {
      if (item.index === mainId) {
        return {
          index: item.index,
          numOfOptions: item.numOfOptions.filter((item) => item.index !== optionId),
        };
      }

      return item;
    });

    setNumOfOptionsOfOption(newNumOfOptionsOfOption);
  };

  return (
    <Modal {...props} isOpen={isOpen} style={optionsModalSyles}>
      <div className='min-h-96 min-w-96 space-y-3'>
        <h2 className='text-xl'>Item Options</h2>
        <div className='space-y-1'>
          {currentNumberOfOptions.map((item) => (
            <div key={item} className='flex space-x-3 items-end'>
              <TextInput required name='Name' className='lg:w-44' />
              <div className='w-[1px] h-[40px] bg-neutral-300' />
              <div className='flex space-x-2 items-center'>
                {numOfOptionsOfOption
                  .find((_item) => _item.index === item)
                  ?.numOfOptions.map((optionItem, index) => (
                    <div key={optionItem.index} className='flex items-end'>
                      <TextInput required name={`Option ${index + 1}`} className='lg:w-40' />
                      <button type='button' onClick={() => removeOptionOfOptions(item, optionItem.index)}>
                        <CiCircleRemove className='w-4 h-4 text-red-500' />
                      </button>
                    </div>
                  ))}
                <div className='w-[1px] h-[40px] bg-neutral-300 mt-auto' />
                <button type='button' onClick={() => addOptionsOfOption(item)}>
                  <IoIosAddCircleOutline className='w-6 h-6' />
                </button>
                <button type='button' onClick={() => removeOption(item)}>
                  <CiCircleRemove className='w-6 h-6 text-red-500' />
                </button>
              </div>
            </div>
          ))}
          <button type='button' onClick={addOption} className='hover:underline transition-all duration-200 ease-in-out'>
            Add option
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ItemOptionsModal;
