import { useEffect, useState } from "react";

const FormScrollProgressLine = ({ settingsFormHeight }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(Math.round((window.scrollY / scrollable) * 100));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * The settingsFormHeight variable is only used to trigger useEffect.
   * Not using it in setCanScroll() to remain consistent with the values used
   * for scrollable in onScroll() above.
   */
  useEffect(() => {
    setCanScroll(document.documentElement.scrollHeight > window.innerHeight);
  }, [settingsFormHeight]);

  if (!canScroll) {
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
