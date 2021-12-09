import { readFile } from 'fs';

export const readLocalFile = (filename, callback, title = '') => {
  if(callback === 0) return ;
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
