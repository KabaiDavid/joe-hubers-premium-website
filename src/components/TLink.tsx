import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { flushSync } from 'react-dom';
import { useHref, useNavigate } from 'react-router';
import { withViewTransition } from '../lib/motion';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

/** Internal link that animates the route change with the View Transitions API. */
export const TLink = forwardRef<HTMLAnchorElement, Props>(function TLink({ to, onClick, ...rest }, ref) {
  const navigate = useNavigate();
  const href = useHref(to);
  return (
    <a
      ref={ref}
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        const [path] = to.split('#');
        const samePage = path === '' || path === window.location.pathname;
        if (samePage) {
          navigate(to);
          return;
        }
        withViewTransition(() => flushSync(() => navigate(to)));
      }}
    />
  );
});
