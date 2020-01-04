import React from "react";
import { Box, Paper, makeStyles, createMuiTheme } from '@material-ui/core';
import {Vector2,  Coll} from './KoyMath.js';
import StatInputForm from "./StatInputForm.js"

const iStrokeWidth = 0.5;
const iWinWidth = window.innerWidth;
const iScale = 0.20;
const iDrawScale = iWinWidth*iScale;
const iDimension = [(iWinWidth*iScale*2)+144, (iWinWidth*iScale*2)+144];
const cLetterGrades = ['F','E','D','C','B','A','S','SS','SSS','?'];

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
    var v2Polygon = [new Vector2(0,0), new Vector2(0, -1*iDrawScale), new Vector2(0, -1*iDrawScale)];
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
    return mesh.map(function (arr) { return [Comp.state.Center[0] + arr[0], Comp.state.Center[1] + arr[1]]; });
};


//Stats 2 and 3 are the same everytime
var SetupStats = function(Comp)
{
    var mesh = [];
    var v2Polygon;
    var v2FirstPoint;//Done to save an operation step
    /*Iterate For Each TriAngles*/
    for (var i = 0; i < Comp.state.iQuantity; i++)
    {
        //Adjust Angles
        if(i === 0)//First Stat
        {
            //Create First Polygon, comprised of stat 1 and two
            v2Polygon = [new Vector2(0,0), new Vector2(0, (-Comp.state.Values[i]*(1/Comp.state.Ranges[i][1])*iDrawScale)), new Vector2(0, 0, 0)];

            //Quantity Check
            if(Comp.state.iQuantity !== 1){ v2Polygon[2] = new Vector2(0, (-Comp.state.Values[i+1]*(1/Comp.state.Ranges[i+1][1])*iDrawScale) ); }

            v2FirstPoint = Coll.v2Rotate2D(v2Polygon[1],v2Polygon[0],Comp.state.iAngles[i]);/*The Current Stat Point*/

            Coll.v2Rotate2D(v2Polygon[2],v2Polygon[0],Comp.state.iAngles[i+1]);/*The Next Stat Point*/
        }
        else if(i !== Comp.state.Quantity-1)//Mid Stats
        {
            v2Polygon = [new Vector2(0,0), v2Polygon[2], new Vector2(0, (-Comp.state.Values[i+1]*(1/Comp.state.Ranges[i+1][1])*iDrawScale))];
            Coll.v2Rotate2D(v2Polygon[2],v2Polygon[0],Comp.state.iAngles[i+1]);/*The Next Stat Point*/
        }
        else//Last Stat
        {
            console.log(v2FirstPoint);
            v2Polygon = [new Vector2(0,0), v2Polygon[2], v2FirstPoint];
        }
        mesh.push([v2Polygon[0].x, v2Polygon[0].y]); mesh.push([v2Polygon[1].x, v2Polygon[1].y]); mesh.push([v2Polygon[2].x, v2Polygon[2].y]);
    }    
    //Offset Coordinates
    return mesh.map(function (arr) { return [Comp.state.Center[0] + arr[0], Comp.state.Center[1] + arr[1]]; });
};

