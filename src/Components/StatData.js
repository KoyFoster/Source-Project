import { /*Coll, */ Calc } from './KoyMath.js';
import { evaluate } from 'mathjs';
import { Cell } from './Forms/ProfileData';

class StatData {
  // handles value range and returns event state
  static HandleStatMinMax(stats, stat, value) {
    let result = value;
    let event; // undefined will be treated as an error state

    switch (stat) {
      case 'Num':
        result = Calc.fMinMax(result, stats['Min'][0], stats['Max'][0]);
        event = result - value;
        break;
      case 'Min':
        result = Calc.fMinMax(result, undefined, stats['Num'][0]);
        event = result - value;
        break;
      case 'Max':
        result = Calc.fMinMax(result, stats['Num'][0]);
        result = Calc.fMinMax(result, stats['Min'][0]);
        // result = Calc.fMinMax(result, stats['Num']);
        event = result - value;
        break;
      default:
        break;
    }

    return { result, event };
  }

  static TallyTotals(statBlock) {
    const tallies = { Total: 0, Min: 0, Max: 0 };

    Object.keys(statBlock).forEach((key) => {
      tallies.Total = tallies.Total + statBlock[key]['Num'].result;
      tallies.Min = tallies.Min + statBlock[key]['Min'].result;
      tallies.Max = tallies.Max + statBlock[key]['Max'].result;
    });

    // console.log(tallies);
    return tallies;
  }

  static GetValue = (keys, data) => {
    if (!keys.length) return;

    let dataBuffer = data;

    // iterate through array
    // console.log('keys:', keys);
    keys.forEach((key) => {
      // step through data
      // handle differently if Array or object
      if (dataBuffer.constructor === Array) {
        // iterate through if is an array
        const L = dataBuffer.length;

        for (let i = 0; i < dataBuffer.length; i) {
          if (dataBuffer[i].Value === key) {
            dataBuffer = dataBuffer[i];

            // end
            i = L;
          }

          i += 1;
        }
      } else {
        // buffer current value
        dataBuffer = dataBuffer[key];
      }
    });

    // console.log('key:', { dataBuffer });
    return dataBuffer;
  };

  static RD = 2; // Round Decimal
  static Round(val) {
    const power = Math.pow(10, this.RD);
    return Math.round(val * power) / power;
  }

  // parse scope
  static parseVariables(variables, data, noParse, raw = false) {
    let scope;

    try {
      if (noParse) scope = { ...variables };
      else scope = JSON.parse(variables);
    } catch {
      console.error('ERROR: Invalid Variables(', variables, ')');
      return {};
    }

    // console.log('scope:', scope);
    for (let [key, value] of Object.entries(scope)) {
      const buffer = this.GetValue(value, data); // table, row, column="always 'Value'""
      if (!raw) {
        switch (buffer.constructor) {
          case Cell:
          case Object:
            scope[key] = buffer.result;
            break;
          case Array:
            scope[key] = buffer[0];
            break;
          default:
            scope[key] = buffer;
            break;
        }
      } else {
        scope[key] = buffer;
      }
    }

    // console.log('scope:', scope);
    return scope;
  }

  // Get Calculated Value
  static GetCalculatedValue(expression, scope) {
    // validate
    if (scope.length === 0) return 0;

    let result;

    try {
      result = evaluate(expression, scope);
    } catch {
      console.error('ERROR: Invalid Expression(', expression, ',', scope, ')');
      return undefined;
    }

    return result !== undefined ? this.Round(result) : 0;
  }

  // Get Calculated Value
  static GetCellValue(expression, scope, data, noParse = false, raw = false) {
    const variables = this.parseVariables(scope, data, noParse, raw);

    return this.GetCalculatedValue(expression, variables);
  }
}

export default StatData;
