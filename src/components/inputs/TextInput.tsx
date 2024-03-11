interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  className?: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const TextInput = ({ name, value, onChange, type = 'text', className, ...props }: TextInputProps) => {
  return (
    <div className={`group relative w-full md:w-80 lg:w-96 ${className}`}>
      <label
        htmlFor={name}
        className='block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-neutral-700'
      >
        {name}
      </label>
      <input
        id={name}
        {...props}
        value={value}
        onChange={onChange}
        type={type}
        className='peer h-10 w-full rounded-xl bg-gray-100 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-neutral-700 disabled:cursor-not-allowed'
      />
    </div>
  );
};

export default TextInput;
