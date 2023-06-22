import type { PluginOptions } from "grapesjs";
import { loadScripts } from "./dom";
import { useEffect, useRef } from "react";

type ClassNameInput = string | number | boolean | null | undefined;
type ClassNameInputs = ClassNameInput | Array<ClassNameInput>;

export type PluginToLoad = {
    id: string,
    src: string,
    options?: PluginOptions,
}

export async function loadPlugins(plugins: PluginToLoad[]) {
    const scripts = plugins.map(({ id, src }) => ({ id, src }));
    const pluginsMap = plugins.reduce((res, item) => {
        res[item.id] = item;
        return res;
    }, {} as Record<string, PluginToLoad>);
    const loaded: PluginToLoad[] = [];
    const failed: PluginToLoad[] = [];
    const results = await loadScripts(scripts);
    results.forEach(result => {
        if (result.status === 'fulfilled') {
            loaded.push(pluginsMap[result.value]);
        } else {
            failed.push(pluginsMap[result.reason]);
        }
    })

    return { loaded, failed };
}

export function cx(...inputs: ClassNameInputs[]): string {
    const inp = Array.isArray(inputs[0]) ? inputs[0] : [...inputs];
    return inp.filter(Boolean).join(' ');
}

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