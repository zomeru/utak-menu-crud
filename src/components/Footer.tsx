const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='bg-white py-2 rounded-xl'>
      <div className='flex justify-center space-x-2'>
        <p>© {year}</p>
        <a href='https://github.com/zomeru' target='_blank' className='hover:underline'>
          Made by <span className='font-semibold'>Zomeru</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
