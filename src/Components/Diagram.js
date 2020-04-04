import React from 'react';
import { Box, Paper, Slider, MenuItem/*, makeStyles, createMuiTheme*/ } from '@material-ui/core';
import {Vector2,  Coll, Calc} from './KoyMath.js';
import StatInputForm from './StatInputForm.js'
import {Row, Col} from './DivGrid'
import TemplateSelector from './TemplateSelector'
import StatCode from './StatCode'

const iStrokeWidth = 0.5;
const cLetterGrades = ['F','E','D','C','B','A','S','SS','SSS','?'];
const edgeSpacer=128;
const iBaseSize = 256;
const sUnitTypes = ';;UNIT;LEVEL;LVL;POINT;PNT'

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
let SetupDiagram = function(Comp)
{
    /*Iterate For Each TriAngles*/
    let v2Polygon = [new Vector2(0,0), new Vector2(0, -1*Comp.state.WinInfo.iDrawScale), new Vector2(0, -1*Comp.state.WinInfo.iDrawScale)];
    let mesh = [];
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
    return mesh.map(function (arr) { return [Comp.state.WinInfo.Center[0] + arr[0], Comp.state.WinInfo.Center[1] + arr[1]]; });
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
    return mesh.map(function (arr) { return [Comp.state.WinInfo.Center[0] + arr[0], Comp.state.WinInfo.Center[1] + arr[1]]; });
};

