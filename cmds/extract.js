'use strict';
const scanComics = require('..').scanComics;
const groupBy = require('lodash.groupby');
const zipFolder = require('zip-folder');

const Chalk = require('chalk');
const Path = require('path');
const ProgressBar = require('progress');
const Shell = require('shelljs');

exports.command = 'extract <folder> <target> [options]'
exports.describe = 'Extract comics'

exports.builder = {
  z: {
    alias: 'zip',
    default: false,
    describe: 'output zip of each extracted volumes',
    type: 'bool'
  }
}

exports.handler = function (argv) {
  scanComics(argv.folder, argv.json)
    .then(comics => {
      const byManga = groupBy(comics, 'mangaName');
      for (let manga in byManga) {
        const volumes = byManga[manga];

        console.log(`[${Chalk.yellow.bgBlue.bold(manga)}]  (${Chalk.blue(volumes[0].mangaId)})`);
        for (let volume of volumes) {
          const target = Path.resolve(argv.target, manga, volume.mangaSectionName);

          // ensure target folder not exist
          if (Shell.test('-d', target)) {
            console.log(Chalk.yellow(`[${target}] exists, removing`));
            Shell.rm('-rf', target);
          };

          // create target folder
          Shell.mkdir('-p', target);
          const images = Shell.find(volume.volumeDir).filter(function(file) { return file.match(/\.mhr$/); });
          if (images.length !== volume.mangaSectionImages.length) {
            console.log(Chalk.yellow(`image files (${images.length}) less then expected (${volume.mangaSectionImages.length})`));
          }

          // begin copying
          const bar = new ProgressBar(`  ${volume.mangaSectionName} [:bar] :percent :etas`, {
            complete: '=',
            incomplete: ' ',
            width: 50,
            total: images.length
          });

          for (let image of images) {
            const match = Path.basename(image).match(/\.(\d+)\.mhr/);
            if (!match || match[1] >= volume.mangaSectionImages.length) {
              console.log(Chalk.yellow(`image[${image}] name mismatch, skipping`));
              bar.tick();
              continue;
            }

            // the file name is the index of the name array
            Shell.cp(image, Path.join(target, volume.mangaSectionImages[match[1]]));
            bar.tick();
          }

          if (argv.zip) {
            const targetZip = `${target}.zip`;
            // ensure target zip not exist
            if (Shell.test('-d', targetZip)) {
              console.log(Chalk.yellow(`[${targetZip}] exists, removing`));
              Shell.rm('-rf', targetZip);
            };

            // TODO: we don't have progress with zipFolder()
            // check zipFolder()'s source and use Archiver ourself
            // http://archiverjs.com/docs/
            zipFolder(target, targetZip, function (err) {
              if (err) {
                return console.log(Chalk.red(`error archiving [${target}]: ${err}`));
              }
              Shell.rm('-rf', target);
            });
          }
        }
      }
    });
};
