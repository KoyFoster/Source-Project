import React from 'react';
import { Box, Paper, MenuItem } from '@material-ui/core';
import {Vector2,  Coll, Calc} from './KoyMath.js';
import StatInputForm from './StatInputForm.js'
import {Row, Col} from './DivGrid'
import TemplateSelector from './TemplateSelector'
import StatCode from './StatCode'

const iLineWidth = 1;
const iStrokeWidth = 0.5;
const cLetterGrades = ['F','E','D','C','B','A','S','SS','SSS','?'];
const iBaseSize = 320;
const iCenter = 160;
const sUnitTypes = ';;UNIT;LEVEL;LVL;POINT;PNT'

const pallete =
{
    inner: ['#EEEEEE', 'gold'],
    outer: ['#EEEEEE','#222222'],
    gradeText: ['white', '#111111'],
    typeText: ['white', '#111111'],
    graph: ['purple', 'white', 'purple'],
    grid: ['gold', '#111111'],
}

let IsUnit = function(UnitType)
{ 
    let temp = 'X'; 
    temp = UnitType.toUpperCase();
    return sUnitTypes.includes(temp);
}

//Grade Function
let gradeCalc = function(index, Values)
{
    let result = cLetterGrades[9];//? grade
    //Take Values and divide it against it's max range
    let percentage = (Values[index][1]/Values[index][3])*100;

    //Upper or lower value assignment
    let masymenos = (value) =>
    {
        if(value > 10){result += '+';} else if(value < 10){result += '-';}
    };

    //Letter Assignment
    if(percentage >= 140)
    {
        result = cLetterGrades[8];
    }
    else if(percentage >= 120)
    {
        result = cLetterGrades[7];
        masymenos(percentage-110);
    }
    else if(percentage >= 100)
    {
        result = cLetterGrades[6];
        masymenos(percentage-90);
    }
    else if(percentage >= 80)
    {
        result = cLetterGrades[5];
        masymenos(percentage-80);
    }
    else if(percentage >= 60)
    {
        result = cLetterGrades[4];
        masymenos(percentage-60);
    }
    else if(percentage >= 40)
    {
        result = cLetterGrades[3];
        masymenos(percentage-40);
    }
    else if(percentage >= 20)
    {        
        result = cLetterGrades[2];
        masymenos(percentage-20);
    }
    else if(percentage > 0)
    {
        result = cLetterGrades[1];
    }
    else if(percentage === 0)
    {
        result = cLetterGrades[0];
    }
    return result;//Return '?'
}

/*Update Diagram*/
let diagramMesh = undefined;
let SetupDiagram = function(Comp)
{
    const mesh = [];
    /*Iterate For Each TriAngles*/
    let v2Polygon = [new Vector2(0,0), new Vector2(0, -100), new Vector2(0, -100)];
    //The logic here is that a triangle is created and repeated for each number of angles
    for (let i = 0; i < Comp.state.iQuantity; i++)
    {
        //Adjust Angles
        if(i === 0)
        {
            Coll.v2Rotate2D(v2Polygon[2],v2Polygon[0],Comp.state.iAngles[i+1]);//Rotate Second Point Over

            //Push First Triangle
            mesh.push([v2Polygon[0].x, v2Polygon[0].y]); 
            mesh.push([v2Polygon[1].x, v2Polygon[1].y]); 
            mesh.push([v2Polygon[2].x, v2Polygon[2].y]);
        }
        else
        {
            Coll.v2Rotate2D(v2Polygon[1],v2Polygon[0],Comp.state.iAngles[1]);//Rotate First Point Over
            Coll.v2Rotate2D(v2Polygon[2],v2Polygon[0],Comp.state.iAngles[1]);//Rotate Second Point Over

            //Push Current Triangle
            mesh.push([v2Polygon[0].x, v2Polygon[0].y]);
            mesh.push([v2Polygon[1].x, v2Polygon[1].y]);
            mesh.push([v2Polygon[2].x, v2Polygon[2].y]);
        }
    }
    //Offset Coordinates
    diagramMesh = mesh.map(function (arr) { return [iCenter + arr[0], iCenter + arr[1]]; });
    return diagramMesh;
};

