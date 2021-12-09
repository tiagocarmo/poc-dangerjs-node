import packageJson from '../../package.json';
import dangerConfig from '../../dangerConfig.json'

import { hasRC, updateRequired } from '../requiredDocs';
import { readLocalFile } from '../readLocalFile';
import { roadmap } from '../roadmap';

const run = async (danger, levels) => {
  const { message, warn, fail } = levels;
  const enumWarningLevel = {
    1: message,
    2: warn,
    3: fail
  };

  const callback = (config) => {
    if(!!config || config === 0) {
      return 0;
    }
    return enumWarningLevel[config];
  };

  const serviceName = packageJson.name;
  const modifiedFiles = danger.git.modified_files;
  const packageDiff = await danger.git.JSONDiffForFile('package.json');

  hasRC(packageDiff, callback(dangerConfig.rules['has-rc']));
  updateRequired(modifiedFiles, dangerConfig['important-files'], callback(dangerConfig.rules['has-rc']));
  readLocalFile('./reports/npm-outdated.txt', callback(dangerConfig.rules['npm-outdated']), 'Leitura do arquivo info.txt');
  roadmap(serviceName, modifiedFiles, danger, callback(dangerConfig.rules['roadmap']));
};

export default run;
