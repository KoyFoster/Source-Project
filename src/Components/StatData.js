import React from 'react';
import { /*Coll, */ Calc } from './KoyMath.js';
import { evaluate } from 'mathjs';

class StatData extends React.Component {
  // handles value range and returns event state
  static HandleStatMinMax(stats, stat, value) {
    let result = value;
    let event; // undefined will be treated as an error state

    switch (stat) {
      case 'Num':
        result = Calc.fMinMax(result, stats['Min'], stats['Max']);
        event = result - value;
        // console.log('MinMax:', result, stats['Min'], stats['Max'], event);
        break;
      case 'Min':
        result = Calc.fMinMax(result, undefined, stats['Num']);
        event = result - value;
        break;
      case 'Max':
        result = Calc.fMinMax(Calc.fMinMax(result, stats['Num']), stats['Min']);
        event = result - value;
        break;
      default:
        break;
    }

    return { result, event };
  }

  static TallyTotals(statBlock) {
    // console.log('statBlock:', statBlock);
    const tallies = { Total: 0, Min: 0, Max: 0 };

    Object.keys(statBlock).forEach((key) => {
      tallies.Total = tallies.Total + statBlock[key]['Num'];
      tallies.Min = tallies.Min + statBlock[key]['Min'];
      tallies.Max = tallies.Max + statBlock[key]['Max'];
    });

    return tallies;
  }

  static GetValue = (keys, data) => {
    if (!keys.length) return;
    // console.log('keys:', keys);

    let buffer;

    // depth check
    let index = [data];
    let i = 1;
    keys.forEach((key) => {
      // console.log('key', key, index[index.length - 1][key]);
      if (index[index.length - 1][key] === undefined) return;

      // iterate
      if (i !== keys.length) {
        index.push(index[index.length - 1][key]);
      } else {
        buffer = index[index.length - 1][key];
      }
      i += 1;
    });

    return buffer;
  };

  // static GetVariables(key, data) {
  //   let val = '';

  //   try {
  //   } catch {
  //     console.error(`ERROR: Invalid Key(${key})`);
  //     return [{}, {}, {}, {}];
  //   }

  //   return val;
  // }

  static RD = 2; // Round Decimal
  static Round(val) {
    const power = Math.pow(10, this.RD);
    // console.log('power:', power);
    return Math.round(val * power) / power;
  }

  // parse scope
  static parseVariables(variables, data) {
    console.log(`${variables}, ${data}`);
    let scope;

    try {
      scope = JSON.parse(variables);
    } catch {
      console.error(`ERROR: Invalid Variables(${variables})`);
      return {};
    }

    for (let [key, value] of Object.entries(scope)) {
      scope[key] = this.GetValue(value, data); // table, row, column="always 'Value'""
    }

    return scope;
  }

  // Get Calculated Value
  static GetCalculatedValue(expression, scope) {
    // parse scope
    // for (let [key, value] of Object.entries(scope)) {
    //   scope[key] = mTable[value[0]][value[1]][iElm /* Column */]; // table, row, column="always 'Value'""
    // }

    // validate
    if (scope.length === 0) return 0;

    let result;

    try {
      result = evaluate(expression, scope);
    } catch {
      console.error(`ERROR: Invalid Expression(${(expression, scope)})`);
      return {};
    }

    return result !== undefined ? this.Round(result) : 0;
  }

  // Get Calculated Value
  static GetCellValue(expression, scope, data) {
    const variables = this.parseVariables(scope, data);

    return this.GetCalculatedValue(expression, variables);
  }
}

// const RD = 2; // Round Decimal
// const Round = (val) => {
//   const power = Math.pow(10, RD);
//   // console.log('power:', power);
//   return Math.round(val * power) / power;
// };
// const sUnitTypes = ';;UNIT;LEVEL;LVL;POINT;PNT';

// const IsUnit = function (UnitType) {
//   let temp = 'X';
//   temp = UnitType.toUpperCase();
//   return sUnitTypes.includes(temp);
// };

// const GetPointTotal = (size, values, pointDiff, pointLimit) => {
//   let pointTotal = 0;
//   let pointMin = 0;
//   let pointMax = 0;
//   let arrDiff = size - values.length;
//   let iI = 0;

