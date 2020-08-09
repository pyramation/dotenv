import dotenv from '../src';
import { resolve } from 'path';
import cases from 'jest-in-case';

cases(
  'dotenv',
  opts => {
    const path = resolve(__dirname + '/../__fixtures__/' + opts.test);
    process.env.NODE_ENV = opts.name;
    dotenv(path);
    const env = Object.keys(process.env).reduce((m, key) => {
      if (key.match(/^DOTENV_TEST_/)) {
        m[key] = process.env[key];
      }
      return m;
    }, {});
    expect(env).toMatchSnapshot();
    // after each clear env...
    Object.keys(process.env).forEach(key => {
      if (key.match(/^DOTENV_TEST_/)) {
        delete process.env[key];
      }
    });
  },
  [
    { name: 'development', test: 'test1' },
    { name: 'test', test: 'test1' },
    { name: 'production', test: 'test1' }
  ]
);
