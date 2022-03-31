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

Player.prototype.getHealth = function() {
    // we use template literal
    // we insert variables into it using ${} syntax
    return `${this.name}'s health is now ${this.health}!`;
};

Player.prototype.isAlive = function() {
    if (this.health === 0) {
        return false;
    }
    return true;
};

Player.prototype.reduceHealth = function(health) {
    this.health -= health;

    if (this.health < 0) {
        this.health = 0;
    }
};

Player.prototype.getAttackValue = function() {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max-min) + min);
};

Player.prototype.addPotion = function(potion) {
    // we add new potion object to our inventory array
    this.inventory.push(potion);
};

Player.prototype.usePotion = function(index) {

    // splice removes item from array, returns removed item to new array
    // removed potion is put at index [0] in new array
    const potion = this.getInventory().splice(index, 1)[0];

    // depending on which potion we use...
    switch (potion.name) {
        // if it's an agility potion
        case 'agility':
            this.agility += potion.value;
            break;
        // if its a health potion
        case 'health':
            this.health += potion.value;
            break;
        // if it's a strength potion
        case 'strength':
            this.strength += potion.value;
            break;
    }
};

// we export the function so we can use it in our test!
module.exports = Player;