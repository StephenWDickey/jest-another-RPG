// we list the requiring file for function
// we require the file that contains our function
// we use relative pathing
// we name the function we are importing then it goes after expect
const Potion = require('../lib/Potion.js');

// then we write what we want to test
test('creates a health potion object', () => {
    // creates new object
    // we want this string to be the name of the new potion object
    const potion = new Potion('health');
    // expect is a Jest function that gives us acces to 'matcher' functions
    // we pass in function that is imported
    // toBe is a 'matcher' function that will compare expected value to actual result
    // use Jest expect function
    expect(potion.name).toBe('health');
    expect(potion.value).toEqual(expect.any(Number));
});

test('creates a random potion object', () => {
    const potion = new Potion();

    expect(potion.name).toEqual(expect.any(String));
    expect(potion.name.length).toBeGreaterThan(0);
    expect(potion.value).toEqual(expect.any(Number));
});