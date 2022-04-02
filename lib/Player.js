// import Potion constructor so it can be used for Player object
const Potion = require('../lib/Potion');
const Character = require('./Character');

// we write constructor function
// it will have name, health, strength, and agility properties
// name parameter sets default empty string if no name chosen
// we use ES6 class syntax with methods in the brackets
class Player extends Character {
    constructor(name = '') {
    
      super(name);
      
  
      this.inventory = [new Potion('health'), new Potion()];
    }
  
    getStats() {
      return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility
      };
    }
  
    getInventory() {
      if (this.inventory.length) {
        return this.inventory;
      }
      return false;
    }
  
    addPotion(potion) {
      this.inventory.push(potion);
    }
  
    usePotion(index) {
      const potion = this.inventory.splice(index, 1)[0];
  
      switch (potion.name) {
        case 'agility':
          this.agility += potion.value;
          break;
        case 'health':
          this.health += potion.value;
          break;
        case 'strength':
          this.strength += potion.value;
          break;
      }
    }
  };

// we export the function so we can use it in our test!
module.exports = Player;