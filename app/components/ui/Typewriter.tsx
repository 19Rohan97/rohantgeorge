'use client';
import React from 'react';

export default function Typewriter({
  words,
  typingSpeed = 90,
  deletingSpeed = 55,
  pauseMs = 900,
  loop = true,
  className = '',
}: {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
  loop?: boolean;
  className?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const [text, setText] = React.useState('');
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    if (!words || words.length === 0) return;
    const current = words[index % words.length];

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }

    if (deleting && text === '') {
      if (!loop && index + 1 >= words.length) return; // stop if not looping
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const next = deleting
      ? current.slice(0, Math.max(0, text.length - 1))
      : current.slice(0, text.length + 1);

    const t = setTimeout(() => setText(next), deleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(t);
  }, [text, deleting, index, words, typingSpeed, deletingSpeed, pauseMs, loop]);

  // Kick off typing when index changes to a new word
  React.useEffect(() => {
    const current = words[index % words.length] || '';
    if (text.length > current.length) setText('');
  }, [index]);

  return (
    <span className={className} aria-live="polite" aria-atomic="true">
      {text}
      <span className="inline-block w-[1px] align-baseline ml-[2px] h-[1em] translate-y-[1px] bg-current opacity-70" />
    </span>
  );
}
