import { useEffect, useRef, useState } from "react";

function useClick(init = false) {
  const [click, setClick] = useState(init);
  const refParent = useRef();
  const refChild = useRef();

  useEffect(() => {
    const nodeParent = refParent.current;
    const nodeChild = refChild.current;
    function handleClick(event) {
      if (nodeParent.contains(event.target)) setClick((prev) => !prev);
      else if (!nodeChild.contains(event.target)) {
        setClick(false);
      }
    }
    if (nodeParent && nodeChild) window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [click, refChild, refParent]);
  return [click, refParent, refChild, setClick];
}

export default useClick;