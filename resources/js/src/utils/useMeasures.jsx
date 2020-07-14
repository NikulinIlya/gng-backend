import React, { useState, useEffect } from "react";

const MOBILE_QUERY = "screen and (max-width: 768px)";

export default function useMeasures() {
  const [matchMedia] = useState(window.matchMedia(MOBILE_QUERY));
  const [isMobile, setIsMobile] = useState(matchMedia.matches);

  const handleWidth = ({ matches }) => setIsMobile(matches);

  useEffect((_) => {
    handleWidth(matchMedia);
    matchMedia.addListener(handleWidth);
    return (_) => matchMedia.removeListener(handleWidth);
  }, []);

  return { isMobile };
}
