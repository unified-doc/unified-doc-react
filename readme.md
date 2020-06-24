# unified-doc-react
[`react`][react] wrapper for [**unified-doc**][unified-doc].

## Install
```sh
npm install unified-doc-react
```

## Use
For quick and easy rendering of a document, use the React component:

```js
import React from 'react';
import { Doc } from 'unified-doc-react';

const options = {
  content: '<blockquote><strong>some</strong>content</blockquote>',
  filename: 'doc.html',
};

function MyDoc() {
  return (
    <Doc
      className="my-doc"
      options={options}
    />
  );
}
```

For building more advanced and interactive document applications, wrap your component with a `DocProvider`.  All components under the `DocProvider` have access to the `doc` instance via the `useDoc` hook.

```js
// App.js
import React from 'react';
import { DocProvider } from 'unified-doc-react';

import MyDoc from './MyDoc';

const options = {
  content: '<blockquote><strong>some</strong>content</blockquote>',
  filename: 'doc.html',
};

function MyApp() {
  return (
    <DocProvider options={options}>
      <MyDoc />
    </DocProvider>
  );
}

// MyDoc.js
import React, { useState } from 'react';
import { useDoc } from 'unified-doc-react';

function MyDoc() {
  const doc = useDoc();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const file = doc.file();
  const compiled = doc.compile();
  const textContent = doc.textContent();

  function download(extension) {
    const { content, name, type } = doc.file(extension);
    const file = new File([content], name, { type });
    const link = document.createElement('a');
    link.href = file;
    link.download = name;
  }

  function clearSearch() {
    setQuery('');
    setResults([]);
  }

  function handleSearch(e) {
    const query = e.target.value;
    const results = doc.search(query);
    setQuery(query);
    setResults(results);
  }

  return (
    <div>
      <h1>{file.name}</h1>
      <h2>Search</h2>
      <input value={query} onChange={handleSearch} />
      {results.map((result, i) => {
        const [left, matched, right] = result.snippet;
        return (
          <div key={i}>
            {left}
            <strong>{matched}</strong>
            {right}
          </div>
        );
      })}
      <button onClick={clearSearch}>
        Clear search
      </button>
      <h2>Contents</h2>
      <div>{compiled.result}</div>
      <button onClick={() => downloadFile()}>
        Download original
      </button>
      <button onClick={() => downloadFile('.html')}>
        Download HTML
      </button>
      <h2>Text Contents</h2>
      <pre>{textContent}</pre>
    </div>
  );
}
```

Configure document `options`:

```js
import toc from 'rehype-toc';

const options = {
  content: '<blockquote><strong>some</strong>content</blockquote>',
  filename: 'doc.html',
  annotations: [ { start: 0, end: 5, classNames: ['a'] }],
  annotationCallbacks: {
    onClick: annotation => console.log(annotation),
  },
  plugins: [toc],
  sanitizeSchema: { attributes: { '*': ['style'] } },
  searchOptions: {
    minQueryLength: 3,
    snippetOffsetPadding: 50,
  },
};
```

## API
Please refer to [**unified-doc**][unified-doc] for API details on a `doc` instance.

### Methods

#### `Doc`
```ts
function Doc(props: Props): React.ReactElement;
```
A simple React component that exposes the `doc` APIs.

#### `DocProvider`
```ts
function DocProvider(providerProps: ProviderProps): React.ReactElement;
```
Use the `DocProvider` to expose the `doc` instance in a React context.  The `doc` instance can be accessed with the `useDoc` method for any components under the `DocProvider`.

#### `useDoc`
```ts
function useDoc(): DocInstance;
```
Returns a `doc` instance containing all `unified-doc` APIs.

### Interfaces
```ts
interface Props {
  className?: string;
  options: Options;
  ref?: React.Ref<HTMLDivElement>;
}

interface ProviderProps {
  children: React.ReactNode;
  options: Options;
}

interface Options {
  content: string;
  filename: string;
  annotations?: Annotation[];
  annotationCallbacks?: AnnotationCallbacks;
  compiler?: Compiler;
  plugins?: Plugin | Plugin[];
  sanitizeSchema?: SanitizeSchema;
  searchAlgorithm?: SearchAlgorithm;
  searchOptions?: SearchOptions;
}
```

## Development
This project is:
- linted with `xo` + `prettier` + `tsc`.
- developed and bundled with `microbundle`.
- tested with `jest`.
- softly-typed with `typescript` using `checkJs` (only public APIs are typed).

```sh
# bootstrap package
npm run bootstrap

# clean package (rm dist + node_modules)
npm run clean

# lint package with xo + prettier + tsc
npm run lint

# watch/rebuild package with microbundle
npm run dev

# test package with jest (make sure to run the 'dev' script)
npm run test

# build package with microbundle
npm run build
```

<!-- Links -->
[react]: https://github.com/facebook/react
[unified-doc]: https://github.com/unified-doc/unified-doc
