import { createContext, useState } from 'react';
const ScreensContext = createContext();

export const ScreensProvider = ({ children }) => {
  const [uris, setUris] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  return (
    <ScreensContext.Provider value={{searchTerm, setSearchTerm, uris, setUris}}>
      {children}
    </ScreensContext.Provider>
  );
};
export default ScreensContext;