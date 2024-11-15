import { useEffect, useState } from "react";

const FormScrollProgressLine = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(Math.round((window.scrollY / scrollable) * 100));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const canScroll = document.documentElement.scrollHeight > window.innerHeight;

  if (!canScroll) {
    return null;
  }
  return (
    <div className="h-1 w-full bg-gray-200">
      <div
        className="h-full bg-blue-500"
        style={{ width: `${Math.max(scrollProgress, 10)}%` }}
      ></div>
    </div>
  );
};
export default FormScrollProgressLine;
