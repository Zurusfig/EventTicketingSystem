"use client";
import { useEffect, useState } from "react";

interface ScrollDisablerProps {
    children: React.ReactNode;
    breakpoint?: number;
}

export default function ScrollDisabler({ children, breakpoint = 768 }: ScrollDisablerProps) {
    const [shouldDisableScroll, setShouldDisableScroll] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            // Only disable scroll on screens larger than breakpoint
            const isLargeScreen = window.innerWidth >= breakpoint;
            setShouldDisableScroll(isLargeScreen);
            
            if (isLargeScreen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'unset';
            }
        };

        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
            document.body.style.overflow = 'unset';
        };
    }, [breakpoint]);

    return <>{children}</>;
}