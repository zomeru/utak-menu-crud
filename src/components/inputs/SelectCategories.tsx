import { useCategories } from '@/hooks';

interface SelectCategoriesProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  value?: string | number | readonly string[] | undefined;
}

const SelectCategories = ({ value, onChange, ...props }: SelectCategoriesProps) => {
  const categories = useCategories();

  return (
    <div className='group relative w-72 md:w-80 lg:w-96'>
      <label
        htmlFor='categories'
        className='block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-neutral-700'
      >
        Select Category
      </label>
      <select
        {...props}
        onChange={onChange}
        value={value}
        name='categories'
        id='categories'
        className='peer h-10 w-full rounded-xl bg-gray-100 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-neutral-700'
      >
        <option value=''>Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCategories;