//   // Interate
//   for (iI; iI < size; iI) {
//     //push additional elements if change in size exceeds current size
//     if (arrDiff > 0) {
//       values.push(['???', 0, 0, 10, '']);
//       arrDiff--;
//     }
//     //Only Include Only Point Defined Stats
//     if (IsUnit(values[iI][4])) {
//       pointTotal += parseFloat(values[iI][1], 10);
//       pointMin += parseFloat(values[iI][2], 10);
//       pointMax += parseFloat(values[iI][3], 10);
//     }
//     iI += 1;
//   }
//   // check if new entry causes the point limit to be exceeded
//   // Note: Currently Broken
//   // if (pointTotal > pointLimit) {
//   //   let iDiff = pointLimit - pointTotal;
//   //   values[iI - 1][1] += parseFloat(iDiff, 10);

//   //   pointTotal = pointLimit;
//   // }

//   if (pointDiff) {
//     pointTotal -= pointMin;
//   }
//   return [pointTotal, pointMin, pointMax];
// };

// //Stat Card
// function StatData(dataProps) {
//   const setData = dataProps.setData;
//   const data = dataProps.data;
//   const funcs = dataProps.funcs;

//   const GetPointMax = function (iSize, values = 0) {
//     let PointMax = 0;
//     for (let iI; iI < iSize; iI) {
//       if (values === 0) {
//         if (IsUnit(values[iI][4])) {
//           PointMax += parseFloat(values[iI][3], 10);
//         }
//       } else {
//         if (IsUnit(values[iI][4])) {
//           PointMax += parseFloat(values[iI][3], 10);
//         }
//       }
//       iI += 1;
//     }
//     return PointMax;
//   };

//   // Update Functions
//   function Update(iT, e) {
//     // const { x } = e;
//     const { y } = e;
//     let { value } = e;
//     const { checked } = e;
//     const { name } = e;
//     const iIndex = y;
//     const sTag = name.substring(0, name.indexOf('_'))
//       ? name.substring(0, name.indexOf('_'))
//       : name;
//     if ((value === undefined && checked === undefined) || name === undefined)
//       return;

//     // Early Validation
//     if (value < 0 && name === 'Quantity') return;

//     const Header = this.data().vTableHeader(iT);
//     let Table = this.data().vTable(iT);

//     let Points = Header[3];

//     switch (sTag) {
//       case 'ShowName': {
//         // eslint-disable-next-line
//         const newName =
//           (checked ? '+' : '-') +
//           this.data().Name(iT).slice(1, this.data().Name(iT).length);
//         this.setData.setName(iT, newName);
//         return checked;
//       }
//       case 'Name': {
//         // eslint-disable-next-line
//         this.setData.setName(
//           iT,
//           this.data().ShowName(iT) + value + this.data().ShowGraph(iT),
//         );
//         return value;
//       }
//       case 'ShowGraph': {
//         // eslint-disable-next-line
//         const newName =
//           this.data()
//             .Name(iT)
//             .slice(0, this.data().Name(iT).length - 1) + (checked ? '+' : '-');

//         this.setData.setName(iT, newName);
//         return checked;
//       }
//       case 'Quantity': // eslint-disable-next-line
//         {
//           value = parseFloat(value, 10);

//           // Subtract row difference
//           if (value < Table.length && value >= 0) {
//             // Table =
//             Table = Table.slice(0, value);
//           }

//           Points = GetPointTotal(
//             value,
//             Table,
//             this.data().PointDiff(iT),
//             this.data().PointLimit(iT),
//           );
//         }
//         break;
//       case 'Types': // eslint-disable-next-line
//         {
//           Table[iIndex][0] = value;
//         }
//         break;
//       case 'Value': // eslint-disable-next-line
//         {
//           //Value Range Check
//           // console.log(
//           //   'value:',
//           //   value,
//           //   'Min:',
//           //   Table[iIndex][2],
//           //   'Max:',
//           //   Table[iIndex][3],
//           // );
//           value = Coll.iAATest(
//             parseFloat(value ? value : 0, 10),
//             Table[iIndex][2],
//             Table[iIndex][3],
//           );

//           //Check Point Limit Range
//           Points = GetPointTotal(
//             Table.length,
//             Table,
//             this.data().PointDiff(iT),
//             this.data().PointLimit(iT),
//           );

//           this.setData.setValue(iT, iIndex + 1, value);
//         }
//         break;
//       case 'Min': // eslint-disable-next-line
//         {
//           const iIndex2 = 2;
//           //Check if min exceeds then current value or is less then zero
//           value = Coll.iAATest(
//             parseFloat(value ? value : 0, 10),
//             0,
//             Table[iIndex][1],
//           );

