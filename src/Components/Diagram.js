import React from "react";
import { Box } from '@material-ui/core';
import {Vector2,  Coll} from './KoyMath.js';
import StatInputCtrls from "./StatInputCtrls.js"

const iDiagramScale = 256;

//Grade Function
var gradeCalc = function(index)
{   
    var result = this.state.letterGrades[7];//? grade

    //Take Values and divide it against it's max range
    var percentage = (this.state.Values[index]/this.state.Ranges[index][1])*100;

    //Upper or lower value assignment
    var masymenos = (value) => 
    {
        if(value > 10){result += '+';} else if(value < 10){result += '-';}
    };

    //Letter Assignment
    if(percentage > 100)
    {
        result = this.state.letterGrades[7];
        masymenos(percentage-80);
    }
    if(percentage === 100)
    {
        result = this.state.letterGrades[6];
        masymenos(percentage-80);
    }
    else if(percentage >= 80)
    {
        result = this.state.letterGrades[5];
        masymenos(percentage-80);
    }
    else if(percentage >= 60)
    {
        result = this.state.letterGrades[4];
        masymenos(percentage-60);
    }
    else if(percentage >= 40)
    {
        result = this.state.letterGrades[3];
        masymenos(percentage-40);
    }
    else if(percentage >= 20)
    {        
        result = this.state.letterGrades[2];
        masymenos(percentage-20);
    }
    else if(percentage >= 0)
    {
        result = this.state.letterGrades[1];
        masymenos(percentage);
    }
    else if(percentage === 0)
    {
        result = this.state.letterGrades[0];
        masymenos(percentage);
    }
    return result;//Return '?'
}

/*Update Diagram*/
var setupDiagram = function(props)
{
    /*Iterate For Each Triangle*/
    var v2Polygon = [new Vector2(0,0), new Vector2(0, -1*iDiagramScale), new Vector2(0, -1*iDiagramScale)];
    var mesh = [];
    for (var i = 1; i < this.state.Quantity+1; i++)
    {
        //Adjust Angles
        if(i === 1)
        {
            Coll.v2Rotate2D(v2Polygon[2],v2Polygon[0],this.state.iDegrees)
            mesh.push([v2Polygon[0].x, v2Polygon[0].y]); mesh.push([v2Polygon[1].x, v2Polygon[1].y]); mesh.push([v2Polygon[2].x, v2Polygon[2].y]);
        }
        else
        {
            Coll.v2Rotate2D(v2Polygon[1],v2Polygon[0],this.state.iDegrees);
            Coll.v2Rotate2D(v2Polygon[2],v2Polygon[0],this.state.iDegrees);
            mesh.push([v2Polygon[0].x, v2Polygon[0].y]); mesh.push([v2Polygon[1].x, v2Polygon[1].y]); mesh.push([v2Polygon[2].x, v2Polygon[2].y]);
        }
    }    
    //Offset Coordinates
    this.state.meshDiagram = mesh.map(function (arr) { return [this.state.iCore[0] + arr[0], this.state.iCore[1] + arr[1]]; });
};

//Stats 2 and 3 are the same everytime
var setupStats = function(props)
{
    var mesh = [];
    var v2Polygon;
    var v2FirstPoint;//Done to save an operation step
    /*Iterate For Each Triangle*/
    for (var i = 0; i < this.state.Quantity; i++)
    {
        //Adjust Angles
        if(i === 0)//First Stat
        {
            v2Polygon = [new Vector2(0,0), new Vector2(0, (-this.state.Values[0]*(1/this.state.Ranges[i][1])*iDiagramScale)), new Vector2(0, (-this.state.Values[1]*(1/this.state.Ranges[i][1])*iDiagramScale))];
            v2FirstPoint = Coll.v2Rotate2D(v2Polygon[1],v2Polygon[0],this.state.iDegrees*i);/*The Current Stat Point*/
            Coll.v2Rotate2D(v2Polygon[2],v2Polygon[0],this.state.iDegrees*(i+1));/*The Next Stat Point*/
        }
        else if(i !== this.state.Quantity-1)//Mid Stats
        {
            v2Polygon = [new Vector2(0,0), v2Polygon[2], new Vector2(0, (-this.state.Values[i+1]*(1/this.state.Ranges[i+1][1])*iDiagramScale))];
            Coll.v2Rotate2D(v2Polygon[2],v2Polygon[0],this.state.iDegrees*(i+1));/*The Next Stat Point*/
        }
        else//Last Stat
        {
            v2Polygon = [new Vector2(0,0), v2Polygon[2], v2FirstPoint];
        }
        mesh.push([v2Polygon[0].x, v2Polygon[0].y]); mesh.push([v2Polygon[1].x, v2Polygon[1].y]); mesh.push([v2Polygon[2].x, v2Polygon[2].y]);
    }    
    //Offset Coordinates
    this.state.meshStats = mesh.map(function (arr) { return [this.state.iCore[0] + arr[0], this.state.iCore[1] + arr[1]]; });
};

