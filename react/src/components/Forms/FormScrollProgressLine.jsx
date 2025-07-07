import { useEffect, useState } from "react";

const FormScrollProgressLine = ({ settingsFormHeight }) => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isPageScrollable, setIsPageScrollable] = useState(false);

    useEffect(() => {
        const updateScrollProgress = () => {
            const totalScrollableHeightInPixels =
                document.documentElement.scrollHeight - window.innerHeight;
            const roundedScrollPercentage =
                Math.round((window.scrollY / totalScrollableHeightInPixels) * 100);
            setScrollProgress(roundedScrollPercentage);
        };

        if (isPageScrollable) {
            updateScrollProgress();
            window.addEventListener("scroll", updateScrollProgress);
        } else {
            window.removeEventListener("scroll", updateScrollProgress);
        }

        return () => window.removeEventListener("scroll", updateScrollProgress);
    }, [isPageScrollable]);

    /**
     * The settingsFormHeight variable is only used to trigger this useEffect.
     * Not using it in setIsPageScrollable() to remain consistent with the values
     * used for scrollable in updateScrollProgress() above.
     */
    useEffect(() => {
        const isPageScrollableOnRerender = document.documentElement.scrollHeight > window.innerHeight;
        if (isPageScrollable !== isPageScrollableOnRerender) {
            setIsPageScrollable(isPageScrollableOnRerender);
        }
    }, [settingsFormHeight]);

    if (!isPageScrollable) {
        return null;
    }
    return (
        <div className="h-1 w-full bg-gray-200">
            <div
                className="h-full bg-blue-500"
                style={{ width: `${Math.max(scrollProgress, 5)}%` }}
            ></div>
        </div>
    );
};

FormScrollProgressLine.displayName = 'FormScrollProgressLine';
export default FormScrollProgressLine;
