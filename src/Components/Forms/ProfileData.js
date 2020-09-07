// Cell
class Cell {
  constructor(obj, parent) {
    // link
    this.P = parent;

    // defaults
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
    return `${this.P.getPath()}~${this.Value}`;
  };
}

// Stat
class Stat {
  constructor(obj, parent) {
    // link
    this.P = parent;

    // defaults
    this.Value = '';
    this.Num = {};
    this.Min = {};
    this.Max = {};
    this.Unit = '';

    // defined
    if (obj) {
      this.Value = obj.Value ? obj.Value : '';
      this.Num = new Cell(obj.Num);
      this.Min = new Cell(obj.Min);
      this.Max = new Cell(obj.Max);
      this.Unit = obj.Unit ? obj.Unit : '';
    }
  }

  getPath = () => {
    return `${this.P.getPath()}~${this.Value}`;
  };
}

// Block
class Block {
  constructor(obj, parent) {
    // link
    this.P = parent;

    // defaults
    this.Value = '';

    this.Type = '';
    this.Level = '';
    this.Total = '';
    this.Min = '';
    this.Max = '';
    this.Points = {};

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
    }
  }

  getPath = () => {
    return `${this.P.getPath()}~${this.Value}`;
  };
}

// Card
class Card {
  constructor(obj, parent) {
    // link
    this.P = parent;

    // defaults
    this.Value = '';
    this.Values = [];

    // defined
    if (obj) {
      this.Value = obj.Value ? obj.Value : '';

      const keys = Object.keys(obj.Values);
      this.Values = keys.map((key) => {
        return new Block(obj.Values[key], this);
      });
    }
  }

  getPath = () => {
    return `${this.P.getPath()}~${this.Value}`;
  };
}

// Profile
class Profile {
  constructor(obj) {
    // console.log('Profile:', obj);
    this.Game = obj.Game;
    this.Title = obj.Title;

    const keys = Object.keys(obj.Values);
    this.Values = keys.map((key) => {
      return new Card(obj.Values[key], this);
    });
  }

  getPath = () => {
    return `${this.Game}`;
  };
}

export { Profile, Card, Block, Stat, Cell };
