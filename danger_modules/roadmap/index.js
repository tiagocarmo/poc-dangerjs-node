import { findFile, cleanStack } from '../core';

export const roadmap = async (serviceName, modifiedFiles, danger, callback, profile = 'node') => {
  const scriptMessage = [];
  const packageJson = findFile(modifiedFiles, 'package.json');

  if (packageJson) {
    const packageJsonDiff = await danger.git.JSONDiffForFile('package.json');
    const stringPackageContent = await danger.github.utils.fileContents(packageJson);
    const objectPackageContent = JSON.parse(stringPackageContent);
    if (packageJsonDiff.version && !packageJsonDiff.version.after.includes('-rc')) {
      const versionMessage =
        `\n\n <strong>Microsserviço</strong>: ${serviceName} `
        + `\n <strong>Versão</strong>: ${objectPackageContent.version}`;
      scriptMessage.push(versionMessage);
    }
  }

  if (findFile(modifiedFiles, `${serviceName}-stack-hmg`)) {
    const stackDiff = await danger.git.diffForFile(`stack/${serviceName}-stack-hmg.yml`);
    let stackMessage = '\n\n <strong>Modificações na stack</strong>: \n ';
    if (stackDiff.removed) {
      stackMessage += `\n• Itens removidos: \n${cleanStack(stackDiff.removed)} `;
    }
    if (stackDiff.added) {
      stackMessage += `\n• Itens adicionados: \n${cleanStack(stackDiff.added)} `;
    }
    scriptMessage.push(stackMessage);
  }

  if (findFile(modifiedFiles, 'next.config.js') && profile === 'nextjs') {
    const nextConfig = await danger.git.diffForFile('next.config.js');
    if (nextConfig.diff.includes('SanitizingPolicy')) {
      scriptMessage.push('\n\n <strong>[CSP] Alteração de regras de Segurança</strong>\n• Favor conferir os valores da SanitizingPolicy e aplicar no proxy.');
    }
  }

  if (scriptMessage.length) {
    const headerMessage = ' =================== Roteiro de Implantação =================== \n\n';
    const fullMessage = headerMessage + scriptMessage;
    message(fullMessage);
  } else {
    message('Nenhuma alteração na versão, configuração ou no arquivo de stack!');
  }
};
