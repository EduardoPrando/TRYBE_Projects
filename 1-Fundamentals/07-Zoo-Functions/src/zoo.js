const { species, employees, prices, hours } = require('./data');

const data = require('./data');

// EXERCISE 01
function getSpeciesByIds(...ids) {
// Rest the parameter if there is more than one.
  return ids.map((idd) => species.find((specie) => (specie.id === idd)));
// map and find the same id as the 'idd' of map.
}

// EXERCISE 02
const getAnimalsOlderThan = (animal, age) => species
//  fining the specie name, same as the parameter.
  .find((specie) => specie.name === animal).residents
//  comparing if all the residents have at least the age parameter.
  .every((resident) => resident.age > age);

// EXERCISE 03
function getEmployeeByName(employeeName) {
// if there is no parameter return a empty object.
  if (!employeeName) return {};
  // finding the employee with the firstName or ( || ) LastName;
  return employees.find(
    (eName) => eName.firstName === employeeName || eName.lastName === employeeName,
  );
}

// EXERCISE 04
function createEmployee(personalInfo, associatedWith) {
  // assign all parameters to the object.
  return Object.assign(personalInfo, associatedWith);
}

// EXERCISE 05
const isManager = (id) => employees
// search a employee with the id
  .some((employee) => employee.managers
    .some((idsEmp) => idsEmp === id));

// EXERCISE 06
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) { // default the last two parameters.
  // pushing the new obj to employees array.
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

// EXERCISE 07
function countAnimals(speciesPar) {
  // if parameter is Falsy, return all the names and residents
  if (!speciesPar) {
    return species.reduce((accumulator, { name, residents }) => {
      accumulator[name] = residents.length;
      return accumulator;
    }, {});
  }
  // found the specie name === parameter
  return species.find((specie) => specie.name === speciesPar).residents.length;
}

// EXERCISE 08
const calculateAllPeople = (entrants) => (prices.Adult * entrants.Adult || 0)
// multiplying the price for the number of people, if the parameter is not defined it will be 0.
+ (prices.Child * entrants.Child || 0)
+ (prices.Senior * entrants.Senior || 0);

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  return calculateAllPeople(entrants);
}

// EXERCISE 09
const animalsSexSeparation = (residents, sex) => {
  if (sex === 'male' || sex === 'female') {
    return residents.filter(
      (residentSex) => residentSex.sex === sex,
    ).map((element) => element.name);
  } return residents.map((resident) => resident.name);
};

const animalsNameSorted = (residents, sorted, sex) => {
  if (!sorted) {
    return animalsSexSeparation(residents, sex);
  } return animalsSexSeparation(residents, sex).sort();
};

const getAnimalMap = ({ includeNames = false, sorted = false, sex } = {}) => species
  .reduce((accumulator, { location, name, residents }) => {
    if (!accumulator[location]) accumulator[location] = [];
    if (includeNames) {
      const nameResidents = [...residents];
      accumulator[location].push({
        [name]: animalsNameSorted(nameResidents, sorted, sex),
      });
      return accumulator;
    } accumulator[location].push(name);
    return accumulator;
  }, {});

// EXERCISE 10
const entArray = Object.entries(hours);

const entriesAll = () => entArray.reduce((accumulator, cValue, index) => { // using reduce to 'simplify', and return all the schedule
  // change the monday value to 'CLOSED'
  if (cValue[0] === 'Monday') {
    accumulator[entArray[index][0]] = 'CLOSED';
    return accumulator;
  }
  accumulator[entArray[index][0]] = `Open from ${cValue[1].open}am until ${cValue[1].close - 12}pm`;
  return accumulator;
}, {});

function getSchedule(dayName) {
  if (!dayName) {
    return entriesAll();
  }
  // find the parameter, than reduce.
  return entArray.find(((day) => day[0] === dayName)).reduce((accumulator, { open, close }) => {
    // change the monday value to 'CLOSED'
    if (dayName === 'Monday') {
      accumulator[dayName] = 'CLOSED';
      return accumulator;
    }
    // day as a key, and value is the text
    accumulator[dayName] = `Open from ${open}am until ${close - 12}pm`;
    return accumulator;
  }, {});
}

// EXERCISE 11
function getOldestFromFirstSpecies(id) {
  const animal = employees.find((idEmp) => idEmp.id === id).responsibleFor[0];
  return Object.values(species.find(
    (specie) => specie.id === animal,
  ).residents.reduce(
    (accumulator, currentNumber) => {
      if ((accumulator.age) > currentNumber.age) return accumulator;
      return currentNumber;
    },
  ));
}

// EXERCISE 12
function increasePrices(percentage) {
  prices.Adult = Math.ceil(
    ((prices.Adult * (percentage / 100)) + prices.Adult) * 100,
  ) / 100;
  prices.Child = Math.ceil(
    ((prices.Child * (percentage / 100)) + prices.Child) * 100,
  ) / 100;
  prices.Senior = Math.ceil(
    ((prices.Senior * (percentage / 100)) + prices.Senior) * 100,
  ) / 100;
}

// EXERCISE 13
const findAnimal = (responsibleFor) => responsibleFor.map(
  (animal) => species.find((anima) => anima.id === animal).name,
);

const allEmployees = () => employees.reduce(
  (accumulator, { firstName, lastName, responsibleFor }) => {
    accumulator[`${firstName} ${lastName}`] = findAnimal(responsibleFor);
    return accumulator;
  }, {},
);

function getEmployeeCoverage(idOrName) {
  if (!idOrName) return allEmployees();
  const empShow = employees.find(
    (idEmp) => idEmp.id === idOrName
    || idEmp.firstName === idOrName
    || idEmp.lastName === idOrName,
  );
  const nameSingle = {
    [`${empShow.firstName} ${empShow.lastName}`]: findAnimal(empShow.responsibleFor),
  };
  return nameSingle;
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
