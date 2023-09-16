import { useEffect, useState } from 'react';
import useEventListener from './useEventListener';

export const useWindowScrollPositions = () => {
    const [scrollPosition, setPosition] = useState({ scrollX: 0, scrollY: 0 });

    function updatePosition() {
        setPosition({ scrollX: window.scrollX, scrollY: window.scrollY });
    }

    useEventListener('scroll', updatePosition, globalThis.window);

    return scrollPosition;
};
