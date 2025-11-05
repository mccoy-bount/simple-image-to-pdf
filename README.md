
### Welcome to image-to-pdf 👋

> A simple 🖼️ to 📄 converter for NodeJS



---

## Instalation
```sh
npm install simple-image-to-pdf
```

## Example (CommonJS)
```js
const { convert, sizes } = require('simple-image-to-pdf');
const fs = require('fs')

const pages = [
    "./pages/image1.jpeg", // path to the image
]
 
convert(pages).pipe(fs.createWriteStream('output.pdf'))
```

## Example (ECMAScript)
```js
import imageToPDF, { sizes } from 'simple-image-to-pdf';
import fs from 'fs';

let pages = fs.readdirSync('./img').map(file => `./img/${file}`);

imageToPDF(pages).pipe(fs.createWriteStream('output-esm.pdf'));
```

## Example (TypeScript)
```js
const imageToPDF = require('simple-image-to-pdf').default;
const fs = require('fs');

let pages: string[] = fs.readdirSync('./img').map((file: string) => `./img/${file}`);
// Alternatively you can also pass the size as a string like this:
imageToPDF(pages).pipe(fs.createWriteStream('output-ts.pdf'));
```

## Documentation

### Output
The function returns a `Stream` (see [official documentation](https://nodejs.org/api/stream.html)). The easiest way to get a file is to `pipe` it into a `WriteStream` (see [Example](#example)).