//           Table[iIndex][iIndex2] = value;
//           Points = GetPointTotal(
//             Table.length,
//             Table,
//             this.data().PointDiff(iT),
//             this.data().PointLimit(iT),
//           );
//         }
//         break;
//       case 'Max': // eslint-disable-next-line
//         {
//           const iIndex2 = 3;
//           //Check if max is less then current value
//           value = Coll.iAATest(
//             parseFloat(value ? value : 0, 10),
//             Table[iIndex][1],
//           );

//           Points[2] = GetPointMax(Table.length, value);

//           Table[iIndex][iIndex2] = value;
//           Points = GetPointTotal(
//             Table.length,
//             Table,
//             this.data().PointDiff(iT),
//             this.data().PointLimit(iT),
//           );
//         }
//         break;
//       case 'PointDiff': {
//         // eslint-disable-next-line
//         // Update to new PointTotal
//         if (checked) {
//           Points[0] = Points[0] - Points[1];
//         } else {
//           Points[0] = Points[0] + Points[1];
//         }

//         this.setData.setPointDiff(iT, checked);
//         this.setData.setPointTotal(iT, Points[0]);

//         return checked;
//       }
//       case 'Unit': // eslint-disable-next-line
//         {
//           Table[iIndex][4] = value;

//           //Check Point Limit Range
//           Points = GetPointTotal(
//             Table.length,
//             Table,
//             this.data().PointDiff(iT),
//             this.data().PointLimit(iT),
//           );
//           if (Points[0] > this.data().PointLimit(iT)) {
//             return value;
//           }
//         }
//         break;
//       case 'References': // eslint-disable-next-line
//       case 'Expression': // eslint-disable-next-line
//         {
//           /* Update Calculated Stats */
//           if (Header[1] === 'Calculated' && iIndex !== undefined) {
//             /* set expression */
//             if (sTag === 'Expression') Table[iIndex][6] = value;
//             /* set Reference */ else Table[iIndex][5] = value;

//             let calcValue;
//             let calcMin;
//             let calcMax;
//             try {
//               calcValue = GetCalculatedValue(iIndex, this.data().Values, Table);
//               calcMin = GetCalculatedValue(
//                 iIndex,
//                 this.data().Values,
//                 Table,
//                 2,
//               );
//               calcMax = GetCalculatedValue(
//                 iIndex,
//                 this.data().Values,
//                 Table,
//                 3,
//               );
//             } catch {
//               return;
//             }

//             /* set updated value */
//             Table[iIndex][1] = calcValue;
//             Table[iIndex][2] = calcMin;
//             Table[iIndex][3] = calcMax;
//           }
//         }
//         break;
//       default:
//         // eslint-disable-next-line
//         {
//         }
//         break;
//     }

//     Table.unshift(Header);
//     this.setData.setTable(iT, Table);
//     Header[3] = Points;
//     // this.setData.Update();

//     return value;
//     // const elem = document.getElementsByName(name)[0];
//     // console.log('elem:', elem, 'name:', name);
//     // elem.focus();
//   } // End of Update

//   const GetCalculatedValue = (iRow, mTable, Table, iElm = 1) => {
//     if (Table[iRow][6] && !Table[iRow][5]) {
//       return mTable[Table[iRow][5][0]][Table[iRow][5][1]][1];
//     }
//     if (!Table[iRow][6] && Table[iRow][5]) return -1;

//     const expression = Table[iRow][6];

//     let scope = JSON.parse(Table[iRow][5]);

//     // parse scope
//     for (let [key, value] of Object.entries(scope)) {
//       scope[key] = mTable[value[0]][value[1]][iElm /* Column */]; // table, row, column="always 'Value'""
//     }

//     // validate
//     if (scope.length === 0) return 0;

//     const result = evaluate(expression, scope);
//     return Round(result);
//   };

//   function RandomizeStats(index /* table index */) {
//     const Header = this.data().vTableHeader(index);
//     const Table = this.data().vTable(index);

//     //Generate Random Order
//     const randOrder = [];
//     {
//       //Creating scope here to clear 'tempOrder' when finished
//       const tempOrder = [];

//       //Compile Order
//       for (let iTRO = 0; iTRO < Table.length; iTRO) {
//         if (IsUnit(Table[iTRO][4])) {
//           tempOrder.push(iTRO);
//         }
//         iTRO += 1;
//       }

//       //Random Order
//       let iSize = tempOrder.length;
//       for (let iRO = 0; iRO < iSize; iRO) {
//         let randIndex = Math.floor(Math.random() * tempOrder.length);
//         randOrder.push(tempOrder[randIndex]); //Add Index
//         tempOrder.splice(randIndex, 1); //Sub Temp Index
//         iRO += 1;
//       }
//     }

