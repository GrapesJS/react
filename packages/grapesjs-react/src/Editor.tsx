import { EditorInstanceProvider, EditorOptionsProvider } from './context';
import EditorInstance, { EditorInstanceProps } from './EditorInstance';
import EditorReady from './EditorReady';

export default function Editor({ children, ...rest }: EditorInstanceProps) {
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
}