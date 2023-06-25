import { useEffect, useRef } from "react";
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