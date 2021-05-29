import { evaluate, isNaN } from 'mathjs';
import { Cell } from '../Components/Forms/ProfileData.js';
import { Calc } from '../Components/KoyMath.js';

class StatData {
  // handles value range and returns event state
  static HandleStatMinMax(stats, stat, value) {
    let result = value;
    let event; // undefined will be treated as an error state

    switch (stat) {
      case 'Num':
        if (Number.isNaN(result)) {
          result = stats['Min'].result;
        } else {
          result = Calc.fMinMax(
            result,
            stats['Min'].result,
            stats['Max'].result,
          );
          event = result - value;
        }
        break;
      case 'Min':
        if (Number.isNaN(result)) {
          result = stats['Num'].result;
        } else {
          result = Calc.fMinMax(result, undefined, stats['Num'].result);
          event = result - value;
        }
        break;
      case 'Max':
        if (Number.isNaN(result)) {
          result = stats['Num'].result;
        } else {
          result = Calc.fMinMax(result, stats['Num'].result);
          result = Calc.fMinMax(result, stats['Min'].result);
          // result = Calc.fMinMax(result, stats['Num']);
          event = result - value;
        }
        break;
      default:
        break;
    }

    return { result, event };
  }

  static TallyTotals(statBlock) {
    const tallies = { Total: 0, Min: 0, Max: 0 };

    // I shouldn't have to parseInt here, but I am.
    Object.keys(statBlock).forEach((key) => {
      tallies.Total = Number.parseInt(
        tallies.Total + statBlock[key]['Num'].result,
      );
      tallies.Min =
        tallies.Min + Number.parseInt(statBlock[key]['Min'].result, 10);
      tallies.Max =
        tallies.Max + Number.parseInt(statBlock[key]['Max'].result, 10);
    });

    return tallies;
  }

  static GetValue = (keys, data) => {
    if (!keys.length) return;

    let dataBuffer = data;

    // iterate through array
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
    } catch (err) {
      console.error(`ERROR: Invalid Variables('${variables}'):\nError: ${err}`);
      return {};
    }

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

