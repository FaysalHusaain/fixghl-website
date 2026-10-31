"use client";

import { useEffect } from "react";

// Opens a <details> FAQ item when the URL hash points at it (e.g. the Care Plan link on /pricing).
export function OpenOnHash() {
  useEffect(() => {
    const open = () => {
      const el = window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null;
      if (el instanceof HTMLDetailsElement) el.open = true;
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);
  return null;
}
