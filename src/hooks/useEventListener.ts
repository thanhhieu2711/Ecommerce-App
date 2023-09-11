import { useEffect, useRef } from 'react';

export default function useEventListener(
    eventType: string,
    callback: (e: MouseEvent) => void,
    element: Window
) {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (element == null) return;
        const handler: EventListener = (e) =>
            callbackRef.current(e as MouseEvent);
        element.addEventListener(eventType, handler);

        return () => element.removeEventListener(eventType, handler);
    }, [eventType, element]);
}
