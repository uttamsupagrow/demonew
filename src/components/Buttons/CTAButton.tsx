import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonBaseProps {
  children: ReactNode;
  className?: string;
}

const base =
  'shine group inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-wide transition-all duration-300 active:scale-[0.97] select-none';

const sizes = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-[0.95rem]',
};

const looks = {
  primary: 'bg-espresso text-white hover:bg-accent-deep shadow-sm hover:shadow-md',
  accent: 'bg-accent text-white hover:bg-accent-deep shadow-sm hover:shadow-md',
  outline: 'border border-line bg-transparent text-ink hover:border-espresso hover:bg-espresso hover:text-white',
  ghostLight: 'border border-white/40 text-white hover:bg-white hover:text-espresso backdrop-blur-sm',
};

function Inner({ children, arrow }: { children: ReactNode; arrow: boolean }) {
  return (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );
}

export interface CTAButtonProps extends ButtonBaseProps {
  href?: string;
  to?: string;
  onClick?: () => void;
  variant?: keyof typeof looks;
  size?: keyof typeof sizes;
  arrow?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
  fullWidth?: boolean;
  ariaLabel?: string;
}

/** Polished CTA with shine sweep, arrow micro-interaction and press feedback. */
export default function CTAButton({
  children,
  href,
  to,
  onClick,
  variant = 'primary',
  size = 'md',
  arrow = true,
  type = 'button',
  disabled,
  fullWidth,
  ariaLabel,
  className = '',
}: CTAButtonProps) {
  const cls = `${base} ${sizes[size]} ${looks[variant]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`;
  const content = <Inner arrow={arrow}>{children}</Inner>;

  if (to) {
    return (
      <Link to={to} className={cls} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }
  if (href) {
    const external = href.startsWith('http');
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
