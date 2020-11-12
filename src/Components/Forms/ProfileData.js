import StatData from '../StatData';

class Funcs {
  static add = (selection, add = 1, src, ELEMENT) => {
    let newSel = selection;

    // add
    if (add > 0) {
      const buffer = new ELEMENT(undefined, src);
      src.Values.push(buffer);
      newSel = buffer.Value;
    }
    // remove
    else if (add < 0) {
      if (selection) {
        // Iterate
        let i = 0;
        let prevName = '';
        const iSize = src.Values.length;
        for (i; i < iSize; i) {
          if (src.Values[i].Value === selection) {
            // need to be deleted and poped
            delete src.Values[i];
            src.Values.splice(i, 1);
            i = iSize;
          } else {
            prevName = src.Values[i].Value;
          }
          i += 1;
        }
        // if removed Value is the frist entry, prevName will not get defined prior
        if (!prevName) {
          if (src.Values.length > 0) {
            prevName = src.Values[0].Value;
          }
        }
        newSel = prevName;
      }
    }

    return newSel;
  };
  static move = (selection, pos = 1, src, ELEMENT) => {
    if (pos === 0) return selection;

    // get selection index
    let index = 0;
    if (selection) {
      // Iterate
      let i = 0;
      let prevName = '';
      const iSize = src.Values.length;
      for (i; i < iSize; i) {
        if (src.Values[i].Value === selection) {
          index = i;
          i = iSize;
        } else {
          prevName = src.Values[i].Value;
        }
        i += 1;
      }
      // if removed Value is the frist entry, prevName will not get defined prior
      if (!prevName) {
        if (src.Values.length > 0) {
          prevName = src.Values[0].Value;
        }
      }
    }

    const buffer = src.Values.splice(index, 1);

    // check new postion
    let newPos = index + pos;
    if (newPos > src.Values.length) {
      newPos = 0;
    } else if (newPos < 0) {
      newPos = src.Values.length;
    }

    src.Values.splice(newPos, 0, buffer[0]);

    // add
    // if (pos > 0) {
    //   src.Values.push(buffer);
    //   newSel = buffer.Value;
    // }
    // // remove
    // else if (pos < 0) {
    // }

    return selection;
  };
}

// Cell
class Cell {
  constructor(obj, value, parent) {
    // link
    this.P = parent;

    // defaults
    this.Value = value;
    this.result = 0;
    this.expression = '0';
    this.vars = '{}';

    // defined
    if (obj) {
      this.result = obj.result;
      this.expression = obj.expression;
      this.vars = obj.vars;
    }
  }

  getPath = () => {
    const buffer = this.P.getPath();
    buffer.push(this.Value);
    return buffer;
  };
}

// Stat
class Stat {
  constructor(obj, parent) {
    // link
    this.P = parent;

    // defaults
    this.Type = 'Static';
    this.Value = '[New Stat]';
    this.Flavor = '[New Flavor]';
    this.Num = {};
    this.Min = {};
    this.Max = {};
    this.Unit = '';

    // defined
    if (obj) {
      this.Value = obj.Value ? obj.Value : '';
      this.Flavor = obj.Flavor ? obj.Flavor : '[New Flavor]';
      this.Type = obj.Type ? obj.Type : '';
      this.Num = new Cell(obj.Num, 'Num', this);
      this.Min = new Cell(obj.Min, 'Min', this);
      this.Max = new Cell(obj.Max, 'Max', this);
      this.Unit = obj.Unit ? obj.Unit : '';
    } else {
      this.Num = new Cell(0, 'Num', this);
      this.Min = new Cell(0, 'Min', this);
      this.Max = new Cell(0, 'Max', this);
    }
  }

  getPath = () => {
    const buffer = this.P.getPath();
    buffer.push('Values');
    buffer.push(this.Value);
    return buffer;
  };
}

