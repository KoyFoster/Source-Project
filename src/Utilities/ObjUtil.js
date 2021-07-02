//
import React from 'react';

export const ObjUtil = {
  // get everything except what is present
  getRemainingObj(obj, present) {
    const keys = Object.keys(present);
    let i = 0;
    let noMatch = true;
    const result = {};

    // filter through
    Object.keys(obj).every((key) => {
      // find lack of matches
      keys.every((pKey) => {
        // Match found
        if (key === pKey) {
          noMatch = false;
          return false;
        }
        i++;
        return true;
      });

      // add
      if (noMatch) {
        // Save result
        result[key] = obj[key];
        // reduce filter
        keys.splice(i, 1);
        i = 0;
      }
      noMatch = true;

      return true;
    });

    return result;
  },
};

export default ObjUtil;
