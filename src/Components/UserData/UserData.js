import React, { useState } from 'react';
import DateTime from '../Forms/DateTime';
import './UserData.css';

const formatSaveData = (value) => {
  const regex1 = /}}},/gi;
  const regex2 = /:{/gi;

  // Pull data object without circular keys
  var cache = [];
  value = JSON.stringify(value, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1 || key === 'P') {
        // Circular reference found, discard key
        return;
      }
      cache.push(value);
    }
    return value;
  })
    .replace(regex1, '}}},\n\n')
    .replace(regex2, '\n:{');

  return value;
};

const deformatSaveData = (value) => {
  return JSON.parse(value);
};

class UserData {
  constructor(name) {
    // varsev
    this.var = name;
  }
  getName() {
    return this.var;
  }
  Get() {
    if (!this.var)
      console.error(`Error in UserData.Get: [Not a valid name: ${this.var}]`);
    return localStorage.getItem(this.var);
  }
  Set(data) {
    if (!this.var)
      console.error(`Error in UserData.Set: [Not a valid name: ${this.var}]`);
    localStorage.setItem(this.var, data);
    return '';
  }
  setName(name) {
    this.var = name;
  }
}

class SaveManager {
  constructor(indexName, saveName, setData) {
    // Load index file
    this.INDEX = new UserData(indexName);
    this.data = this.INDEX.Get();

    // save info
    this.iSelection = 0;
    this.saveName = saveName;
    this.SAVE = new UserData(`${this.saveName}_${this.iSelection}`);

    // save data list
    this.defaultSave = {
      Title: 'No Data',
      DateCreated: 'Date Created',
      DateSaved: 'Last Saved',
      hasData: false,
    };
    this.saveEntries = [{ ...this.defaultSave }];

    // Parse index file
    // pull and parse index
    // Parse out number of saves
    // Then parse out the meta data, such as Name, DateCreated and DateLastSaved
    // console.warn('Parse Index Data 0:', this.data, null, this.data !== null);
    if (this.data !== 'null') {
      // parse
      // console.warn('Parse Index Data 1:', this.data);
      try {
        this.data = deformatSaveData(this.data);
        // console.warn('Parse Index Data 2:', this.data);
        // pull
        this.header = this.data.header;
        this.saveEntries = this.data.saves;
      } catch (err) {
        console.warn(`Error (${err}: failed to load index`);
        this.data = { header: {}, saves: [] };
        this.saveEntries = this.data.saves;
      }
    } else {
      this.data = { header: {}, saves: [] };
      this.saveEntries = this.data.saves;
    }
  } // End of constructor

  getName() {
    return this.INDEX;
  }

  setSel(sel) {
    // console.log('setSel:', sel);
    this.iSelection = sel;
    // update UserData name
    this.SAVE.setName(`${this.saveName}_${this.iSelection}`);
  }

  removeSelEntry() {
    // remove from index
    // console.warn(`saveData: `, this.saveEntries);
    if (this.iSelection > -1) this.saveEntries.splice(this.iSelection, 1);
    this.INDEX.Set(formatSaveData(this.data));
  }

  clearSelEntry() {
    // remove from index
    if (this.iSelection > -1)
      this.saveEntries[this.iSelection] = { ...this.defaultSave };
    this.INDEX.Set(formatSaveData(this.data));
  }

  GetCurrent() {
    return this.saveEntries[this.iSelection];
  }

  AddEntry() {
    this.saveEntries.push({ ...this.defaultSave });
    this.INDEX.Set(formatSaveData(this.data));
  }

  SaveToEntry(data) {
    // update index file and timestamps in data
    this.handleTimeStamp(data);

    const saveEntry = this.saveEntries[this.iSelection];
    saveEntry.DateCreated = data.DateCreated;
    saveEntry.DateSaved = data.DateSaved;
    saveEntry.hasData = true;

    // update current file
    this.SAVE.Set(formatSaveData(data));

    saveEntry.Title = data.Title;
    saveEntry.DateCreated = data.DateCreated;
    saveEntry.DateSaved = data.DateSaved;

    // this.data should comprise of header data and save entry data
    // console.log('SaveToEntry:', this.data);
    this.INDEX.Set(formatSaveData(this.data));
  }

  LoadFromEntry(setData) {
    if (setData)
      if (this.GetCurrent().hasData) setData(deformatSaveData(this.SAVE.Get()));
  }

  // Timestamp handling
  handleTimeStamp(value) {
    // set save time state
    // set creation date if never set before
    const now = new Date();
    if (!value.DateCreated || value.DateCreated === 'Date Created') {
      value.DateCreated = DateTime.FormatDate(now);
    }
    value.DateSaved = DateTime.FormatDate(now);
    // setInfo(`[Last Saved:${JSON.stringify(value.DateEdited)}]`);
    // UD.Set(formatSaveData(value));
  }
}

