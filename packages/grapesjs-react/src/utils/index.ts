import { loadScripts } from "./dom";

type PluginOptions = Record<string, any>;

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