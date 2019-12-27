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
var statRanges = [[0,8], [0,10], [0,7],     [0,10],        [0,9],       [0,2],      [0,10], [0,10], [0,10], [0,10]];
var statTypes = ["POWER","SPEED","RANGE",   "DURABILITY",  "PRECISION", "POTENTIAL","???"];
var stats = 
[   (Math.random() * (statRanges[0][1] - 1) + 1), 
    (Math.random() * (statRanges[0][1] - 1) + 1),
    (Math.random() * (statRanges[2][1] - 1) + 1),
    (Math.random() * (statRanges[3][1] - 1) + 1),
    (Math.random() * (statRanges[4][1] - 1) + 1),
    (Math.random() * (statRanges[5][1] - 1) + 1),
    (Math.random() * (statRanges[6][1] - 1) + 1)];

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
            v2Polygon = [new Vector2(0,0), new Vector2(0, (-stats[0]*0.1*chart.iScale)), new Vector2(0, (-stats[1]*0.1*chart.iScale))];
            v2FirstPoint = Coll.v2Rotate2D(v2Polygon[1],v2Polygon[0],iDegrees*i);/*The Current Stat Point*/
            Coll.v2Rotate2D(v2Polygon[2],v2Polygon[0],iDegrees*(i+1));/*The Next Stat Point*/
        }
        else if(i !== chart.iParts-1)//Mid Stats
        {
            v2Polygon = [new Vector2(0,0), v2Polygon[2], new Vector2(0, (-stats[i+1]*0.1*chart.iScale))];
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
        htmlResult.push( <text text-anchor="middle" x={typeCenter[0]} y={typeCenter[1]-3} transform={"rotate("+iAngle+", "+iCore[0]+","+iCore[1]+"), rotate("+iFlip+","+typeCenter[0]+","+(typeCenter[1]-7)+")"} > {statTypes[i]} </text>);

        /*Stat Ticks*/
        var ticks = 10;
        for(var iT = 1; iT<ticks; iT++)
        {
            htmlResult.push(<line x1={-4+iCore[0]} y1={iCore[1]-((chart.iScale/ticks)*iT)} x2={4+iCore[0]} y2={iCore[1]-((chart.iScale/ticks)*iT)} style={{stroke: "rgb(0,0,0)", strokeWidth: 1}} transform={"rotate("+iAngle+", "+iCore[0]+","+iCore[1]+")"} />);
           
            if((iT%2) === 0)
            {
                //Deinfe and round off the tick values
                var tickValue = Math.round(100 * (iT*( statRanges[i][1]/ticks)) )/100;
                typeCenter = [iCore[0]+5, iCore[1]-((chart.iScale/ticks)*iT)+3];
                htmlResult.push(
                <text x={typeCenter[0]} y={typeCenter[1]} style={{stroke: "rgb(0,0,0)", strokeWidth: 1}} transform={"rotate("+iAngle+", "+(iCore[0])+","+iCore[1]+"), rotate("+iFlip+","+(typeCenter[0]-5)+","+(typeCenter[1]-3)+")"}>
                    {tickValue}
                </text>);
            }
        }
    }
    return <a>{htmlResult}</a>
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
