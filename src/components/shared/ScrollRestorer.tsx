"use client";

import { useEffect } from "react";

export default function ScrollRestorer() {
  useEffect(() => {
    // Reset scroll to top on refresh/load
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}
