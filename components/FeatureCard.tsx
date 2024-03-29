'use client';

import { type FC, useEffect, useRef } from 'react';
import '@/styles/feature-card.css';

interface FeatureCardProps {
  title: string;
  subtitle: string;
  icon: string[];
  isLinkingRequired?: boolean;
}

const FeatureCard: FC<FeatureCardProps> = ({ title, subtitle, icon, isLinkingRequired }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  function mouseMoveEvent(e: MouseEvent) {
    const { current } = containerRef;
    if (!current) return;
    const { left, top } = current.getBoundingClientRect();
    current.style.setProperty('--mouse-x', `${e.clientX - left}px`);
    current.style.setProperty('--mouse-y', `${e.clientY - top}px`);
  }

  useEffect(() => {
    const { current } = containerRef;
    if (!current) return;
    current.addEventListener('mousemove', mouseMoveEvent);
    return () => current?.removeEventListener('mousemove', mouseMoveEvent);
  }, [containerRef]);

  return (
    <div
      ref={containerRef}
      className='card flex flex-col relative overflow-hidden height-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none border bg-default-400/25 dark:bg-default-400/10 backdrop-blur-lg backdrop-saturate-[1.8]'
      tabIndex={-1}
    >
      <div className='flex p-3 z-10 w-full justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large gap-2 pb-0'>
        <div className='flex justify-center p-2 rounded-full items-center bg-secondary-200/80 dark:bg-secondary-200 text-indigo-600 dark:text-indigo-500'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='opacity-80 group-hover:opacity-100'
          >
            {icon.map((path) => (
              <path key={path} d={path} stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            ))}
          </svg>
        </div>
        <p className='text-base font-semibold'>{title}</p>
      </div>
      <div className='relative flex w-full p-5 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased justify-between'>
        <p className='text-slate-500 dark:text-slate-400 text-sm opacity-70'>{subtitle}</p>
        {isLinkingRequired && (
          <span className='text-slate-500 dark:text-slate-400 text-tiny pt-3'>
            *Linking your account to TMDB service is required.
          </span>
        )}
      </div>
    </div>
  );
};

export default FeatureCard;
