import React, { useEffect } from 'react';
import { Coll, Calc } from './KoyMath.js';
import { evaluate } from 'mathjs';

const sUnitTypes = ';;UNIT;LEVEL;LVL;POINT;PNT';

const IsUnit = function (UnitType) {
  let temp = 'X';
  temp = UnitType.toUpperCase();
  return sUnitTypes.includes(temp);
};

const GetPointTotal = (size, values, pointDiff, pointLimit) => {
  let pointTotal = 0;
  let pointMin = 0;
  let pointMax = 0;
  let arrDiff = size - values.length;
  let iI = 0;

  // Interate
  for (iI; iI < size; iI) {
    //push additional elements if change in size exceeds current size
    if (arrDiff > 0) {
      values.push(['???', 0, 0, 10, '']);
      arrDiff--;
    }
    //Only Include Only Point Defined Stats
    if (IsUnit(values[iI][4])) {
      pointTotal += parseFloat(values[iI][1], 10);
      pointMin += parseFloat(values[iI][2], 10);
      pointMax += parseFloat(values[iI][3], 10);
    }
    iI += 1;
  }
  // check if new entry causes the point limit to be exceeded
  // Note: Currently Broken
  // if (pointTotal > pointLimit) {
  //   let iDiff = pointLimit - pointTotal;
  //   values[iI - 1][1] += parseFloat(iDiff, 10);

  //   pointTotal = pointLimit;
  // }

  if (pointDiff) {
    pointTotal -= pointMin;
  }
  return [pointTotal, pointMin, pointMax];
};

