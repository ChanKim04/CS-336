/*  Lab02
 *  
 * created Fall 2018 (09/12) 
 * @author: Chan Kim (ck45) for CS 336 at Calvin College  
 */

// Encapsulation
function Person(name, birthdate, friends) {
    this.name = name;
    this.birthdate = birthdate;
    this.friends = friends;
}

// Originally from http://jsfiddle.net/codeandcloud/n33RJ/ by Naveen Jose.
Person.prototype.getAge = function() {
    var today = new Date();
    var birthDate = new Date(this.birthdate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

Person.prototype.changeName = function(newName) {
    this.name = newName;
}

Person.prototype.addFriend = function(newFriend) {
    this.friends.push(newFriend);
}

Person.prototype.greeting = function() {
    console.log("I'm a person");
}

// Test Encapsulation...
console.log("----------Testing Encapsulation...----------")
var person1 = new Person("Person1", "1990/01/01", ["Student1"]);

console.log("Information of Person1");
console.log("Name: " + person1.name + "\nBirthdate: " + person1.birthdate + "\nFriends: " + person1.friends);

console.log("Age: " + person1.getAge());

console.log("Change name...");
person1.changeName("Brown");

console.log("Add a friend...");
person1.addFriend("Person2");

console.log("Say greeting...");
person1.greeting();

console.log("\nChanged information of Person1");
console.log("Name: " + person1.name + "\nBirthdate: " + person1.birthdate + "\nFriends: " + person1.friends);
console.log("End...\n");

// Inheritance
function Student(name, birthdate, friends, subjects) {
    Person.call(this, name, birthdate, friends);
    this.subjects = subjects;
}

Student.prototype = Object.create(Person.prototype);

Student.prototype.greeting = function() {
    console.log("I'm a student");
}

// Test Inheritance...
console.log("----------Testing Inheritance...----------");

var student1 = new Student("Student1", "1994/01/01", ["Person1"], ["Theology"]);

console.log("Information of student1");
console.log("Name: " + student1.name + "\nBirthdate: " + student1.birthdate + "\nFriends: " + student1.friends + "\nSubjects: " + student1.subjects);

console.log("Age: " + student1.getAge());

console.log("Change name...");
student1.changeName("John Calvin");

console.log("Add a friend...");
student1.addFriend("Jacobus Arminius");

console.log("Say greeting...");
student1.greeting();

console.log("Is Student1 instance of Person? " + (student1 instanceof Person) + "\nIs Student1 instance of Student? " + (student1 instanceof Student));

console.log("\nChanged information of Person1");
console.log("Name: " + student1.name + "\nBirthdate: " + student1.birthdate + "\nFriends: " + student1.friends + "\nSubjects: " + student1.subjects);
console.log("End...\n");

//Polymorphism
function Soldier(name, birthdate, friends, rank, MOS) {
    Person.call(this, name, birthdate, friends);
    this.rank = rank;
    this.MOS = MOS
}

Soldier.prototype = Object.create(Person.prototype);

Soldier.prototype.greeting = function() {
    console.log("Good morning, Sir!");
}

// Test Polymorphism
console.log("----------Testing Polymorphism...----------");

var soldier1 = new Soldier("Soldier1", "1992/01/01", ["Person1", "Student1"], "Corporal", "MP");

console.log("Information of Soldier1");
console.log("Name: " + soldier1.name + "\nBirthdate: " + soldier1.birthdate + "\nFriends: " + soldier1.friends + "\nRank: " + soldier1.rank + "\nMOS: " + soldier1.MOS);

console.log("Age: " + soldier1.getAge());

console.log("Change name...");
soldier1.changeName("10-70010741");

console.log("Add a friend...");
soldier1.addFriend("Soldier2");

console.log("Say greeting...");
soldier1.greeting();

console.log("Is Soldier1 instance of Person? " + (soldier1 instanceof Person) + "\nIs Soldier1 instance of Soldier? " + (soldier1 instanceof Soldier));

console.log("\nChanged information of Soldier1");
console.log("Name: " + soldier1.name + "\nBirthdate: " + soldier1.birthdate + "\nFriends: " + soldier1.friends + "\nRank: " + soldier1.rank + "\nMOS: " + soldier1.MOS);
console.log("End...");