// Block
class Block {
  constructor(obj, parent) {
    this.bEdit = false;
    this.bShow = true;
    // link
    this.P = parent;

    // defaults
    this.Value = '[New Stats]';

    this.Values = [];

    // defined
    if (obj) {
      this.bEdit = obj.bEdit;
      this.bShow = obj.bShow;
      this.Value = obj.Value;

      const keys = Object.keys(obj.Values);
      this.Values = keys.map((key) => {
        return new Stat(obj.Values[key], this);
      });
    } else {
      this.Values.push(new Stat(undefined, this));
    }
  }

  // Add New Stat
  // Teturn New Focused Stat
  addStat = (selection, add = 1) => {
    return Funcs.add(selection, add, this, Stat);
  };
  moveStat = (selection, add = 1) => {
    return Funcs.move(selection, add, this, Stat);
  };

  getPath = () => {
    const buffer = this.P.getPath();
    buffer.push('Values');
    buffer.push(this.Value);
    return buffer;
  };
}

// Card
class Card {
  constructor(obj, parent) {
    this.bEdit = false;
    this.bShow = true;
    // link
    this.P = parent;

    // defaults
    this.Value = '[New Card]';
    this.Values = [];
    this.Type = 'Card';

    // defined
    if (obj) {
      this.bEdit = obj.bEdit;
      this.bShow = obj.bShow;
      this.Value = obj.Value ? obj.Value : '';

      const keys = Object.keys(obj.Values);
      this.Values = keys.map((key) => {
        return new Block(obj.Values[key], this);
      });
    } else {
      this.Values.push(new Block(undefined, this));
    }
  }

  // Add New Block
  // Teturn New Focused Block
  addBlock = (selection, add = 1) => {
    return Funcs.add(selection, add, this, Block);
  };
  moveBlock = (selection, add = 1) => {
    return Funcs.move(selection, add, this, Block);
  };

  getPath = () => {
    const buffer = [];
    buffer.push('Values');
    buffer.push(this.Value);
    return buffer;
  };
}

// Graph
class Graph {
  constructor(obj, parent) {
    this.bShow = true;

    // defaults
    this.Type = 'Graph';
    this.Value = '[New Graph]';
    // link
    this.P = parent;

    // defined
    if (obj) {
      this.bShow = obj.bShow;
      this.Value = obj.Value ? obj.Value : '';

      // An array of arrays needs to be double cloned
      this.Keys = [
        ...obj.Keys.map((Key) => {
          return [...Key];
        }),
      ];
    } else {
      this.Values.push(new Block(undefined, this));
    }
  }

  getValues = () => {
    const Values = [];

    this.Keys.forEach((key) => {
      let buffer = StatData.GetValue(key, this.P);
      buffer = {
        key: buffer.Value,
        label: buffer.Value,
        value: buffer.Num.result,
        min: buffer.Min.result,
        max: buffer.Max.result,
        unit: buffer.Unit,
      };
      Values.push(buffer);
    });

    return Values;
  };
}

// Profile
class Profile {
  constructor(obj) {
    this.Game = obj.Game;
    this.Title = obj.Title;
    this.Style = obj.Style;

    const keys = Object.keys(obj.Values);
    this.Values = keys.map((key) => {
      if (obj.Values[key].Type === 'Card' || !obj.Values[key].Type) {
        return obj.Values[key].constructor !== Card
          ? new Card(obj.Values[key], this)
          : obj.Values[key];
      } else if (obj.Values[key].Type === 'Graph') {
        return obj.Values[key].constructor !== Graph
          ? new Graph(obj.Values[key], this)
          : obj.Values[key];
      }
      return null;
    });
  }

  // Add New Card
  // Teturn New Focused Card
  addCard = (selection, add = 1) => {
    return Funcs.add(selection, add, this, Card);
  };
  moveCard = (selection, add = 1) => {
    return Funcs.move(selection, add, this, Card);
  };

  getPath = () => {
    return [this.Game];
  };
}

export { Profile, Card, Block, Stat, Cell };
