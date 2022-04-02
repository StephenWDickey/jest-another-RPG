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
};

Game.prototype.battle = function () {
    if (this.isPlayerTurn) {
        inquirer
            .prompt({
                type: 'list',
                message: 'what would you like to do?',
                name: 'action',
                choices: ['attack', 'use potion']
            })
            .then(({action}) => {
                if (action === 'use potion') {
                    if (!this.player.getInventory()) {
                        console.log("You don't have any potions left!");

                        return this.checkEndOfBattle();
                    }

                    inquirer
                        .prompt({
                            type: 'list',
                            message: 'which potion will you use?',
                            name: 'action',
                            // the .map method will create a new array so we can more easily
                            // figure out which potion is which instead of just index number
                            // we add number so user can keep track, but we know it starts at 0
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                        })
                        // we must split the string that is returned
                        // we also subtract to get to original index number
                        .then(({action}) => { 
                            const potionDetails = action.split(': ');

                            this.player.usePotion(potionDetails[0] - 1);
                            console.log(`You used a ${potionDetails[1]} potion.`);

                            this.checkEndOfBattle();
                        });

                }
                else {
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());

                    this.checkEndOfBattle();
                }
            });
    }
    else {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);
        console.log(`You were attack by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());

        this.checkEndOfBattle();
    }
};

Game.prototype.startNewBattle = function() {
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    }
    else {
        this.isPlayerTurn = false;
    }
    console.log('Your stats are as follows:');
    // console.table should show our stats!
    console.table(this.player.getStats());

    console.log(this.currentEnemy.getDescription());

    this.battle();
};

Game.prototype.checkEndOfBattle = function() {
    if (this.player.isAlive() && this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();
    }
    else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
        console.log(`You defeated the ${this.currentEnemy.name}`);

        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);

        this.roundNumber++;

        if (this.roundNumber < this.enemies.length) {
            this.currentEnemy = this.enemies[this.roundNumber];
            this.startNewBattle();
        }
        else {
            console.log('You win!');
        }

    }
    else {
        console.log("you've been defeated!");
    }
};





module.exports = Game;