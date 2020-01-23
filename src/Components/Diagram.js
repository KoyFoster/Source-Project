import React, {useState} from 'react';
import { Box, Paper, Slider, Button/*, makeStyles, createMuiTheme*/ } from '@material-ui/core';
import {Vector2,  Coll} from './KoyMath.js';
import StatInputForm from './StatInputForm.js'
import {Row, Col} from './Grid'

const iStrokeWidth = 0.5;
const cLetterGrades = ['F','E','D','C','B','A','S','SS','SSS','?'];
const edgeSpacer=128;
const iBaseSize = 256;

//Grade Function
var gradeCalc = function(index, Ranges, Values)
{
    var result = cLetterGrades[9];//? grade
    //Take Values and divide it against it's max range
    var percentage = (Values[index]/Ranges[index][1])*100;

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
            {gradeCalc(i, Comp.state.Ranges, Comp.state.Values)}
        </text>);

        //Types
        htmlResult.push(
        <text name={'Type'+i} textAnchor='middle' dominantBaseline='central' style={{stroke: 'rgb(0,0,0)', fontSize: iFontSize/12, strokeWidth: iStrokeWidth}} x={typeCenter[0]} y={typeCenter[1]}
            transform={'rotate('+Comp.state.iAngles[i]+', '+(strCenter)+')'+sTypeFlip}>
            {Comp.state.Types[i]}
        </text>);

        /*Stat Ticks*/
        for(var iT = 1; iT<ticks; iT++)
        {
            if((iT%2) === 0)
            {
                //TICKS
                htmlResult.push(<line x1={(-tickWidth)+Comp.state.WinInfo.Center[0]} y1={Comp.state.WinInfo.Center[1]-((Comp.state.WinInfo.iDrawScale/ticks)*iT)} x2={tickWidth+Comp.state.WinInfo.Center[0]} y2={Comp.state.WinInfo.Center[1]-((Comp.state.WinInfo.iDrawScale/ticks)*iT)} style={{stroke: 'rgb(0,0,0)', strokeWidth: iStrokeWidth*2}} transform={'rotate('+Comp.state.iAngles[i]+', '+Comp.state.WinInfo.Center[0]+','+Comp.state.WinInfo.Center[1]+')'} />);

                //Define and round off the TICK VALUES
                var tickValue = Math.round(100 * (iT*( Comp.state.Ranges[i][1]/ticks)) )/100;
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

var GetPointTotal = function(Comp, arrDiff = 0, Values = 0)
{
    var PointTotal = 0;
    for(var i=0; i < Comp.state.iQuantity; i++)
        {
            //push additional elements if change in size exceeds current size
            if(i < arrDiff+1)
            {
                Comp.state.Ranges.push([0,10]);
                Comp.state.Types.push('???');
                Comp.state.Values.push(0);
                
                Comp.state.statGrades.push(0);
            };
            if(Values === 0)
            {PointTotal += Comp.state.Values[i];}
            else
            {PointTotal += parseInt(Values[i]);}
        };
        return PointTotal;
};

//templates
const defaultTemplates = {
    tmplGeneric:
    {
        types:          [''],
        ranges:         [[0,0]],
        defaultValues:  [0],
        pntLlimit:      0
    },
    tmplJojo:
    {
        types:      ['POWER','SPEED','RANGE',   'DURABILITY','PRECISION','POTENTIAL'],
        ranges:     [[1,10], [1,10], [1,10],      [1,10],        [1,10],       [1,10],      [1,10]],
        values:     [3.0,4.0,4.0,8.0,4.0,2.0, 0.0],
        pntLlimit:  70
    },
    tmplDS3:
    {
        types:  ['Vigor','Attunement','Endurance',   'Vitality',  'Strength', 'Dexterity','Intelligence', 'Faith', 'Luck', 'Hollowing'],//Dark Souls 3 Style
        ranges: [[1,100],[1,100],[1,100], [1,100],[1,100],[1,100], [1,100],[1,100],[1,100], [1,100]],
        values: [15,10,15,15,20,18,10,10,10,0],
        pntLlimit: 999
    },
    tmplAA:
    {
        types:  ['Strength','Agility','Stamina','Spirit','Intelligence', 'Cast Time','Attack Speed', 'Move Speed'],//Dark Souls 3 Style
        ranges: [[158,2560],[158,2560],[158,2560],[158,2560],[158,2560], [0,100],[0,100],[5.4,10]],
        values: [158,158,158, 158,158, 10,10,5.4],
        pntLlimit: 2560
    }
};

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
                v2StatVectors:  [],
                //User Defined
                Types:      [''],
                Ranges:     [[0,0]],
                Values:     [0],
                PointLimit: 0,
                
                statGrades: [0,0,0,0,0,0,0,0,0,0,0,0,0],//Placeholder
            
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
        this.LoadTemplate(this.state, defaultTemplates.tmplJojo);
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
    }

    //Load States
    Initialize(state=null)
    {
        if(state !== null)
        {
            state.iQuantity             = this.state.Types.length;
            state.iAngles               = this.UpdateAngles();
            state.WinInfo.iDrawScale    = this.state.WinInfo.iScale;
            state.WinInfo.iDimension    = [(this.state.WinInfo.iScale*2)+edgeSpacer, (this.state.WinInfo.iScale*2)+edgeSpacer];
            state.WinInfo.Center        = [this.state.WinInfo.iDimension[0]/2, this.state.WinInfo.iDimension[1]/2];
            state.PointTotal            = GetPointTotal(this);
            state.v2StatVectors         = this.UpdateStatVectors();
        }
        else
        {
            this.setState({
                iQuantity: this.state.Types.length,
                iAngles: this.UpdateAngles(),
                WinInfo: 
                {
                    iDrawScale: this.state.WinInfo.iScale,
                    iDimension: [(this.state.WinInfo.iScale*2)+edgeSpacer, (this.state.WinInfo.iScale*2)+edgeSpacer],
                    Center: [this.state.WinInfo.iDimension[0]/2, this.state.WinInfo.iDimension[1]/2],
                },
                PointTotal: GetPointTotal(this),
                v2StatVectors: this.UpdateStatVectors()
            });
        }
    };
    LoadTemplate(state = null, template = defaultTemplates.tmplGeneric)
    {
        //If State needs to be updated now
        if(state !== null)
        {
            state.Types         = template.types;
            state.Ranges        = template.ranges;
            state.Values        = template.values;
            state.PointLimit    = template.pntLlimit
        }
        else
        {
            this.setState(
            {
                Types:      template.types,
                Ranges:     template.ranges,
                Values:     template.values,
                PointLimit: template.pntLlimit
            });
        }
    };

    //Setup Listener Events
    componentDidMount() 
    {
        //window.addEventListener('resize', this.UpdateViewPort);
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
            tempVectors.push(Coll.v2Rotate2D(new Vector2(0, (-Values[i] * (1/this.state.Ranges[i][1])*iDrawScale) ), new Vector2(0,0), Angles[i]));
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
    UpdateQuantity(props)
    {
        //vars
        var tempAngles = this.state.iAngles;
        var Quantity = this.state.iQuantity;
        var tempVal = this.state.Values;
        var iIndex = props.target.name;
        var PointTotal = this.state.PointTotal;
        if(props.target.name === 'Quantity')
        {
            //Update Angles
            tempAngles = this.UpdateAngles(props.target.value);
            this.setState({iAngles: tempAngles});
            //Adjust State Arrays and update PointTotal
            var arrDiff = props.target.value - this.state.Values.length;
            PointTotal = GetPointTotal(this, arrDiff);
            
            Quantity    = parseInt(props.target.value);

            this.setState({
                PointTotal: PointTotal,

                iQuantity:  Quantity,
                iAngles:    tempAngles
            });
        }
        else if(iIndex.search('Value') > -1)
        {
            iIndex = parseInt(iIndex.replace('Value', ''));
            tempVal = this.state.Values;
            tempVal[iIndex] = props.target.value;

            PointTotal = GetPointTotal(this,0,tempVal);

            this.setState({Values: tempVal});
        }
        else if(iIndex.search('Types') > -1)
        {
            iIndex = parseInt(iIndex.replace('Types', ''));
            var tempTypes = this.state.Types;    
            tempTypes[iIndex] = props.target.value;

            this.setState({Types: tempTypes});
        }
        else if(iIndex.search('Ranges') > -1)
        {
            iIndex = iIndex.replace('Ranges', '');
            var iIndex2;
            if(iIndex.search('Min') > -1)
            {
                iIndex  = parseInt(iIndex.replace('Min', ''));
                iIndex2 = 0;
            }
            else
            {
                iIndex  = parseInt(iIndex.replace('Max', ''));
                iIndex2 = 1;
            }
            var tempRanges = this.state.Ranges;
            tempRanges[iIndex][iIndex2] = props.target.value;

            this.setState({Ranges: tempRanges});
        }

        this.setState({v2StatVectors: this.UpdateStatVectors(Quantity, tempAngles, tempVal),
            PointTotal: PointTotal});
    };

    UpdatePointLimit(props)
    {
        this.setState({PointLimit: props.target.value})
    };

    RandomizeStats(props)
    {
        var tempValues = [];
        var tempTotal = 0;
        //Generate Random Order
        var randOrder = [];        
        var tempOrder = [];
        //Compile Order
        for(var iTRO = 0; iTRO < this.state.iQuantity; iTRO++)
        { tempOrder.push(iTRO); };
        //Jumble Order
        for(var iRO = 0; iRO < this.state.iQuantity; iRO++)
        {
            var tempIndex = Math.floor(Math.random()*(tempOrder.length));

            randOrder.push(tempOrder[tempIndex]);//Add Index
            tempOrder.splice(tempIndex, 1);//Sub Temp Index
        };
        //Iterate through list of stats
        for(var i=0; i<this.state.iQuantity; i++)
        {
            var tempVal = 0;

            //Break is total is met or exceeded
            if(tempTotal > this.state.PointLimit)
            { tempTotal += tempVal }
            else
            {
                var iR = randOrder[i];
                var iSubRange = this.state.PointLimit - tempTotal - this.state.Ranges[iR][1];
                if(iSubRange > 0){iSubRange = 0;}
                var tempRange = (this.state.Ranges[iR][1] - this.state.Ranges[iR][0])+iSubRange;/*Max minus Min minus point limit*/

                tempVal = parseInt(this.state.Ranges[iR][0]) + Math.floor(Math.random() * (tempRange) );
                tempTotal += tempVal;
            }
            tempValues.push(tempVal);
        };
        this.setState({Values: tempValues});

        this.setState(
        {
            PointTotal:     GetPointTotal(this, 0, tempValues), 
            v2StatVectors:  this.UpdateStatVectors(this.state.iQuantity, this.state.iAngles, tempValues)
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
                iScale: tempScale,
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
            <Box name='body' display='flex' style={{alignItems: 'flex'}} bgcolor='darkGrey'>
                    <Col>
                        <Row alignItems='top'>
                            
                            <Paper style={{width: '320px', margin: 4, padding: 4, display: 'flex', flexDirection: 'column'}}>
                                <StatInputForm
                                    Quantity    = {this.state.iQuantity}
                                    PointTotal  = {this.state.PointTotal}
                                    PointLimit  = {this.state.PointLimit}
                                    Types       = {this.state.Types}
                                    Values      = {this.state.Values}
                                    Ranges      = {this.state.Ranges}
                                        
                                    UpdateQuantity  = {this.UpdateQuantity.bind(this)}
                                    RandomizeStats  = {this.RandomizeStats.bind(this)}
                                    UpdatePointLimit  = {this.UpdatePointLimit.bind(this)} >
                                </StatInputForm>
                            </Paper>
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
                    </Col>
            </Box>
        );
    }
}

export default Diagram;
