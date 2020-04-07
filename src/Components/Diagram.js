import React from 'react';
import { Box, Paper, MenuItem } from '@material-ui/core';
import {Vector2,  Coll} from './KoyMath.js';

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
    for (let i = 0; i < Comp.state.data.iQuantity; i++)
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
    for (let i = 0; i < Comp.state.data.iQuantity; i++)
    {
        let i2 = i+1;
        if(i2 >= Comp.state.data.iQuantity){i2 = 0;}
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
    for (let i = 0; i < Comp.state.data.iQuantity; i++)
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
                    style={{fontSize: 10, strokeWidth: 0, fill: pallete.grid[1]}} 
                        transform={transform}>
                        {`${tickValue}${Comp.state.Values[i][4]}`}
                    </text>);
                    htmlResult.push(
                    <text key={`LT_${i}_${iT}_2`} textAnchor= {iTick > 0 ? 'start' : 'end'} dominantBaseline='central' 
                    x={x} y={tickCenter[1]}
                    style={{fontSize: 10, stroke: 'rgb(0,0,0)', strokeWidth: 0.5, fill: pallete.grid[0]}} 
                        transform={transform}>
                        {`${tickValue}${Comp.state.Values[i][4]}`}
                    </text>);
                }
            }
        };
    }
    return htmlResult;
};

class Diagram extends React.Component
{
    constructor(props){
        super(props);

        this.state = 
        {
            data: props.data,
            //User inputted stats as semi-colin dilimited strings
            iAngles:    [0],
            v2StatVectors:  [],

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




    OnChange()
    {
        let tempAngles  = this.UpdateAngles(this.state.data.Values.length);

        this.setState({
            iAngles:        tempAngles,
            v2StatVectors:  this.UpdateStatVectors(this.state.data.Values.length, tempAngles, this.state.data.Values.length)
        });
        this.startAnim();
    }

    UpdateStatVectors(Quantity=this.state.data.iQuantity, Angles=this.state.iAngles, Values=this.state.data.Values)
    {
        let tempVectors = [];//this.state.v2StatVectors

        //Calculate All Point
        for (let i = 0; i < Quantity; i++)
        {
            tempVectors.push(Coll.v2Rotate2D(new Vector2(0, (-Values[i][1] * (1/Values[i][3])*100) ), new Vector2(0,0), Angles[i]));
        };
        return tempVectors;
    }

    UpdateAngles(Quantity = this.state.data.iQuantity)
    {
        let tempArr = [];
        let iSlice = 360/Quantity;
        for(let i=0; i<Quantity; i++)
        { tempArr.push(i*iSlice); };
        return tempArr;
    }

    

    UpdatePointLimit(props)
    {
        //Limit Cannot be less then the minimum or the point total
        props.target.value = Coll.iAATest(parseInt(props.target.value), this.state.data.PointTotal);
        this.setState({PointLimit: props.target.value})
    }


    GetURLCode()
    {
        let sResult = '';
        for(let x=0;x<this.state.data.Values.length;x++)
        {
            let xBuffer = '';
            for(let y=0;y<5;y++)
            {
                let yBuffer = this.state.data.Values[x][y];
                xBuffer += yBuffer+',';
            }
            sResult += '['+xBuffer.slice(0,xBuffer.length-1)+']';
        }
        return String('koyfoster.github.io/#/StatCard/'+this.state.data.Name+sResult+(this.state.data.PointDiff ? 'Min=true' : '')+'/').replace('//','/');
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
        );
    }
}

export default Diagram;
