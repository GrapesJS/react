import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { isString } from "./dom";

export const WrapDom = (el: HTMLElement | string) => {
    return function WrapElement() {
        const ref = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const { current } = ref;

            if (current) {
                if (isString(el)) {
                    current.innerHTML = el;
                } else {
                    current.appendChild(el);
                }
            }
        }, [ref.current])

        return <div ref={ref}/>
    }
}

export interface PortalContainerProps {
    children: React.ReactNode
}

export type PortalContainerResult = React.FC<PortalContainerProps>;

const elContainerMap = new WeakMap<HTMLElement, PortalContainerResult>();

export function portalContainer(el?: HTMLElement): PortalContainerResult {
    if (!el) {
        return () => null;
    }

    const prevResult = elContainerMap.get(el);

    if (prevResult) {
        return prevResult;
    }

    const result = function Container({ children }: PortalContainerProps) {
        return createPortal(children, el);
    };

    elContainerMap.set(el, result);

    return result;
}