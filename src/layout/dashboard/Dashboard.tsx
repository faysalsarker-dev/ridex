

import { Header } from '@/components/modules/layout/Header';
import { Sidebar } from '@/components/modules/layout/Sidebar';
import { Outlet } from 'react-router';



const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-gray-100">
<Outlet/>
        </main>
      </div>
    </div>
  );
};

export default MainLayout