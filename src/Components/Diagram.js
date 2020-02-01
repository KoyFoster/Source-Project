import React from 'react';
import { Box, Paper, Slider, MenuItem/*, makeStyles, createMuiTheme*/ } from '@material-ui/core';
import {Vector2,  Coll} from './KoyMath.js';
import StatInputForm from './StatInputForm.js'
import {Row, Col} from './Grid'
import TemplateSelector from './TemplateSelector'

const iStrokeWidth = 0.5;
const cLetterGrades = ['F','E','D','C','B','A','S','SS','SSS','?'];
const edgeSpacer=128;
const iBaseSize = 256;

//Grade Function
var gradeCalc = function(index, Values)
{
    var result = cLetterGrades[9];//? grade
    //Take Values and divide it against it's max range
    var percentage = (Values[index][1]/Values[index][3])*100;

    //Upper or lower value assignment
    var masymenos = (value) =>
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
var SetupDiagram = function(Comp)
{
    /*Iterate For Each TriAngles*/
    var v2Polygon = [new Vector2(0,0), new Vector2(0, -1*Comp.state.WinInfo.iDrawScale), new Vector2(0, -1*Comp.state.WinInfo.iDrawScale)];
    var mesh = [];
    //The logic here is that a triangle is created and repeated for each number of angles
    for (var i = 0; i < Comp.state.iQuantity; i++)
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
var SetupStats = function(Comp)
{
    var mesh = [];
    var v2Polygon;

    /*Iterate For Each TriAngles*/
    for (var i = 0; i < Comp.state.iQuantity; i++)
    {
        var i2 = i+1;
        if(i2 >= Comp.state.iQuantity){i2 = 0;}
        v2Polygon = [new Vector2(0,0), new Vector2(Comp.state.v2StatVectors[i].x, Comp.state.v2StatVectors[i].y), new Vector2(Comp.state.v2StatVectors[i2].x, Comp.state.v2StatVectors[i2].y) ];

        mesh.push([v2Polygon[0].x, v2Polygon[0].y]);
        mesh.push([v2Polygon[1].x, v2Polygon[1].y]);
        mesh.push([v2Polygon[2].x, v2Polygon[2].y]);
    };
    //Offset Coordinates
    return mesh.map(function (arr) { return [Comp.state.WinInfo.Center[0] + arr[0], Comp.state.WinInfo.Center[1] + arr[1]]; });
};

var SetupTextAndTicks = function(Comp)
{
    var ticks = 10;
    var tickWidth = Comp.state.WinInfo.iDrawScale*0.005;

    var typeCenter = [Comp.state.WinInfo.Center[0], Comp.state.WinInfo.Center[1]-Comp.state.WinInfo.iDrawScale-Comp.state.Offsets.iType];
    var gradeCenter = [Comp.state.WinInfo.Center[0], Comp.state.WinInfo.Center[1]-Comp.state.WinInfo.iDrawScale-Comp.state.Offsets.iGrade];
    var strCenter = +Comp.state.WinInfo.Center[0]+','+Comp.state.WinInfo.Center[1];

    var strTypeRotateSelf = ', rotate(180,'+typeCenter[0]+','+(typeCenter[1])+')';

    var htmlResult = [];
    for (var i = 0; i < Comp.state.iQuantity; i++)
    {
        var sTypeFlip = '';
        var sTickFlip = '';
        var iFontSize = Math.floor(Comp.state.WinInfo.iDrawScale);
        //Rotate text around it's center if upsidedown
        if(Comp.state.iAngles[i] > 90 && Comp.state.iAngles[i] < 270)
        {
            sTypeFlip = strTypeRotateSelf;
        };

        //Letter Grades
        htmlResult.push(
        <text name={'Grade'+i} textAnchor='middle' dominantBaseline='central' style={{stroke: 'rgb(0,0,0)', fontSize: iFontSize/9, strokeWidth: iStrokeWidth}} 
            x={gradeCenter[0]} y={gradeCenter[1]}
            transform={'rotate('+Comp.state.iAngles[i]+', '+(Comp.state.WinInfo.Center[0])+','+(Comp.state.WinInfo.Center[1])+'), rotate('+-Comp.state.iAngles[i]+','+gradeCenter[0]+','+(gradeCenter[1])+')'} > 
            {
                gradeCalc(i, Comp.state.Values)
            }
        </text>);

        //Types
        htmlResult.push(
        <text name={'Type'+i} textAnchor='middle' dominantBaseline='central' style={{stroke: 'rgb(0,0,0)', fontSize: iFontSize/12, strokeWidth: iStrokeWidth}} x={typeCenter[0]} y={typeCenter[1]}
            transform={'rotate('+Comp.state.iAngles[i]+', '+(strCenter)+')'+sTypeFlip}>
            {Comp.state.Values[i][0]}
        </text>);

        /*Stat Ticks*/
        for(var iT = 1; iT<ticks; iT++)
        {
            if((iT%2) === 0)
            {
                //TICKS
                htmlResult.push(<line x1={(-tickWidth)+Comp.state.WinInfo.Center[0]} y1={Comp.state.WinInfo.Center[1]-((Comp.state.WinInfo.iDrawScale/ticks)*iT)} x2={tickWidth+Comp.state.WinInfo.Center[0]} y2={Comp.state.WinInfo.Center[1]-((Comp.state.WinInfo.iDrawScale/ticks)*iT)} style={{stroke: 'rgb(0,0,0)', strokeWidth: iStrokeWidth*2}} transform={'rotate('+Comp.state.iAngles[i]+', '+Comp.state.WinInfo.Center[0]+','+Comp.state.WinInfo.Center[1]+')'} />);

                //Define and round off the TICK VALUES
                var tickValue = Math.round(100 * (iT*( Comp.state.Values[i][3]/ticks)) )/100;
                var tickCenter = [Comp.state.WinInfo.Center[0], Comp.state.WinInfo.Center[1]-((Comp.state.WinInfo.iDrawScale/ticks)*iT)];
                if(Comp.state.iAngles[i] > 90 && Comp.state.iAngles[i] < 270)
                {
                    sTickFlip = ', rotate(180,'+tickCenter[0]+','+(tickCenter[1])+')';;
                };

                //Tick Value
                htmlResult.push(<text textAnchor='middle' dominantBaseline='central' x={tickCenter[0]+ Comp.state.Offsets.iTick} y={tickCenter[1]} style={{stroke: 'rgb(0,0,0)', fontSize: tickWidth*9, strokeWidth: iStrokeWidth}} 
                    transform={'rotate('+Comp.state.iAngles[i]+', '+(Comp.state.WinInfo.Center[0])+','+(Comp.state.WinInfo.Center[1])+')'+sTickFlip}>
                    {tickValue}
                </text>);
            }
        };
    }
    return htmlResult
};

var GetPointTotal = function(Quantity, Comp, Values = 0)
{
    var PointTotal  = 0;
    var PointMin    = 0;
    var PointMax    = 0;
    var arrDiff     = Quantity - Comp.state.Values.length;
    var iI = 0;
    for(iI; iI < Quantity; iI++)
    {
            //push additional elements if change in size exceeds current size
            if(arrDiff > 0)
            {
                console.log('Push more items');
                Comp.state.Values.push(['???',0,0,10]);
                arrDiff--;
            };
            if(Values === 0)
            {
                PointTotal  += parseInt(Comp.state.Values[iI][1]);
                PointMin    += parseInt(Comp.state.Values[iI][2]);
                PointMax    += parseInt(Comp.state.Values[iI][3]);
            }
            else
            {
                PointTotal  += parseInt(Values[iI][1]);
                PointMin    += parseInt(Values[iI][2]);
                PointMax    += parseInt(Values[iI][3]);
            };
    };
    //check if new entry causes the point limit to be exceeded
    if((PointTotal > Comp.state.PointLimit) && (Quantity !== Comp.state.iQuantity))
    {
        var iDiff = Comp.state.PointLimit - PointTotal;
        if(Values === 0)
        {
            Comp.state.Values[iI-1][1] += parseInt(iDiff);
        }
        else
        {
            Values[iI-1][1] += parseInt(iDiff);
        }
        PointTotal = Comp.state.PointLimit;
    }

    if(Comp.state.PointDiff){PointTotal -= PointMin;}
    return [PointTotal, PointMin, PointMax];
};
var GetPointMax = function(Quantity, Comp, Values = 0)
{
    var PointMax    = 0;
    for(var iI; iI < Quantity; iI++)
    {
            if(Values === 0)
            {
                PointMax    += parseInt(Comp.state.Values[iI][3]);
            }
            else
            {
                PointMax    += parseInt(Values[iI][3]);
            };
    };

    return PointMax;
};

//templates
const iDefTmpl = 0;
const defaultTemplates = [
    /*{
        label:  'Empty',
        defaultValues:  [0, 0],
        pntLlimit:      2
    },*/
    {
        label:      'Jojo',
        values:     [['POWER',3.0,1,10], ['SPEED',4.0,1,10], ['RANGE',4.0,1,10], ['DURABILITY',8.0,1,10], ['PRECISION',4.0,1,10], ['POTENTIAL',2.0,1,10]],
        pntLlimit:  60,
        pntDiff: false
    },
    {
        label:  'Dark Souls III',
        values: [['Vigor',15,1,100],['Attunement',10,1,100],['Endurance',15,1,100], ['Vitality',15,1,100],['Strength',20,1,100],['Dexterity',18,1,100], ['Intelligence',10,1,100],['Faith',10,1,100],['Luck',10,1,100], ['Hollowing',100,1,100]],
        pntLlimit: 999,
        pntDiff: true
        //key: ''+values|pntLlimit+''
    },
    {
        label:  'ArcheAge',
        values: [['Strength',158,158,2560],['Agility',158,158,2560],['Stamina',158,158,2560],['Spirit',158,158,2560],['Intelligence',158,158,2560], ['Cast Time',10,0,100],['Attack Speed',10,0,100],['Move Speed',5.4,5.4,10]],
        pntLlimit: 2560,
        pntDiff: false
    }
];

function compileMenuItems()
{
    var result = [];

    for(var i=0; i<defaultTemplates.length; i++)
    {
        result.push(<MenuItem value={defaultTemplates[i]} >{defaultTemplates[i].label}</MenuItem>);
    }

    return result;
}
const tmplMenuItems = compileMenuItems();

function ScaleSlider(props) {
    //Slider Update
    var OnSliderChange = (event, newValue) => {
        props.OnSliderChange(newValue);
    };

    //Render
    return(<div>
    <Slider name='graphScale' min={iBaseSize/2} max={iBaseSize}
        marks       =   {[{value: iBaseSize*0.5, label: iBaseSize*0.5},{value: iBaseSize*0.75, label: iBaseSize*0.75},{value: iBaseSize, label: iBaseSize}]}
        defaultValue       =   {props.Scale}
        valueLabelDisplay="auto"
        
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
                iQuantity:  0,
                iAngles:    [0],
                PointTotal: 0,
                PointMin:   0,
                PointDiff: false,//Wether or not to take the difference between PointTotal and Minimum Required Stats
                v2StatVectors:  [],
                //User Defined
                Values:     [['',0,0,0]],
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
    };

    //Calculate Offsets once per rezise
    CalcOffset(state=null, event=null)
    {
        var tick = 6;
        var type = 10;
        var grade = 35;
        var scale = this.state.WinInfo.iDrawScale;
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
    };

    //Load States
    Initialize(state=null)
    {
        var Points = GetPointTotal(this.state.Values.length, this);
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
    };

    LoadTemplate(state = null, template = defaultTemplates[0])
    {
        //If State needs to be updated now
        if(state !== null)
        {
            state.iQuantity     = template.values.length;
            state.Values        = template.values;
            state.PointLimit    = template.pntLlimit;
            state.PointDiff    = template.pntDiff
        }
        else
        {
            this.setState(
            {
                iQuantity:  template.values.length,
                Values:     template.values,
                PointLimit: template.pntLlimit,
                PointDiff:  template.pntDiff
            });
        }
    };

    OnTemplateChange(template)
    {
        this.LoadTemplate(null, template);
        var Quantity    = template.values.length;
        var tempAngles  = this.UpdateAngles(Quantity);
        var Points = GetPointTotal(Quantity, this, template.values);

        this.setState({
            iAngles:        tempAngles,
            PointTotal:     Points[0],
            PointMin:       Points[1],
            PointMax:       Points[2],
            v2StatVectors:  this.UpdateStatVectors(Quantity, tempAngles, template.values)
        });
    }



    //Setup Listener Events
    componentDidMount() 
    {
        //window.addEventListener('resize', this.UpdateViewPort);

        console.log('Search:',this.props.location);
    };
    componentWillUnmount()
    {
        //window.removeEventListener('resize', this.UpdateViewPort);
    };

    UpdateStatVectors(Quantity=this.state.iQuantity, Angles=this.state.iAngles, Values=this.state.Values, iDrawScale=this.state.WinInfo.iDrawScale)
    {
        var tempVectors = [];//this.state.v2StatVectors

        //Calculate All Point
        for (var i = 0; i < Quantity; i++)
        {
            tempVectors.push(Coll.v2Rotate2D(new Vector2(0, (-Values[i][1] * (1/Values[i][3])*iDrawScale) ), new Vector2(0,0), Angles[i]));
        };
        return tempVectors;
    };

    UpdateAngles(Quantity = this.state.iQuantity)
    {
        var tempArr = [];
        var iSlice = 360/Quantity;
        for(var i=0; i<Quantity; i++)
        { tempArr.push(i*iSlice); };
        return tempArr;
    };

    //Update Functions
    UpdateStates(props)
    {
        //vars
        var tempAngles      = this.state.iAngles;
        var Quantity        = this.state.iQuantity;
        var tempVal         = this.state.Values;
        var iIndex          = props.target.name;
        var Points      = [this.state.PointTotal, this.state.PointMin];
        if(props.target.name === 'Quantity')
        {
            Quantity    = parseInt(props.target.value);
            tempAngles  = this.UpdateAngles(Quantity);
            Points      = GetPointTotal(Quantity, this);
        }
        else if(iIndex.search('Value') > -1)
        {
            iIndex = parseInt(iIndex.replace('Value', ''));
            tempVal = this.state.Values;
            //Value Range Check
            tempVal[iIndex][1] = Coll.iAATest(props.target.value, tempVal[iIndex][2], tempVal[iIndex][3]);

            //Check Point Limit Range
            Points = GetPointTotal(Quantity, this, tempVal);
            if(Points[0] > this.state.PointLimit)
            { return; }
        }
        else if(iIndex.search('Types') > -1)
        {
            iIndex = parseInt(iIndex.replace('Types', ''));
            tempVal[iIndex][0] = props.target.value;
        }
        else if(iIndex.search('Ranges') > -1)
        {
            iIndex = iIndex.replace('Ranges', '');
            var iIndex2 = 3;
            if(iIndex.search('Min') > -1)
            {
                iIndex  = parseInt(iIndex.replace('Min', ''));
                iIndex2 = 2;
                
                //Check if min exceeds then current value or is less then zero
                props.target.value = Coll.iAATest(props.target.value,0,tempVal[iIndex][1]);
            }
            else
            {
                iIndex  = parseInt(iIndex.replace('Max', ''));

                //Check if max is less then current value
                props.target.value = Coll.iAATest(props.target.value,tempVal[iIndex][1]);
            }
            tempVal[iIndex][iIndex2] = props.target.value;
            Points = GetPointTotal(Quantity, this, tempVal);
        }
        else if(props.target.name === 'PointDiff')
        {
            //update to new PointsTotal
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

        this.setState({
            iQuantity:      Quantity,
            v2StatVectors:  this.UpdateStatVectors(Quantity, tempAngles, tempVal),
            iAngles:        tempAngles,
            PointTotal:     Points[0],
            PointMin:       Points[1],
            PointMax:       Points[2],
            Values:         tempVal});
    };

    UpdatePointLimit(props)
    {
        //Limit Cannot be less then the minimum or the point total
        props.target.value = Coll.iAATest(props.target.value, this.state.PointTotal);
        this.setState({PointLimit: props.target.value})
    };

    RandomizeStats(props)
    {
        //Generate Random Order
        var randOrder = []; var tempOrder = [];
            //Compile Order
            for(var iTRO = 0; iTRO < this.state.iQuantity; iTRO++)
            { tempOrder.push(iTRO); };
                //Random Order
                for(var iRO = 0; iRO < this.state.iQuantity; iRO++)
                {
                    var tempIndex = Math.floor(Math.random()*(tempOrder.length));
                    randOrder.push(tempOrder[tempIndex]);//Add Index
                    tempOrder.splice(tempIndex, 1);//Sub Temp Index
                };

        //Values Buffer
        //Desc: set default values to minimum
        //Note: bring this logic into the main loop later for more efficiency.
        var valuesBuffer = this.state.Values;
        for(var i1=0; i1<valuesBuffer.length; i1++)
        {valuesBuffer[i1][1] = valuesBuffer[i1][2];}

        //Total Buffer
        var totalBuffer = 0;
        if(this.state.PointDiff === false){totalBuffer = this.state.PointMin;}

        //Iterate through list of stats
        var iProcs = 0;
        for(var i=0; totalBuffer < this.state.PointLimit; i++)
        {
            console.log('i:',i);
            var iR = randOrder[i];

            var min = valuesBuffer[iR][1]; 
            var max = valuesBuffer[iR][3];

            if(max > this.state.PointMax)
            {
               console.log('max:'.max,'PointMax:',this.state.PointMax);
               max = this.state.PointMax;
            }
            if(max > valuesBuffer[iR][3])
            {
                console.log('max:'.max,'valuesBuffer:',valuesBuffer[iR][3]);
                max = valuesBuffer[iR][3];
            }
            if(max > this.state.PointLimit - totalBuffer)
            { 
                console.log('max:',max,'this.state.PointLimit - totalBuffer:',this.state.PointLimit - totalBuffer);
                max = this.state.PointLimit - totalBuffer; 
            }

            //Generate Random Value
            var tempVal = 0;
            if(min < max)
            {tempVal = (Math.floor(Math.random() * (max-min)) + min+1);}
            else
            {
                console.log('iR:',iR,'min:',min,'max:',max);
                tempVal = min;
                iProcs++;
            }

            totalBuffer += tempVal;
            if(totalBuffer > this.state.PointLimit)
            {
                var iDiff = this.state.PointLimit - totalBuffer;
                totalBuffer += iDiff;
                tempVal += iDiff;
                console.log('totalBuffer:',totalBuffer,'tempVal:',tempVal);
                break;
            }

            //Save Value
            valuesBuffer[iR][1]=tempVal;

            //Reiterate
            if(i >= valuesBuffer.length-1)
            {i=-1; totalBuffer=0;}

            //Emergency Break
            if(iProcs > valuesBuffer.length){break;}
        };
        console.log('2. totalBuffer:'|totalBuffer)

        this.setState({Values: valuesBuffer});

        var Points = GetPointTotal(this.state.iQuantity, this, valuesBuffer);

        this.setState(
        {
            PointTotal:     Points[0],
            PointMin:       Points[1],
            PointMax:       Points[2],
            v2StatVectors:  this.UpdateStatVectors(this.state.iQuantity, this.state.iAngles, valuesBuffer)
        });
    };
    
    //Just Update
    UpdateViewPort(Scale=null)
    {
        /*Temp Vars*/
        var tempScale = iBaseSize;
        if(Scale!==null){tempScale = Scale;}
        var tempDrawScale = tempScale;
        var tempDim = [(tempDrawScale*2)+edgeSpacer, (tempDrawScale*2)+edgeSpacer];
        var tempCenter = [tempDim[0]/2, tempDim[1]/2];

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
    };

    OnSliderChange(Scale) {
       this.UpdateViewPort(Scale);
    };

    render(){
        return(
            <Box name='body' style={{display: 'inline-flex'}} bgcolor='darkGrey'>
                        <Row alignItems='top'>
                            <Col alignSelf ='top'>
                                <TemplateSelector defaultValue={defaultTemplates[iDefTmpl]} MenuItems={tmplMenuItems} OnTemplateChange={this.OnTemplateChange.bind(this)}></TemplateSelector>
                                <Paper style={{width: '320px', margin: 4, padding: 4, display: 'flex', flexDirection: 'column'}}>
                                    <StatInputForm
                                        Quantity    = {this.state.iQuantity}
                                        PointTotal  = {this.state.PointTotal}
                                        PointLimit  = {this.state.PointLimit}
                                        Values      = {this.state.Values}
                                        PointDiff   = {this.state.PointDiff}
                                            
                                        UpdateStates  = {this.UpdateStates.bind(this)}
                                        RandomizeStats  = {this.RandomizeStats.bind(this)}
                                        UpdatePointLimit  = {this.UpdatePointLimit.bind(this)} >
                                    </StatInputForm>
                                </Paper>
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
                                    {<polygon points={SetupDiagram(this)} style={{fill: 'white', fillOpacity: 0.5, stroke: 'black', strokeWidth: iStrokeWidth, fillRule: 'evenodd'}} />}
                                    {<polygon points={SetupStats(this)} fill = 'url(#grad)' style={{fillOpacity: 0.66, stroke: 'red', strokeWidth: 0, fillRule: 'evenodd'}} />}
                                    {SetupTextAndTicks(this)}
                                </svg>
                            </Paper>
                        </Row>
                        {/*<StatCode></StatCode>*/}
            </Box>
        );
    }
}

export default Diagram;
