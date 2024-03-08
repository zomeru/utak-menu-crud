interface OptionTextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const OptionTextInput = ({ name, value, onChange, type = 'text', ...props }: OptionTextInputProps) => {
  return (
    <div className={`group relative w-32 md:w-32 lg:w-32`}>
      <label
        htmlFor={name}
        className='block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-neutral-700'
      >
        {name}
      </label>
      <input
        {...props}
        value={value}
        id={name}
        onChange={onChange}
        type={type}
        className='peer h-10 w-full rounded-xl bg-gray-100 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-neutral-700'
      />
    </div>
  );
};

export default OptionTextInput;