var SetupTextAndTicks = function(props)
{
    var htmlResult = [];
    for (var i = 0; i < this.state.Quantity; i++)
    {   
        /*Stat Type Label*/
        var iAngle = i*this.state.iDegrees;

        var iFlip = 0;
        //Rotate text around it's center if upsidedown
        if(iAngle > 90 && iAngle < 270)
        {
            iFlip = 180;
        }        
        var typeCenter = [this.state.iCore[0], this.state.iCore[1]-iDiagramScale];
        htmlResult.push( 
        <text text-anchor="middle" style={{stroke: "rgb(0,0,0)", fontSize: 14, strokeWidth: 1}} x={typeCenter[0]} y={typeCenter[1]-6} transform={"rotate("+iAngle+", "+this.state.iCore[0]+","+this.state.iCore[1]+"), rotate("+iFlip+","+typeCenter[0]+","+(typeCenter[1]-10)+")"} > 
        {this.state.Types[i]}
        </text>);

        htmlResult.push( 
        <text text-anchor="middle" style={{stroke: "rgb(0,0,0)", fontSize: 40, strokeWidth: 1}} x={typeCenter[0]} y={typeCenter[1]-40} transform={"rotate("+iAngle+", "+this.state.iCore[0]+","+this.state.iCore[1]+"), rotate("+-iAngle+","+typeCenter[0]+","+(typeCenter[1]-50)+")"} > 
        {gradeCalc(i)}
        </text>);

        /*Stat Ticks*/
        var ticks = 10;
        for(var iT = 1; iT<ticks; iT++)
        {
            htmlResult.push(<line x1={-4+this.state.iCore[0]} y1={this.state.iCore[1]-((iDiagramScale/ticks)*iT)} x2={4+this.state.iCore[0]} y2={this.state.iCore[1]-((iDiagramScale/ticks)*iT)} style={{stroke: "rgb(0,0,0)", strokeWidth: 1}} transform={"rotate("+iAngle+", "+this.state.iCore[0]+","+this.state.iCore[1]+")"} />);
           
            if((iT%2) === 0)
            {
                //Deinfe and round off the tick values
                var tickValue = Math.round(100 * (iT*( this.state.Ranges[i][1]/ticks)) )/100;
                typeCenter = [this.state.iCore[0]+5, this.state.iCore[1]-((iDiagramScale/ticks)*iT)+3];
                htmlResult.push(
                <text x={typeCenter[0]} y={typeCenter[1]} style={{stroke: "rgb(0,0,0)", strokeWidth: 1}} transform={"rotate("+iAngle+", "+(this.state.iCore[0])+","+this.state.iCore[1]+"), rotate("+iFlip+","+(typeCenter[0]-5)+","+(typeCenter[1]-3)+")"}>
                    {tickValue}
                </text>);
            }
        }
    }
    this.state.htmlText = <a href="">{htmlResult}</a>
};

class Diagram extends React.Component
{
    exampleFunction = () => {this.render();}
    
    constructor(props){
        super(props);
        this.state = 
        {
            //User inputted stats as semi-colin dilimited strings
                Quantity: null,
                MaxPoints:  100,
                Ranges:     [[0,8], [0,10], [0,7],      [0,10],        [0,9],       [0,2],      [0,10], [0,10], [0,10], [0,10]],
                Types:      ["POWER","SPEED","RANGE",   "DURABILITY",  "PRECISION", "POTENTIAL","???"],
                Values:     [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                
                letterGrades:   ['F','E','D','C','B','A','S','?'],
                statGrades:     [0,0,0,0,0,0,0,0,0,0,0,0,0],
            
                //Window Dimensions Window Center
                iDegrees: (360/this.state.Quantity),
                iDim: [iDiagramScale*3, iDiagramScale*3],
                iCore: [null, null],
                meshDiagram: null,
                meshStats: null,
                htmlText: null,
        },        
        this.state.iCore = [this.state.iDim[0]/2, this.state.iDim[1]/2];
        setupDiagram;
        setupStats;
        SetupTextAndTicks;
    };

    render(){
        return(
            <div>
                <div>
                    <svg width={this.state.iDim[0]} height={this.state.iDim[1]} >
                        <circle cx={this.state.iCore[0]} cy={this.state.iCore[1]} r={1*iDiagramScale} style={{fill: "white", fillOpacity: 0.5, stroke: "black", strokeWidth: 2}} />
                        <defs>
                            <linearGradient id = "grad">
                                <stop offset="0" stop-color="purple"/>
                                <stop offset="1" stop-color="lightBlue"/>
                            </linearGradient>
                        </defs>
                        {<polygon points={this.state.meshDiagram} style={{fill: "white", fillOpacity: 0.5, stroke: "black", strokeWidth: 1, fillRule: "evenodd"}} />}
                        {<polygon points={this.state.meshStats} fill = "url(#grad)" style={{fillOpacity: 0.66, stroke: "red", strokeWidth: 0, fillRule: "evenodd"}} />}
                        {this.state.htmlText}
                    </svg>
                </div>
                <Box display="flexbox" border="2px solid #3f0000" bgcolor="darkGrey" color="#a4a4a4" width={this.state.iDim[0]} height={this.state.iDim[1]}>
                    <StatInputCtrls exampleFunctionLink={this.exampleFunction} value1={this.state.Quantity}></StatInputCtrls>
                </Box>
            </div>
        );
    }
}

export default Diagram;
