import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { store } from './app/store';
import Sidebar from './Components/Sidebar';
import Contacts from './Pages/Contacts';
import ChartsAndMaps from './Pages/ChartsAndMaps';
import ContactDetails from './Components/ContactDetails';
import Loader from './Components/loader';  // Import Loader
import FullPageLoader from './Components/FullPageLoader'; // Import FullPageLoader

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} /> {/* Pass props to Sidebar */}
          <MainContent isCollapsed={isCollapsed} />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

const MainContent: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' && <FullPageLoader />} {/* Show full-page loader on homepage */}
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-[80px]' : 'ml-[256px]'} flex-1 p-4 relative overflow-auto h-screen`}>
        {location.pathname !== '/' && <Loader />} {/* Show regular loader on other pages */}
        <Routes>
          <Route path="/" element={<Contacts />} />
          <Route path="/charts-and-maps" element={<ChartsAndMaps />} />
          <Route path="/contacts/:id" element={<ContactDetails />} />
        </Routes>
      </div>
    </>
  );
};

export default App;