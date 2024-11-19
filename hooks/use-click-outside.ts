"use client";

import { useEffect, RefObject } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  enabled: boolean = true,
  excludeRefs: RefObject<HTMLElement>[] = []
) {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const el = ref.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(target)) {
        return;
      }

      // Check if click is inside any excluded refs
      for (const excludeRef of excludeRefs) {
        if (excludeRef.current?.contains(target)) {
          return;
        }
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener, { capture: true });
    document.addEventListener('touchstart', listener, { capture: true });

    return () => {
      document.removeEventListener('mousedown', listener, { capture: true });
      document.removeEventListener('touchstart', listener, { capture: true });
    };
  }, [ref, handler, enabled, excludeRefs]);
}