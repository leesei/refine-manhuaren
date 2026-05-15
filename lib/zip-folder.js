// from https://github.com/sole/node-zip-folder
import { ZipArchive } from "archiver";
import fs from "node:fs";

function zipFolder(srcFolder, zipFilePath, callback) {
  const output = fs.createWriteStream(zipFilePath);
  const zipArchive = new ZipArchive({
    zlib: { level: 8 },
  });
  let isDone = false;

  const done = (err) => {
    if (isDone) {
      return;
    }
    isDone = true;
    callback(err);
  };

  output.on("close", function () {
    done();
  });
  output.on("error", done);
  zipArchive.on("error", done);

  zipArchive.pipe(output);

  zipArchive.directory(srcFolder, false);

  const finalizing = zipArchive.finalize();
  if (finalizing && typeof finalizing.catch === "function") {
    finalizing.catch(done);
  }
}

export default zipFolder;
