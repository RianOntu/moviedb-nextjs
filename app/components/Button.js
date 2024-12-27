'use client';

export default function Button({ addToWatchLater, children, className }) {
  return (
    <button onClick={addToWatchLater} className={className}>
      {children}
    </button>
  );
}