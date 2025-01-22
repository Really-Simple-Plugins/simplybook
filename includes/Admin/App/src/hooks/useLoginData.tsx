import { useState } from "react";

const useLoginData = () => {
    const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);
    return {
        alreadyLoggedIn: alreadyLoggedIn,
        setAlreadyLoggedIn,
    };
};

export default useLoginData;
