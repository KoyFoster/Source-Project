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
  if (pointTotal > pointLimit && size !== size) {
    let iDiff = pointLimit - pointTotal;
    values[iI - 1][1] += parseFloat(iDiff, 10);

    pointTotal = pointLimit;
  }

  if (pointDiff) {
    pointTotal -= pointMin;
  }
  return [pointTotal, pointMin, pointMax];
};

//Stat Card
function StatData(dataProps) {
  const data = dataProps.data;
  const setData = dataProps.setData;

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
    let valuesBuffer = Table;
    for (let i = 0; i < randOrder.length; i) {
      const iI = randOrder[i];
      valuesBuffer[iI][1] = Calc.fRNG(valuesBuffer[iI][2], valuesBuffer[iI][3]);
      i += 1;
    }
    Header[3] = GetPointTotal(
      Number(valuesBuffer.length),
      valuesBuffer,
      Header[5],
      Header[4],
    );

    this.setData.setUpdate(!this.data().update);
    dataProps.funcs.randAnim();
  } // end of randomizer

  const GetCalculatedValue = (iElem, mTable, Table) => {
    if (Table[iElem][6] && !Table[iElem][5])
      return mTable[Table[iElem][5][0]][Table[iElem][5][1]][1];
    if (!Table[iElem][6] && Table[iElem][5]) return -1;

    const expression = Table[iElem][6];
    const miT = Table[iElem][5][0];
    const miTI = Table[iElem][5][1];
    const miTVal = mTable[miT][miTI][1];
    const scope = { a: miTVal };
    const result = evaluate(expression, scope);
    return result;
  };

  // Update Functions
  function Update(iT, e) {
    const { x } = e;
    const { y } = e;
    let { value } = e;
    const { checked } = e;
    const { name } = e;
    const iIndex = y;
    const sTag = name ? name.substring(0, name.indexOf('_')) : name;
    if (
      x === undefined ||
      y === undefined ||
      value === undefined ||
      name === undefined
    )
      return;

    // Early Validation
    if (value < 0 && name === 'Quantity') return;

    const Header = this.data().vTableHeader(iT);
    const Table = this.data().vTable(iT);

    let Points = Header[3];

    if (name === 'Quantity') {
      Table.length = parseFloat(value, 10);

      // Subtract row difference
      if (Table.length < Table.length && Table.length >= 0) {
        Table = Table.slice(0, Table.length);
      }

      Points = GetPointTotal(
        Table.length,
        Table,
        this.data().PointDiff(iT),
        this.data().PointLimit(iT),
      );
    } else if (sTag === 'Value') {
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
        return;
      }
    } else if (sTag === 'Types') {
      Table[iIndex][0] = value;
    } else if (sTag === 'Min' || sTag === 'Max') {
      let iIndex2 = 3;
      if (sTag === 'Min') {
        iIndex2 = 2;

        //Check if min exceeds then current value or is less then zero
        value = Coll.iAATest(parseFloat(value, 10), 0, Table[iIndex][1]);
      } else if (sTag === 'Max') {
        //Check if max is less then current value
        value = Coll.iAATest(parseFloat(value, 10), Table[iIndex][1]);
        Points[2] = GetPointMax(Table.length, value);
      }
      Table[iIndex][iIndex2] = parseFloat(value, 10);
      Points = GetPointTotal(
        Table.length,
        Table,
        this.data().PointDiff(iT),
        this.data().PointLimit(iT),
      );
    } else if (sTag === 'PointDiff') {
      // Update to new PointTotal
      if (checked) {
        Points[0] = Points[0] - Points[1];
      } else {
        Points[0] = Points[0] + Points[1];
      }

      this.setData.setPointDiff(iT, checked);
      this.setData.setPointTotal(iT, Points[0]);

      this.setData.setUpdate(!this.data().update);
      return;
    } else if (sTag === 'Unit') {
      Table[iIndex][4] = value;

      //Check Point Limit Range
      Points = GetPointTotal(
        Table.length,
        Table,
        this.data().PointDiff(iT),
        this.data().PointLimit(iT),
      );
      if (Points[0] > this.data().PointLimit(iT)) {
        return;
      }
    }

    /* Update Calculated Stats */
    if (Header[1] === 'Calculated' && iIndex) {
      Table[iIndex][1] = GetCalculatedValue(iIndex, this.data().Values, Table);
    }

    Table.unshift(Header);
    if (Table.length !== Table.length) {
      this.setData.setTable(iT, Table);
    }
    Header[3] = Points;
    this.setData.setUpdate(!this.data().update);
  } // End of Update

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
    const val = Coll.iAATest(value, 10, this.data().PointTotal(iT));
    this.setData.setPointLimit(iT, val);
    this.setData.setUpdate(!this.data().update);
  }

  //Setup Listener Events
  useEffect(() => {
    dataProps.funcs.update = Update;
    dataProps.funcs.randomize = RandomizeStats;
    dataProps.funcs.updateLimit = UpdatePointLimit;

    dataProps.funcs.getPointTotal = GetPointTotal;

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

      dataProps.setData.setName(name);
      dataProps.setData.setValues({
        value: userDefined,
        size: userDefined.length,
      });

      dataProps.setData.setPointTotal(Points[0]);
      dataProps.setData.setPointMin(Points[1]);
      dataProps.setData.setPointMax(Points[2]);

      dataProps.setData.setPointLimit(1000);
      dataProps.setData.setPointDiff(pointDiff);
    }
  }, []);

  return <div></div>;
}

export default StatData;
