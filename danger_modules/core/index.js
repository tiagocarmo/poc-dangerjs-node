export const findFile = (list, fileName) => list.find((file) => file.includes(fileName));

export const cleanStack = (string) => string.replace('+      - ', `\n - `);
