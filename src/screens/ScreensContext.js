import { createContext, useState } from 'react';
const ScreensContext = createContext();

export const ScreensProvider = ({ children }) => {
  const [album , setAlbum] = useState(null);
  const [title , setTitle] = useState(null);
  const [song , setSong] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');


  return (
    <ScreensContext.Provider value={{searchTerm, setSearchTerm, album , setAlbum, title , setTitle , song , setSong}}>
      {children}
    </ScreensContext.Provider>
  );
};
export default ScreensContext;