import { EditorInstanceProvider, EditorOptionsProvider } from './context';
import EditorInstance, { EditorProps } from './EditorInstance';
import EditorReady from './EditorReady';

export default function Editor({ children, ...rest }: EditorProps) {
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