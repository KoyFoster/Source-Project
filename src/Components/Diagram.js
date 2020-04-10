import React, { useState, useEffect } from 'react';
import { Vector2, Coll } from './KoyMath.js';

const iLineWidth = 1;
const iStrokeWidth = 0.5;
const cLetterGrades = ['F', 'E', 'D', 'C', 'B', 'A', 'S', 'SS', 'SSS', '?'];
const iBaseSize = 320;
const iCenter = 160;
// const sUnitTypes = ';;UNIT;LEVEL;LVL;POINT;PNT';

const pallete = {
  inner: ['#EEEEEE', 'gold'],
  outer: ['#EEEEEE', '#222222'],
  gradeText: ['white', '#111111'],
  typeText: ['white', '#111111'],
  graph: ['purple', 'white', 'purple'],
  grid: ['gold', '#111111'],
};

//Grade Function
let gradeCalc = function (index, Values) {
  let result = cLetterGrades[9]; //? grade
  //Take Values and divide it against it's max range
  let percentage = (Values[index][1] / Values[index][3]) * 100;

  //Upper or lower value assignment
  let masymenos = (value) => {
    if (value > 10) {
      result += '+';
    } else if (value < 10) {
      result += '-';
    }
  };

  //Letter Assignment
  if (percentage >= 140) {
    result = cLetterGrades[8];
  } else if (percentage >= 120) {
    result = cLetterGrades[7];
    masymenos(percentage - 110);
  } else if (percentage >= 100) {
    result = cLetterGrades[6];
    masymenos(percentage - 90);
  } else if (percentage >= 80) {
    result = cLetterGrades[5];
    masymenos(percentage - 80);
  } else if (percentage >= 60) {
    result = cLetterGrades[4];
    masymenos(percentage - 60);
  } else if (percentage >= 40) {
    result = cLetterGrades[3];
    masymenos(percentage - 40);
  } else if (percentage >= 20) {
    result = cLetterGrades[2];
    masymenos(percentage - 20);
  } else if (percentage > 0) {
    result = cLetterGrades[1];
  } else if (percentage === 0) {
    result = cLetterGrades[0];
  }
  return result; //Return '?'
};

//Stats 2 and 3 are the same everytime
let SetupStats = function (vectors) {
  let mesh = [];
  let v2Polygon;

  /*Iterate For Each TriAngles*/
  for (let i = 0; i < vectors.length; i++) {
    let i2 = i + 1;
    if (i2 >= vectors.length) {
      i2 = 0;
    }
    v2Polygon = [
      new Vector2(0, 0),
      new Vector2(vectors[i].x, vectors[i].y),
      new Vector2(vectors[i2].x, vectors[i2].y),
    ];

    mesh.push([v2Polygon[0].x, v2Polygon[0].y]);
    mesh.push([v2Polygon[1].x, v2Polygon[1].y]);
    mesh.push([v2Polygon[2].x, v2Polygon[2].y]);
  }
  //Offset Coordinates
  return mesh.map(function (arr) {
    return [iCenter + arr[0], iCenter + arr[1]];
  });
};

