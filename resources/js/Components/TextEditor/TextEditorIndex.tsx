import { PropsWithChildren, forwardRef } from 'react';

interface BaseProps {
    className?: string;
    active?: boolean;
    reversed?: boolean;
    svgType?: string;
    onMouseDown?: React.MouseEventHandler<HTMLDivElement | HTMLSpanElement | SVGSVGElement>;
    //[key: string]: unknown;
}

export const Menu = forwardRef<HTMLDivElement, PropsWithChildren<BaseProps>>(({ className, ...props }, ref) => (
    <div {...props} data-test-id="menu" ref={ref} className={`flex gap-2 border-2 ${className || ''}`} />
));

export const Toolbar = forwardRef<HTMLDivElement, PropsWithChildren<BaseProps>>(
    ({ className, ...props }: PropsWithChildren<BaseProps>, ref) => (
        <Menu {...props} ref={ref} className={`border-2 border-red-500 ${className || ''}`} />
    ),
);

export const Icon = forwardRef<SVGSVGElement, PropsWithChildren<BaseProps>>(
    ({ className, svgType, ...props }: PropsWithChildren<BaseProps>, ref) => (
        <svg
            {...props}
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-6 ${className || ''}`}
        >
            <path strokeLinejoin="round" d={svgType} />
        </svg>
    ),
);

export const Button = forwardRef<HTMLSpanElement, PropsWithChildren<BaseProps>>(
    ({ className, active, reversed, ...props }, ref) => {
        return (
            <span
                {...props}
                ref={ref}
                className={`border-1 border-black ${className || ''} ${active ? 'bg-slate-400' : ''} ${reversed ? 'reversed' : ''}`}
            />
        );
    },
);
