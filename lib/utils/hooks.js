import { useEffect, useRef } from 'preact/hooks';

export function useUpdateEffect(effect, deps) {
    const mounted = useRef(false);

    useEffect(() => {
        if (mounted.current) {
            effect();
        } else {
            mounted.current = true;
        }
    }, deps);
}
