// import Potion constructor so it can be used for Player object
const Potion = require('../lib/Potion');

// we write constructor function
// it will have name, health, strength, and agility properties
// name parameter sets default empty string if no name chosen
function Player(name='') {
    this.name = name;

    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);

    this.inventory = [new Potion('health'), new Potion()];
};

Player.prototype.getStats = function() {
    return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility
    };
};

Player.prototype.getInventory = function () {
    if (this.inventory.length) {
        return this.inventory;
    }
    return false;
};
// we export the function so we can use it in our test!
module.exports = Player;