import type * as id from "../utils/extractId"
const { extractId } = jest.requireActual<typeof id>("../utils/extractId")

describe('extractId utility', () => {
  test('should return a random id if url is empty', () => {
    const url = '';
    expect(extractId(url)).not.toBe('');
  });

  test('should return a random id if no match found', () => {
    const url = 'https://rickandmortyapi.com/api/character/test';
    expect(extractId(url)).not.toBe('test');
  });


  test('should extract the id from the URL and be a string', () => {
    const url = 'https://rickandmortyapi.com/api/character/10';
    expect(extractId(url)).toBe('10');
    expect(typeof extractId(url)).toBe('string');
  });
});

export { }