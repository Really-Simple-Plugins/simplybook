import { createContext, useContext } from 'react';

/**
 * Context for CRUD operations state management.
 * Used to share CRUD-related data and functions across components.
 */
const CrudContext = createContext({
    crudContext: null,
    setCrudContext: () => {}
});

/**
 * Hook to access the CRUD context.
 * @returns The CRUD context value
 */
export const useCrudContext = () => useContext(CrudContext);

export default CrudContext;