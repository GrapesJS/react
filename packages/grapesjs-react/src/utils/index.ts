import type { PluginOptions } from "grapesjs";
import { loadScripts } from "./dom";

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

type ClassNameInput = string | number | boolean | null | undefined;
type ClassNameInputs = ClassNameInput | Array<ClassNameInput>;

export function cx(...inputs: ClassNameInputs[]): string {
    const inp = Array.isArray(inputs[0]) ? inputs[0] : [...inputs];
    return inp.filter(Boolean).join(' ');
}