import { existsSync } from 'fs';
import expand from 'dotenv-expand';
import dotenv from 'dotenv';

const getPaths = path => {
  const NODE_ENV = process.env.NODE_ENV;
  if (!NODE_ENV) {
    throw new Error('NODE_ENV is required');
  }
  return [`.env.${NODE_ENV}.local`, `.env.${NODE_ENV}`, `.env.local`, `.env`]
    .filter(Boolean)
    .map(file => `${path}/${file}`);
};

export default (dotenvPath = process.cwd()) => {
  getPaths(dotenvPath).forEach(dotenvFile => {
    if (existsSync(dotenvFile)) {
      expand(
        dotenv.config({
          path: dotenvFile
        })
      );
    }
  });
};
