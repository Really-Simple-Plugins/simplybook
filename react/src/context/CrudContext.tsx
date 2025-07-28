import React, { createContext, useContext, useState } from 'react';

const CrudContextStub = {
    crudContext: null,
    setCrudContext: (newContext: any) => {
        return false;
    }
}

/**
 * Context for CRUD operations state management.
 * Used to share CRUD-related data and functions across components.
 */
const CrudContext = createContext(CrudContextStub);

/**
 * Hook to access the CRUD context.
 * @returns The CRUD context value
 */
export const useCrudContext = () => useContext(CrudContext);

export const CrudContextProvider = ({children}: {children: React.ReactNode}) => {
    const [crudContext, setContext] = useState(null);

    const setCrudContext = (newContext: any) => {
        setContext(newContext);
        return false;
    }

    return (
        <CrudContext.Provider
            value={{crudContext, setCrudContext}}
        >
            {children}
        </CrudContext.Provider>
    );
}