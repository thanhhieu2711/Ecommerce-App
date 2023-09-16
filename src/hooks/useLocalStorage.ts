import { useState } from 'react';

const useLocalStorage = (key: string, initialValue: '') => {
    const [state, setState] = useState(() => {
        // Initialize the state
        try {
            const value = window.localStorage.getItem(key);
            return value ? JSON.parse(value) : initialValue;
        } catch (error) {
            console.log(error);
        }
    });

    const setValue = (value: string) => {
        try {
            // If the passed value is a callback function,
            //  then call it with the existing state.

            window.localStorage.setItem(key, JSON.stringify(value));
            setState(value);
        } catch (error) {
            console.log(error);
        }
    };

    return [state, setValue];
};

export default useLocalStorage;
