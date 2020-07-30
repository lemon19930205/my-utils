function greeter(person: string) {
  return 'Hello, ' + person
}

let user = 'Jane User'
//let user = [1, 2]

document.body.innerHTML = greeter(user)

//--------------------------------------------------------------------

interface Person {
  firstName: string
  lastName: string
}

function greeter1(person: Person) {
  return 'Hello, ' + person.firstName + '' + person.lastName
}

let user1 = { firstName: 'Jane', lastName: 'User' }

document.body.innerHTML = greeter1(user1)

//----------------------------------------------------------------------

class Student {
  fullName: string
  constructor(public firstName, public middlInitial, public lastName) {
    this.fullName = firstName + '' + middlInitial + '' + lastName
  }
}

interface Person2 {
  firstName: string
  lastName: string
}

function greeter2(person: Person2) {
  return 'Hello,' + person.firstName + '' + person.lastName
}

let user2 = new Student('Jane', 'M', 'User')

document.body.innerHTML = greeter2(user2)
