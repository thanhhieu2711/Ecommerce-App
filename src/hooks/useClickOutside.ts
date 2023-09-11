import { RefObject } from 'react';
import useEventListener from './useEventListener';

export default function useClickOutside(
    ref: RefObject<HTMLDivElement>,
    cb: (e: MouseEvent) => void,
    targetDocument: Window
) {
    useEventListener(
        'click',
        (e) => {
            if (ref.current == null || ref.current.contains(e.target as Node))
                return;
            cb(e);
        },
        targetDocument
    );
}
