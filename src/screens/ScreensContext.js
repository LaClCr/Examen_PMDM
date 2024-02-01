import { createContext, useState } from 'react';
const ScreensContext = createContext();

export const ScreensProvider = ({ children }) => {
  const [uris, setUris] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isVideo, setIsVideo] = useState(false);
  const [mediaUriName, setMediaUriName] = useState([{}]);


  return (
    <ScreensContext.Provider value={{searchTerm, setSearchTerm, uris, setUris, isVideo, setIsVideo, mediaUriName, setMediaUriName}}>
      {children}
    </ScreensContext.Provider>
  );
};
export default ScreensContext;