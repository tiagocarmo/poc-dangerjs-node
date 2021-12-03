import { findFile } from '../core';

export const hasRC = async (packageDiff, callback) => {
  if (packageDiff.version && packageDiff.version.after.includes('-rc')) {
    callback('🤦 Versão com RC');
  }
};

export const updateRequired = async (modifiedFiles, requiredFiles, callback) => {
  requiredFiles.map((file) => {
    if (!findFile(modifiedFiles, file)) {
      callback(`🤦 <strong>${file}</strong> deve ser atualizado.`);
    }
  })
};
