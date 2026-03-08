"use client";

import { useEffect } from "react";

/**
 * Native scrolling only.
 * Kept as a hook so existing imports do not need to change.
 */
export function useSmoothWheel(_containerSelector = ".scroll") {
  useEffect(() => {
    return;
  }, [_containerSelector]);
}