var SetupTextAndTicks = function(Comp)
{
    var typeCenter = [Comp.state.Center[0], Comp.state.Center[1]-iDrawScale-5];
    var tickWidth = iDrawScale*0.005;
    var ticks = 10;
    var strCenter = +Comp.state.Center[0]+","+Comp.state.Center[1];

    var strRotateSelf = ", rotate(180,"+typeCenter[0]+","+(typeCenter[1]-4)+")";

    var htmlResult = [];
    for (var i = 0; i < Comp.state.iQuantity; i++)
    {
        var sFlip = "";
        //Rotate text around it's center if upsidedown
        if(Comp.state.iAngles[i] > 90 && Comp.state.iAngles[i] < 270)
        {
            sFlip = strRotateSelf;
        }

        //Letter Grades
        htmlResult.push( 
        <text textAnchor="middle" style={{stroke: "rgb(0,0,0)", fontSize: Math.floor(iDrawScale/6), strokeWidth: iStrokeWidth}} x={typeCenter[0]} y={typeCenter[1]+8} 
            transform={"rotate("+Comp.state.iAngles[i]+", "+strCenter+"), rotate("+-Comp.state.iAngles[i]+","+typeCenter[0]+","+(typeCenter[1])+")"} > 
            {gradeCalc(i, Comp.state.Ranges, Comp.state.Values)}
        </text>);

        //Types
        htmlResult.push(
        <text textAnchor="middle" style={{stroke: "rgb(0,0,0)", fontSize: iDrawScale/22, strokeWidth: iStrokeWidth}} x={typeCenter[0]} y={typeCenter[1]}
            transform={"rotate("+Comp.state.iAngles[i]+", "+strCenter+")"+sFlip} >                
            {Comp.state.Types[i]}
        </text>);

        /*Stat Ticks*/
        /*for(var iT = 1; iT<ticks; iT++)
        {
            if((iT%2) === 0)
            {
                //TICKS
                htmlResult.push(<line x1={(-tickWidth)+Comp.state.Center[0]} y1={Comp.state.Center[1]-((iDrawScale/ticks)*iT)} x2={tickWidth+Comp.state.Center[0]} y2={Comp.state.Center[1]-((iDrawScale/ticks)*iT)} style={{stroke: "rgb(0,0,0)", strokeWidth: iStrokeWidth*2}} transform={"rotate("+Comp.state.iAngles[i]+", "+Comp.state.Center[0]+","+Comp.state.Center[1]+")"} />);

                //Define and round off the TICK VALUES
                var tickValue = Math.round(100 * (iT*( Comp.state.Ranges[i][1]/ticks)) )/100;
                typeCenter = [Comp.state.Center[0]+5, Comp.state.Center[1]-((iDrawScale/ticks)*iT)+3];
                htmlResult.push(
                <text x={typeCenter[0]} y={typeCenter[1]} style={{stroke: "rgb(0,0,0)", fontSize: tickWidth*9, strokeWidth: iStrokeWidth}} transform={"rotate("+Comp.state.iAngles[i]+", "+(Comp.state.Center[0])+","+Comp.state.Center[1]+"), rotate("+iFlip+","+(typeCenter[0]-4)+","+(typeCenter[1]-3)+")"}>
                    {tickValue}
                </text>);
            }
        }*/
    }
    return htmlResult
};

var GetPointTotal = function(Comp, arrDiff = 0)
{
    var PointTotal = 0;
    for(var i=0; i < Comp.state.iQuantity; i++)
        {
            //push additional elements if change in size exceeds current size
            if(i < arrDiff+1)
            {
                Comp.state.Ranges.push([0,10]);
                Comp.state.Types.push("???");
                Comp.state.Values.push(0);
                
                Comp.state.statGrades.push(0);
            };
            PointTotal += Comp.state.Values[i];
        };
        return PointTotal;
};

class Diagram extends React.Component
{   
    constructor(props){
        super(props);
        this.state = 
        {
            //User inputted stats as semi-colin dilimited strings
                iQuantity:      6,
                iAngles: [0, 60, 120, 180, 240, 300],
                PointTotal:    0,
                PointLimit:    60,

                Ranges: [[1,10], [1,10], [1,10],      [1,10],        [1,10],       [1,10],      [1,10]],
                Types:  ["POWER","SPEED","RANGE",   "DURABILITY",  "PRECISION", "POTENTIAL","???"],
                Values: [3.0,4.0,4.0,8.0,4.0,2.0, 0.0],
                
                statGrades: [0,0,0,0,0,0,0,0,0,0,0,0,0],//Placeholder
            
                //Window Dimensions Window Center
                Center:         [null, null],
        };
        this.state.Center       = [iDimension[0]/2, iDimension[1]/2];

        this.state.PointTotal  = GetPointTotal(this);
    };

    UpdateAngles(props)
    {
        this.state.iAngles = [];
        var tempArr = [];
        var iSlice = 360/props.target.value;
        for(var i=0; i<props.target.value; i++)
        {
            tempArr.push(i*iSlice);
        };
        this.setState({iAngles: tempArr})
    };

