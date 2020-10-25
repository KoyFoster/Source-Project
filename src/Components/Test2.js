import React from 'react';
// import Drag from './Forms/Drag';
import { defaultTemplates as Templates } from './Templates';

const Test2 = () => {
  const replaceVar = (newKey, oldKey, varObj) => {
    // console.warn(`replaceVar:`, { oldKey, newKey, varObj });
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
              // console.warn(`${obj[key2][i]} =/= ${newKey[i]}`);
              obj[key2][i] = newKey[i];
              bUpdate = true;
            }

            i += 1;
          });
        }
        // update vars
        if (bUpdate) {
          varObj.vars = JSON.stringify(obj);
          // console.warn(`Match Found:`, varObj);
        }
      });
    }
  };

  const UpdateAllKeys = (newKey, oldKey, data) => {
    console.warn(`UpdateAllKeys:`, data);
    // newKey should be the same length as the old Key
    if (newKey.length !== oldKey.length) return;

    // Iterate through entire dataobject
    data.Values.forEach((Value) => {
      if (Value.Values)
        Object.keys(Value.Values).forEach((key) => {
          // 'Points' is the only variable carrying field at this depth
          if (Value.Values[key].Points) {
            console.warn('Points:', Value.Values[key].Points);
            replaceVar(newKey, oldKey, Value.Values[key].Points);
          }

          // ITERATE through Num/Min/Max vars
          Value.Values[key].Values.forEach((val) => {
            if (val.Num.vars) {
              replaceVar(newKey, oldKey, val.Num);
            }
            if (val.Min.vars) {
              replaceVar(newKey, oldKey, val.Min);
            }
            if (val.Max.vars) {
              replaceVar(newKey, oldKey, val.Max);
            }
          });
        });
    });

    return data;
  };

  const data = { ...Templates["Jojo's Bizarre Adventure"] };

  return (
    <div>
      {JSON.stringify(
        UpdateAllKeys(
          [
            'Values',
            'Page One',
            'Values',
            'Primary Stats',
            'Values',
            'Big Butts',
          ],
          ['Values', 'Page One', 'Values', 'Primary Stats', 'Values', 'Spirit'],
          data,
        ),
      )}
    </div>
  );
};

export default Test2;
