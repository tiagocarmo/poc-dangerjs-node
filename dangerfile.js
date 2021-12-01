import { message } from 'danger';
import { readLocalFile } from 'danger-modules/file-reader';

const execValidation = async () => {
  message('Works');
  readLocalFile('./log/info.txt', message);
};

execValidation();
