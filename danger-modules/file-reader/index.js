import { readFile } from 'fs';

function readLocalFile (filename, callback) {
  readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    callback(data);
  });
};

module.exports = {
  readLocalFile
};
