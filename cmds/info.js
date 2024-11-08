const groupBy = require("lodash").groupBy;
const Chalk = require("chalk");

const scanComics = require("../lib/scancomics.js");

exports.command = "info <folder> [options]";
exports.describe = "List comics in folder";

exports.builder = {
  j: {
    alias: "json",
    default: false,
    describe: "output raw config as JSON",
    type: "bool",
  },
};

function SectionToString(section) {
  // console.log(volume);
  let title = section.mangaSectionTitle.length
    ? `: ${section.mangaSectionTitle}`
    : "";
  return [
    `[${Chalk.cyan(section.mangaSectionName)}${title}]  (${Chalk.blue(
      section.mangaSectionId
    )})`,
    `- ${section.volumeDir}`,
    `- ${section.mangaSectionImages.length} images`,
    `- type[${section.sectionType}] vertical[${section.isVerticalManga}] way[${section.readWay}]`,
    `- prev[${section.previousId}] next[${section.nextId}]`,
  ];
}

exports.handler = function (argv) {
  scanComics(argv.folder, argv.json).then((comics) => {
    const byManga = groupBy(comics, "mangaName");

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
      console.log(
        `[${Chalk.yellow.bgBlue.bold(manga)}]  (${Chalk.blue(
          byManga[manga][0].mangaId
        )})`
      );
      for (let section of byManga[manga]) {
        console.log(
          SectionToString(section)
            .map((line) => "  " + line)
            .join("\n")
        );
      }
      console.log();
    }
  });
};
