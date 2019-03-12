import translate from './translate';

global.fetch = require('jest-fetch-mock');

describe('#translate', () => {
  describe('日本語から英語', () => {
    it('こんにちはを渡すとhelloが返ること', async () => {
      const expected = 'hello';
      const actual = await translate({
        text: 'こんにちは',
        from: 'ja',
        to: 'en',
      });
      expect(actual).toBe(expected);
    });
  });
});
