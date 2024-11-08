# Refine Manhuaren

[![NPM Version][npm-image]][npm-url]

<!-- [![Linux Build][travis-image]][travis-url] -->
<!-- [![Windows Build][appveyor-image]][appveyor-url] -->

![NPM Dependencies][npmdep-image] ![GitHub Dev Dependencies][githubdep-image]

[npm-image]: https://img.shields.io/npm/v/refine-manhuaren.svg
[npm-url]: https://npmjs.org/package/refine-manhuaren
[travis-image]: https://img.shields.io/travis/leesei/refine-manhuaren.svg?label=linux
[travis-url]: https://travis-ci.org/leesei/refine-manhuaren
[appveyor-image]: https://img.shields.io/appveyor/ci/leesei/refine-manhuaren/master.svg?label=windows
[appveyor-url]: https://ci.appveyor.com/project/leesei/refine-manhuaren
[npmdep-image]: https://img.shields.io/librariesio/release/npm/refine-manhuaren?label=npm%20deps
[githubdep-image]: https://img.shields.io/librariesio/github/leesei/refine-manhuaren?label=github%20deps

Refine Manhuaren is an extractor to extract Manhuaren comics, inspired by [gumblex/refine-buka](https://github.com/gumblex/refine-buka).

[refine-manhuaren demo - asciinema](https://asciinema.org/a/0xgvk0zunojm49g4i6qr6ks6z)

## Install

```sh
npm install -g refine-manhuaren
# or use npx to prevent global install
alias refine-manhuaren 'npx refine-manhuaren'
```

## Usage

Manhuaren stores downloads in `manhuaren/download/`.  
The target folder can be changed in settings, e.g.:

- `/storage/emulated/0/Android/data/com.mhr.mangamini/files/`
- `/storage/extSdCard/Android/data/com.mhr.mangamini/files/`

Copy the `manhuaren` folder to your PC, say `~/manhuaren`.

Then use `refine-manhuaren` to query or extract the folder.

### `info`

```sh
refine-manhuaren info ~/manhuaren/
# also work for subtree
refine-manhuaren info ~/manhuaren/download/16464
# output result in JSON format
refine-manhuaren info ~/manhuaren/ -j > downloaded.json
```

### `extract`

```sh
refine-manhuaren extract ~/manhuaren/ ~/out
# also work for subtree
refine-manhuaren extract ~/manhuaren/download/16464 -z
# some manga's file names in section info is not sorted (e.g. 3x3 Eyes)
# use `-I` to ignore it and rename files using the original index
refine-manhuaren extract ~/manhuaren/download/1210 -I
```

---

TODO:

- we don't have progress with `zipFolder()`  
  use [Archiver](http://archiverjs.com/docs/) ourself with progress event
- use async/await
