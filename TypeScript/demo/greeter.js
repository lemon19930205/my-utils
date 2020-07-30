function greeter(person) {
    return 'Hello, ' + person;
}
var user = 'Jane User';
//let user = [1, 2]
document.body.innerHTML = greeter(user);
function greeter1(person) {
    return 'Hello, ' + person.firstName + '' + person.lastName;
}
var user1 = { firstName: 'Jane', lastName: 'User' };
document.body.innerHTML = greeter1(user1);
//----------------------------------------------------------------------
var Student = /** @class */ (function () {
    function Student(firstName, middlInitial, lastName) {
        this.firstName = firstName;
        this.middlInitial = middlInitial;
        this.lastName = lastName;
        this.fullName = firstName + '' + middlInitial + '' + lastName;
    }
    return Student;
}());
function greeter2(person) {
    return 'Hello,' + person.firstName + '' + person.lastName;
}
var user2 = new Student('Jane', 'M', 'User');
document.body.innerHTML = greeter2(user2);
