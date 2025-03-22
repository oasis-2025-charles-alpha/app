import { createContext, useContext, useState } from 'react';

const RefreshContext = createContext();

export function RefreshProvider({ children }) {
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    
    return (
        <RefreshContext.Provider value={{ refreshTrigger, setRefreshTrigger }}>
            {children}
        </RefreshContext.Provider>
    );
}

export const useRefresh = () => useContext(RefreshContext);