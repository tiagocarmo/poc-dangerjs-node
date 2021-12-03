import packageJson from './package.json';
import { danger, message, warn, fail } from 'danger';

import { readLocalFile } from './danger_modules/readLocalFile';
import { hasRC, updateRequired } from './danger_modules/requiredDocs';
import { roadmap } from './danger_modules/roadmap';

const execValidation = async () => {
  // consts
  const serviceName = packageJson.name;
  const modifiedFiles = danger.git.modified_files;
  // async itens
  const packageDiff = await danger.git.JSONDiffForFile('package.json');

  // pipes
  readLocalFile('./log/info.txt', message, 'Leitura do arquivo info.txt');
  updateRequired(modifiedFiles, ['CHANGELOG.md', 'README.md'], warn);
  roadmap(serviceName, modifiedFiles, danger, message);
  hasRC(packageDiff, fail);
};

execValidation();
