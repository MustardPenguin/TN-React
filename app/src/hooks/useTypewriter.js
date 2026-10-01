import { useEffect, useRef, useState } from 'react';
import { createTypewriter } from '../lib/typewriter.js';

/**
 * React wrapper around lib/typewriter.js. Returns the text typed so far.
 * Runs only while `enabled`; turning it off and on again continues with the
 * next phrase, from an empty string.
 */
export function useTypewriter({ phrases, enabled }) {
  const [text, setText] = useState('');
  const typewriter = useRef(null);

  useEffect(() => {
    typewriter.current = createTypewriter({ phrases, onUpdate: setText });
    return () => typewriter.current.stop();
  }, [phrases]);

  useEffect(() => {
    if (!enabled) return undefined;
    setText('');
    typewriter.current.start();
    return () => typewriter.current.stop();
  }, [enabled, phrases]);

  return text;
}
