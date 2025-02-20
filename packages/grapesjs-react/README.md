# GrapesJS React

<img width="1075" src="https://github.com/GrapesJS/react/assets/11614725/ca2cdbef-4ad2-4e5e-b0a1-c8218065efca">

> Requires GrapesJS v0.21.3 or higher

The official [GrapesJS](https://grapesjs.com) wrapper for React that allows you to build custom and declarative UI for your editor.

The goal of this library is not to provide UI components but simple wrappers around the core GrapesJS modules and let you define your own UI components and access easily the GrapesJS API.

> **Warning**: This library is NOT intended to render your React components inside the GrapesJS canvas, here it's all about the custom UI around the canvas itself.

## Installation

The core `grapesjs` library is not bundled with the wrapper itself so you have to install it separately.

```sh
npm i grapesjs @grapesjs/react
```

## Compatibility

#### @grapesjs/react v1.X

- React v18.X
- GrapesJS v0.21.3 or higher
- NextJS v14.X

#### @grapesjs/react v2.X

- React v18.X or v19.X
- GrapesJS v0.22.5 or higher
- NextJS v15.X

### Default UI

This is the simplest and more traditional way to use the wrapper with GrapesJS as it relies on the default UI provided by GrapesJS. This approach is less customizable from React perspective and all the UI customization has to be done via GrapesJS (basically how you would do without the wrapper).

```ts
import grapesjs, { Editor } from 'grapesjs';
import GjsEditor from '@grapesjs/react';

export default function DefaultEditor() {
  const onEditor = (editor: Editor) => {
    console.log('Editor loaded', { editor });
  };

  return (
    <GjsEditor
      // Pass the core GrapesJS library to the wrapper (required).
      // You can also pass the CDN url (eg. "https://unpkg.com/grapesjs")
      grapesjs={grapesjs}
      // Load the GrapesJS CSS file asynchronously from URL.
      // This is an optional prop, you can always import the CSS directly in your JS if you wish.
      grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
      // GrapesJS init options
      options={{
        height: '100vh',
        storageManager: false,
      }}
      onEditor={onEditor}
    />
  );
}
```

[Live Example](https://stackblitz.com/edit/grapesjs-react-default-ui)

### Custom UI

This is the more powerful and declarative way to use the wrapper as it gives you full control over the UI of your editor. Using the `<Canvas/>` component inside the main wrapper will disable the core default UI.

```ts
import grapesjs, { Editor } from 'grapesjs';
import GjsEditor, { Canvas } from '@grapesjs/react';

export default function CustomEditor() {
  const onEditor = (editor: Editor) => {
    console.log('Editor loaded', { editor });
  };

  return (
    <GjsEditor
      grapesjs={grapesjs}
      grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
      onEditor={onEditor}
      options={{
        height: '100vh',
        storageManager: false,
      }}
    >
        <div>
        // ... use your UI components
            <Canvas /> // place the GrapesJS canvas where you wish
        // ...
        </div>
    </GjsEditor>
  );
}
```

Here below you can find a good example (with the usage of all available providers) of how you would build a full custom editor around GrapesJS by using your own React components.

> **Note**: The app doesn't cover all the [GrapesJS API](https://grapesjs.com/docs/api/) but simply provides a good starting point to understand how to create your own custom editor.

[Live Example](https://stackblitz.com/edit/grapesjs-react-custom-ui)

### Get the editor in your components

You can easily access the editor instance in your custom components by using the `useEditor` hook. One only caveat is to use it once the editor is actually created and for this use case, you can rely on the `<WithEditor>` component as a wrapper. Alternatively, you can use `useEditorMaybe` hook and check by yourself if the editor exists.

```ts
import GjsEditor, { WithEditor, useEditor, useEditorMaybe } from '@grapesjs/react';

function MyComponentWithUseEditor() {
    // The `editor` is always defined.
    const editor = useEditor();
    return (...);
}

function MyComponentWithUseEditorMaybe() {
    // The `editor` is not immediately available
    const editor = useEditorMaybe();
    return (
        <div>
            <div>I will be rendered immediately</div>
            <div>
                Editor: { editor ? 'created' : 'not yet created' }.
            </div>
        </div>
    );
}

export default function CustomEditor() {
  return (
    <GjsEditor ...>
        // ...
        <WithEditor>
            // This component won't be rendered until the editor is created
            <MyComponentWithUseEditor/>
        </WithEditor>
        <MyComponentWithUseEditorMaybe/>
    </GjsEditor>
  );
}
```

> By using components inside the built-in providers, the `editor` is always defined.

## Development

Clone the repository

```sh
$ git clone https://github.com/GrapesJS/react.git
$ cd react
```

Install it

```sh
$ yarn i
```

Start the dev server

```sh
$ yarn start
```

## License

MIT