//Stats 2 and 3 are the same everytime
let SetupStats = function(Comp)
{
    let mesh = [];
    let v2Polygon;

    /*Iterate For Each TriAngles*/
    for (let i = 0; i < Comp.state.iQuantity; i++)
    {
        let i2 = i+1;
        if(i2 >= Comp.state.iQuantity){i2 = 0;}
        v2Polygon = [new Vector2(0,0), new Vector2(Comp.state.v2StatVectors[i].x, Comp.state.v2StatVectors[i].y), new Vector2(Comp.state.v2StatVectors[i2].x, Comp.state.v2StatVectors[i2].y) ];

        mesh.push([v2Polygon[0].x, v2Polygon[0].y]);
        mesh.push([v2Polygon[1].x, v2Polygon[1].y]);
        mesh.push([v2Polygon[2].x, v2Polygon[2].y]);
    };
    //Offset Coordinates
    return mesh.map(function (arr) { return [iCenter + arr[0], iCenter + arr[1]]; });
};

let SetupTextAndTicks = function(Comp)
{
    let ticks = 10;
    let tickWidth = 2;

    let typeCenter = [iCenter, iCenter-Comp.state.Offsets.iType];
    let gradeCenter = [iCenter, iCenter-Comp.state.Offsets.iGrade];
    let strCenter = +iCenter+','+iCenter;

    let strTypeRotateSelf = ', rotate(180,'+typeCenter[0]+','+(typeCenter[1])+')';

    let htmlResult = [];
    for (let i = 0; i < Comp.state.iQuantity; i++)
    {
        const bFlip = Comp.state.iAngles[i] > 90 && Comp.state.iAngles[i] < 270;
        let sTypeFlip = '';
        let sTickFlip = '';
        let iFontSize = 100;
        //Rotate text around it's center if upsidedown
        if(bFlip) sTypeFlip = strTypeRotateSelf;

        //Letter Grades
        let transform = 'rotate('+Comp.state.iAngles[i]+', '+(iCenter)+','+(iCenter)+'), rotate('+-Comp.state.iAngles[i]+','+gradeCenter[0]+','+(gradeCenter[1])+')';
        const gradeSize = iFontSize/5;
        const typeSize = iFontSize/9;
        htmlResult.push(
        <text key = {'Grade'+i+'_1'} textAnchor='middle' dominantBaseline='central'
            style={{stroke: 'rgb(0,0,0)', fontSize: gradeSize, strokeWidth: 0, fill: pallete.gradeText[1]}}
            x={gradeCenter[0]+1.5} y={gradeCenter[1]+1.5}
            transform={transform} 
        >{gradeCalc(i, Comp.state.Values)}</text>);
        htmlResult.push(
        <text key = {'Grade'+i+'_2'} textAnchor='middle' dominantBaseline='central'
            style={{stroke: 'rgb(0,0,0)', fontSize: gradeSize, strokeWidth: 0, fill: pallete.gradeText[0]}}
            x={gradeCenter[0]} y={gradeCenter[1]}
            transform={transform} 
        >{gradeCalc(i, Comp.state.Values)}</text>);

        //Types
        transform = 'rotate('+Comp.state.iAngles[i]+', '+(strCenter)+')'+sTypeFlip;
        htmlResult.push(
        <text key={'Type'+i+'_1'} textAnchor= {'middle'} dominantBaseline='central' 
            style={{fontSize: typeSize, strokeWidth: 0, fill: pallete.typeText[1]}} 
            x={typeCenter[0] +1} y={typeCenter[1] +1}
            transform={transform}
        >{Comp.state.Values[i][0]}
        </text>);
        htmlResult.push(
        <text key={'Type'+i+'_2'} textAnchor= {'middle'} dominantBaseline='central' 
            style={{fontSize: typeSize, strokeWidth: 0, fill: pallete.typeText[0]}} 
            x={typeCenter[0]} y={typeCenter[1]}
            transform={transform}
        >{`${Comp.state.Values[i][0]}`}
        </text>);

        /*Stat Ticks*/
        for(let iT = 1; iT<ticks; iT++)
        {
            if((iT%2) === 0)
            {
                //TICKS
                const y = iCenter-((ticks)*iT);
                const y2 = iCenter-((ticks)*iT);
                const x2 = tickWidth+iCenter;
                transform = 'rotate('+Comp.state.iAngles[i]+', '+iCenter+','+iCenter+')';
                
                htmlResult.push(<line key={`L_${i}_${iT}_1`} x1={iCenter + (!bFlip ? 0.5 : 0.5)} y1={y + (!bFlip ? 0.5 : -0.5)} x2={x2 + (!bFlip ? 0.5 : 0.5)} y2={y2 + (!bFlip ? 0.5 : -0.5)} style={{strokeWidth: iStrokeWidth*2, stroke: pallete.grid[1]}} transform={transform} />);
                htmlResult.push(<line key={`L_${i}_${iT}_2`} x1={iCenter} y1={y} x2={x2} y2={y2} style={{strokeWidth: iStrokeWidth*2, stroke: pallete.grid[0]}} transform={transform} />);

                //Define and round off the TICK VALUES
                let tickValue = Math.ceil((iT*( (Comp.state.Values[i][3])/ticks)) );
                let tickCenter = [iCenter, iCenter-((ticks)*iT)];
                let iTick = 3;
                if(Comp.state.iAngles[i] > 90 && Comp.state.iAngles[i] < 270)
                {
                    sTickFlip = ', rotate(180,'+tickCenter[0]+','+(tickCenter[1])+')';
                    iTick *= -1;
                };

                transform = 'rotate('+Comp.state.iAngles[i]+', '+(iCenter)+','+(iCenter)+')'+sTickFlip;
                const x = tickCenter[0] + iTick;

                //Tick Value
                let bDraw = i === 0 ? true : (`${Comp.state.Values[i][3]}${Comp.state.Values[i][4]}` !== `${Comp.state.Values[i-1][3]}${Comp.state.Values[i-1][4]}`);
                if(bDraw)
                {
                    htmlResult.push(
                    <text key={`LT_${i}_${iT}_1`} textAnchor= {iTick > 0 ? 'start' : 'end'} dominantBaseline='central' 
                    x={x +0.67} y={tickCenter[1] +0.67} 
                    style={{fontSize: 8, strokeWidth: 0, fill: pallete.grid[1]}} 
                        transform={transform}>
                        {`${tickValue}${Comp.state.Values[i][4]}`}
                    </text>);
                    htmlResult.push(
                    <text key={`LT_${i}_${iT}_2`} textAnchor= {iTick > 0 ? 'start' : 'end'} dominantBaseline='central' 
                    x={x} y={tickCenter[1]}
                    style={{fontSize: 8, strokeWidth: 0, fill: pallete.grid[0]}} 
                        transform={transform}>
                        {`${tickValue}${Comp.state.Values[i][4]}`}
                    </text>);
                }
            }
        };
    }
    return htmlResult;
};

