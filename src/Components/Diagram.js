import React from "react";
import { Box } from '@material-ui/core';
import {Vector2,  Coll} from './KoyMath.js';
import StatInputCtrls from "./StatInputCtrls.js"

var chart = 
{ 
    iParts: 6,
    iScale: 300
};

//Window Dimensions Window Center
var iDegrees = (360/chart.iParts);
var iDim = [chart.iScale*3, chart.iScale*3];
var iCore = [iDim[0]/2, iDim[1]/2];
var meshTrans;


//User inputted stats as semi-colin dilimited strings
var statData = 
{
    MaxPoints:  100,
    Ranges:     [[0,8], [0,10], [0,7],      [0,10],        [0,9],       [0,2],      [0,10], [0,10], [0,10], [0,10]],
    Types:      ["POWER","SPEED","RANGE",   "DURABILITY",  "PRECISION", "POTENTIAL","???"],
    Values:     [0,0,0,0,0,0,0,0,0,0,0,0,0],
    letterGrades:   ['F','E','D','C','B','A','S','?'],
    statGrades:     [0,0,0,0,0,0,0,0,0,0,0,0,0],
}
statData.Values =
    [(Math.random() * (statData.Ranges[0][1] - 1) + 1),
    (Math.random() * (statData.Ranges[0][1] - 1) + 1),
    (Math.random() * (statData.Ranges[2][1] - 1) + 1),
    (Math.random() * (statData.Ranges[3][1] - 1) + 1),
    (Math.random() * (statData.Ranges[4][1] - 1) + 1),
    (Math.random() * (statData.Ranges[5][1] - 1) + 1),
    (Math.random() * (statData.Ranges[6][1] - 1) + 1)];

//Grade Function
var gradeCalc = function(index)
{
    var result = statData.letterGrades[7];//? grade

    //Take Values and divide it against it's max range
    var percentage = (statData.Values[index]/statData.Ranges[index][1])*100;

    //Upper or lower value assignment
    var masymenos = (value) => 
    {
        if(value > 10)
        {
            result += '+';
        }
        else if(value < 10)
        {
            result += '-';            
        }
    };

    //Letter Assignment
    if(percentage > 100)
    {
        result = statData.letterGrades[7];
        masymenos(percentage-80);
    }
    if(percentage === 100)
    {
        result = statData.letterGrades[6];
        masymenos(percentage-80);
    }
    else if(percentage >= 80)
    {
        result = statData.letterGrades[5];
        masymenos(percentage-80);
    }
    else if(percentage >= 60)
    {
        result = statData.letterGrades[4];
        masymenos(percentage-60);
    }
    else if(percentage >= 40)
    {
        result = statData.letterGrades[3];
        masymenos(percentage-40);
    }
    else if(percentage >= 20)
    {        
        result = statData.letterGrades[2];
        masymenos(percentage-20);
    }
    else if(percentage >= 0)
    {
        result = statData.letterGrades[1];
        masymenos(percentage);
    }
    else if(percentage === 0)
    {
        result = statData.letterGrades[0];
        masymenos(percentage);
    }

    return result;//Return '?'
}

/*Update Diagram*/
var setupDiagram = function(props)
{
    /*Iterate For Each Triangle*/
    var v2Polygon = [new Vector2(0,0), new Vector2(0, -1*chart.iScale), new Vector2(0, -1*chart.iScale)];
    var mesh = [];
    for (var i = 1; i < chart.iParts+1; i++)
    {
        //Adjust Angles
        if(i === 1)
        {
            Coll.v2Rotate2D(v2Polygon[2],v2Polygon[0],iDegrees)
            mesh.push([v2Polygon[0].x, v2Polygon[0].y]); mesh.push([v2Polygon[1].x, v2Polygon[1].y]); mesh.push([v2Polygon[2].x, v2Polygon[2].y]);
        }
        else
        {
            Coll.v2Rotate2D(v2Polygon[1],v2Polygon[0],iDegrees);
            Coll.v2Rotate2D(v2Polygon[2],v2Polygon[0],iDegrees);
            mesh.push([v2Polygon[0].x, v2Polygon[0].y]); mesh.push([v2Polygon[1].x, v2Polygon[1].y]); mesh.push([v2Polygon[2].x, v2Polygon[2].y]);
        }
    }    
    //Offset Coordinates
    meshTrans = mesh.map(function (arr) { return [iCore[0] + arr[0], iCore[1] + arr[1]]; });
    return <polygon points={meshTrans} style={{fill: "white", fillOpacity: 0.5, stroke: "black", strokeWidth: 1, fillRule: "evenodd"}} />;
};