    //Update Functions
    UpdateQuantity(props)
    {
        //vars
        this.UpdateAngles(props);
        var iIndex = props.target.name;
        if(props.target.name === "Quantity")
        {
            //Adjust State Arrays and update PointTotal
            var arrDiff = props.target.value - this.state.Values.length;
            var PointTotal = GetPointTotal(this, arrDiff);
            
            var Quantity    = parseInt(props.target.value);
            var Center      = [iDimension[0]/2, iDimension[1]/2];

            this.setState({
                PointTotal: PointTotal,

                iQuantity:      Quantity,
                Center:         Center,
            });
        }
        else if(iIndex.search("Value") > -1)
        {
            iIndex = parseInt(iIndex.replace("Value", ""));
            var tempVal = this.state.Values;
            tempVal[iIndex] = props.target.value;

            this.setState({Values: tempVal});
        }
        else if(iIndex.search("Types") > -1)
        {
            iIndex = parseInt(iIndex.replace("Types", ""));
            var tempTypes = this.state.Types;    
            tempTypes[iIndex] = props.target.value;

            this.setState({Types: tempTypes});
        }
        else if(iIndex.search("Ranges") > -1)
        {
            iIndex = iIndex.replace("Ranges", "");
            var iIndex2;
            if(iIndex.search("Min") > -1)
            {
                iIndex  = parseInt(iIndex.replace("Min", ""));
                iIndex2 = 0;
            }
            else
            {
                iIndex  = parseInt(iIndex.replace("Max", ""));
                iIndex2 = 1;
            }
            var tempRanges = this.state.Ranges;
            tempRanges[iIndex][iIndex2] = props.target.value;

            this.setState({Ranges: tempRanges,
                Values: this.state.Values});
        }

        this.setState({
        });
    };

    UpdatePointLimit(props)
    {
        this.setState({PointLimit: props.target.value})
    };

    RandomizeStats(props)
    {
        var tempValues = [];
        var tempTotal = 0;
        for(var i=0; i<this.state.iQuantity; i++)
        {
            var tempVal = 0;
            if(tempTotal < this.state.PointLimit)
            {
                var iSubRange = this.state.PointLimit - tempTotal - this.state.Ranges[i][1];
                if(iSubRange > 0){iSubRange = 0;}
                tempVal = parseInt(this.state.Ranges[i][0]) + Math.floor(Math.random() * (this.state.Ranges[i][1]+1-this.state.Ranges[i][0]-iSubRange) );
                tempTotal += tempVal;
            }
            tempValues.push(tempVal);
        };
        this.state.Values = tempValues;

        var PointTotal = GetPointTotal(this);
        this.setState({
            PointTotal: PointTotal,
            meshStats:  SetupStats          (this)
        });
    };

    render(){
        //console.log(this.state);
        return(
            <Box name="body" display="flex" style={{alignItems: "flex"}} bgcolor="darkGrey">
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
                    <Paper style={{margin: 4, padding: 4, display: 'flex', flexDirection: 'column'}}>
                        <svg width={iDimension[0]} height={iDimension[1]} >
                            <circle cx={this.state.Center[0]} cy={this.state.Center[1]} r={1*iDrawScale} style={{fill: "white", fillOpacity: 0.5, stroke: "black", strokeWidth: iStrokeWidth*4}} />
                            <defs>
                                <linearGradient id = "grad">
                                    <stop offset="0" stopColor="purple"/>
                                    <stop offset="1" stopColor="lightBlue"/>
                                </linearGradient>
                            </defs>
                            {<polygon points={SetupDiagram(this)} style={{fill: "white", fillOpacity: 0.5, stroke: "black", strokeWidth: iStrokeWidth, fillRule: "evenodd"}} />}
                            {<polygon points={SetupStats(this)} fill = "url(#grad)" style={{fillOpacity: 0.66, stroke: "red", strokeWidth: 0, fillRule: "evenodd"}} />}
                            {SetupTextAndTicks (this)}
                        </svg>
                    </Paper>
            </Box>
        );
    }
}

export default Diagram;
