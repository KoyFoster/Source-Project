import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import {Vector2, Vector3, Deg, Coll, Calc} from './KoyMath.js'

//Card Canvas
var canvas;
var svg;
//CTX is used for drawing
var ctx;

var chart = 
{ 
    iCentX: 0, iCentY: 0,
    iParts: 6,
    iScale: 150
}

var stats =
{

}

//Rotate Function


//Stat Card
function StatCard(props)
{
    //Window Dimensions Window Center
    var iWidth = 560;   chart.iCentX = iWidth/2;
    var iHeight = 350;  chart.iCentY = iHeight/2;

    var iDim = [560, 350];
    var iCore = [iDim[0]/2, iDim[1]/2];
        //var pCenter = new Vector2(chart.iCentX,chart.iCentY);
        //var pLength = new Vector2(chart.iCentX+chart.iRadius,chart.iCentY);

    var iDegrees = 360/chart.iParts;
        //var iRadians = (iDegrees*Math.PI)/180;
    //var iCircum = Math.PI*chart.iRadius*2;
    //var iArcLength = iCircum*(iDegrees)
        //var iChord = 2*chart.iRadius*Math.sin(iArcLength/chart.iRadius*2)

    /*Iterate For Each Triangle*/
    var v2Polygon = [new Vector2(0,0), new Vector2(0, 1*chart.iScale), new Vector2(0, 1*chart.iScale)];
    var mesh = [];
    for (var i = 1; i < chart.iParts+1; i++)
    {
        //Adjust Angles
        if(i === 1)
        {
            v2Polygon[2] = Coll.v2Rotate2D(v2Polygon[2],v2Polygon[0],iDegrees)
            mesh.push([v2Polygon[0].x, v2Polygon[0].y]); mesh.push([v2Polygon[1].x, v2Polygon[1].y]); mesh.push([v2Polygon[2].x, v2Polygon[2].y]);
        }
        else
        {
            v2Polygon[1] = Coll.v2Rotate2D(v2Polygon[1],v2Polygon[0],iDegrees);
            v2Polygon[2] = Coll.v2Rotate2D(v2Polygon[2],v2Polygon[0],iDegrees);
            mesh.push([v2Polygon[0].x, v2Polygon[0].y]); mesh.push([v2Polygon[1].x, v2Polygon[1].y]); mesh.push([v2Polygon[2].x, v2Polygon[2].y]);
        }
    }    
    //Offset Coordinates
    var meshTrans = mesh.map(function (arr) { return [iCore[0] + arr[0], iCore[1] + arr[1]]; });
    
    //OnLoad
    window.onload = function () {
    };

    //Render and Logic 
    return(<div>
        <Box display="flexbox" border="2px solid #3f0000" bgcolor="yellow" color="#a4a4a4" width={iDim[0]} height={iDim[1]}>
                        
            <svg width={iDim[0]} height={iDim[1]} >
                <circle cx={iCore[0]} cy={iCore[1]} r={1*chart.iScale} style={{fill: "white", fillOpacity: 0.5, stroke: "black", strokeWidth: 0.25}} />
                <polygon points={meshTrans} style={{fill: "white", fillOpacity: 0.5, stroke: "black", strokeWidth: 0.25, fillRule: "evenodd"}} />   
            </svg>
        </Box>
        <Box display="flexbox" border="2px solid #3f0000" bgcolor="yellow" color="#a4a4a4" width={iDim[0]} height={iDim[1]}>
            <label>Stat quantity: </label>
            <input type="text" name="Stat quantity" value={6}></input>
        </Box>
    </div>)
}

export default StatCard; 