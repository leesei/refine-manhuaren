# Refine Manhuaren

Refine Manhuaren is an extractor to extract Manhuaren comics, inspired by [gumblex/refine-buka](https://github.com/gumblex/refine-buka).

[refine-manhuaren demo - asciinema](https://asciinema.org/a/1mzvrkutfuay3zaieulbsgiue)

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
```
