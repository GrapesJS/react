import { useRef, useEffect } from 'react';
import { useEditorOptions } from './context/EditorOptions';

export default function Canvas({ className, children, ...rest }:  React.HTMLProps<HTMLDivElement>) {
    const editorOptions = useEditorOptions();
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        canvasRef.current && editorOptions.setRefCanvas(canvasRef.current)
    }, [canvasRef.current]);

    console.log('Canvas', canvasRef.current)

    return (
        <div {...rest} className={className} ref={canvasRef}>
            { children }
        </div>
    )
  }