//Stats 2 and 3 are the same everytime
var setupStats = function(props)
{
    var mesh = [];
    var v2Polygon;
    var v2FirstPoint;//Done to save an operation step
    /*Iterate For Each Triangle*/
    for (var i = 0; i < chart.iParts; i++)
    {
        //Adjust Angles
        if(i === 0)//First Stat
        {
            v2Polygon = [new Vector2(0,0), new Vector2(0, (-statData.Values[0]*(1/statData.Ranges[i][1])*chart.iScale)), new Vector2(0, (-statData.Values[1]*(1/statData.Ranges[i][1])*chart.iScale))];
            v2FirstPoint = Coll.v2Rotate2D(v2Polygon[1],v2Polygon[0],iDegrees*i);/*The Current Stat Point*/
            Coll.v2Rotate2D(v2Polygon[2],v2Polygon[0],iDegrees*(i+1));/*The Next Stat Point*/
        }
        else if(i !== chart.iParts-1)//Mid Stats
        {
            v2Polygon = [new Vector2(0,0), v2Polygon[2], new Vector2(0, (-statData.Values[i+1]*(1/statData.Ranges[i+1][1])*chart.iScale))];
            Coll.v2Rotate2D(v2Polygon[2],v2Polygon[0],iDegrees*(i+1));/*The Next Stat Point*/
        }
        else//Last Stat
        {
            v2Polygon = [new Vector2(0,0), v2Polygon[2], v2FirstPoint];
        }
        mesh.push([v2Polygon[0].x, v2Polygon[0].y]); mesh.push([v2Polygon[1].x, v2Polygon[1].y]); mesh.push([v2Polygon[2].x, v2Polygon[2].y]);
    }    
    //Offset Coordinates
    meshTrans = mesh.map(function (arr) { return [iCore[0] + arr[0], iCore[1] + arr[1]]; });

    //Draw Stats
    var htmlStats = <polygon points={meshTrans} fill = "url(#grad)" style={{fillOpacity: 0.66, stroke: "red", strokeWidth: 0, fillRule: "evenodd"}} />;

    return htmlStats;
};

var SetupTextAndTicks = function(props)
{
    var htmlResult = [];
    for (var i = 0; i < chart.iParts; i++)
    {   
        /*Stat Type Label*/
        var iAngle = i*iDegrees;

        var iFlip = 0;
        //Rotate text around it's center if upsidedown
        if(iAngle > 90 && iAngle < 270)
        {
            iFlip = 180;
        }        
        var typeCenter = [iCore[0], iCore[1]-chart.iScale];
        htmlResult.push( 
        <text text-anchor="middle" style={{stroke: "rgb(0,0,0)", fontSize: 14, strokeWidth: 1}} x={typeCenter[0]} y={typeCenter[1]-6} transform={"rotate("+iAngle+", "+iCore[0]+","+iCore[1]+"), rotate("+iFlip+","+typeCenter[0]+","+(typeCenter[1]-10)+")"} > 
        {statData.Types[i]}
        </text>);

        htmlResult.push( 
        <text text-anchor="middle" style={{stroke: "rgb(0,0,0)", fontSize: 40, strokeWidth: 1}} x={typeCenter[0]} y={typeCenter[1]-40} transform={"rotate("+iAngle+", "+iCore[0]+","+iCore[1]+"), rotate("+-iAngle+","+typeCenter[0]+","+(typeCenter[1]-50)+")"} > 
        {gradeCalc(i)}
        </text>);

        /*Stat Ticks*/
        var ticks = 10;
        for(var iT = 1; iT<ticks; iT++)
        {
            htmlResult.push(<line x1={-4+iCore[0]} y1={iCore[1]-((chart.iScale/ticks)*iT)} x2={4+iCore[0]} y2={iCore[1]-((chart.iScale/ticks)*iT)} style={{stroke: "rgb(0,0,0)", strokeWidth: 1}} transform={"rotate("+iAngle+", "+iCore[0]+","+iCore[1]+")"} />);
           
            if((iT%2) === 0)
            {
                //Deinfe and round off the tick values
                var tickValue = Math.round(100 * (iT*( statData.Ranges[i][1]/ticks)) )/100;
                typeCenter = [iCore[0]+5, iCore[1]-((chart.iScale/ticks)*iT)+3];
                htmlResult.push(
                <text x={typeCenter[0]} y={typeCenter[1]} style={{stroke: "rgb(0,0,0)", strokeWidth: 1}} transform={"rotate("+iAngle+", "+(iCore[0])+","+iCore[1]+"), rotate("+iFlip+","+(typeCenter[0]-5)+","+(typeCenter[1]-3)+")"}>
                    {tickValue}
                </text>);
            }
        }
    }
    return <a href="">{htmlResult}</a>
};

class Diagram extends React.Component
{
    constructor(props){
        super(props);
    };

    render(){
        return(
            <div>
                <div>
                    <svg width={iDim[0]} height={iDim[1]} >
                        <circle cx={iCore[0]} cy={iCore[1]} r={1*chart.iScale} style={{fill: "white", fillOpacity: 0.5, stroke: "black", strokeWidth: 2}} />
                        <defs>
                            <linearGradient id = "grad">
                                <stop offset="0" stop-color="purple"/>
                                <stop offset="1" stop-color="lightBlue"/>
                            </linearGradient>
                        </defs>
                        {setupDiagram()}
                        {setupStats()}
                        {SetupTextAndTicks()}
                    </svg>
                </div>
                <Box display="flexbox" border="2px solid #3f0000" bgcolor="darkGrey" color="#a4a4a4" width={iDim[0]} height={iDim[1]}>
                    <StatInputCtrls></StatInputCtrls>
                </Box>
            </div>
        );
    }
}

export default Diagram;
