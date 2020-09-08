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
    // link
    this.P = parent;

    // defaults
    this.Value = '[New Card]';
    this.Values = [];

    // defined
    if (obj) {
      this.Value = obj.Value ? obj.Value : '';

      const keys = Object.keys(obj.Values);
      this.Values = keys.map((key) => {
        return new Block(obj.Values[key], this);
      });
    } else {
      this.Values.push(new Block(undefined, this));
    }
  }

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
  addCard = (selection, add = 1) => {
    console.log('AddCard:', selection, add);
    if (add > 0) {
      const buffer = new Card(undefined, this);
      this.Values.push(buffer);
    } else {
      console.log('Removed', selection);
      if (selection) {
        let i = 0;
        const iSize = this.Values.length;
        // iteraate
        for (i; i < iSize; i) {
          if (this.Values[i].Value === selection) {
            delete this.Values[i];
            i = iSize;
          }
          i += 1;
        }
      }
    }
  };

  getPath = () => {
    return [this.Game];
  };
}

export { Profile, Card, Block, Stat, Cell };
