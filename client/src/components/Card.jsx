import { forwardRef } from 'react';

const Card = forwardRef(function Card({ children, className = '' }, ref) {
  return (
    <section ref={ref} className={`rounded-lg border border-line bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 ${className}`}>
      {children}
    </section>
  );
});

export default Card;
