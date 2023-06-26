import { PropsWithChildren } from 'react';
import { useEditorMaybe } from '.';

const WithEditor = ({ children }: PropsWithChildren) => {
    const editor = useEditorMaybe();

    return editor ? children : null;
}

export default WithEditor;