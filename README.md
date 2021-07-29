# Refine Manhuaren

[![NPM Version][npm-image]][npm-url]
<!-- [![Linux Build][travis-image]][travis-url] -->
<!-- [![Windows Build][appveyor-image]][appveyor-url] -->
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
![David Dependencies][david-dep-image]
![David Dev Dependencies][david-devdep-image]

[npm-image]: https://img.shields.io/npm/v/refine-manhuaren.svg
[npm-url]: https://npmjs.org/package/refine-manhuaren
[travis-image]: https://img.shields.io/travis/leesei/refine-manhuaren.svg?label=linux
[travis-url]: https://travis-ci.org/leesei/refine-manhuaren
[appveyor-image]: https://img.shields.io/appveyor/ci/leesei/refine-manhuaren/master.svg?label=windows
[appveyor-url]: https://ci.appveyor.com/project/leesei/refine-manhuaren
[david-dep-image]: https://img.shields.io/david/leesei/refine-manhuaren
[david-devdep-image]: https://img.shields.io/david/dev/leesei/refine-manhuaren

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Refine Manhuaren is an extractor to extract Manhuaren comics, inspired by [gumblex/refine-buka](https://github.com/gumblex/refine-buka).

[refine-manhuaren demo - asciinema](https://asciinema.org/a/0xgvk0zunojm49g4i6qr6ks6z)

## Install

```sh
npm install -g refine-manhuaren
```

## Usage

Manhuaren stores downloads in `manhuaren/download/`.  
The target folder can be changed in settings, e.g.:
- `/storage/emulated/0/`
- `/storage/emulated/0/Android/data/com.ilike.cartoon/`
- `/storage/extSdCard/Android/data/com.ilike.cartoon/`

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
# some manga's file names in chapter info is not sorted (e.g. 3x3 Eyes)
# use `-I` to ignore it and rename files using the original index
refine-manhuaren extract ~/manhuaren/download/1210 -I
```

---

TODO:  
we don't have progress with `zipFolder()`  
check `zipFolder()`'s source and use [Archiver](http://archiverjs.com/docs/) ourself  
Or check if [zip-local](https://github.com/Mostafa-Samir/zip-local) supports progress