let GetPointTotal = function(Comp, Quantity = Comp.state.iQuantity, Values = Comp.state.Values, PointDiff = Comp.state.PointDiff, PointLimit = Comp.state.PointLimit)
{
    let PointTotal  = 0;
    let PointMin    = 0;
    let PointMax    = 0;
    let arrDiff     = Quantity - Comp.state.Values.length;
    let iI = 0;
    for(iI; iI < Quantity; iI++)
    {
            //push additional elements if change in size exceeds current size
            if(arrDiff > 0)
            {
                Comp.state.Values.push(['???',0,0,10,'']);
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
    if((PointTotal > PointLimit) && (Quantity !== Comp.state.iQuantity))
    {
        let iDiff = PointLimit - PointTotal;
        Values[iI-1][1] += parseInt(iDiff);
        
        PointTotal = PointLimit;
    }

    if(PointDiff){ PointTotal -= PointMin; }
    return [PointTotal, PointMin, PointMax];
};

let GetPointMax = function(Quantity, Comp, Values = 0)
{
    let PointMax    = 0;
    for(let iI; iI < Quantity; iI++)
    {
        if(Values === 0)
        {
            if(IsUnit(Values[iI][4]))
            {PointMax    += parseInt(Comp.state.Values[iI][3]);}
        }
        else
        {
            if(IsUnit(Values[iI][4]))
            {PointMax    += parseInt(Values[iI][3]);}
        };
    };
    return PointMax;
};

//templates
const iDefTmpl = 0;
const defaultTemplates = [
    {
        label:      'Jojo',
        values:     [['POWER',3.0,1,10,''], ['SPEED',4.0,1,10,''], ['RANGE',4.0,1,10,''], ['DURABILITY',8.0,1,10,''], ['PRECISION',4.0,1,10,''], ['POTENTIAL',2.0,1,10,'']],
        pntLimit:  60,
        pntDiff: false
    },
    {
        label:  'Dark Souls III',
        values: [['Vigor',15,1,99,''],['Attunement',10,1,99,''],['Endurance',15,1,99,''], ['Vitality',15,1,99,''],['Strength',20,1,99,''],['Dexterity',18,1,99,''], ['Intelligence',10,1,99,''],['Faith',10,1,99,''],['Luck',10,1,99,''], ['Hollowing',99,1,99,'X']],
        pntLimit: 802,
        pntDiff: true
    },
    {
        label:  'Kono Subarashii',
        values: [['Strength',79,79,99,''],['Health',21,21,99,''], ['Magic Power',92,92,99,''],['Dexterity',3,3,99,''],['Agility',42,42,99,''], ['Luck',1,1,99,'']],
        pntLimit: 0,
        pntDiff: true
    },
    {
        label:  'ArcheAge',
        values: [['Strength',158,158,2560,''],['Agility',158,158,2560,''],['Stamina',158,158,2560,''],['Spirit',158,158,2560,''],['Intelligence',158,158,2560,''], ['Cast Time',10,0,100,'%'],['Attack Speed',10,0,100,'%'],['Move Speed',5.4,5.4,10,'m/s']],
        pntLimit: 2560,
        pntDiff: false
    }
];

function compileMenuItems()
{
    let result = [];

    for(let i=0; i < defaultTemplates.length; i++)
    {
        result.push(<MenuItem key={defaultTemplates[i].label} value={defaultTemplates[i]} >{defaultTemplates[i].label}</MenuItem>);
    }
    return result;
}
const tmplMenuItems = compileMenuItems();

class Diagram extends React.Component
{
    constructor(props){
        super(props);

        this.state = 
        {
            //User inputted stats as semi-colin dilimited strings
            Name: '',
            Update: false,
            iQuantity:  0,
            iAngles:    [0],
            PointTotal: 0,
            PointMin:   0,
            PointDiff: false,//Wether or not to take the difference between PointTotal and Minimum Required Stats
            v2StatVectors:  [],
            //User Defined
            Values:     [['',0,0,0,'']],
            PointLimit: 0,

            Offsets:
            {
                iTick:     1,
                iType:     1,
                iGrade:    1,
            },
            delta: 0,
            interval: undefined,
            anim: 0,
            animInfo: 0,
            animTL: iCenter,
            animBR: 0
        };
        this.CalcOffset(this.state);
        this.LoadTemplate(this.state, defaultTemplates[iDefTmpl]);
        this.Initialize(this.state);
        this.startAnim(this.state);
    }

    startAnim(State = undefined)
    {
        if(State)
        {
            State.interval = setInterval(() => this.animate(), 33);
            State.anim = 0;
            State.animTL = iCenter;
            State.animBR = 0;
        }
        else
        {
            if(this.state.interval) {clearInterval(this.state.interval);}
            this.setState({
            interval: setInterval(() => this.animate(), 33),
            anim: 0,
            animTL: iCenter,
            animBR: 0});
        }
            
    }
    animate()
    {
        if(this.state.anim === 1) return;
        if(this.state.anim + 0.1 >= 1)
        {
            this.setState({anim: 1, animTl: 0, animBR: iBaseSize});
            clearInterval(this.state.interval);
        }
        else
        {
            const anim = this.state.anim + 0.1;
            this.setState({anim: anim, animTL: iCenter - (iCenter*(1/anim)), animBR: iBaseSize*(1/anim) });
        }
    }

    //Calculate Offsets once per rezise
    CalcOffset(state=null, event=null)
    {
        let type = 108;
        let grade = 124;
        if(state !== null)
        {
            state.Offsets.iType = type;
            state.Offsets.iGrade = grade;
        }
        else
        {
            this.setState({Offsets: {
                iType: type,
                iGrade: grade
            }})
        }
    }

    //Load States
    Initialize(state=null)
    {
        let Points = GetPointTotal(this, this.state.Values.length);
        if(state !== null)
        {
            state.iAngles               = this.UpdateAngles();
            state.PointTotal            = Points[0];
            state.PointMin              = Points[1];
            state.PointMax              = Points[2];
            state.v2StatVectors         = this.UpdateStatVectors();
        }
        else
        {
            this.setState({
                iAngles: this.UpdateAngles(),
                PointTotal: Points[0],
                PointMin:   Points[1],
                PointMax:   Points[2],
                v2StatVectors: this.UpdateStatVectors()
            });
        }
    }

    LoadTemplate(state = null, template = defaultTemplates[0])
    {
        if(Object.keys(template).length === 0) {return false;}
        // Copy Template
        const newArr = new Array(...template.values);
        const newPL = Number(template.pntLimit);
        const newPD = Boolean(template.pntDiff);
        for(let i=0; i<newArr.length; i++)
        {
            newArr[i] = new Array(...newArr[i]);
        }
        
        //If State needs to be updated now
        if(state !== null)
        {
            state.iQuantity     = template.values.length;
            state.Values        = newArr;
            state.PointLimit    = newPL;
            state.PointDiff     = newPD
        }
        else
        {
            this.setState(
            {
                iQuantity:  template.values.length,
                Values:     newArr,
                PointLimit: newPL,
                PointDiff:  newPD
            });
        }
        
        return true;
    }

    OnTemplateChange(template)
    {
        if(!this.LoadTemplate(null, template)) return;
        let tempAngles  = this.UpdateAngles(template.values.length);
        
        let Points = GetPointTotal(this, template.values.length, template.values, template.pntDiff, template.pntLimit);

        this.setState({
            iAngles:        tempAngles,
            PointTotal:     Points[0],
            PointMin:       Points[1],
            PointMax:       Points[2],
            v2StatVectors:  this.UpdateStatVectors(template.values.length, tempAngles, template.values)
        });
        this.startAnim();
    }

    //Setup Listener Events
    componentDidMount() 
    {
        let userDefined = this.props.location.pathname.replace('/','');
        const pointDiff = userDefined.search('Min=true') > -1;
        userDefined = this.ParseStringAsStatCard(userDefined);
        let name = '';
        if(userDefined !== '') name = !Array.isArray(userDefined[0]) ? userDefined.shift() : ''

        if(userDefined !== '')
        {
            let tempAngles  = this.UpdateAngles(userDefined.length);
            let Points      = GetPointTotal(this, userDefined.length);
            let tempVectors = this.UpdateStatVectors(userDefined.length, tempAngles, userDefined);
            this.setState({
                Name:       name,
                Values:     userDefined,
                iQuantity: userDefined.length,
                iAngles:    tempAngles,
                v2StatVectors: tempVectors,
                PointTotal: Points[0],
                PointMin:   Points[1],
                PointMax:   Points[2],
                PointDiff: pointDiff,
            });
        }
    }

    UpdateStatVectors(Quantity=this.state.iQuantity, Angles=this.state.iAngles, Values=this.state.Values)
    {
        let tempVectors = [];//this.state.v2StatVectors

        //Calculate All Point
        for (let i = 0; i < Quantity; i++)
        {
            tempVectors.push(Coll.v2Rotate2D(new Vector2(0, (-Values[i][1] * (1/Values[i][3])*100) ), new Vector2(0,0), Angles[i]));
        };
        return tempVectors;
    }

    UpdateAngles(Quantity = this.state.iQuantity)
    {
        let tempArr = [];
        let iSlice = 360/Quantity;
        for(let i=0; i<Quantity; i++)
        { tempArr.push(i*iSlice); };
        return tempArr;
    }

    //Update Functions
    UpdateStates(props)
    {
        //vars
        let tempAngles  = this.state.iAngles;
        let Quantity    = this.state.iQuantity;
        let tempVal     = this.state.Values;
        let iIndex      = props.target.name.indexOf(',') ? props.target.name.substring(props.target.name.indexOf(',')+1, props.target.name.indexOf(')')) : props.target.name;
        let sTag        = props.target.name.indexOf('_(') > -1 ? props.target.name.substring(0, props.target.name.indexOf('_(')) : props.target.name;
        let Points      = [this.state.PointTotal, this.state.PointMin, this.state.PointMax];
        

        if(props.target.name === 'Quantity')
        {
            Quantity    = parseInt(props.target.value);
            tempAngles  = this.UpdateAngles(Quantity);
            Points      = GetPointTotal(this, Quantity);
        }
        else if(sTag === 'Value')
        {
            //Value Range Check
            tempVal[iIndex][1] = Coll.iAATest(parseInt(props.target.value), tempVal[iIndex][2], tempVal[iIndex][3]);

            //Check Point Limit Range
            Points = GetPointTotal(this, Quantity, tempVal);
            if(Points[0] > this.state.PointLimit)
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
                Points[2] = GetPointMax(Quantity,this,props.target.value);
            }
            tempVal[iIndex][iIndex2] = parseInt(props.target.value);
            Points = GetPointTotal(this, Quantity, tempVal);
        }
        else if(sTag === 'PointDiff')
        {
            // Update to new PointTotal
            if(props.target.checked)
            { Points[0] = Points[0]-Points[1]; }
            else
            { Points[0] = Points[0]+Points[1]; }

            this.setState({
                PointDiff: props.target.checked,
                PointTotal: Points[0]
            });
            return;
        }
        else if(sTag === 'Unit')
        {
            tempVal[iIndex][4] = props.target.value;

            //Check Point Limit Range
            Points = GetPointTotal(this, Quantity, tempVal);
            if(Points[0] > this.state.PointLimit)
            { return; }
        }

        this.setState({
            iQuantity:      Quantity,
            v2StatVectors:  this.UpdateStatVectors(Quantity, tempAngles, tempVal),
            iAngles:        tempAngles,
            PointTotal:     Points[0],
            PointMin:       Points[1],
            PointMax:       Points[2],
            Values:         tempVal});
    }

    UpdatePointLimit(props)
    {
        //Limit Cannot be less then the minimum or the point total
        props.target.value = Coll.iAATest(parseInt(props.target.value), this.state.PointTotal);
        this.setState({PointLimit: props.target.value})
    }

    RandomizeStats(props)
    {
        //Generate Random Order
        let randOrder = [];
        {//Creating scope here to clear 'tempOrder' when finished
            let tempOrder = [];

            //Compile Order
            for(let iTRO = 0; iTRO < this.state.iQuantity; iTRO++)
            { 
                if(IsUnit(this.state.Values[iTRO][4]))
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
        let valuesBuffer = this.state.Values;
        for(let i = 0; i < randOrder.length; i++)
        {
            valuesBuffer[randOrder[i]][1] = Calc.fRNG(valuesBuffer[randOrder[i]][2], valuesBuffer[randOrder[i]][3]);
        };

        this.setState({Values: valuesBuffer});

        let Points = GetPointTotal(this, this.state.iQuantity, valuesBuffer);

        this.setState(
        {
            PointTotal:     Points[0],
            PointMin:       Points[1],
            PointMax:       Points[2],
            v2StatVectors:  this.UpdateStatVectors(this.state.iQuantity, this.state.iAngles, valuesBuffer)
        });

        this.startAnim();
    }

    GetURLCode()
    {
        let sResult = '';
        for(let x=0;x<this.state.Values.length;x++)
        {
            let xBuffer = '';
            for(let y=0;y<5;y++)
            {
                let yBuffer = this.state.Values[x][y];
                xBuffer += yBuffer+',';
            }
            sResult += '['+xBuffer.slice(0,xBuffer.length-1)+']';
        }
        return String('koyfoster.github.io/#/StatCard/'+this.state.Name+sResult+(this.state.PointDiff ? 'Min=true' : '')+'/').replace('//','/');
    }

    ParseStringAsStatCard(value)
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

    render(){
        return(
            <Box name='body' style={{display: 'flex', justifyContent: 'center', overflow: 'auto'}} bgcolor='darkGrey'>
                {
                   //<audio ref='audio_tag' src='.\\JoJoStats.mp3' controls></audio>
                }
                <Row alignItems='top'>
                    <Col alignSelf ='top'>
                        <TemplateSelector Name = {this.state.Name} setValue = {val => this.setState({Name: val})} defaultValue={defaultTemplates[iDefTmpl]} MenuItems={tmplMenuItems} OnTemplateChange={this.OnTemplateChange.bind(this)}></TemplateSelector>
                        <Paper style={{width: '320px', margin: 4, padding: 4, display: 'flex', flexDirection: 'column'}}>
                            <StatInputForm
                                Quantity    = {this.state.iQuantity}
                                PointTotal  = {this.state.PointTotal}
                                PointMin    = {this.state.PointMin}
                                PointMax    = {this.state.PointMax}
                                PointLimit  = {this.state.PointLimit}
                                Values      = {this.state.Values}
                                PointDiff   = {this.state.PointDiff}

                                UpdateStates  = {this.UpdateStates.bind(this)}
                                RandomizeStats  = {this.RandomizeStats.bind(this)}
                                UpdatePointLimit  = {this.UpdatePointLimit.bind(this)}>
                            </StatInputForm>
                        </Paper>
                        <StatCode GetURLCode={this.GetURLCode.bind(this)} />
                    </Col>
                    <Paper style={{width: '768px', margin: 4, padding: 4, display: 'flexbox', flexDirection: 'row'}}>
                        <svg width='100%' viewBox={`0 0 ${iBaseSize} ${iBaseSize}`}>

                            <defs><linearGradient gradientTransform="rotate(90)" id = 'grad'><stop offset='0' stopColor={pallete.graph[0]}/><stop offset='1' stopColor={pallete.graph[1]}/></linearGradient></defs>
                            <defs><linearGradient gradientTransform="rotate(90)" id = 'goldGrad'><stop offset='0' stopColor={pallete.inner[0]}/><stop offset='1' stopColor= {pallete.inner[1]}/></linearGradient></defs>
                            <defs><linearGradient gradientTransform="rotate(90)" id = 'greyGrad'><stop offset='0' stopColor={pallete.outer[0]}/><stop offset='1' stopColor= {pallete.outer[1]}/></linearGradient></defs>

                            <circle cx={iCenter} cy={iCenter} r={142} style={{fill: 'white', stroke: '#111111', strokeWidth: iLineWidth}} />
                            <circle cx={iCenter} cy={iCenter} r={139} style={{fill: 'url(#greyGrad)', stroke: '#111111', strokeWidth: iLineWidth}} />
                            <circle cx={iCenter} cy={iCenter} r={103} style={{fill: 'white', stroke: 'transparent'}} />
                            <circle cx={iCenter} cy={iCenter} r={101} style={{fill: 'url(#goldGrad)', stroke: 'transparent', strokeWidth: 0}} />

                            <svg viewBox={  `${this.state.animTL} ${this.state.animTL} ${this.state.animBR} ${this.state.animBR}`}>
                                {<polygon points={SetupStats(this)} fill = 'url(#grad)' style={{stroke: pallete.graph[2], strokeWidth: 1, fillRule: 'evenodd'}} />}
                            </svg>

                            <svg viewBox={`-0.5 -0.25 ${iBaseSize} ${iBaseSize}`}><polygon points={SetupDiagram(this)} style={{ fill: 'transparent', stroke: pallete.grid[1], strokeWidth: iLineWidth, fillRule: 'evenodd'}} /></svg>
                            <polygon points={diagramMesh} style={{ fill: 'transparent', stroke: pallete.grid[0], strokeWidth: iLineWidth, fillRule: 'evenodd'}} />

                            <circle cx={iCenter} cy={iCenter} r={101} style={{fill: 'transparent', stroke: '#111111', strokeWidth: iLineWidth}} />

                            {SetupTextAndTicks(this)}
                        </svg>
                    </Paper>
                </Row>
            </Box>
        );
    }
}

export default Diagram;
