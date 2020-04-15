import React, { useState, useEffect } from 'react';
import { Vector2, Coll } from './KoyMath.js';

const iLineWidth = 1;
const iStrokeWidth = 0.5;
const cLetterGrades = ['F', 'E', 'D', 'C', 'B', 'A', 'S', 'SS', 'SSS', '?'];
const iBaseSize = 285;
const iCenter = iBaseSize / 2;
const tickrate = 33; //33
const speed = 0.1;

const pallete = {
  inner: ['#EEEEEE', 'gold'],
  outer: ['#EEEEEE', '#222222'],
  gradeText: ['white', '#111111'],
  typeText: ['white', '#111111'],
  graph: ['purple', 'white', 'purple'],
  grid: ['gold', '#111111'],
};

//Grade Function
let gradeCalc = function (index, values) {
  let result = cLetterGrades[9]; //? grade
  //Take Values and divide it against it's max range
  let percentage = (values[index][1] / values[index][3]) * 100;

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

// -------------------------------------------------------------------
function Diagram(props) {
  // init functions
  const getStart = () => {
    return props.iStrt ? props.iStrt : 0;
  };
  let vector = [];
  const { Values } = props.data;
  const iLen = Values.length - getStart();
  const angle = (1 / iLen) * 360;

  // Animation States
  const [phase, setPhase] = useState(0);
  const [animTL, setAnimTL] = useState(0);
  const [animBR, setAnimBR] = useState(0);
  const [intervalID, setIntervalID] = useState(0);

  function startAnimation() {
    // Clear
    setPhase(0);
    setAnimTL(0);
    setAnimBR(0);

    const interval = setInterval(() => {
      setPhase((phase) => {
        if (phase + speed >= 1) {
          setIntervalID(interval);
          clearInterval(interval);
          return phase;
        }
        setAnimTL(() => {
          return iCenter - iCenter / (Number(phase) + speed);
        });
        setAnimBR(() => {
          return iBaseSize / (Number(phase) + speed);
        });

        return Number(phase) + speed;
      });
    }, tickrate);

    return () => clearInterval(interval);
  }

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
    return vector;
  }; // end of CreateVector

  function GetStats() {
    if (iLen <= 1) return;
    const html = [];

    let iFlip = Values[getStart()][4] === '%' ? 1 : 0;
    let vecScale = Values[getStart()][1] * (1 / Values[getStart()][3]);
    if (iFlip) {
      vecScale -= iFlip;
      vecScale *= -1;
    }

    let lastPoint = new Vector2(vector[1][0], vector[1][1] * vecScale);

    iFlip = Values[1 + getStart()][4] === '%' ? 1 : 0;
    vecScale = Values[1 + getStart()][1] * (1 / Values[1 + getStart()][3]);
    if (iFlip) {
      vecScale -= iFlip;
      vecScale *= -1;
    }

    let nextPoint = new Vector2(vector[1][0], vector[1][1] * vecScale);

    // Create Stats
    for (let i = 0; i < iLen; i) {
      const iV = i + getStart();

      const transform = `rotate(${angle * i},${vector[0][0]},${vector[0][1]})`;
      // Rotate Neighboring Stat Point
      Coll.v2Rotate2D(nextPoint, new Vector2(0, 0), angle); //Rotate Second Point Over

      html.push(
        <polygon
          key={`${props.name}_v_${i}`}
          points={`${vector[0][0]},${vector[0][1]} ${lastPoint.x},${lastPoint.y} ${nextPoint.x},${nextPoint.y}`}
          transform={transform}
          style={{
            strokeWidth: iLineWidth,
            stroke: pallete.graph[2],
            fillRule: 'evenodd',
          }}
        />,
      );
      i += 1;
      if (i !== iLen) {
        let iFlip = Values[i + getStart()][4] === '%' ? 1 : 0;
        let vecScale =
          Values[i + getStart()][1] * (1 / Values[i + getStart()][3]);
        if (iFlip) {
          vecScale -= iFlip;
          vecScale *= -1;
        }

        // Get Previous Point
        lastPoint = new Vector2(vector[1][0], vector[1][1] * vecScale);

        // Get NExt Point
        const iNext = i + 1 < iLen ? i + 1 : 0;
        iFlip = Values[iNext + getStart()][4] === '%' ? 1 : 0;
        vecScale =
          Values[iNext + getStart()][1] * (1 / Values[iNext + getStart()][3]);
        if (iFlip) {
          vecScale -= iFlip;
          vecScale *= -1;
        }
        nextPoint = new Vector2(vector[1][0], vector[1][1] * vecScale);
      }
    }
    return html;
  }

  /*Update Diagram*/
  let baseDiagramMesh = undefined;
  let SetupBaseDiagram = function () {
    const html = [];

    //Calculate All Point
    for (let i = 0; i < iLen; i++) {
      const transform = `rotate(${angle * i},${vector[0][0]},${vector[0][1]})`;

      html.push(
        <polygon
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

  const SetupTextAndTicks = function (data) {
    let ticks = 10;
    let tickWidth = 2;

    let typeCenter = [iCenter, iCenter - 108];
    let gradeCenter = [iCenter, iCenter - 124];
    let strCenter = +iCenter + ',' + iCenter;

    let strTypeRotateSelf =
      ', rotate(180,' + typeCenter[0] + ',' + typeCenter[1] + ')';

    let htmlResult = [];
    for (let i = 0; i < iLen; i++) {
      const curAngle = angle * i;

      const bFlip = curAngle > 90 && curAngle < 270;
      let sTypeFlip = '';
      let sTickFlip = '';
      let iFontSize = 100;
      //Rotate text around it's center if upsidedown
      if (bFlip) sTypeFlip = strTypeRotateSelf;

      //Letter Grades
      let transform =
        'rotate(' +
        curAngle +
        ', ' +
        iCenter +
        ',' +
        iCenter +
        '), rotate(' +
        -curAngle +
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
          {gradeCalc(i + 1, Values)}
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
          {gradeCalc(i + 1, Values)}
        </text>,
      );

      //Types
      transform = 'rotate(' + curAngle + ', ' + strCenter + ')' + sTypeFlip;
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
          {Values[i + getStart()][0]}
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
          {`${Values[i + getStart()][0]}`}
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
            'rotate(' + curAngle + ', ' + iCenter + ',' + iCenter + ')';

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
          let tickValue = Math.ceil(iT * (Values[i + getStart()][3] / ticks));
          let tickCenter = [iCenter, iCenter - ticks * iT];
          let iTick = 3;
          if (curAngle > 90 && curAngle < 270) {
            sTickFlip =
              ', rotate(180,' + tickCenter[0] + ',' + tickCenter[1] + ')';
            iTick *= -1;
          }

          transform =
            'rotate(' +
            curAngle +
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
              : `${Values[i + getStart()][3]}${Values[i + getStart()][4]}` !==
                `${Values[i - 1 + getStart()][3]}${
                  Values[i - 1 + getStart()][4]
                }`;
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
                {`${tickValue}${Values[i + 1][4]}`}
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
                {`${tickValue}${Values[i + 1][4]}`}
              </text>,
            );
          }
        }
      }
    }
    return htmlResult;
  };

  useEffect(() => {
    props.funcs.randAnim = startAnimation;
    startAnimation();
  }, []);

  // Update
  CreateVector();
  return (
    <div>
      {/* <div>
        Info: <div>intervalID: {intervalID}</div>
        <div>phase: {phase}</div>
        <div>animTL: {animTL}</div>
        animBR: {animBR}
      </div> */}
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
        <svg
          viewBox={`${animTL - iCenter} ${
            animTL - iCenter
          } ${animBR} ${animBR}`}
          style={{
            fill: 'url(#grad)',
          }}
        >
          {GetStats()}
        </svg>

        <svg
          viewBox={`${-0.5 - iCenter} ${
            -0.25 - iCenter
          } ${iBaseSize} ${iBaseSize}`}
          style={{
            stroke: pallete.grid[1],
          }}
        >
          {SetupBaseDiagram()}
        </svg>
        <svg
          viewBox={`${-iCenter} ${-iCenter} ${iBaseSize} ${iBaseSize}`}
          style={{ stroke: pallete.grid[0] }}
        >
          {baseDiagramMesh}
        </svg>
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
        {SetupTextAndTicks(props.data)}
      </svg>
    </div>
  );
}

export default Diagram;