let SetupTextAndTicks = function (Angles, data) {
  let ticks = 10;
  let tickWidth = 2;

  let typeCenter = [iCenter, iCenter - 100];
  let gradeCenter = [iCenter, iCenter - 124];
  let strCenter = +iCenter + ',' + iCenter;

  let strTypeRotateSelf =
    ', rotate(180,' + typeCenter[0] + ',' + typeCenter[1] + ')';

  let htmlResult = [];
  for (let i = 0; i < Angles.length; i++) {
    const bFlip = Angles[i] > 90 && Angles[i] < 270;
    let sTypeFlip = '';
    let sTickFlip = '';
    let iFontSize = 100;
    //Rotate text around it's center if upsidedown
    if (bFlip) sTypeFlip = strTypeRotateSelf;

    //Letter Grades
    let transform =
      'rotate(' +
      Angles[i] +
      ', ' +
      iCenter +
      ',' +
      iCenter +
      '), rotate(' +
      -Angles[i] +
      ',' +
      gradeCenter[0] +
      ',' +
      gradeCenter[1] +
      ')';
    const gradeSize = iFontSize / 5;
    const typeSize = iFontSize / 9;
    htmlResult.push(
      <text
        key={'Grade' + i + '_1'}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          stroke: 'rgb(0,0,0)',
          fontSize: gradeSize,
          strokeWidth: 0,
          fill: pallete.gradeText[1],
        }}
        x={gradeCenter[0] + 1.5}
        y={gradeCenter[1] + 1.5}
        transform={transform}
      >
        {gradeCalc(i, data.Values)}
      </text>,
    );
    htmlResult.push(
      <text
        key={'Grade' + i + '_2'}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          stroke: 'rgb(0,0,0)',
          fontSize: gradeSize,
          strokeWidth: 0,
          fill: pallete.gradeText[0],
        }}
        x={gradeCenter[0]}
        y={gradeCenter[1]}
        transform={transform}
      >
        {gradeCalc(i, data.Values)}
      </text>,
    );

    //Types
    transform = 'rotate(' + Angles[i] + ', ' + strCenter + ')' + sTypeFlip;
    htmlResult.push(
      <text
        key={'Type' + i + '_1'}
        textAnchor={'middle'}
        dominantBaseline="central"
        style={{
          fontSize: typeSize,
          strokeWidth: 0,
          fill: pallete.typeText[1],
        }}
        x={typeCenter[0] + 1}
        y={typeCenter[1] + 1}
        transform={transform}
      >
        {data.Values[i][0]}
      </text>,
    );
    htmlResult.push(
      <text
        key={'Type' + i + '_2'}
        textAnchor={'middle'}
        dominantBaseline="central"
        style={{
          fontSize: typeSize,
          strokeWidth: 0,
          fill: pallete.typeText[0],
        }}
        x={typeCenter[0]}
        y={typeCenter[1]}
        transform={transform}
      >
        {`${data.Values[i][0]}`}
      </text>,
    );

    /*Stat Ticks*/
    for (let iT = 1; iT < ticks; iT++) {
      if (iT % 2 === 0) {
        //TICKS
        const y = iCenter - ticks * iT;
        const y2 = iCenter - ticks * iT;
        const x2 = tickWidth + iCenter;
        transform =
          'rotate(' + Angles[i] + ', ' + iCenter + ',' + iCenter + ')';

        htmlResult.push(
          <line
            key={`L_${i}_${iT}_1`}
            x1={iCenter + (!bFlip ? 0.5 : 0.5)}
            y1={y + (!bFlip ? 0.5 : -0.5)}
            x2={x2 + (!bFlip ? 0.5 : 0.5)}
            y2={y2 + (!bFlip ? 0.5 : -0.5)}
            style={{ strokeWidth: iStrokeWidth * 2, stroke: pallete.grid[1] }}
            transform={transform}
          />,
        );
        htmlResult.push(
          <line
            key={`L_${i}_${iT}_2`}
            x1={iCenter}
            y1={y}
            x2={x2}
            y2={y2}
            style={{ strokeWidth: iStrokeWidth * 2, stroke: pallete.grid[0] }}
            transform={transform}
          />,
        );

        //Define and round off the TICK VALUES
        let tickValue = Math.ceil(iT * (data.Values[i][3] / ticks));
        let tickCenter = [iCenter, iCenter - ticks * iT];
        let iTick = 3;
        if (Angles[i] > 90 && Angles[i] < 270) {
          sTickFlip =
            ', rotate(180,' + tickCenter[0] + ',' + tickCenter[1] + ')';
          iTick *= -1;
        }

        transform =
          'rotate(' +
          Angles[i] +
          ', ' +
          iCenter +
          ',' +
          iCenter +
          ')' +
          sTickFlip;
        const x = tickCenter[0] + iTick;

        //Tick Value
        let bDraw =
          i === 0
            ? true
            : `${data.Values[i][3]}${data.Values[i][4]}` !==
              `${data.Values[i - 1][3]}${data.Values[i - 1][4]}`;
        if (bDraw) {
          htmlResult.push(
            <text
              key={`LT_${i}_${iT}_1`}
              textAnchor={iTick > 0 ? 'start' : 'end'}
              dominantBaseline="central"
              x={x + 0.67}
              y={tickCenter[1] + 0.67}
              style={{ fontSize: 10, strokeWidth: 0, fill: pallete.grid[1] }}
              transform={transform}
            >
              {`${tickValue}${data.Values[i][4]}`}
            </text>,
          );
          htmlResult.push(
            <text
              key={`LT_${i}_${iT}_2`}
              textAnchor={iTick > 0 ? 'start' : 'end'}
              dominantBaseline="central"
              x={x}
              y={tickCenter[1]}
              style={{
                fontSize: 10,
                stroke: 'rgb(0,0,0)',
                strokeWidth: 0.5,
                fill: pallete.grid[0],
              }}
              transform={transform}
            >
              {`${tickValue}${data.Values[i][4]}`}
            </text>,
          );
        }
      }
    }
  }
  return htmlResult;
};

