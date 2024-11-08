const Chalk = require("chalk");
const groupBy = require("lodash").groupBy;
const Path = require("path");
const ProgressBar = require("progress");
const Shell = require("shelljs");

const scanComics = require("../lib/scancomics.js");
const zipFolder = require("../lib/zip-folder.js");

exports.command = "extract <folder> <target> [options]";
exports.describe = "Extract comics";

exports.builder = {
  z: {
    alias: "zip",
    default: false,
    describe: "output zip of each extracted section",
    type: "bool",
  },
  I: {
    alias: "ignoreImageNames",
    default: false,
    describe: "ignore image names in section info (use index as file name)",
    type: "bool",
  },
  t: {
    alias: "title",
    default: false,
    describe: "adds title to folder (useful if section name conflicts)",
    type: "bool",
  },
};

function ProcessSection(section, argv) {
  const folder =
    argv.title && section.mangaSectionTitle
      ? section.mangaSectionName + " " + section.mangaSectionTitle
      : section.mangaSectionName;
  const targetPath = Path.resolve(argv.target, section.mangaName, folder);

  // ensure target folder not exist
  if (Shell.test("-d", targetPath)) {
    console.log(Chalk.yellow(`[${targetPath}] exists, removing`));
    Shell.rm("-rf", targetPath);
  }

  // create target folder
  Shell.mkdir("-p", targetPath);
  const images = Shell.find(section.volumeDir).filter(function (file) {
    return file.match(/\.mhr$/);
  });
  if (images.length !== section.mangaSectionImages.length) {
    console.log(
      Chalk.yellow(
        `image files (${images.length}) less then expected (${section.mangaSectionImages.length})`
      )
    );
  }

  // begin copying
  const bar = new ProgressBar(
    `  ${section.mangaSectionName} [:bar] :percent :etas`,
    {
      complete: "=",
      incomplete: " ",
      width: 50,
      total: images.length,
    }
  );

  for (let image of images) {
    const match = Path.basename(image).match(/\.(\d+)\.mhr/);
    if (!match || match[1] >= section.mangaSectionImages.length) {
      console.log(Chalk.yellow(`image[${image}] name mismatch, skipping`));
      bar.tick();
      continue;
    }

    // the original file name is the index of the image array
    if (argv.ignoreImageNames) {
      // use original file name plus extension of it in image array
      Shell.cp(
        image,
        Path.join(
          targetPath,
          match[1] + Path.extname(section.mangaSectionImages[match[1]])
        )
      );
    } else {
      // use file names in image array
      Shell.cp(
        image,
        Path.join(targetPath, section.mangaSectionImages[match[1]])
      );
    }
    bar.tick();
  }

  if (argv.zip) {
    const targetZip = `${targetPath}.zip`;
    // ensure target zip not exist
    if (Shell.test("-e", targetZip)) {
      console.log(Chalk.yellow(`[${targetZip}] exists, removing`));
      Shell.rm("-rf", targetZip);
    }

    zipFolder(targetPath, targetZip, function (err) {
      if (err) {
        return console.log(
          Chalk.red(`error archiving [${targetPath}]: ${err}`)
        );
      }
      Shell.rm("-rf", targetPath);
    });
  }
}

exports.handler = function (argv) {
  scanComics(argv.folder, argv.json).then((comics) => {
    const byManga = groupBy(comics, "mangaName");
    for (let manga in byManga) {
      const sections = byManga[manga];

      console.log(
        `[${Chalk.yellow.bgBlue.bold(manga)}]  (${Chalk.blue(
          sections[0].mangaId
        )})`
      );
      for (let section of sections) {
        ProcessSection(section, argv);
      }
    }
  });
};
