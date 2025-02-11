import type { PropsWithChildren } from 'react';
import { useEditorMaybe } from '.';

/**
 * Load children once the editor is available
 */
const WithEditor = ({ children }: PropsWithChildren) => {
    const editor = useEditorMaybe();

    return editor ? <>{ children }</> : <></>;
}

export default WithEditor;