//Stat Card
function StatData(dataProps) {
  const setData = dataProps.setData;
  const data = dataProps.data;
  const funcs = dataProps.funcs;

  const GetPointMax = function (iSize, values = 0) {
    let PointMax = 0;
    for (let iI; iI < iSize; iI) {
      if (values === 0) {
        if (IsUnit(values[iI][4])) {
          PointMax += parseFloat(values[iI][3], 10);
        }
      } else {
        if (IsUnit(values[iI][4])) {
          PointMax += parseFloat(values[iI][3], 10);
        }
      }
      iI += 1;
    }
    return PointMax;
  };

  // Update Functions
  function Update(iT, e) {
    // const { x } = e;
    const { y } = e;
    let { value } = e;
    const { checked } = e;
    const { name } = e;
    const iIndex = y;
    const sTag = name.substring(0, name.indexOf('_'))
      ? name.substring(0, name.indexOf('_'))
      : name;
    // console.log(
    //   'name:',
    //   name,
    //   'sTag:',
    //   sTag,
    //   'x:',
    //   x,
    //   'y:',
    //   y,
    //   'value:',
    //   value,
    //   'checked:',
    //   checked,
    //   'iIndex:',
    //   iIndex,
    // );
    if ((value === undefined && checked === undefined) || name === undefined)
      return;

    // Early Validation
    if (value < 0 && name === 'Quantity') return;

    const Header = this.data().vTableHeader(iT);
    let Table = this.data().vTable(iT);

    let Points = Header[3];

    console.log('Tag:', sTag);
    switch (sTag) {
      case 'Quantity':
        {
          value = parseFloat(value, 10);

          // Subtract row difference
          if (value < Table.length && value >= 0) {
            // Table =
            Table = Table.slice(0, value);
          }

          Points = GetPointTotal(
            value,
            Table,
            this.data().PointDiff(iT),
            this.data().PointLimit(iT),
          );
        }
        break;
      case 'Value':
        {
          //Value Range Check
          Table[iIndex][1] = Coll.iAATest(
            parseFloat(value, 10),
            Table[iIndex][2],
            Table[iIndex][3],
          );

          //Check Point Limit Range
          Points = GetPointTotal(
            Table.length,
            Table,
            this.data().PointDiff(iT),
            this.data().PointLimit(iT),
          );
          if (Points[0] > this.data().PointLimit(iT)) {
            this.setData.setUpdate(!this.data().update);
            return;
          }
        }
        break;
      case 'Min':
        {
          const iIndex2 = 2;
          //Check if min exceeds then current value or is less then zero
          value = Coll.iAATest(parseFloat(value, 10), 0, Table[iIndex][1]);

          Table[iIndex][iIndex2] = parseFloat(value, 10);
          Points = GetPointTotal(
            Table.length,
            Table,
            this.data().PointDiff(iT),
            this.data().PointLimit(iT),
          );
        }
        break;
      case 'Max':
        {
          const iIndex2 = 3;
          //Check if max is less then current value
          value = Coll.iAATest(parseFloat(value, 10), Table[iIndex][1]);
          Points[2] = GetPointMax(Table.length, value);

          Table[iIndex][iIndex2] = parseFloat(value, 10);
          Points = GetPointTotal(
            Table.length,
            Table,
            this.data().PointDiff(iT),
            this.data().PointLimit(iT),
          );
        }
        break;
      case 'PointDiff':
        {
          // Update to new PointTotal
          if (checked) {
            Points[0] = Points[0] - Points[1];
          } else {
            Points[0] = Points[0] + Points[1];
          }

          this.setData.setPointDiff(iT, checked);
          // console.log('PointDiff:', iT, checked, this.data().PointDiff(iT));
          this.setData.setPointTotal(iT, Points[0]);

          this.setData.setUpdate(!this.data().update);
          return;
        }
        break;
      case 'Unit':
        {
          Table[iIndex][4] = value;

          //Check Point Limit Range
          Points = GetPointTotal(
            Table.length,
            Table,
            this.data().PointDiff(iT),
            this.data().PointLimit(iT),
          );
          if (Points[0] > this.data().PointLimit(iT)) {
            this.setData.setUpdate(!this.data().update);
            return;
          }
        }
        break;
      case 'Reference':
        {
          /* Update Calculated Stats */
          console.log(
            'IsCalculated:',
            Header[1],
            'iIndex:',
            iIndex !== undefined,
          );
          if (Header[1] === 'Calculated' && iIndex) {
            const calcValue = GetCalculatedValue(
              iIndex,
              this.data().Values,
              Table,
            );
            console.log('calcVal:', calcValue);
            Table[iIndex][1] = calcValue;
          }
        }
        break;
      case 'Expression':
        {
          /* Update Calculated Stats */
          console.log(
            'IsCalculated:',
            Header[1],
            'iIndex:',
            iIndex !== undefined,
          );
          if (Header[1] === 'Calculated' && iIndex !== undefined) {
            const calcValue = GetCalculatedValue(
              iIndex,
              this.data().Values,
              Table,
            );
            console.log('calcVal:', calcValue);
            Table[iIndex][1] = calcValue;
          }
        }
        break;
      default:
        {
        }
        break;
    }

    Table.unshift(Header);
    this.setData.setTable(iT, Table);
    Header[3] = Points;
    this.setData.setUpdate(!this.data().update);
  } // End of Update

  const GetCalculatedValue = (iElem, mTable, Table) => {
    if (Table[iElem][6] && !Table[iElem][5]) {
      return mTable[Table[iElem][5][0]][Table[iElem][5][1]][1];
    }
    if (!Table[iElem][6] && Table[iElem][5]) return -1;

    const expression = Table[iElem][6];
    const miT = Table[iElem][5][0];
    const miTI = Table[iElem][5][1];
    const miTVal = mTable[miT][miTI][1];
    const scope = { a: miTVal };
    const result = evaluate(expression, scope);
    return result;
  };

  function RandomizeStats(index /* table index */) {
    const Header = this.data().vTableHeader(index);
    const Table = this.data().vTable(index);

    //Generate Random Order
    const randOrder = [];
    {
      //Creating scope here to clear 'tempOrder' when finished
      const tempOrder = [];

      //Compile Order
      for (let iTRO = 0; iTRO < Table.length; iTRO) {
        if (IsUnit(Table[iTRO][4])) {
          tempOrder.push(iTRO);
        }
        iTRO += 1;
      }

      //Random Order
      let iSize = tempOrder.length;
      for (let iRO = 0; iRO < iSize; iRO) {
        let randIndex = Math.floor(Math.random() * tempOrder.length);
        randOrder.push(tempOrder[randIndex]); //Add Index
        tempOrder.splice(randIndex, 1); //Sub Temp Index
        iRO += 1;
      }
    }

    //Loop Through Random Order
    let valuesBuffer = [...Table];
    for (let i = 0; i < randOrder.length; i) {
      const iI = randOrder[i];
      valuesBuffer[iI][1] = Calc.fRNG(Table[iI][2], Table[iI][3]);

      i += 1;
    }

    // console.log('Values:', valuesBuffer);
    Header[3] = GetPointTotal(
      Number(valuesBuffer.length),
      valuesBuffer,
      Header[5],
      Header[4],
    );

    this.setData.setUpdate(!this.data().update);
    funcs.randAnim();
  } // end of randomizer

  function ParseStringAsStatCard(value) {
    //Break String Down Into Objects
    let superElement = [];
    let element = [];
    let subElement = '';
    let iElement = 1;
    let bSuccess = false;
    let name = 0;
    for (let i = 0; i < value.length; i) {
      if (value[i] === '[') {
        //element start
        if (name === 0) name = i;
        subElement = ''; //clear sub element
        iElement = 1;
        i += 1;
        continue;
      } else if (value[i] === ']') {
        //element end
        //1. push sub element
        let buffer = subElement;
        if (iElement !== 1 && iElement !== 5) {
          buffer = parseFloat(buffer, 10);
        }
        element.push(buffer);

        //2. push element
        superElement.push(element);
        element = []; //clear sub element

        iElement++;

        bSuccess = true;

        i += 1;
        continue;
      } else if (value[i] === ',') {
        //sub element end/start: at the point a full sub element should have been compiled
        //push sub element
        let buffer = subElement;
        if (iElement !== 1 && iElement !== 5) {
          buffer = parseFloat(buffer, 10);
        }
        element.push(buffer); //push sub element

        subElement = ''; //clear sub element
        iElement++;

        i += 1;
        continue;
      }
      subElement += value[i];
      i += 1;
    } // end of for loop

    if (bSuccess === false) {
      return '';
    }
    superElement.unshift(value.slice(0, name).replace('StatCard/', ''));

    return superElement;
  }

  function UpdatePointLimit(iT, value) {
    //Limit Cannot be less then the minimum or the point total
    const val = Coll.iAATest(value, 10, data().PointTotal(iT));
    this.setData.setPointLimit(iT, val);
    this.setData.setUpdate(!data().update);
  }

  //Setup Listener Events
  useEffect(() => {
    funcs.update = Update;
    funcs.randomize = RandomizeStats;
    funcs.updateLimit = UpdatePointLimit;

    funcs.getPointTotal = GetPointTotal;

    let userDefined = dataProps.location.pathname.replace('/', '');
    const pointDiff = userDefined.search('Min=true') > -1;

    userDefined = ParseStringAsStatCard(userDefined);

    let name = '';
    if (userDefined !== '')
      name = !Array.isArray(userDefined[0]) ? userDefined.shift() : '';

    if (userDefined !== '') {
      let Points = GetPointTotal(
        userDefined.length,
        userDefined,
        pointDiff,
        1000,
      );

      setData.setName(name);
      setData.setValues({
        value: userDefined,
        size: userDefined.length,
      });

      setData.setPointTotal(Points[0]);
      setData.setPointMin(Points[1]);
      setData.setPointMax(Points[2]);

      setData.setPointLimit(1000);
      setData.setPointDiff(pointDiff);
    }
    // eslint-disable-next-line
  }, []);

  return <div></div>;
}

export default StatData;
