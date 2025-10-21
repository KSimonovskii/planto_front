import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 768) {
    const query = `(max-width: ${breakpoint - 0.02}px)`;
    const [isMobile, setIsMobile] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia(query).matches;
    });

    useEffect(() => {
        const mql = window.matchMedia(query);
        const onChange = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);

        setIsMobile(mql.matches);

        if ('addEventListener' in mql) {
            mql.addEventListener('change', onChange as EventListener);
        } else {
            (mql as any).addListener(onChange);
        }

        return () => {
            if ('removeEventListener' in mql) {
                mql.removeEventListener('change', onChange as EventListener);
            } else {
                (mql as any).removeListener(onChange);
            }
        };
    }, [query]);

    return isMobile;
}
