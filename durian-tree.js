class Employee {
  constructor(name, title, salary) {
    this.name = name;
    this.title = title;
    this.salary = salary;
    this.boss = null;
    this.subordinates = [];
  }
  addSubordinate(subordinate) {
    this.subordinates.push(subordinate);
    subordinate.boss = this;
  }
  get numberOfSubordinates() {
    return this.subordinates.length;
  }
  get numberOfPeopleToCEO() {
    let numberOfPeople = 0;
    let currentEmployee = this;

    // climb "up" the tree (using iteration), counting nodes, until no boss is found
    while (currentEmployee.boss) {
      currentEmployee = currentEmployee.boss;
      numberOfPeople++;
    }

    return numberOfPeople;
  }
  hasSameBoss(employee) {
    return this.boss === employee.boss;
  }

  employeesThatMakeOver(amount) {

    let employees = [];  // 1
    if (this.salary > amount) {
      employees.push(this);  // 2
    }

    for (const subordinate of this.subordinates) {
      const subordinatesThatMakeOver = subordinate.employeesThatMakeOver(amount); // 3. Call this method on all of the current employee's subordinates and combine their results with the current results.
      employees = employees.concat(subordinatesThatMakeOver);
    }

    return employees;
  }  
    /* If we call this method on ada, the algorithm will traverse through the entire company (every employee under Ada, including Ada).
    
     let wealthyEmployees = ada.employeesThatMakeOver(418401); */

  
  

  get totalEmployees() {
   
    let totalEmployees = 0; // 1

    for (const subordinate of this.subordinates) {
      const subordinateTotalEmployees = subordinate.totalEmployees;
      totalEmployees += subordinateTotalEmployees + 1;
    }

    return totalEmployees;
  }
};


const ada = new Employee("Ada", "CEO", 3000000.00);

const craig = new Employee("Craig", "VP Software", 1000000);
ada.addSubordinate(craig);
const simone = new Employee("Simone", "Software Developer", 20);
const ali = new Employee("Ali", "Software Developer", 20);

craig.addSubordinate(simone);
craig.addSubordinate(ali);

const arvinder = new Employee("Arvinder", "Chief Design Officer", 1000000);
ada.addSubordinate(arvinder);

const angela = new Employee("Angela", "VP Retail", 1000000);
const karla = new Employee("Karla", "Retail", 20);
angela.addSubordinate(karla);

const phil = new Employee("Phil", "VP Marketing", 1000000);
const florida = new Employee("Florida", "Marketing", 20);
const david = new Employee("David", "Marketing", 20);
const brian = new Employee("Brian", "Marketing", 20);
ada.addSubordinate(phil);
phil.addSubordinate(florida);
phil.addSubordinate(david);
phil.addSubordinate(brian);

/* Feature 1 - Employee's boss
To get the boss of any employee, we simply have to use that node's boss property (employee.boss). Nothing more to do there! */

console.log("****Feature 1:*****", craig.boss);

console.log("****Feature 2:*****", craig.numberOfSubordinates);
console.log("****Feature 3:*****", craig.numberOfPeopleToCEO);

console.log("ada.totalEmployees: *****", ada.totalEmployees);