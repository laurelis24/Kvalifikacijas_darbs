import { PropsWithChildren, Ref } from "react";

interface BaseProps {
    className?: string;
    active?: boolean;
    reversed?: boolean;
    svgType?: string;
    onMouseDown?: React.MouseEventHandler<HTMLDivElement | HTMLSpanElement | SVGSVGElement>;
    //[key: string]: unknown;
}

export function Menu({ className, ref, ...props }: PropsWithChildren<BaseProps> & { ref?: Ref<HTMLDivElement> }) {
    return (
        <div {...props} data-test-id="menu" ref={ref} className={`flex gap-2 rounded-lg border ${className || ""}`} />
    );
}

export function Toolbar({ className, ref, ...props }: PropsWithChildren<BaseProps> & { ref?: Ref<HTMLDivElement> }) {
    return <Menu {...props} ref={ref} className={`p-2 ${className || ""}`} />;
}

export function Icon({
    className,
    svgType,
    ref,
    ...props
}: PropsWithChildren<BaseProps> & { ref?: Ref<SVGSVGElement> }) {
    return (
        <svg
            {...props}
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-6 ${className || ""}`}
        >
            <path strokeLinejoin="round" d={svgType} />
        </svg>
    );
}
export function Button({
    className,
    active,
    reversed,
    ref,
    ...props
}: PropsWithChildren<BaseProps> & { ref?: Ref<HTMLSpanElement> }) {
    return (
        <span
            {...props}
            ref={ref}
            className={`cursor-pointer rounded-full border p-4 duration-200 hover:border-slate-800 ${className || ""} ${active ? "bg-slate-800 text-white" : ""} ${reversed ? "reversed" : ""}`}
        />
    );
}
