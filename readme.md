# Vue Webpack Template

## Live

[URL here]()

## Requirements

- NodeJS 10.16 / LTS (12.13).

## Usage

### Install dependencies

```
npm install
```

### Compiles and hot-reloads for development

```
npm run start
```

- Open http://localhost:8080 to view it in the browser.

### Compiles and minifies for production

```
npm run build
```
- Find the minified code in ./build folder.

### Project Structure:

- **public/** assets folder for the app.
- **src/** main source code folder.
  - **build/** folder for minified source code (npm run build).
  - **config/** configuration directory.
  - **components/** reusable component directory.
  - **pages/** list of pages.
  - **services/** third party services.
  - **router.js** main app router.
  - **App.vue** main app entry.
  - **index.js** main app vue instance and global imports.
- **webpack.config.js/** webpack configuration file.

## Things to note

- Notes here