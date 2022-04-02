// we need to require potion object 
const Potion = require('./Potion');
const Character = require('./Character');

// let's write a constructor function
// we create parameters for name and weapon
// extend will make Enemy a child of Character
class Enemy extends Character{
    constructor(name, weapon) {
        // invokes parent constructor from Character
        super(name);

        
        this.weapon = weapon;
        this.potion = new Potion();

        
    };


    getDescription() {
        return `A ${this.name} holding a  ${this.weapon} has appeared!`
    };



};
// we also will inherit character methods here using object.create
Enemy.prototype = Object.create(Character.prototype);



// export constructor so it can be invoked!
module.exports = Enemy;