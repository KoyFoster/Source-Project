import React from "react";
import { Box } from '@material-ui/core';
import {Vector2,  Coll} from './KoyMath.js';
import StatInputCtrls from "./StatInputCtrls.js"

var chart = 
{ 
    iCentX: 0, iCentY: 0,
    iParts: 7,
    iScale: 300
};

//User inputted stats as semi-colin dilimited strings
var statRange = [0,10];
var statTypes = ["POWER","SPEED","RANGE","DURABILITY","PRECISION","POTENTIAL","???"];
var stats = [(Math.random() * (8 - 1) + 1),(Math.random() * (8 - 1) + 1),(Math.random() * (8 - 1) + 1),(Math.random() * (8 - 1) + 1),(Math.random() * (8 - 1) + 1),(Math.random() * (8 - 1) + 1),(Math.random() * (8 - 1) + 1)];

//Window Dimensions Window Center
var iDegrees = (360/chart.iParts);
var iDim = [750, 750];
chart.iCentX = iDim[0]/2;
chart.iCentY = iDim[1]/2;
var iCore = [iDim[0]/2, iDim[1]/2];
var meshTrans;


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

var setupStats = function(props)
{
    /*Iterate For Each Triangle*/
    var lastCorner = new Vector2();
    var firstCorner = new Vector2();
    var mesh = [];
    for (var i = 0; i < chart.iParts; i++)
    {
        var v2Polygon;
        //Adjust Angles
        if(i === 0)
        {
            v2Polygon = [new Vector2(0,0), new Vector2(0, (-stats[0]*0.1*chart.iScale)), new Vector2(0, (-stats[1]*0.1*chart.iScale))];

            Coll.v2Rotate2D(v2Polygon[1],v2Polygon[0],iDegrees*i);
            Coll.v2Rotate2D(v2Polygon[2],v2Polygon[0],iDegrees*(i+1));

            mesh.push([v2Polygon[0].x, v2Polygon[0].y]); mesh.push([v2Polygon[1].x, v2Polygon[1].y]); mesh.push([v2Polygon[2].x, v2Polygon[2].y]);

            firstCorner = v2Polygon[1];
        }
        else if(i !== chart.iParts-1)
        {
            v2Polygon = [new Vector2(0,0), new Vector2(0, (-stats[i-1]*0.1*chart.iScale)), new Vector2(0, (-stats[i]*0.1*chart.iScale))];

            v2Polygon[1] = lastCorner;
            Coll.v2Rotate2D(v2Polygon[2],v2Polygon[0],iDegrees*(i+1));

            mesh.push([v2Polygon[0].x, v2Polygon[0].y]); mesh.push([v2Polygon[1].x, v2Polygon[1].y]); mesh.push([v2Polygon[2].x, v2Polygon[2].y]);
        }
        else
        {
            v2Polygon = [new Vector2(0,0), new Vector2(0, (-stats[i]*0.1*chart.iScale)), new Vector2(0, (-stats[0]*0.1*chart.iScale))];
            v2Polygon[1] = lastCorner;
            Coll.v2Rotate2D(v2Polygon[2],v2Polygon[0],iDegrees*(i+1));

            mesh.push([v2Polygon[0].x, v2Polygon[0].y]); mesh.push([v2Polygon[1].x, v2Polygon[1].y]); mesh.push([v2Polygon[2].x, v2Polygon[2].y]);
        }
        
        lastCorner = v2Polygon[2];
        if(i === chart.iParts)
        {
            v2Polygon[2] = firstCorner;
        }
    }    
    //Offset Coordinates
    meshTrans = mesh.map(function (arr) { return [iCore[0] + arr[0], iCore[1] + arr[1]]; });

    var htmlStats = <polygon points={meshTrans} fill = "url(#grad)" style={{fillOpacity: 0.66, stroke: "red", strokeWidth: 0, fillRule: "evenodd"}} />;

    return htmlStats;
};

var SetupTextAndTicks = function(props)
{
    var htmlResult = [];
    for (var i = 0; i < chart.iParts; i++)
    {   
        //htmlResult.push( <polygon points="01,01 10,10 01,01" x={iCore[0]} y={iCore[1]-chart.iScale-10} transform={"rotate("+i*iDegrees+", "+iCore[0]+","+iCore[1]+")"} />);
        /*Stat Label*/
        htmlResult.push( <text text-anchor="middle" x={iCore[0]} y={iCore[1]-chart.iScale-10} transform={"rotate("+i*iDegrees+", "+iCore[0]+","+iCore[1]+")"} > {statTypes[i]} </text>);

        /*Stat Ticks*/
        var ticks = 10;
        for(var iT = 1; iT<ticks; iT++)
        {
            htmlResult.push(<line x1={-4+iCore[0]} y1={iCore[1]-((chart.iScale/ticks)*iT)} x2={4+iCore[0]} y2={iCore[1]-((chart.iScale/ticks)*iT)} style={{stroke: "rgb(0,0,0)", strokeWidth: 1}} transform={"rotate("+i*iDegrees+", "+iCore[0]+","+iCore[1]+")"}/>);
            if((iT%2) === 0)
            {
                htmlResult.push(
                <text text-anchor="middle" x={-10+iCore[0]} y={4+iCore[1]-((chart.iScale/ticks)*iT)} style={{stroke: "rgb(0,0,0)", strokeWidth: 1}} transform={"rotate("+i*iDegrees+", "+iCore[0]+","+iCore[1]+")"}>
                    {iT}
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
                        {/*<line x1="0" y1="0" x2={iCore[0]} y2={iCore[1]} style={{stroke: "rgb(255,0,0)", strokeWidth: 2}}/>*/}
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
