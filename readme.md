# unified-doc-react
[`react`][react] wrapper for [**unified-doc**][unified-doc].

---

## Install
```sh
npm install unified-doc-react
```

## Use

### `Doc` Component
For quick and simple rendering of a document, use the React component:

```js
import React from 'react';
import { Doc } from 'unified-doc-react';

const options = {
  content: '> some **strong** content',
  filename: 'doc.md',
  marks: [
    { id: 'a', start: 0, end: 5 },
    { id: 'a', start: 10, end: 12 },
  ],
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

### `DocProvider` and `useDoc`
For building advanced and interactive document applications, wrap your component with a `DocProvider`.  Components under the `DocProvider` have access to the `doc` instance via the `useDoc` hook.

```js
// App.js
import React from 'react';
import { DocProvider } from 'unified-doc-react';

import MyDoc from './MyDoc';

const options = {
  content: '> some **strong** content',
  filename: 'doc.md',
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
import { saveFile } from 'unified-doc-dom';
import { useDoc } from 'unified-doc-react';

function MyDoc() {
  const doc = useDoc();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

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
      <h1>{doc.file().name}</h1>
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
      <div>{doc.compile().result}</div>
      <button onClick={() => saveFile(doc.file())}>
        Download original
      </button>
      <button onClick={() => saveFile(doc.file('.html'))}>
        Download HTML
      </button>
      <button onClick={() => saveFile(doc.file('.txt'))}>
        Download text
      </button>
      <h2>Text Contents</h2>
      <pre>{doc.textContent()}</pre>
    </div>
  );
}
```

### Use with `unified-doc-dom`
`unified-doc-react` can be used seamlessly with methods in `unified-doc-dom` to build interactive document applications.

```js
import React, { useEffect, useRef, useState } from 'react';
import { fromFile, highlight, registerMarks, selectText } from 'unified-doc-dom';
import { Doc } from 'unified-doc-react';
import { v4 as uuidv4 } from 'uuid';

// import optional highlight styles
import 'unified-doc-dom/css/highlight.css';

function MyDoc() {
  const docRef = useRef();
  const [fileData, setFileData] = useState();
  const [marks, setMarks] = useState([]);

  function addMark(newMark) {
    setMarks(oldMarks => [...oldMarks, { ...newMark, id: uuidv4() }]);
  }

  // enable and capture selected text as marks
  useEffect(() => {
    return selectText(docRef.current, { callback: addMark });
  }, []);

  // register marks with callbacks
  useEffect(() => {
    const callbacks = {
      onClick: (event, mark) => console.log('clicked', event, mark),
      onMouseEnter: (event, mark) => console.log('mouseenter', event, mark),
      onMouseOut: (event, mark) => console.log('mouseout', event, mark),
    }
    registerMarks(docRef.current, marks, callbacks);
  }, [marks]);

  // highlight applied marks given its ID
  function highlightLastMark() {
    highlight(docRef.current, marks[marks.length - 1].id);
  }

  // read file data from a JS file
  async function uploadFile(e) {
    const fileData = await fromFile(e.target.files[0]);
    setFileData(fileData);
  }

  let docContent;
  if (!fileData) {
    docContent = <input type="file" onChange={uploadFile}></input>;
  } else {
    const options = {
      content: fileData.content,
      filename: fileData.name,
      marks,
    };
    docContent = <Doc options={options} />;
  }

  return (
    <div>
      <button onClick={highlightLastMark}>
        Highlight last mark
      </button>
      <div ref={docRef}>
        {docContent}
      </div>
    </div>
  );
}
```

## API
- [`Doc`](#Doc)
- [`DocProvider`](#DocProvider)
- [`useDoc`](#useDoc)
- [`options`](#options)

The term `doc` used below refers to a `unified-doc` instance.  Please refer to [**unified-doc**][unified-doc] for detailed documentation of `doc` API methods.

### `Doc`
#### Interface
```ts
function Doc(props: Props): React.ReactElement;
```
A simple React component that wraps around a `doc` instance.

### `DocProvider`
#### Interface
```ts
function DocProvider(providerProps: ProviderProps): React.ReactElement;
```
Use the `DocProvider` to expose the `doc` instance in a React context.  Components under `DocProvider` can access the `doc` instance via the `useDoc` hook.

### `useDoc`
#### Interface
```ts
export function useDoc(): DocInstance;
```
Access the `doc` instance in any components under the `DocProvider`.

### `options`
Provide `options` to configure `unified-doc`.

Please refer to [**unified-doc**][unified-doc] for detailed documentation of `options`.


## Development
This project is:
- implemented with the `unified-doc` interface.
- linted with `xo` + `prettier` + `tsc`.
- developed and built with `microbundle`.
- tested with `jest`.
- softly-typed with `typescript` with `checkJs` (only public APIs are typed).

```sh
# install dependencies
npm run bootstrap

# build package with microbundle
npm run build

# regenerate changelog (conventional-changelog)
npm run changelog

# clean package (rm dist + node_modules)
npm run clean

# watch/rebuild package with microbundle
npm run dev

# lint package with xo + prettier + tsc
npm run lint

# test package with jest in --watch mode (make sure to run the 'dev' script)
npm run test

# test package in a single run
npm run test:ci
```

<!-- Definitions -->
[react]: https://github.com/facebook/react
[unified-doc]: https://github.com/unified-doc/unified-doc
