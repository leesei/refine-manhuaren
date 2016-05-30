'use strict';
const Fs = require('fs');
const Path = require('path');
const Shell = require('shelljs');
const io = require('java.io');
const InputObjectStream = io.InputObjectStream;
const OutputObjectStream = io.OutputObjectStream;

module.exports = function (folder, raw) {
  const configFiles = Shell.find(folder).filter(file => file.match(/\.mhr_down_config$/));
  const promises = configFiles.map(configFile => new Promise(function (resolve, reject) {
    Fs.readFile(configFile, 'utf8', function(err, data) {
      if (err) {
        return reject(err);
      }

      // mhr_down_config is base64 encoded
      const jserialise = new Buffer(data, 'base64');
      // read object only, ignore class info
      const ReadChapterBean = new InputObjectStream(jserialise).readObject();
      // console.log(ReadChapterBean);

      let comic = {
        configFile: configFile,
        volumeDir: Path.dirname(configFile),
        mangaId: ReadChapterBean.mangaId,
        mangaName: ReadChapterBean.mangaName.trim(),
        mangaSectionId: ReadChapterBean.mangaSectionId,
        mangaSectionName: ReadChapterBean.mangaSectionName.trim(),
        mangaSectionTitle: ReadChapterBean.mangaSectionTitle.trim(),
        mangaSectionImages: ReadChapterBean.mangaSectionImages,
        sectionType: ReadChapterBean.sectionType,
        isVerticalManga: ReadChapterBean.isVerticalManga,
        readWay: ReadChapterBean.readWay,
        previousId: ReadChapterBean.previousId,
        nextId: ReadChapterBean.nextId
      };
      if (raw) {
        comic.raw = {
          jserialise: jserialise,
          json: ReadChapterBean
        };
      }
      resolve(comic);
    });
  }));
  return Promise.all(promises);
};
