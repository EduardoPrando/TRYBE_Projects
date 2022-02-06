const { species, employees, prices, hours } = require('./data');
const data = require('./data');

// const calculateAllPeople = (entrants) => (prices.Adult * entrants.Adult || 0)
// + (prices.Child * entrants.Child || 0)
// + (prices.Senior * entrants.Senior || 0);

// function calculateEntry(entrants) {
//   if (!entrants || entrants === {}) return 0;
//   return Object.entries(entrants).reduce(
//     (accumulator, currentValue) => accumulator + (data.prices[currentValue[0]] * currentValue[1]), 0);
// }

// const entrants = { Child: 3, Senior: 1 };

// console.log(calculateEntry(entrants));

// console.log(Object.keys(hours));

// const entArray = Object.entries(hours);

// const entriesAll = () => entArray.reduce((accumulator, cValue, index) => {
//   if (cValue[0] === 'Monday') {
//     accumulator[entArray[index][0]] = 'CLOSED';
//     return accumulator;
//   }
//   accumulator[entArray[index][0]] = `Open from ${cValue[1].open}am until ${cValue[1].close - 12}pm`;
//   return accumulator;
// }, {});

// function getSchedule(dayName) {
//   if (!dayName) {
//     return entriesAll();
//   }
//   return entArray.find(((day) => day[0] === dayName)).reduce((accumulator, { open, close }) => {
//     if (dayName === 'Monday') {
//       accumulator[dayName] = 'CLOSED';
//       return accumulator;
//     }
//     accumulator[dayName] = `Open from ${open}am until ${close - 12}pm`;
//     return accumulator;
//   }, {});
// }

// console.log(getSchedule());+

// const animalIncludesTrue = (nameExport) => {
//   const namesAnimals = {};
//   species.forEach((specie) => {
//     namesAnimals[specie.name] = specie.residents.map((resident) => resident.name);
//   });
//   return namesAnimals;
// };

// const animalIncludesTrue = (nameExport) => {
//   const lalapaluza = species.reduce((accumulator, { name, residents }) => {
//     accumulator[name] = residents.map((resident) => resident.name);
//     return accumulator;
//   }, {});
//   const currentAnimalIndex = Object.keys(lalapaluza).indexOf(nameExport);
//   const animalsNamesByIndex = Object.values(lalapaluza)[currentAnimalIndex];
//   const newObj = {
//     [nameExport]: animalsNamesByIndex,
//   };
//   return newObj;
// };

// const animalByLocation = (includeNames, sorted) => species
//   .reduce((accumulator, { location, name, residents }) => {
//     if (!accumulator[location]) accumulator[location] = [];
//     if (includeNames) {
//       const nameResidents = [...residents];
//       accumulator[location].push({
//         [name]: animalsNameSorted(nameResidents, sorted),
//       });
//       return accumulator;
//     } accumulator[location].push(name);
//     return accumulator;
//   }, {});

const animalsSexSeparation = (residents, sex) => {
  if (sex === 'male' || sex === 'female') {
    return residents.filter((residentSex) => residentSex.sex === sex).map((element) => element.name);
    // return residents.map((resident) => resident.name);
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

// console.log(getAnimalMap({ includeNames: true, sorted: true, sex: 'male' }));
console.dir(getAnimalMap({ includeNames: true, sorted: true, sex: 'male' }), { depth: null });
