import { Ticker } from "./Timer";

class RTDGen {
  constructor(
    render,
    dataRange,
    data,
    dataKeys,
    timerRange,
    valueRange,
    dataRef
  ) {
    // members
    // number of types of values
    this.dRefIndex = 0;
    this.dataRef = dataRef;
    this.render = render;
    this.dataKeys = dataKeys ? dataKeys : { A: 0, B: 0, C: 0 };
    // data
    this.dataRange = dataRange ? dataRange : 10;
    this.data = data
      ? data
      : [
          { name: "One", A: 1, B: 2, C: 3 },
          { name: "Two", A: 3, B: 3, C: 3 },
          { name: "Three", A: 1, B: 1, C: 4 },
        ];
    // rng params
    this.valueRange = valueRange ? valueRange : { min: 0, max: 10 };

    // ticker
    this.ticker = new Ticker(this.update, timerRange);
  }

  // Get Rands
  getRandValue = () =>
    Math.random() * (this.valueRange.max - this.valueRange.min) +
    this.valueRange.min;
  getRandData = () => {
    const newData = { ...this.dataKeys };

    //
    Object.keys(newData).forEach((key) => {
      if (key !== "name" || key !== "date") newData[key] = this.getRandValue();
      else {
        const now = new Date();
        newData.date = now.toUTCString();
      }
    });

    return newData;
  };

  getNextDataRef = () => {
    this.dRefIndex++;
    if (this.dRefIndex > this.dataRef.length - 1) this.dRefIndex = 0;

    return this.dataRef[this.dRefIndex];
  };

  // NextRNGValue
  update = () => {
    // New Data
    if (this.dataRef) {
      this.data.push(this.getNextDataRef());
    } else {
      this.data.push(this.getRandData());
    }
    // Sub Earliest Value if higher then range
    // console.log("update:", { data: this.data, dataRange: this.dataRange });
    if (this.dataRange <= this.data.length) this.data.shift();
    if (this.render) this.render(this.data);
  };
}

export { RTDGen };
