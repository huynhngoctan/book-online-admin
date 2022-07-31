import { createContext, useEffect, useState } from 'react';

const UserContext = createContext();
function UserProvider({ children }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        const userLocal = localStorage.getItem('user');
        if (userLocal !== null) {
            setUser(JSON.parse(userLocal));
        }
    }, []);
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
