// remember the .js file extension is not necessary in Node

const { expect, test } = require('@jest/globals');
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

test('gets player stats as object', () => {
    const player = new Player('Dave');
    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

test('gets inventory for player or returns false', () => {
    const player = new Player('Dave');

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});

test("gets player's health", () => {
    const player = new Player('Dave');

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

test("check if player is alive", () => {
    const player = new Player('Dave');

    expect(player.isAlive()).toBeTruthy();

    // we set player health to 0 to check falsy outcome
    player.health = 0;

    expect(player.isAlive()).toBeFalsy();
});

test("subtracts value from player health", () => {
    const player = new Player('Dave');
    const oldHealth = player.health;

    player.reduceHealth(5);

    expect(player.health).toBe(oldHealth - 5);

    player.reduceHealth(99999);

    expect(player.health).toBe(0);
});

test("gets player's attack", () => {
    const player = new Player('Dave');

    player.strength = 10;

    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

test('adds a potion to inventory', () => {
    const player = new Player('Dave');
    const oldCount = player.inventory.length;

    // we invoke our Potion constructor function to make new potion
    player.addPotion(new Potion());

    expect(player.inventory.length).toBeGreaterThan(oldCount);
});

test('uses potion from inventory', () => {
    // create new player object
    const player = new Player('Dave');
    // create an array with 3 potion objects
    player.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount = player.inventory.length;
    // we reference potion via index value in array
    player.usePotion(1);

    expect(player.inventory.length).toBeLessThan(oldCount);
});