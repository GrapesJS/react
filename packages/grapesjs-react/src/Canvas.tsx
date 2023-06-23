import { useRef, useEffect } from 'react';
import { useEditorOptions } from './context/EditorOptions';

export default function Canvas({ children, ...rest }:  React.HTMLProps<HTMLDivElement>) {
    const editorOptions = useEditorOptions();
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        canvasRef.current && editorOptions.setRefCanvas(canvasRef.current)
    }, [canvasRef.current]);

    return (
        <div {...rest} ref={canvasRef}>
            { children }
        </div>
    )
  }