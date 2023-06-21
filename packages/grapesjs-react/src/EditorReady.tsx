import { useEffect } from 'react';
import { useEditorOptions } from './context/EditorOptions';

export default function EditorReady() {
    const options = useEditorOptions();
    console.log('EditorReady', options.ready);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => options.setReady(true), []);
    return <></>;
}