// we need inquirer module for user input!
const inquirer = require('inquirer');

// we need our other constructors too!
const Enemy = require('./Enemy');
const Player = require('./Player');

// we don't need Potion constructor because we use it in other functions too

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
};

Game.prototype.initializeGame = function() {
    // we are adding to our empty enemy array
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));
    this.currentEnemy = this.enemies[0];
};

// we invoke inquirer module for user input
inquirer
    .prompt({
        type: 'text',
        name: 'name',
        message: 'What is your name?'
        // we must use .then method to 'destructure' name from prompt object
        // arrow function is important because if we were to write it out with function
        // then this. would not reference the game object anymore
    })
    .then(({name}) => {

    this.player = new Player(name);

    console.log(this.currentEnemy, this.player);
    
    this.startNewBattle();

    });



module.exports = Game;