//     //Loop Through Random Order
//     let valuesBuffer = [...Table];
//     for (let i = 0; i < randOrder.length; i) {
//       const iI = randOrder[i];
//       valuesBuffer[iI][1] = Calc.fRNG(Table[iI][2], Table[iI][3]);

//       i += 1;
//     }

//     Header[3] = GetPointTotal(
//       Number(valuesBuffer.length),
//       valuesBuffer,
//       Header[5],
//       Header[4],
//     );

//     this.setData.Update();
//     funcs.randAnim();
//   } // end of randomizer

//   // Update All Calculations
//   function UpdateCalculations() {
//     const iTables = this.data().Values.length;
//     for (let i = 0; i < iTables; i) {
//       const Header = this.data().vTableHeader(i);
//       if (Header[1] !== 'Calculated') {
//         i += 1;
//         continue;
//       }
//       const Table = this.data().vTable(i);
//       for (let r = 0; r < Table.length; r) {
//         // console.log('Calculating:', Header[0], Table[r]);
//         const calcValue = GetCalculatedValue(r, this.data().Values, Table);
//         const calcMin = GetCalculatedValue(r, this.data().Values, Table, 2);
//         const calcMax = GetCalculatedValue(r, this.data().Values, Table, 3);
//         /* set updated value */
//         Table[r][1] = calcValue;
//         Table[r][2] = calcMin;
//         Table[r][3] = calcMax;

//         r += 1;
//       }

//       i += 1;
//     }
//   }

//   function ParseStringAsStatCard(value) {
//     //Break String Down Into Objects
//     let superElement = [];
//     let element = [];
//     let subElement = '';
//     let iElement = 1;
//     let bSuccess = false;
//     let name = 0;
//     for (let i = 0; i < value.length; i) {
//       if (value[i] === '[') {
//         //element start
//         if (name === 0) name = i;
//         subElement = ''; //clear sub element
//         iElement = 1;
//         i += 1;
//         continue;
//       } else if (value[i] === ']') {
//         //element end
//         //1. push sub element
//         let buffer = subElement;
//         if (iElement !== 1 && iElement !== 5) {
//           buffer = parseFloat(buffer, 10);
//         }
//         element.push(buffer);

//         //2. push element
//         superElement.push(element);
//         element = []; //clear sub element

//         iElement++;

//         bSuccess = true;

//         i += 1;
//         continue;
//       } else if (value[i] === ',') {
//         //sub element end/start: at the point a full sub element should have been compiled
//         //push sub element
//         let buffer = subElement;
//         if (iElement !== 1 && iElement !== 5) {
//           buffer = parseFloat(buffer, 10);
//         }
//         element.push(buffer); //push sub element

//         subElement = ''; //clear sub element
//         iElement++;

//         i += 1;
//         continue;
//       }
//       subElement += value[i];
//       i += 1;
//     } // end of for loop

//     if (bSuccess === false) {
//       return '';
//     }
//     superElement.unshift(value.slice(0, name).replace('StatCard/', ''));

//     return superElement;
//   }

//   function UpdatePointLimit(iT, value) {
//     //Limit Cannot be less then the minimum or the point total
//     const val = Coll.iAATest(value, 10, data().PointTotal(iT));
//     this.setData.setPointLimit(iT, val);
//     this.setData.Update();
//   }

//   //Setup Listener Events
//   useEffect(() => {
//     funcs.update = Update;
//     funcs.updateCalcs = UpdateCalculations;
//     funcs.randomize = RandomizeStats;
//     funcs.updateLimit = UpdatePointLimit;

//     funcs.getPointTotal = GetPointTotal;

//     let userDefined = dataProps.location.pathname.replace('/', '');
//     const pointDiff = userDefined.search('Min=true') > -1;

//     userDefined = ParseStringAsStatCard(userDefined);

//     let name = '';
//     if (userDefined !== '')
//       name = !Array.isArray(userDefined[0]) ? userDefined.shift() : '';

//     if (userDefined !== '') {
//       let Points = GetPointTotal(
//         userDefined.length,
//         userDefined,
//         pointDiff,
//         1000,
//       );

//       setData.setName(name);
//       setData.setValues({
//         value: userDefined,
//         size: userDefined.length,
//       });

//       setData.setPointTotal(Points[0]);
//       setData.setPointMin(Points[1]);
//       setData.setPointMax(Points[2]);

//       setData.setPointLimit(1000);
//       setData.setPointDiff(pointDiff);
//     }
//     // eslint-disable-next-line
//   }, []);

//   return <div></div>;
//}

export default StatData;
