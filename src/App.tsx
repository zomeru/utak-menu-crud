import { Edit, Footer, Menu, Navbar } from '@/components';

function App() {
  return (
    <div className='w-full max-w-[1500px] flex-col justify-center px-2 min-h-screen bg-neutral-200 py-2 text-neutral-700 space-y-2'>
      <Navbar />
      <main className='flex w-full'>
        <div className='flex w-full space-x-2 min-h-[calc(100vh-100px)]'>
          <Menu />
          <Edit />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
