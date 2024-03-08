import Modal, { Props } from 'react-modal';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { CiCircleRemove } from 'react-icons/ci';

import { optionsModalSyles } from '@/constants';
import TextInput from './inputs/TextInput';

export type Options = {
  index: number;
  name: string;
  options: {
    index: number;
    name: string;
  }[];
};

interface ItemOptionsModalProps extends Props {
  isOpen: boolean;
  closeModal: () => void;
  options: Options[];
  setOptions: React.Dispatch<React.SetStateAction<Options[]>>;
}

const ItemOptionsModal = ({
  isOpen,
  closeModal,
  options: allOptions,
  setOptions: setAllOptions,
  ...props
}: ItemOptionsModalProps) => {
  const addOption = () => {
    setAllOptions((prev) => {
      return [
        ...prev,
        {
          index: prev.length,
          name: '',
          options: [
            {
              index: 0,
              name: '',
            },
          ],
        },
      ];
    });
  };

  const removeOption = (id: number) => {
    const newOptions = allOptions.filter((item) => item.index !== id);
    setAllOptions(newOptions);
  };

  const addOptionsOfOption = (id: number) => {
    const newOptions = allOptions.map((item) => {
      if (item.index === id) {
        return {
          index: item.index,
          name: item.name,
          options: [
            ...item.options,
            {
              index: item.options[item.options.length - 1].index + 1,
              name: '',
            },
          ],
        };
      }

      return item;
    });

    setAllOptions(newOptions);
  };

  const removeOptionOfOptions = (mainOptionId: number, optionId: number) => {
    const newNumOfOptionsOfOption = allOptions.map((item) => {
      if (item.index === mainOptionId) {
        return {
          index: item.index,
          name: item.name,
          options: item.options.filter((item) => item.index !== optionId),
        };
      }

      return item;
    });

    setAllOptions(newNumOfOptionsOfOption);
  };

  const onOk = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    closeModal();
  };

  const onOptionNameChange = (e: React.ChangeEvent<HTMLInputElement>, optionId: number) => {
    const newOptions = allOptions.map((item) => {
      if (item.index === optionId) {
        return {
          ...item,
          name: e.target.value,
        };
      }

      return item;
    });
    setAllOptions(newOptions);
  };

  const onOptionOptionNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    optionId: number,
    optionOptionId: number,
  ) => {
    const newOptions = allOptions.map((item) => {
      if (item.index === optionId) {
        return {
          ...item,
          options: item.options.map((optionItem) => {
            if (optionItem.index === optionOptionId) {
              return {
                ...optionItem,
                name: e.target.value,
              };
            }

            return optionItem;
          }),
        };
      }

      return item;
    });
    setAllOptions(newOptions);
  };

  return (
    <Modal {...props} isOpen={isOpen} style={optionsModalSyles}>
      <form className='min-h-96 min-w-96 space-y-3' onSubmit={onOk}>
        <h2 className='text-xl'>Item Options</h2>
        <div className='space-y-1'>
          {allOptions.map((item) => (
            <div key={item.index} className='flex space-x-3 items-end'>
              <TextInput
                required
                name='Name'
                className='lg:w-44'
                value={item.name}
                onChange={(e) => onOptionNameChange(e, item.index)}
              />
              <div className='w-[1px] h-[40px] bg-neutral-300' />
              <div className='flex space-x-2 items-center'>
                {item.options.map((optionItem, index) => (
                  <div key={optionItem.index} className='flex items-end'>
                    <TextInput
                      required
                      name={`Option ${index + 1}`}
                      className='lg:w-40'
                      value={optionItem.name}
                      onChange={(e) => {
                        onOptionOptionNameChange(e, item.index, optionItem.index);
                      }}
                    />
                    <button type='button' onClick={() => removeOptionOfOptions(item.index, optionItem.index)}>
                      <CiCircleRemove className='w-4 h-4 text-red-500' />
                    </button>
                  </div>
                ))}
                <div className='w-[1px] h-[40px] bg-neutral-300 mt-auto' />
                <button type='button' onClick={() => addOptionsOfOption(item.index)}>
                  <IoIosAddCircleOutline className='w-6 h-6' />
                </button>
                <button type='button' onClick={() => removeOption(item.index)}>
                  <CiCircleRemove className='w-6 h-6 text-red-500' />
                </button>
              </div>
            </div>
          ))}
          <div className='flex justify-between pt-5'>
            <button
              type='button'
              onClick={addOption}
              className='flex items-center rounded-full border border-neutral-700 px-5 space-x-3 hover:bg-neutral-100 transition-all duration-200 py-2'
            >
              Add option
            </button>
            <button
              type='submit'
              className='flex items-center rounded-full border border-neutral-700 px-5 space-x-3 hover:bg-neutral-100 transition-all duration-200 py-2'
            >
              <span>OK</span>
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ItemOptionsModal;
