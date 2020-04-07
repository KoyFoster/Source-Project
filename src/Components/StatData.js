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
    const [Name, setName] = useState(props.data.Name);
    const [Size, setSize] = useState(props.data.Size);
    const [Values, setValues] = useState(props.data.Values);
    const [PointMin, setPointMin] = useState(props.data.PointMin);
    const [PointMax, setPointMax] = useState(props.data.PointMax);
    const [PointDiff, setPointDiff] = useState(props.data.PointDiff);
    const [PointTotal, setPointTotal] = useState(props.data.PointTotal);
    const [PointLimit, setPointLimit] = useState(props.data.PointLimit);

    const GetPointTotal = (iSize = Size, Values = Values, PointDiff = PointDiff, PointLimit = PointLimit) => 
    {
        let PointTotal  = 0;
        let PointMin    = 0;
        let PointMax    = 0;
        let arrDiff     = iSize - Values.length;
        let iI = 0;
        for(iI; iI < iSize; iI++)
        {
                //push additional elements if change in size exceeds current size
                if(arrDiff > 0)
                {
                    Values.push(['???',0,0,10,'']);
                    arrDiff--;
                };
                //Only Include Only Point Defined Stats
                if(IsUnit(Values[iI][4]))
                {
                    PointTotal  += parseInt(Values[iI][1]);
                    PointMin    += parseInt(Values[iI][2]);
                    PointMax    += parseInt(Values[iI][3]);
                };
        };
        // check if new entry causes the point limit to be exceeded
        if((PointTotal > PointLimit) && (iSize !== Size))
        {
            let iDiff = PointLimit - PointTotal;
            Values[iI-1][1] += parseInt(iDiff);
            
            PointTotal = PointLimit;
        }

        if(PointDiff){ PointTotal -= PointMin; }
        return [PointTotal, PointMin, PointMax];
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
            for(let iTRO = 0; iTRO < Size; iTRO++)
            { 
                if(IsUnit(Values[iTRO][4]))
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
        let valuesBuffer = Values;
        for(let i = 0; i < randOrder.length; i++)
        {
            valuesBuffer[randOrder[i]][1] = Calc.fRNG(valuesBuffer[randOrder[i]][2], valuesBuffer[randOrder[i]][3]);
        };
    
        setValues(valuesBuffer);
    
        let Points = GetPointTotal(Size, valuesBuffer);
    
        setPointTotal(Points[0]);
        setPointMin(Points[1]);
        setPointMax(Points[2]);
    }
    
    //Load States
    function Initialize()
    {
        let Points = GetPointTotal(Values.length);        
        setPointTotal(Points[0]);
        setPointMin(Points[1]);
        setPointMax(Points[2]);
    }

    //Update Functions
    function UpdateStates(props)
    {
        //vars
        let tempSize    = Size;
        let tempVal     = Values;
        let iIndex      = props.target.name.indexOf(',') ? props.target.name.substring(props.target.name.indexOf(',')+1, props.target.name.indexOf(')')) : props.target.name;
        let sTag        = props.target.name.indexOf('_(') > -1 ? props.target.name.substring(0, props.target.name.indexOf('_(')) : props.target.name;
        let Points      = [PointTotal, PointMin, PointMax];

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
            if(Points[0] > PointLimit)
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

            setPointDiff(props.target.checked);
            setPointTotal(Points[0]);
                
            return;
        }
        else if(sTag === 'Unit')
        {
            tempVal[iIndex][4] = props.target.value;

            //Check Point Limit Range
            Points = GetPointTotal(tempSize, tempVal);
            if(Points[0] > PointLimit)
            { return; }
        }

            setSize(tempSize);
            setPointTotal(Points[0]);
            setPointMin(Points[1]);
            setPointMax(Points[2]);
            setValues(tempVal);
    }

    function SetNewData(newData)
    {
        let Points = GetPointTotal(this, newData.values.length, newData.values, newData.pntDiff, newData.pntLimit);
        setPointTotal(Points[0]);
        setPointMin(Points[1]);
        setPointMax(Points[2]);
    }

    //Setup Listener Events
    useEffect(() =>
    {
        let userDefined = props.location.pathname.replace('/','');
        const pointDiff = userDefined.search('Min=true') > -1;

        // userDefined = ParseStringAsStatCard(userDefined);
        return;

        let name = '';
        if(userDefined !== '') name = !Array.isArray(userDefined[0]) ? userDefined.shift() : ''

        if(userDefined !== '')
        {
            let Points      = GetPointTotal(this, userDefined.length);
            
                setName(name);
                setValues(userDefined);
                setSize(userDefined.length);
                setPointTotal(Points[0]);
                setPointMin(Points[1]);
                setPointMax(Points[2]);
                setPointDiff(pointDiff);
            
        }
    })

    return (<div></div>);
};

export default StatData;