import {baseDictionary, alternatesDictionary, dictionary, addAlternates} from '../../app/utils/interpreter'

describe('dictionary', () => {
  it('should have length', () => {
    // console.log(dictionary)
    expect(Object.keys(dictionary).length).toBeGreaterThan(0)
    expect(Object.keys(baseDictionary).length).toBeGreaterThan(0)
  });
});

describe('addAlternates', () => {
  it('should add alternates', () => {
    const dictLen = Object.keys(baseDictionary).length
    const newDict = addAlternates(alternatesDictionary, baseDictionary)
    const newDictLen = Object.keys(newDict).length
    expect(newDictLen).toBeGreaterThan(dictLen)
  });
});
