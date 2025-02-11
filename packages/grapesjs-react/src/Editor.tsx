import { memo } from 'react';
import type { JSX } from 'react';
import EditorInstance, { EditorProps } from './EditorInstance';
import EditorReady from './EditorReady';
import { EditorInstanceProvider, EditorOptionsProvider } from './context';

export default memo(function Editor({ children, ...rest }: EditorProps) {
    return (
        <EditorInstanceProvider>
            <EditorOptionsProvider>
                <EditorInstance {...rest}>
                    { children }
                    <EditorReady/>
                </EditorInstance>
            </EditorOptionsProvider>
        </EditorInstanceProvider>
    );
}) as unknown as (props: EditorProps) => JSX.Element;