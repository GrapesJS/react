import { useEffect, memo } from 'react';
import { useEditorOptions } from './context/EditorOptions';

const EditorReady = memo(function () {
    const options = useEditorOptions();
    useEffect(() => options.setReady(true), []);
    return <></>;
});

export default EditorReady;