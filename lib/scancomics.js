const Fs = require("fs");
const Path = require("path");
const Shell = require("shelljs");
const io = require("java.io");
const InputObjectStream = io.InputObjectStream;

module.exports = function (folder, raw) {
  const configFiles = Shell.find(folder).filter((file) =>
    file.match(/\.mhr_down_config$/)
  );
  const promises = configFiles.map(
    (configFile) =>
      new Promise(function (resolve, reject) {
        Fs.readFile(configFile, "utf8", function (err, data) {
          if (err) {
            return reject(err);
          }

          // mhr_down_config is base64 encoded
          const jserialise = Buffer.from(data, "base64");
          // read object only, ignore class info
          const sectionInfo = new InputObjectStream(jserialise).readObject();
          // console.log(ReadChapterBean);

          let comic = {
            configFile: configFile,
            volumeDir: Path.dirname(configFile),
            ...sectionInfo,
          };
          comic.mangaName = comic.mangaName.trim();
          comic.mangaSectionName = comic.mangaSectionName.trim();
          comic.mangaSectionTitle = comic.mangaSectionTitle.trim();

          if (raw) {
            comic.raw = {
              jserialise: jserialise,
              json: sectionInfo,
            };
          }
          resolve(comic);
        });
      })
  );
  return Promise.all(promises);
};