// simple ui for using rendering
const Saves = ({ indexName, SM, Update, currentData, setData }) => {
  const [states] = useState(['Base', 'Save', 'Clear', 'Load', 'Delete']);
  const [currentState, setState] = useState(states[0]);

  const Entry = ({ save, index }) => {
    // console.warn('Render Entry Save:', save);

    // index
    return (
      <div className="SaveEntry">
        <label className="saveContainer">
          <input
            type="radio"
            name={indexName}
            checked={index === SM.iSelection + 1}
            value={save.Title}
            style={{ display: 'none' }}
            onChange={(e) => {
              SM.setSel(index - 1);
              Update();
            }}
          />
          <span className="saveBody">
            <div>[{save.Title}]</div>
            <div className="EntryDates">
              <div>[{save.DateCreated}</div>]-[<div>{save.DateSaved}]</div>
            </div>
          </span>
        </label>
      </div>
    );
  };

  const Header = (props) => {
    switch (currentState) {
      // Base
      case states[0]:
        return (
          <div className="Header">
            Save {SM.iSelection + 1} selected
            <div style={{ display: 'flex' }}></div>
            <button
              onClick={() => {
                SM.AddEntry();
                Update();
              }}
            >
              Add
            </button>
            <button
              onClick={() => {
                setState(states[1]);
              }}
            >
              Save
            </button>
            <button
              disabled={SM.GetCurrent().hasData === false}
              onClick={() => {
                setState(states[3]);
              }}
            >
              Load
            </button>
            {/* <button
            disabled={SM.saveEntries.length < 2}
            onClick={() => {
              SM.removeSelEntry();
              Update();
            }}
            >
              Delete
            </button> */}
            <button
              disabled={SM.saveEntries.length < 2}
              onClick={() => {
                setState(states[2]);
              }}
            >
              Clear
            </button>
          </div>
        );
      // Save
      case states[1]:
        return (
          <div className="Header">
            Save {SM.iSelection + 1} selected
            <div style={{ display: 'flex' }}></div>
            <button
              onClick={() => {
                SM.SaveToEntry(currentData);
                Update();
                setState(states[0]);
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setState(states[0]);
              }}
            >
              Cancel
            </button>
          </div>
        );
      // Clear
      case states[2]:
        return (
          <div className="Header">
            Save {SM.iSelection + 1} selected
            <div style={{ display: 'flex' }}></div>
            <button
              disabled={SM.saveEntries.length < 2}
              onClick={() => {
                SM.clearSelEntry();
                Update();
                setState(states[0]);
              }}
            >
              Clear
            </button>
            <button
              onClick={() => {
                setState(states[0]);
              }}
            >
              Cancel
            </button>
          </div>
        );

      // Load
      case states[3]:
        return (
          <div className="Header">
            Save {SM.iSelection + 1} selected
            <div style={{ display: 'flex' }}></div>
            <button
              disabled={SM.GetCurrent().hasData === false}
              onClick={() => {
                SM.LoadFromEntry(setData);
                Update();
                setState(states[0]);
              }}
            >
              Load
            </button>
            <button
              onClick={() => {
                setState(states[0]);
              }}
            >
              Cancel
            </button>
          </div>
        );

      default:
        return (
          <div className="Header">
            Save {SM.iSelection + 1} selected
            <div style={{ display: 'flex' }}></div>
            <button
              onClick={() => {
                SM.AddEntry();
                Update();
              }}
            >
              Add
            </button>
            <button
              onClick={() => {
                SM.SaveToEntry(currentData);
                Update();
              }}
            >
              Save
            </button>
            <button
              disabled={SM.GetCurrent().hasData === false}
              onClick={() => {
                SM.LoadFromEntry(setData);
                Update();
              }}
            >
              Load
            </button>
            {/* <button
              disabled={SM.saveEntries.length < 2}
              onClick={() => {
                SM.removeSelEntry();
                Update();
              }}
            >
              Delete
            </button> */}
            <button
              disabled={SM.saveEntries.length < 2}
              onClick={() => {
                SM.clearSelEntry();
                Update();
              }}
            >
              Clear
            </button>
          </div>
        );
    }
  };

  const Entries = (props) => {
    // keys
    let key = 0;
    return (
      <div className="Saves">
        <Header />
        {SM.saveEntries.map((save) => {
          return <Entry key={key++} index={key} save={save} />;
        })}
      </div>
    );
  };

  return <Entries />;
};

export { UserData, SaveManager, Saves };
