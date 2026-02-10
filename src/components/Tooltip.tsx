import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'bottom' }) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    timerRef.current = setTimeout(() => {
      setVisible(true);
    }, 400);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  useEffect(() => {
    if (visible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      let x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
      let y = position === 'bottom'
        ? triggerRect.bottom + 6
        : triggerRect.top - tooltipRect.height - 6;

      if (x < 4) x = 4;
      if (x + tooltipRect.width > window.innerWidth - 4) x = window.innerWidth - tooltipRect.width - 4;

      setCoords({ x, y });
    }
  }, [visible, position]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      ref={triggerRef}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      className="inline-flex"
    >
      {children}
      {visible && (
        <div
          ref={tooltipRef}
          className="custom-tooltip"
          style={{
            position: 'fixed',
            left: coords.x,
            top: coords.y,
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
