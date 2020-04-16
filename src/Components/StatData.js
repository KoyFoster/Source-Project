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
      pointTotal += parseInt(values[iI][1]);
      pointMin += parseInt(values[iI][2]);
      pointMax += parseInt(values[iI][3]);
    }
    iI += 1;
  }
  // check if new entry causes the point limit to be exceeded
  if (pointTotal > pointLimit && size !== size) {
    let iDiff = pointLimit - pointTotal;
    values[iI - 1][1] += parseInt(iDiff);

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
          PointMax += parseInt(values[iI][3]);
        }
      } else {
        if (IsUnit(values[iI][4])) {
          PointMax += parseInt(values[iI][3]);
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
    console.log(
      'GCV:',
      'iElem:',
      iElem,
      'miTVal:',
      miTVal,
      'miT:',
      miT,
      'miTI:',
      miTI,
      'expression:',
      expression,
    );
    const scope = { a: miTVal };
    const result = evaluate(expression, scope);
    console.log('GCV:', 'result:', result);
    return result;
  };

  // Update Functions
  function Update(index, props) {
    // Early Validation
    if (props.target.value < 0 && props.target.name === 'Quantity') return;

    const Header = this.data().vTableHeader(index);
    const Table = this.data().vTable(index);

    // vars
    let tempSize = Number(Table.length);
    let tempVal = Table;
    let iIndex = props.target.name.indexOf(',')
      ? props.target.name.substring(
          props.target.name.indexOf(',') + 1,
          props.target.name.indexOf(')'),
        )
      : props.target.name;
    let sTag =
      props.target.name.indexOf('_(') > -1
        ? props.target.name.substring(0, props.target.name.indexOf('_('))
        : props.target.name;
    let Points = Header[3];

    if (props.target.name === 'Quantity') {
      if (props.target.value < 0) return;
      tempSize = parseInt(props.target.value);

      // Subtract row difference
      if (tempSize < tempVal.length && tempSize >= 0) {
        tempVal = tempVal.slice(0, tempSize);
      }

      Points = GetPointTotal(
        tempSize,
        tempVal,
        this.data().PointDiff(index),
        this.data().PointLimit(index),
      );
    } else if (sTag === 'Value') {
      //Value Range Check
      tempVal[iIndex][1] = Coll.iAATest(
        parseInt(props.target.value),
        tempVal[iIndex][2],
        tempVal[iIndex][3],
      );

      //Check Point Limit Range
      Points = GetPointTotal(
        tempSize,
        tempVal,
        this.data().PointDiff(index),
        this.data().PointLimit(index),
      );
      if (Points[0] > this.data().PointLimit(index)) {
        return;
      }
    } else if (sTag === 'Types') {
      iIndex = parseInt(iIndex.replace('Types_(', '')[0]);
      tempVal[iIndex][0] = props.target.value;
    } else if (sTag === 'Min' || sTag === 'Max') {
      let iIndex2 = 3;
      if (sTag === 'Min') {
        iIndex2 = 2;

        //Check if min exceeds then current value or is less then zero
        props.target.value = Coll.iAATest(
          parseInt(props.target.value),
          0,
          tempVal[iIndex][1],
        );
      } else if (sTag === 'Max') {
        //Check if max is less then current value
        props.target.value = Coll.iAATest(
          parseInt(props.target.value),
          tempVal[iIndex][1],
        );
        Points[2] = GetPointMax(tempSize, props.target.value);
      }
      tempVal[iIndex][iIndex2] = parseInt(props.target.value);
      Points = GetPointTotal(
        tempSize,
        tempVal,
        this.data().PointDiff(index),
        this.data().PointLimit(index),
      );
    } else if (sTag === 'PointDiff') {
      // Update to new PointTotal
      if (props.target.checked) {
        Points[0] = Points[0] - Points[1];
      } else {
        Points[0] = Points[0] + Points[1];
      }

      this.setData.setPointDiff(index, props.target.checked);
      this.setData.setPointTotal(index, Points[0]);

      this.setData.setUpdate(!this.data().update);
      return;
    } else if (sTag === 'Unit') {
      tempVal[iIndex][4] = props.target.value;

      //Check Point Limit Range
      Points = GetPointTotal(
        tempSize,
        tempVal,
        this.data().PointDiff(index),
        this.data().PointLimit(index),
      );
      if (Points[0] > this.data().PointLimit(index)) {
        return;
      }
    }

    /* Update Calculated Stats */
    if (Header[1] === 'Calculated' && iIndex) {
      tempVal[iIndex][1] = GetCalculatedValue(
        iIndex,
        this.data().Values,
        Table,
      );
    }

    tempVal.unshift(Header);
    if (tempSize !== Table.length) {
      this.setData.setTable(index, tempVal);
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
          buffer = parseInt(buffer);
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
          buffer = parseInt(buffer);
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

  function UpdatePointLimit(props) {
    //Limit Cannot be less then the minimum or the point total
    const val = Coll.iAATest(
      parseInt(props.target.value),
      this.data().PointTotal,
    );
    setData.setPointLimit(val);
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
