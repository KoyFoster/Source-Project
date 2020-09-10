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
    this.Value = '[New Stat]';
    this.Num = {};
    this.Min = {};
    this.Max = {};
    this.Unit = '';

    // defined
    if (obj) {
      this.Value = obj.Value ? obj.Value : '';
      this.Num = new Cell(obj.Num, 'Num', this);
      this.Min = new Cell(obj.Min, 'Min', this);
      this.Max = new Cell(obj.Max, 'Max', this);
      this.Unit = obj.Unit ? obj.Unit : '';
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
    // link
    this.P = parent;

    // defaults
    this.Value = '[New Stats]';

    this.Type = 'Static';
    this.Level = '';
    this.Total = '';
    this.Min = '';
    this.Max = '';
    this.Points = { result: 0, expression: '0', vars: '{}' };

    this.Values = [];

    // defined
    if (obj) {
      this.bEdit = obj.bEdit;
      this.Value = obj.Value;

      this.Type = obj.Type ? obj.Type : '';
      this.Total = obj.Total ? obj.Total : '';
      this.Level = obj.Level ? obj.Level : '';
      this.Min = obj.Min ? obj.Min : '';
      this.Max = obj.Max ? obj.Max : '';
      this.Points = new Cell(obj.Points, this);

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
    // link
    this.P = parent;

    // defaults
    this.Value = '[New Card]';
    this.Values = [];

    // defined
    if (obj) {
      this.bEdit = obj.bEdit;
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

  getPath = () => {
    const buffer = [];
    buffer.push('Values');
    buffer.push(this.Value);
    return buffer;
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
      return obj.Values[key].constructor !== Card
        ? new Card(obj.Values[key], this)
        : obj.Values[key];
    });
  }

  // Add New Card
  // Teturn New Focused Card
  addCard = (selection, add = 1) => {
    return Funcs.add(selection, add, this, Card);
  };

  getPath = () => {
    return [this.Game];
  };
}

export { Profile, Card, Block, Stat, Cell };
