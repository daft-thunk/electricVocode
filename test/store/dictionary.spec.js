import dictionary, {
  baseDictionary,
  alternatesDictionary,
  addAlternates,
  urlDictionary,
  snippetsToDict
} from '../../app/utils/dictionary';
import electron from 'electron';

const dictKeys = Object.keys(dictionary);
const baseDictKeys = Object.keys(baseDictionary);
const urlKeys = Object.keys(urlDictionary);

describe('dictionary', () => {
  it('should have length', () => {
    expect(baseDictKeys.length).toBeGreaterThan(0);
    expect(dictKeys.length).toBeGreaterThan(0);
  });

  it('should contain urls', () => {
    for (let key of urlKeys) {
      expect(dictKeys.indexOf(key)).toBeGreaterThan(-1);
    }
  });

  it('baseDictionary should gracefully take no input', () => {
    for (let key of baseDictKeys) {
      expect(baseDictionary[key]).not.toThrowError();
    }
  });

  it('baseDictionary values should be functions that return strings', () => {
    for (let key of baseDictKeys) {
      const commandFunc = baseDictionary[key];
      expect(typeof commandFunc).toBe('function');
      expect(typeof commandFunc()).toBe('string');
    }
  });

  describe('addAlternates', () => {
    it('should be longer after adding alternates', () => {
      const dictLen = baseDictKeys.length;
      const newDict = addAlternates(alternatesDictionary, baseDictionary);
      const newDictLen = Object.keys(newDict).length;
      expect(newDictLen).toBeGreaterThan(dictLen);
    });
  });
});

describe('snippetsToDict', () => {
  const userDict = [{ command: 'hello', code: 'hello world' }];
  const dictCopy = { ...dictionary };
  const newDict = snippetsToDict(userDict, dictionary, urlDictionary);
  const newDictKeys = userDict.map(item => item.command);

  it("dictionary should contain user's keys", () => {
    for (let command of newDictKeys) {
      expect(newDict[command]).not.toBeUndefined();
    }
  });

  it('user commands should be functions that return strings', () => {
    for (let command of newDictKeys) {
      const commandFunc = newDict[command];
      expect(typeof commandFunc).toBe('function');
      expect(typeof commandFunc()).toBe('string');
    }
  });

  it("doesn't modify the original dictionary", () => {
    expect(dictCopy).toEqual(dictionary);
  });
});
