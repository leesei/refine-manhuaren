'use strict';
const scanComics = require('..').scanComics;
const groupBy = require('lodash.groupby');
const Chalk = require('chalk');

exports.command = 'info <folder> [options]'
exports.describe = 'List comics in folder'

exports.builder = {
  j: {
    alias: 'json',
    default: false,
    describe: 'output raw config as JSON',
    type: 'bool'
  }
}

function SectionToString (volume) {
  // console.log(volume);
  let title = (volume.mangaSectionTitle.length) ? `: ${volume.mangaSectionTitle}` : '';
  return [
    `[${Chalk.cyan(volume.mangaSectionName)}${title}]  (${Chalk.blue(volume.mangaSectionId)})`,
    `- ${volume.volumeDir}`,
    `- ${volume.mangaSectionImages.length} images`,
    `- type[${volume.sectionType}] verticle[${volume.isVerticalManga}] way[${volume.readWay}]`,
    `- prev[${volume.previousId}] next[${volume.nextId}]`,
  ];
}

exports.handler = function (argv) {
  scanComics(argv.folder, argv.json)
    .then(comics => {
      const byManga = groupBy(comics, 'mangaName');

      if (argv.json) {
        let json = {};
        for (let manga in byManga) {
          json[manga] = [];
          for (let section of byManga[manga]) {
            json[manga].push(section.raw.json);
          }
        }
        console.log(JSON.stringify(json, null, 2));
        return;
      }

      for (let manga in byManga) {
        console.log(`[${Chalk.yellow.bgBlue.bold(manga)}]  (${Chalk.blue(byManga[manga][0].mangaId)})`);
        for (let section of byManga[manga]) {
          console.log(SectionToString(section)
                        .map(line => '  ' + line)
                        .join('\n')
          );
        }
        console.log();
      }
    });
}