let SetupTextAndTicks = function(Comp)
{
    let ticks = 10;
    let tickWidth = Comp.state.WinInfo.iDrawScale*0.005;

    let typeCenter = [Comp.state.WinInfo.Center[0], Comp.state.WinInfo.Center[1]-Comp.state.WinInfo.iDrawScale-Comp.state.Offsets.iType];
    let gradeCenter = [Comp.state.WinInfo.Center[0], Comp.state.WinInfo.Center[1]-Comp.state.WinInfo.iDrawScale-Comp.state.Offsets.iGrade];
    let strCenter = +Comp.state.WinInfo.Center[0]+','+Comp.state.WinInfo.Center[1];

    let strTypeRotateSelf = ', rotate(180,'+typeCenter[0]+','+(typeCenter[1])+')';

    let htmlResult = [];
    for (let i = 0; i < Comp.state.iQuantity; i++)
    {
        let sTypeFlip = '';
        let sTickFlip = '';
        let iFontSize = Math.floor(Comp.state.WinInfo.iDrawScale);
        //Rotate text around it's center if upsidedown
        if(Comp.state.iAngles[i] > 90 && Comp.state.iAngles[i] < 270)
        {
            sTypeFlip = strTypeRotateSelf;
        };

        //Letter Grades
        htmlResult.push(
        <text key = {'Grade'+i} name={'Grade'+i} textAnchor='middle' dominantBaseline='central' style={{stroke: 'rgb(0,0,0)', fontSize: iFontSize/9, strokeWidth: iStrokeWidth}}
            x={gradeCenter[0]} y={gradeCenter[1]}
            transform={'rotate('+Comp.state.iAngles[i]+', '+(Comp.state.WinInfo.Center[0])+','+(Comp.state.WinInfo.Center[1])+'), rotate('+-Comp.state.iAngles[i]+','+gradeCenter[0]+','+(gradeCenter[1])+')'} > 
            {
                gradeCalc(i, Comp.state.Values)
            }
        </text>);

        //Types
        htmlResult.push(
        <text key={'Type'+i} name={'Type'+i} textAnchor='middle' dominantBaseline='central' style={{stroke: 'rgb(0,0,0)', fontSize: iFontSize/12, strokeWidth: iStrokeWidth}} x={typeCenter[0]} y={typeCenter[1]}
            transform={'rotate('+Comp.state.iAngles[i]+', '+(strCenter)+')'+sTypeFlip}>
            {Comp.state.Values[i][0]}
        </text>);

        /*Stat Ticks*/
        for(let iT = 1; iT<ticks; iT++)
        {
            if((iT%2) === 0)
            {
                //TICKS
                htmlResult.push(<line key={`L_${i}_${iT}`} x1={(-tickWidth)+Comp.state.WinInfo.Center[0]} y1={Comp.state.WinInfo.Center[1]-((Comp.state.WinInfo.iDrawScale/ticks)*iT)} x2={tickWidth+Comp.state.WinInfo.Center[0]} y2={Comp.state.WinInfo.Center[1]-((Comp.state.WinInfo.iDrawScale/ticks)*iT)} style={{stroke: 'rgb(0,0,0)', strokeWidth: iStrokeWidth*2}} transform={'rotate('+Comp.state.iAngles[i]+', '+Comp.state.WinInfo.Center[0]+','+Comp.state.WinInfo.Center[1]+')'} />);

                //Define and round off the TICK VALUES
                //let tickValue = Math.round(100 * (iT*( (Comp.state.Values[i][3]/* +Comp.state.Values[i][2] */)/ticks)) )/100;
                let tickValue = Math.ceil((iT*( (Comp.state.Values[i][3]/* +Comp.state.Values[i][2] */)/ticks)) );
                let tickCenter = [Comp.state.WinInfo.Center[0], Comp.state.WinInfo.Center[1]-((Comp.state.WinInfo.iDrawScale/ticks)*iT)];
                if(Comp.state.iAngles[i] > 90 && Comp.state.iAngles[i] < 270)
                {
                    sTickFlip = ', rotate(180,'+tickCenter[0]+','+(tickCenter[1])+')';
                };

                //Tick Value
                htmlResult.push(<text key={`LT_${i}_${iT}`} textAnchor='middle' dominantBaseline='central' x={tickCenter[0]+ Comp.state.Offsets.iTick} y={tickCenter[1]} style={{stroke: 'rgb(0,0,0)', fontSize: tickWidth*9, strokeWidth: iStrokeWidth}} 
                    transform={'rotate('+Comp.state.iAngles[i]+', '+(Comp.state.WinInfo.Center[0])+','+(Comp.state.WinInfo.Center[1])+')'+sTickFlip}>
                    {tickValue}
                </text>);
            }
        };
    }
    return htmlResult
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
const iDefTmpl = 1;
const defaultTemplates = [
    /*{
        label:  'Empty',
        defaultValues:  [0, 0],
        pntLimit:      2
    },*/
    {
        label:      'Jojo',
        values:     [['POWER',3.0,1,10,'LVL'], ['SPEED',4.0,1,10,''], ['RANGE',4.0,1,10,''], ['DURABILITY',8.0,1,10,''], ['PRECISION',4.0,1,10,''], ['POTENTIAL',2.0,1,10,'']],
        pntLimit:  60,
        pntDiff: false
    },
    {
        label:  'Dark Souls III',
        values: [['Vigor',15,1,99,'LVL'],['Attunement',10,1,99,''],['Endurance',15,1,99,''], ['Vitality',15,1,99,''],['Strength',20,1,99,''],['Dexterity',18,1,99,''], ['Intelligence',10,1,99,''],['Faith',10,1,99,''],['Luck',10,1,99,''], ['Hollowing',99,1,99,'X']],
        pntLimit: 802,
        pntDiff: true
        //key: ''+values|pntLimit+''
    },
    /*{
        label:  'ArcheAge',
        values: [['Strength',158,158,2560,'PNT'],['Agility',158,158,2560,''],['Stamina',158,158,2560,''],['Spirit',158,158,2560,''],['Intelligence',158,158,2560,''], ['Cast Time',10,0,100,'%'],['Attack Speed',10,0,100,'%'],['Move Speed',5.4,5.4,10,'m/s']],
        pntLimit: 2560,
        pntDiff: false
    }*/
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

function ScaleSlider(props) {
    //Slider Update
    let OnSliderChange = (event, newValue) => {
        props.OnSliderChange(newValue);
    };

    //Render
    return(<div>
    <Slider name='graphScale' min={iBaseSize/2} max={iBaseSize}
        marks               =   {[{value: iBaseSize*0.5, label: iBaseSize*0.5},{value: iBaseSize*0.75, label: iBaseSize*0.75},{value: iBaseSize, label: iBaseSize}]}
        defaultValue        =   {props.Scale}
        valueLabelDisplay   =   "auto"
        
        onChangeCommitted =   {OnSliderChange}
        orientation =   'vertical'>
    </Slider>
    </div>)
}

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
            
                //Window Dimensions Window Center
                WinInfo:
                {
                    iScale: iBaseSize,
                    iDrawScale: 1,
                    iDimension: [],
                    Center:     [0, 0],
                },

                Offsets:
                {
                    iTick:     1,
                    iType:     1,
                    iGrade:    1,
                }
        };
        this.CalcOffset(this.state);
        this.LoadTemplate(this.state, defaultTemplates[iDefTmpl]);
        this.Initialize(this.state);
        //this.UpdateViewPort = this.UpdateViewPort.bind(this);
    }

    //Calculate Offsets once per rezise
    CalcOffset(state=null, event=null)
    {
        let tick = 6;
        let type = 10;
        let grade = 35;
        let scale = this.state.WinInfo.iDrawScale;
        if(state !== null)
        {
            state.Offsets.iTick = tick * scale;
            state.Offsets.iType = type * scale;
            state.Offsets.iGrade = grade * scale;
        }
        else
        {
            this.setState({Offsets: {
                iTick: tick * scale,
                iType: type * scale,
                iGrade: grade * scale
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
            state.WinInfo.iDrawScale    = this.state.WinInfo.iScale;
            state.WinInfo.iDimension    = [(this.state.WinInfo.iScale*2)+edgeSpacer, (this.state.WinInfo.iScale*2)+edgeSpacer];
            state.WinInfo.Center        = [this.state.WinInfo.iDimension[0]/2, this.state.WinInfo.iDimension[1]/2];
            state.PointTotal            = Points[0];
            state.PointMin              = Points[1];
            state.PointMax              = Points[2];
            state.v2StatVectors         = this.UpdateStatVectors();
        }
        else
        {
            this.setState({
                iAngles: this.UpdateAngles(),
                WinInfo:
                {
                    iDrawScale: this.state.WinInfo.iScale,
                    iDimension: [(this.state.WinInfo.iScale*2)+edgeSpacer, (this.state.WinInfo.iScale*2)+edgeSpacer],
                    Center: [this.state.WinInfo.iDimension[0]/2, this.state.WinInfo.iDimension[1]/2],
                },
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
        
        // console.log('GetPointTotal: Quantity:',template.values.length, 'Values:',template.values, 'arrDiff:',template.pntDiff, 'PointLimit:',template.pntLimit);
        let Points = GetPointTotal(this, template.values.length, template.values, template.pntDiff, template.pntLimit);

        this.setState({
            iAngles:        tempAngles,
            PointTotal:     Points[0],
            PointMin:       Points[1],
            PointMax:       Points[2],
            v2StatVectors:  this.UpdateStatVectors(template.values.length, tempAngles, template.values)
        });
    }

    //Setup Listener Events
    componentDidMount() 
    {
        //window.addEventListener('resize', this.UpdateViewPort);
        let userDefined = this.props.location.pathname.replace('/','');
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
            });
        }
    }

    UpdateStatVectors(Quantity=this.state.iQuantity, Angles=this.state.iAngles, Values=this.state.Values, iDrawScale=this.state.WinInfo.iDrawScale)
    {
        let tempVectors = [];//this.state.v2StatVectors

        //Calculate All Point
        for (let i = 0; i < Quantity; i++)
        {
            tempVectors.push(Coll.v2Rotate2D(new Vector2(0, (-Values[i][1] * (1/Values[i][3])*iDrawScale) ), new Vector2(0,0), Angles[i]));
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
    }
    
    //Just Update
    UpdateViewPort(Scale=null)
    {
        /*Temp Vars*/
        let tempScale = iBaseSize;
        if(Scale!==null){tempScale = Scale;}
        let tempDrawScale = tempScale;
        let tempDim = [(tempDrawScale*2)+edgeSpacer, (tempDrawScale*2)+edgeSpacer];
        let tempCenter = [tempDim[0]/2, tempDim[1]/2];

        this.setState(
        {WinInfo:
            {
                iScale:     tempScale,
                iDrawScale: tempDrawScale,
                iDimension: tempDim,
                Center:     tempCenter
            },
            v2StatVectors: this.UpdateStatVectors(this.state.iQuantity, this.state.iAngles, this.state.Values, tempDrawScale)
        });
    }

    OnSliderChange(Scale) {
       this.UpdateViewPort(Scale);
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
                {
                    xBuffer += yBuffer+',';
                }
            }
            sResult += '['+xBuffer.slice(0,xBuffer.length-1)+']';
        }
        return 'koyfoster.github.io/StatCard/'+this.state.Name+sResult;
    }

    ParseStringAsStatCard(value)
    {
        //Break String Down Into Objects
        let superElement = [];
        let element = [];
        let subElement = '';
        let bToggle = false;
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
        superElement.unshift(value.slice(0,name));

        return superElement;
    }

    render(){
        return(
            <Box name='body' style={{display: 'flex'}} bgcolor='darkGrey'>
                        <Row alignItems='top'>
                            <Col alignSelf ='top'>
                                <TemplateSelector Name = {this.state.Name} setValue = {val => this.setState({Name: val})} defaultValue={Object.create(defaultTemplates[iDefTmpl])} MenuItems={tmplMenuItems} OnTemplateChange={this.OnTemplateChange.bind(this)}></TemplateSelector>
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
                                        UpdatePointLimit  = {this.UpdatePointLimit.bind(this)} >
                                    </StatInputForm>
                                </Paper>
                                <StatCode width='320px' code={this.GetURLCode()}></StatCode>
                            </Col>
                            <Paper style={{height: 442, margin: '4px 0px 4px 0px', padding: '8px 4px 8px 0px', display: 'flex', }}>
                                <ScaleSlider
                                        Scale           =   {this.state.WinInfo.iScale}
                                        OnSliderChange  =   {this.OnSliderChange.bind(this)}>
                                </ScaleSlider>
                            </Paper>
                            <Paper style={{margin: 4, padding: 4, display: 'flex', flexDirection: 'row'}}>
                                <svg width={this.state.WinInfo.iDimension[0]} height={this.state.WinInfo.iDimension[1]}>
                                    <circle cx={this.state.WinInfo.Center[0]} cy={this.state.WinInfo.Center[1]} r={1*this.state.WinInfo.iDrawScale} style={{fill: 'white', fillOpacity: 0.5, stroke: 'black', strokeWidth: iStrokeWidth*4}} />
                                    <defs>
                                        <linearGradient id = 'grad'>
                                            <stop offset='0' stopColor='purple'/>
                                            <stop offset='1' stopColor='lightBlue'/>
                                        </linearGradient>
                                    </defs>
                                    {<polygon points={SetupDiagram(this)} style={{fill: 'white', fillOpacity: 0.5, stroke: 'black', strokeWidth: iStrokeWidth*2, fillRule: 'evenodd'}} />}
                                    {<polygon points={SetupStats(this)} fill = 'url(#grad)' style={{fillOpacity: 0.66, stroke: 'red', strokeWidth: 0, fillRule: 'evenodd'}} />}
                                    {SetupTextAndTicks(this)}
                                </svg>
                            </Paper>
                        </Row>
            </Box>
        );
    }
}

export default Diagram;
