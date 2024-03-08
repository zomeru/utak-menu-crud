import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Edit, Footer, Menu, Navbar } from '@/components';
import { MenuProvider } from './contexts';

function App() {
  return (
    <MenuProvider>
      <div className='mx-auto max-w-[1500px] flex-col justify-center px-2 min-h-screen bg-neutral-200 py-2 text-neutral-700 space-y-2'>
        <Navbar />
        <main className='flex w-full'>
          <div className='flex w-full space-x-2 min-h-[calc(100vh-100px)]'>
            <Menu />
            <Edit />
          </div>
        </main>
        <Footer />
      </div>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </MenuProvider>
  );
}

export default App;
