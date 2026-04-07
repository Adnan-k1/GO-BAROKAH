import { useLocation } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const noLayoutPages = ['/login', '/signup'];
  const showLayout = !noLayoutPages.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      {showLayout && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {showLayout && <Footer />}
    </div>
  );
};

export default MainLayout;