function Diagram(props) {
  const [Angles, setAngles] = useState([0, 120, 240]);
  const [Vectors, setVectors] = useState([]);
  const [redraw, setRedraw] = useState('');

  const [interval, setInterval] = useState(undefined);
  const [anim, setAnim] = useState(1);
  const [animTL, setAnimTL] = useState(iCenter);
  const [animBR, setAnimBR] = useState(0);

  let vector = [];
  const angle = (1 / props.data.Size) * 360;
  const CreateVector = function () {
    /*Iterate For Each TriAngles*/
    const v2Polygon = [
      new Vector2(0, 0),
      new Vector2(0, -100),
      new Vector2(0, -100),
    ];

    //The logic here is that a triangle is created and repeated for each number of angles
    Coll.v2Rotate2D(v2Polygon[2], v2Polygon[0], angle); //Rotate Second Point Over

    //Push First Triangle
    vector.push([v2Polygon[0].x, v2Polygon[0].y]);
    vector.push([v2Polygon[1].x, v2Polygon[1].y]);
    vector.push([v2Polygon[2].x, v2Polygon[2].y]);

    //Offset Coordinates
    vector = vector.map(function (arr) {
      return [iCenter + arr[0], iCenter + arr[1]];
    });
  }; // end of CreateVector

  function GetsStats() {
    const html = [];

    for (let i = 0; i < props.data.Size; i++) {
      const length =
        props.data.Values[i][1] * (1 / props.data.Values[i][3]) * 1;
      const temp = 1 - length;
      const center = iCenter * temp;

      const transform = `translate(${center}, ${center}) scale(${length}) rotate(${
        angle * i
      },${vector[0][0]},${vector[0][1]})`;

      html.push(
        <polygon // Vector Test
          key={`${props.name}_v_${i}`}
          points={vector}
          transform={transform}
          style={{
            fill: 'red',
            stroke: pallete.grid[0],
            strokeWidth: iLineWidth,
            fillRule: 'evenodd',
          }}
        />,
      );
    }
    return html;
  }

  /*Update Diagram*/
  let baseDiagramMesh = undefined;
  let SetupBaseDiagram = function () {
    const html = [];

    let tempVectors = []; //Vectors
    console.log('vector2:', vector);

    //Calculate All Point
    for (let i = 0; i < props.data.Size; i++) {
      const transform = `rotate(${angle * i},${vector[0][0]},${vector[0][1]})`;

      html.push(
        <polygon // Vector Test
          key={`${props.name}_bv_${i}`}
          points={vector}
          transform={transform}
          style={{
            fill: 'transparent',
            strokeWidth: iLineWidth,
            fillRule: 'evenodd',
          }}
        />,
      );
    }
    baseDiagramMesh = html;
    return baseDiagramMesh;
  };

  function UpdateAngles(size = props.data.Size) {
    let tempArr = [];
    let iSlice = 360 / size;
    for (let i = 0; i < size; i++) {
      tempArr.push(i * iSlice);
    }

    return tempArr;
  }

  // function GetURLCode() {
  //   let sResult = '';
  //   for (let x = 0; x < props.data.Values.length; x++) {
  //     let xBuffer = '';
  //     for (let y = 0; y < 5; y++) {
  //       let yBuffer = props.data.Values[x][y];
  //       xBuffer += yBuffer + ',';
  //     }
  //     sResult += '[' + xBuffer.slice(0, xBuffer.length - 1) + ']';
  //   }
  //   return String(
  //     'koyfoster.github.io/#/StatCard/' +
  //       props.data.Name +
  //       sResult +
  //       (props.data.PointDiff ? 'Min=true' : '') +
  //       '/',
  //   ).replace('//', '/');
  // }

  function animate() {
    setRedraw('Stats: ', anim);
    if (anim === 1) return;
    if (anim + 0.1 >= 1) {
      clearInterval(interval);
      setInterval(undefined);
      setAnim(1);
      setAnimTL(0);
      setAnimBR(iBaseSize);
    } else {
      const newAnim = anim + 0.1;
      setAnim(newAnim);
      setAnimTL(iCenter - iCenter * (1 / newAnim));
      setAnimBR(iBaseSize * (1 / newAnim));
    }
  }
  function startAnim() {
    setRedraw('Stats: ', anim);
    if (interval) {
      clearInterval(interval);
    }
    setInterval(() => animate(), 33);
    setAnim(0);
    setAnimTL(iCenter);
    setAnimBR(0);
  }

  useEffect(() => {
    props.funcs.redraw = setRedraw;
    const tempAngles = UpdateAngles(props.data.Values.length);
    setAngles(tempAngles);
    // const vectors = GetsStats(
    //   props.data.Values.length,
    //   tempAngles,
    //   props.data.Values,
    // );

    // setVectors(vectors);
    // startAnim();
  }, []);

  // Update
  // Update();
  CreateVector();
  return (
    <svg width="100%" viewBox={`0 0 ${iBaseSize} ${iBaseSize}`}>
      <defs>
        <linearGradient gradientTransform="rotate(90)" id="grad">
          <stop offset="0" stopColor={pallete.graph[0]} />
          <stop offset="1" stopColor={pallete.graph[1]} />
        </linearGradient>
      </defs>
      <defs>
        <linearGradient gradientTransform="rotate(90)" id="goldGrad">
          <stop offset="0" stopColor={pallete.inner[0]} />
          <stop offset="1" stopColor={pallete.inner[1]} />
        </linearGradient>
      </defs>
      <defs>
        <linearGradient gradientTransform="rotate(90)" id="greyGrad">
          <stop offset="0" stopColor={pallete.outer[0]} />
          <stop offset="1" stopColor={pallete.outer[1]} />
        </linearGradient>
      </defs>
      <circle
        cx={iCenter}
        cy={iCenter}
        r={142}
        style={{ fill: 'white', stroke: '#111111', strokeWidth: iLineWidth }}
      />
      <circle
        cx={iCenter}
        cy={iCenter}
        r={139}
        style={{
          fill: 'url(#greyGrad)',
          stroke: '#111111',
          strokeWidth: iLineWidth,
        }}
      />
      <circle
        cx={iCenter}
        cy={iCenter}
        r={103}
        style={{ fill: 'white', stroke: 'transparent' }}
      />
      <circle
        cx={iCenter}
        cy={iCenter}
        r={101}
        style={{
          fill: 'url(#goldGrad)',
          stroke: 'transparent',
          strokeWidth: 0,
        }}
      />
      <svg viewBox={`${animTL} ${animTL} ${animBR} ${animBR}`}></svg>
      {GetsStats()}
      <svg
        viewBox={`-0.5 -0.25 ${iBaseSize} ${iBaseSize}`}
        style={{
          stroke: pallete.grid[1],
        }}
      >
        {SetupBaseDiagram()}
      </svg>
      <svg style={{ stroke: pallete.grid[0] }}>{baseDiagramMesh}</svg>
      <circle
        cx={iCenter}
        cy={iCenter}
        r={101}
        style={{
          fill: 'transparent',
          stroke: '#111111',
          strokeWidth: iLineWidth,
        }}
      />
      {SetupTextAndTicks(Angles, props.data)}
    </svg>
  );
}

export default Diagram;
