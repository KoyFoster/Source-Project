import React, { useState, useEffect } from "react";
import {Coll, Calc} from './KoyMath.js';

const sUnitTypes = ';;UNIT;LEVEL;LVL;POINT;PNT'

let IsUnit = function(UnitType)
{ 
    let temp = 'X'; 
    temp = UnitType.toUpperCase();
    return sUnitTypes.includes(temp);
}

//Stat Card
function StatData(props)
{
    // const { control } = props;
    const {data} = props;
    const setData = (newData) => { props.setData(newData) };

    const GetPointTotal = (size = data.Size, values = data.Values, pointDiff = data.PointDiff, pointLimit = data.PointLimit) => 
    {
        let pointTotal  = 0;
        let pointMin    = 0;
        let pointMax    = 0;
        let arrDiff     = size - values.length;
        let iI = 0;
        for(iI; iI < size; iI++)
        {
                //push additional elements if change in size exceeds current size
                if(arrDiff > 0)
                {
                    values.push(['???',0,0,10,'']);
                    arrDiff--;
                };
                //Only Include Only Point Defined Stats
                if(IsUnit(values[iI][4]))
                {
                    pointTotal  += parseInt(values[iI][1]);
                    pointMin    += parseInt(values[iI][2]);
                    pointMax    += parseInt(values[iI][3]);
                };
        };
        // check if new entry causes the point limit to be exceeded
        if((data.PointTotal > pointLimit) && (size !== data.Size))
        {
            let iDiff = pointLimit - pointTotal;
            values[iI-1][1] += parseInt(iDiff);
            
            pointTotal = pointLimit;
        }

        if(pointDiff){ pointTotal -= pointMin; }
        return [pointTotal, pointMin, pointMax];
    };

    const GetPointMax = function(iSize, Values = 0)
    {
        let PointMax    = 0;
        for(let iI; iI < iSize; iI++)
        {
            if(Values === 0)
            {
                if(IsUnit(Values[iI][4]))
                {PointMax    += parseInt(Values[iI][3]);}
            }
            else
            {
                if(IsUnit(Values[iI][4]))
                {PointMax    += parseInt(Values[iI][3]);}
            };
        };
        return PointMax;
    };

    function RandomizeStats(props)
    {
        //Generate Random Order
        let randOrder = [];
        {   //Creating scope here to clear 'tempOrder' when finished
            let tempOrder = [];
    
            //Compile Order
            for(let iTRO = 0; iTRO < data.Size; iTRO++)
            { 
                if(IsUnit(data.Values[iTRO][4]))
                {tempOrder.push(iTRO);}
            };
            
            //Random Order
            let iSize = tempOrder.length;
            for(let iRO = 0; iRO < iSize; iRO++)
            {
                let randIndex = Math.floor(Math.random()*(tempOrder.length));
                randOrder.push(tempOrder[randIndex]);//Add Index
                tempOrder.splice(randIndex, 1);//Sub Temp Index
            };
        }
    
        //Loop Through Random Order
        let valuesBuffer = data.Values;
        for(let i = 0; i < randOrder.length; i++)
        {
            valuesBuffer[randOrder[i]][1] = Calc.fRNG(valuesBuffer[randOrder[i]][2], valuesBuffer[randOrder[i]][3]);
        };
    
        console.log('Size:',data.Size, data.Values.length, randOrder.length);
    
        let Points = GetPointTotal(data.Size, valuesBuffer);
    
        setData({Values: valuesBuffer, PointTotal: Points[0], PointMin: Points[1], PointMax: Points[2]});
    }
    
    //Load States
    function Initialize()
    {
        let Points = GetPointTotal(data.Values.length);
        setData({PointTotal: Points[0], PointMin: Points[1], PointMax: Points[2]});
    }

    //Update Functions
    function UpdateStates(props)
    {
        console.log('UpdateStates:', props.target.value);
        //vars
        let tempSize    = data.Size;
        let tempVal     = data.Values;
        let iIndex      = props.target.name.indexOf(',') ? props.target.name.substring(props.target.name.indexOf(',')+1, props.target.name.indexOf(')')) : props.target.name;
        let sTag        = props.target.name.indexOf('_(') > -1 ? props.target.name.substring(0, props.target.name.indexOf('_(')) : props.target.name;
        let Points      = [data.PointTotal, data.PointMin, data.PointMax];

        if(props.target.name === 'Quantity')
        {
            tempSize    = parseInt(props.target.value);
            Points      = GetPointTotal(tempSize);
        }
        else if(sTag === 'Value')
        {
            //Value Range Check
            tempVal[iIndex][1] = Coll.iAATest(parseInt(props.target.value), tempVal[iIndex][2], tempVal[iIndex][3]);

            //Check Point Limit Range
            Points = GetPointTotal(tempSize, tempVal);
            if(Points[0] > data.PointLimit)
            { return; }
        }
        else if(sTag === 'Types')
        {
            iIndex = parseInt(iIndex.replace('Types_(', '')[0]);
            tempVal[iIndex][0] = props.target.value;
        }
        else if(sTag === 'Min' || sTag === 'Max')
        {
            let iIndex2 = 3;
            if(sTag === 'Min')
            {
                iIndex2 = 2;
                
                //Check if min exceeds then current value or is less then zero
                props.target.value = Coll.iAATest(parseInt(props.target.value),0,tempVal[iIndex][1]);
            }
            else if(sTag === 'Max')
            {
                //Check if max is less then current value
                props.target.value = Coll.iAATest(parseInt(props.target.value),tempVal[iIndex][1]);
                Points[2] = GetPointMax(tempSize,props.target.value);
            }
            tempVal[iIndex][iIndex2] = parseInt(props.target.value);
            Points = GetPointTotal(tempSize, tempVal);
        }
        else if(sTag === 'PointDiff')
        {
            // Update to new PointTotal
            if(props.target.checked)
            { Points[0] = Points[0]-Points[1]; }
            else
            { Points[0] = Points[0]+Points[1]; }

            setData({PointTotal: Points[0], PointDiff: props.target.checked});

            return;
        }
        else if(sTag === 'Unit')
        {
            tempVal[iIndex][4] = props.target.value;

            //Check Point Limit Range
            Points = GetPointTotal(tempSize, tempVal);
            if(Points[0] > data.PointLimit)
            { return; }
        }

        console.log('setData:',{Size: tempSize, Values: tempVal, PointTotal: Points[0], PointMin: Points[1], PointMax: Points[2]});
        setData({Size: tempSize, Values: tempVal, PointTotal: Points[0], PointMin: Points[1], PointMax: Points[2]});
    }

    function SetNewData(newData)
    {
        let Points = GetPointTotal(newData.values.length, newData.values, newData.pntDiff, newData.pntLimit);

        setData({PointTotal: Points[0], PointMin: Points[1], PointMax: Points[2]})
    }

    function ParseStringAsStatCard(value)
    {
        //Break String Down Into Objects
        let superElement = [];
        let element = [];
        let subElement = '';
        let iElement = 1;
        let bSuccess = false;
        let name = 0;
        for(let i = 0; i < value.length; i++)
        {
            if(value[i] === '[')//element start
            {
                if(name === 0) name = i;
                subElement = '';//clear sub element
                iElement = 1;
                continue;
            }
            else if(value[i] === ']')//element end
            {
                //1. push sub element
                let buffer = subElement;                
                if(iElement !== 1 && iElement !== 5)
                {
                    buffer = parseInt(buffer);
                }
                element.push(buffer);

                //2. push element
                superElement.push(element);
                element = [];//clear sub element

                iElement++;

                bSuccess = true;

                continue;
            }
            else if(value[i] === ',')//sub element end/start: at the point a full sub element should have been compiled
            {
                //push sub element
                let buffer = subElement;                
                if(iElement !== 1 && iElement !== 5)
                {
                    buffer = parseInt(buffer);
                }
                element.push(buffer);//push sub element

                subElement = '';//clear sub element
                iElement++;

                continue;
            }
            subElement += value[i];
        }

        if(bSuccess === false)
        {
            return '';
        }
        superElement.unshift(value.slice(0,name).replace('StatCard/', ''));

        return superElement;
    }

    function UpdatePointLimit(props)
    {
        console.log('UpdatePointLimit:', props.target.value);
        //Limit Cannot be less then the minimum or the point total
        const val = Coll.iAATest(parseInt(props.target.value), data.PointTotal);
        setData({PointLimit: val});
        // data.PointLimit = val;
    }

    //Setup Listener Events
    useEffect(() =>
    {
        // Link Functions
        props.funcs.update = UpdateStates;
        props.funcs.randomize = RandomizeStats;
        props.funcs.updateLimit = UpdatePointLimit;


        let userDefined = props.location.pathname.replace('/','');
        const pointDiff = userDefined.search('Min=true') > -1;

        userDefined = ParseStringAsStatCard(userDefined);

        let name = '';
        if(userDefined !== '') name = !Array.isArray(userDefined[0]) ? userDefined.shift() : '';

        if(userDefined !== '')
        {
            let Points = GetPointTotal(userDefined.length);
            // console.log('userDefined:', name,userDefined, Points, pointDiff);
            data.Name = name;
            data.Size = userDefined.length;
            data.Values = userDefined;
            data.PointTotal = Points[0];
            data.PointMin =   Points[1];
            data.PointMax =   Points[2];
            data.PointLimit = 0;
            data.PointDiff = false;
        }
    }, [])

    return (<div></div>);
};

export default StatData;