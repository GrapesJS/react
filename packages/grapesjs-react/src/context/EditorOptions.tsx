import { createContext, useContext, useState } from 'react';

const EditorOptionsContext = createContext<EditorOptionsState | null>(null);

export interface EditorOptionsState {
    refCanvas?: HTMLElement;
    customModal?: boolean;
    customAssets?: boolean;
    customStyles?: boolean;
    customBlocks?: boolean;
    customLayers?: boolean;
    customSelectors?: boolean;
    customTraits?: boolean;
    customRte?: boolean;
    ready?: boolean;
    setRefCanvas: (ref: HTMLElement) => void;
    setCustomModal: (value: boolean) => void;
    setCustomAssets: (value: boolean) => void;
    setCustomBlocks: (value: boolean) => void;
    setCustomRte: (value: boolean) => void;
    setCustomStyles: (value: boolean) => void;
    setCustomLayers: (value: boolean) => void;
    setCustomSelectors: (value: boolean) => void;
    setCustomTraits: (value: boolean) => void;
    setReady: (value: boolean) => void;
}


export const EditorOptionsProvider = ({ children }: {
    children?: React.ReactNode,
}) => {
    const [state, setState] = useState<EditorOptionsState>(() => ({
        setRefCanvas(refCanvas) {
            setState((state) => ({ ...state, refCanvas }))
        },
        setCustomModal(customModal) {
            setState((state) => ({ ...state, customModal }))
        },
        setCustomAssets(customAssets) {
            setState((state) => ({ ...state, customAssets }))
        },
        setCustomBlocks(customBlocks) {
            setState((state) => ({ ...state, customBlocks }))
        },
        setCustomRte(customRte) {
            setState((state) => ({ ...state, customRte }))
        },
        setCustomStyles(customStyles) {
            setState((state) => ({ ...state, customStyles }))
        },
        setCustomLayers(customLayers) {
            setState((state) => ({ ...state, customLayers }))
        },
        setCustomSelectors(customSelectors) {
            setState((state) => ({ ...state, customSelectors }))
        },
        setCustomTraits(customTraits) {
            setState((state) => ({ ...state, customTraits }))
        },
        setReady(ready) {
            setState((state) => ({ ...state, ready }))
        },
    }));

    return (
        <EditorOptionsContext.Provider value={state}>
            { children }
        </EditorOptionsContext.Provider>
    )
};

/**
 * Context used to keep the editor instance once initialized
 */
export const useEditorOptions = () => {
    const context = useContext(EditorOptionsContext);

    if (!context) {
        throw new Error('useEditorOptions must be used within EditorOptionsProvider');
    }

    return context;
};


// export const useEditor = () => {
//     // TODO ensure editor is used inside provider
//     return useEditorOptions().editor;
// }

export default EditorOptionsContext;