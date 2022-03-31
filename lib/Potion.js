// we write the function we want to use for the test
// we use a constructor function to create objects
// name will be a property of the new object
function Potion(name) {
    // this refers to object, cannot be used with arrow function
    this.types = ['strength', 'agility', 'health'];
    this.name = name || this.types[Math.floor(Math.random() * this.types.length)];
    

    if (this.name === 'health') {
        this.value = Math.floor(Math.random() * 10 + 30);
    }
    else {
        this.value = Math.floor(Math.random() * 5 + 7);
    }
}

// we export the function
module.exports = Potion;