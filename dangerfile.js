import { readFile } from 'fs';
import { message } from 'danger';

function readLocalFile (filename, callback) {
  readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    callback(data);
  });
};

const execValidation = async () => {
  message('Works');
  readLocalFile('./log/info.txt', message);
};

execValidation();
