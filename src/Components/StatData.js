import React, { useEffect } from 'react';
import { Coll, Calc } from './KoyMath.js';

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
function StatData(sdProps) {
  // const { control } = sdProps;
  const data = sdProps.data;
  const setData = sdProps.setData;

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

  function RandomizeStats() {
    //Generate Random Order
    const randOrder = [];
    {
      //Creating scope here to clear 'tempOrder' when finished
      const tempOrder = [];

      //Compile Order
      for (let iTRO = 0; iTRO < this.data().Values.size; iTRO) {
        if (IsUnit(this.data().Values.value[iTRO][4])) {
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
    let valuesBuffer = this.data().Values.value;
    for (let i = 0; i < randOrder.length; i) {
      valuesBuffer[randOrder[i]][1] = Calc.fRNG(
        valuesBuffer[randOrder[i]][2],
        valuesBuffer[randOrder[i]][3],
      );
      i += 1;
    }
    let Points = GetPointTotal(
      Number(this.data().Values.size),
      valuesBuffer,
      data().PointDiff,
      data().PointLimit,
    );

    this.setData.setValues({
      value: valuesBuffer,
      size: this.data().Values.size,
    });
    this.setData.setPointTotal(Points[0]);
    this.setData.setPointMin(Points[1]);
    this.setData.setPointMax(Points[2]);
    sdProps.funcs.randAnim();
  }

  // Update Functions
  function Update(props) {
    // vars
    let tempSize = Number(this.data().Values.size);
    let tempVal = this.data().Values.value;
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
    let Points = [
      this.data().PointTotal,
      this.data().PointMin,
      this.data().PointMax,
    ];

    if (props.target.name === 'Quantity') {
      if (props.target.value < 0) return;
      tempSize = parseInt(props.target.value);
      Points = GetPointTotal(
        tempSize,
        tempVal,
        data().PointDiff,
        data().PointLimit,
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
        data().PointDiff,
        data().PointLimit,
      );
      if (Points[0] > this.data().PointLimit) {
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
        data().PointDiff,
        data().PointLimit,
      );
    } else if (sTag === 'PointDiff') {
      // Update to new PointTotal
      if (props.target.checked) {
        Points[0] = Points[0] - Points[1];
      } else {
        Points[0] = Points[0] + Points[1];
      }

      this.setData.setPointDiff(props.target.checked);
      this.setData.setPointTotal(Points[0]);

      return;
    } else if (sTag === 'Unit') {
      tempVal[iIndex][4] = props.target.value;

      //Check Point Limit Range
      Points = GetPointTotal(
        tempSize,
        tempVal,
        data().PointDiff,
        data().PointLimit,
      );
      if (Points[0] > data().PointLimit) {
        return;
      }
    }

    this.setData.setSize(tempSize);
    const Values = {
      value: tempVal,
      size: tempSize,
    };
    this.setData.setValues(Values);
    this.setData.setPointTotal(Points[0]);
    this.setData.setPointMin(Points[1]);
    this.setData.setPointMax(Points[2]);
  }

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

        continue;
      }
      subElement += value[i];
      i += 1;
    }

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
    sdProps.funcs.update = Update;
    sdProps.funcs.randomize = RandomizeStats;
    sdProps.funcs.updateLimit = UpdatePointLimit;

    sdProps.funcs.getPointTotal = GetPointTotal;

    let userDefined = sdProps.location.pathname.replace('/', '');
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
      data().Name = name;
      data().Values.size = userDefined.length;
      data().Values.value = userDefined;
      data().PointTotal = Points[0];
      data().PointMin = Points[1];
      data().PointMax = Points[2];
      data().PointLimit = 1000;
      data().PointDiff = pointDiff;
    }
  }, []);

  return <div></div>;
}

export default StatData;
