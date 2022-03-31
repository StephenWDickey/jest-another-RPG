// remember the .js file extension is not necessary in Node

const { expect } = require('@jest/globals');
const Player = require('../lib/Player');


// Potion constructor is imported
const Potion = require('../lib/Potion');


// we are saying that we will mock the constructor
// it will search for a mock in the same directory
jest.mock('../lib/Potion');

// now we write our test
test('creates player object', () => {
    // player is a new Player object with string Dave passed
    const player = new Player('Dave');

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));

    expect(player.inventory).toEqual(expect.arrayContaining([expect.any(Object)]));
});