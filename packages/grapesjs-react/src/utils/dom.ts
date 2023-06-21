export const isDef = (value: any) => typeof value !== 'undefined';

export const isString = (value: any): value is string => typeof value === 'string';

export const prevent = (ev?: Event) => ev?.preventDefault();

export const stop = (ev?: Event) => ev?.stopPropagation();

export const loadStyle = async (href: string) => {
    const link = document.createElement('link');
    link.href = href;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
};

type ScriptToLoad = { id: string, src: string };

export const loadScript = (src: string | ScriptToLoad) => {
    const scriptToLoad = isString(src) ? { id: src, src } : src;
    return new Promise<string>((res, rej) => {
        const script = document.createElement('script');

        if (document.querySelector(`script[src="${scriptToLoad.src}"]`)) {
            return res(scriptToLoad.id);
        }

        script.src = scriptToLoad.src;
        script.onload = () => res(scriptToLoad.id);
        script.onerror = () => rej(scriptToLoad.id);
        document.head.appendChild(script);
    });
}

export const loadScripts = (scripts: { id: string, src: string }[]) => {
    const promises = scripts.map(script => loadScript(script));
    return Promise.allSettled(promises);
}