import { readFile } from 'fs';

export const readLocalFile = (filename, callback, title = '') => {
  readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const messageData = title
      ? `<strong>${title}</strong> \n\n<pre>${data}</pre>`
      : `<pre>${data}</pre>`;
    callback(messageData);
  });
};
