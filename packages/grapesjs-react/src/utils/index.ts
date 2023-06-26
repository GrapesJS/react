import { useEffect, useRef } from "react";

type ClassNameInput = string | number | boolean | null | undefined;
type ClassNameInputs = ClassNameInput | Array<ClassNameInput>;

export function cx(...inputs: ClassNameInputs[]): string {
    const inp = Array.isArray(inputs[0]) ? inputs[0] : [...inputs];
    return inp.filter(Boolean).join(' ');
}

export function isFunction(value: any):
     // eslint-disable-next-line @typescript-eslint/ban-types
     value is Function
{
    return typeof value === 'function';
}

export function noop() {}

export function useTraceUpdate(props: Record<string, any>) {
    const prev = useRef(props);
    useEffect(() => {
        const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
            if (prev.current[k] !== v) {
                (ps as any)[k] = [prev.current[k], v];
            }
            return ps;
        }, {});
        if (Object.keys(changedProps).length > 0) {
            console.log('Changed props:', changedProps);
        }
        prev.current = props;
    });
}