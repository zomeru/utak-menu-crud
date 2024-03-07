import { CiSearch } from 'react-icons/ci';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
  const [searchParams, setQueryParams] = useSearchParams();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    if (search) {
      searchParams.set('search', search);
    } else {
      searchParams.delete('search');
    }
    setQueryParams(searchParams);
  };

  return (
    <div className='flex items-center space-x-2 bg-neutral-100 p-2 rounded-full'>
      <CiSearch className='text-gray-500 w-5 h-5' />
      <input
        type='text'
        placeholder='Search'
        className='bg-neutral-100 border-b border-gray-100 focus:outline-none w-60'
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