    return scope;
  }

  // Get Calculated Value
  static GetCalculatedValue(expression, scope) {
    // validate
    if (scope.length === 0) return 0;

    let result;

    try {
      result = evaluate(expression, scope);
      console.warn(
        `Warn: Valid Expression('${expression}', scope: '`,
        scope,
        `'):`,
        { result, rnd: this.Round(result), isNaN: isNaN(result) },
      );
    } catch (err) {
      console.error(
        `ERROR: Invalid Expression('${expression}', scope: '`,
        scope,
        `')\nError: ${err}`,
      );
      return undefined;
    }

    // Note: Why am I rounding this in the first place???
    // return result !== undefined ? this.Round(result) : 0;
    return result !== undefined && isNaN(result) ? result : 0;
  }

  // Get Calculated Value
  // Note: When it says 'scope', I mean 'vars'.
  static GetCellValue(expression, scope, data, noParse = false, raw = false) {
    const variables = this.parseVariables(scope, data, noParse, raw);

    return this.GetCalculatedValue(expression, variables);
  }

  replaceVar = (newKey, oldKey, varObj) => {
    if (varObj.vars) {
      const obj = JSON.parse(varObj.vars);
      Object.keys(obj).forEach((key2) => {
        // Cross compare against oldKey
        // Size check
        const pos = oldKey.length - 1;
        let bUpdate = false;
        if (oldKey.length > obj[key2].length) {
        } else {
          let i = 0;
          let bMatch = true;

          obj[key2].forEach((k) => {
            if (obj[key2][i] !== oldKey[i]) {
              bMatch = false;
            }
            if (bMatch && i === pos) {
              obj[key2][i] = newKey[i];
              bUpdate = true;
            }

            i += 1;
          });
        }
        // update vars
        if (bUpdate) {
          varObj.vars = JSON.stringify(obj);
        }
      });
    }
    // An array of objects or arrays
    else if (Array.isArray(varObj)) {
      // Is Raw Array
      const obj = varObj;
      Object.keys(obj).forEach((key2) => {
        // Cross compare against oldKey
        // Size check
        const pos = oldKey.length - 1;
        if (oldKey.length > obj[key2].length) {
        } else {
          let i = 0;
          let bMatch = true;

          obj[key2].forEach((k) => {
            if (obj[key2][i] !== oldKey[i]) {
              bMatch = false;
            }
            if (bMatch && i === pos) {
              obj[key2][i] = newKey[i];
            }

            i += 1;
          });
        }
      });
    }
  };

  static bVarInUse = (newKey, oldKey, varObj) => {
    // const vars = [];
    let bFound = false;

    if (varObj.vars) {
      const obj = JSON.parse(varObj.vars);
      Object.keys(obj).forEach((key2) => {
        // Cross compare against oldKey
        // Size check
        const pos = oldKey.length - 1;
        let bUpdate = false;
        if (oldKey.length > obj[key2].length) {
        } else {
          let i = 0;
          let bMatch = true;

          obj[key2].forEach((k) => {
            if (obj[key2][i] !== oldKey[i]) {
              bMatch = false;
            }
            if (bMatch && i === pos) {
              bFound = true;
            }

            i += 1;
          });
        }
        // update vars
        if (bUpdate) {
          varObj.vars = JSON.stringify(obj);
        }
      });
    }
    // An array of objects or arrays
    else if (Array.isArray(varObj)) {
      // Is Raw Array
      const obj = varObj;
      Object.keys(obj).forEach((key2) => {
        // Cross compare against oldKey
        // Size check
        const pos = oldKey.length - 1;
        if (oldKey.length > obj[key2].length) {
        } else {
          let i = 0;
          let bMatch = true;

          obj[key2].forEach((k) => {
            if (obj[key2][i] !== oldKey[i]) {
              bMatch = false;
            }
            if (bMatch && i === pos) {
              // vars.push(obj);
              bFound = true;
            }

            i += 1;
          });
        }
      });
    }

    return bFound;
  };

  static UpdateAllKeys = (newKey, oldKey, data) => {
    // newKey should be the same length as the old Key
    if (newKey.length !== oldKey.length) return;

    // Iterate through entire dataobject
    data.Values.forEach((Value) => {
      // Card
      if (Value.Type === 'Card') {
        if (Value.Values)
          Object.keys(Value.Values).forEach((key) => {
            // ITERATE through Num/Min/Max vars
            Value.Values[key].Values.forEach((val) => {
              if (val.Num.vars) {
                this.replaceVar(newKey, oldKey, val.Num);
              }
              if (val.Min.vars) {
                this.replaceVar(newKey, oldKey, val.Min);
              }
              if (val.Max.vars) {
                this.replaceVar(newKey, oldKey, val.Max);
              }
            });
          });
      } else if (Value.Type === 'Graph') {
        // ITERATE through Values
        if (Value.Keys) {
          this.replaceVar(newKey, oldKey, Value.Keys);
        }
      }
    });

    return data;
  };

  static updateVal = (key, varObj, data) => {
    if (varObj.vars) {
      const obj = JSON.parse(varObj.vars);
      Object.keys(obj).forEach((key2) => {
        // Cross compare against key
        // Size check
        const pos = key.length - 1;
        let bUpdate = false;
        if (key.length > obj[key2].length) {
        } else {
          let i = 0;
          let bMatch = true;

          obj[key2].forEach((k) => {
            if (obj[key2][i] !== key[i]) {
              bMatch = false;
            }
            if (bMatch && i === pos) {
              obj[key2][i] = key[i];
              bUpdate = true;
            }

            i += 1;
          });
        }
        // update val
        if (bUpdate) {
          // varObj.vars = JSON.stringify(obj);

          const buffer = StatData.GetCellValue(
            varObj.expression,
            obj,
            data,
            true,
          );

          varObj.result = buffer;

          // This is where recursion happens
          // TODO: Big dangerous
          StatData.UpdateAllVals(varObj.getPath(), data);
        }
      });
    }
  };

  static UpdateAllVals = (varKey, data) => {
    // Iterate through entire dataobject
    data.Values.forEach((Value) => {
      // Card
      if (Value.Type === 'Card') {
        if (Value.Values)
          Object.keys(Value.Values).forEach((key) => {
            // ITERATE through Num/Min/Max vars
            Value.Values[key].Values.forEach((val) => {
              if (val.Num.vars) {
                this.updateVal(varKey, val.Num, data);
              }
              if (val.Min.vars) {
                this.updateVal(varKey, val.Min, data);
              }
              if (val.Max.vars) {
                this.updateVal(varKey, val.Max, data);
              }
            });
          });
      }
    });

    return data;
  };

  static ValidateAllKeys = (newKey, oldKey, data) => {
    // newKey should be the same length as the old Key
    if (newKey.length !== oldKey.length) return false;

    let vars = [];

    // Iterate through entire dataobject
    data.Values.forEach((Value) => {
      // Card
      if (Value.Type === 'Card') {
        if (Value.Values)
          Object.keys(Value.Values).forEach((key) => {
            // ITERATE through Num/Min/Max vars
            Value.Values[key].Values.forEach((val) => {
              if (val.Num.vars) {
                if (this.bVarInUse(newKey, oldKey, val.Num))
                  vars.push(`${Value.Value}/${val.Value}/Num`);
              }
              if (val.Min.vars) {
                if (this.bVarInUse(newKey, oldKey, val.Min))
                  vars.push(`${Value.Value}/${val.Value}/Min`);
              }
              if (val.Max.vars) {
                if (this.bVarInUse(newKey, oldKey, val.Max))
                  vars.push(`${Value.Value}/${val.Value}/Max`);
              }
            });
          });
      } else if (Value.Type === 'Graph') {
        // ITERATE through Values
        if (Value.Keys) {
          if (this.bVarInUse(newKey, oldKey, Value.Keys))
            vars.push(Value.Value);
        }
      }
    });

    return vars;
  };
}

export default StatData;
