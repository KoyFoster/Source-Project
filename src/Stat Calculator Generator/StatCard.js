/*eslint-disable react-hooks/exhaustive-deps */
/*eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
// import Grid from './Forms/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import ProfileCard from '../Components/Forms/Card';
import TemplateSelector from '../Components/Selector';
import { Styles, Templates, TemplateList } from './Templates';
import TogglePopup from '../Components/TogglePopup';
import {
  SaveManager,
  Saves,
} from '../Components/Store Management/UserStoreData';

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

const SaveStatCard = (props) => {
  let { value } = props;

  value = formatSaveData(value);

  return (
    <TogglePopup
      style={{ borderRadius: '4px' }}
      component={
        <div>
          Save Code
          <textarea
            type="text"
            // readOnly
            value={value}
            style={{
              display: 'block',
              width: '100%',
              height: '512px',
              whiteSpace: 'nowrap',
              resize: 'none',
            }}
            onChange={(e) => {}}
          />
        </div>
      }
    >
      Save Code
    </TogglePopup>
  );
};

const LoadStatCard = (props) => {
  // states
  let { setValue } = props;
  // const [newVal, setNewValue] = useState('');
  const [jsonValue, setJSONValue] = useState();

  return (
    <TogglePopup
      style={{ borderRadius: '4px' }}
      component={
        <div>
          Load Code
          <textarea
            type="text"
            style={{
              display: 'block',
              width: '100%',
              height: '512px',
              whiteSpace: 'nowrap',
              resize: 'none',
            }}
            onChange={(e) => {
              // setNewValue(e.target.value);

              let buffer = undefined;
              try {
                buffer = JSON.parse(e.target.value);
              } catch {}
              setJSONValue(buffer);
            }}
          />
          <button
            type="button"
            disabled={jsonValue ? false : true}
            onClick={(e) => {
              setValue(jsonValue);
            }}
          >
            Load
          </button>
        </div>
      }
    >
      Load Code
    </TogglePopup>
  );
};

const useStyles = makeStyles((msProps) => {
  return {
    root: (props) => {
      return props.Style ? props.Style({ Mode: props.Mode }) : {};
    },
  };
});

// Stat Card
const Stats = (props) => {
  // user data
  const [value, setValue] = useState(Templates['Dark Souls III']);
  const [series, setSeries] = useState(Templates['Dark Souls III'].Game);
  // const [UD] = useState(new UserData('TemplateData'));
  const [SM] = useState(
    props.state === 'creator'
      ? new SaveManager('Saves', 'Calc_Save')
      : undefined,
  );
  const [refresh, setRefresh] = useState(false);
  const Refresh = () => {
    setRefresh(!refresh);
  };

  // member variables
  // console.log('values:', value);
  const [style, setStyle] = useState('Dark Souls III');
  const Modes = ['Calculator', 'View', 'Edit'];

  const getDefaultMode = () => {
    switch (props.state) {
      case 'creator':
        return Modes[2];
      case 'calcs':
        return Modes[0];
      case 'profiles':
        return Modes[1];
      default:
        return Modes[1];
    }
  };

  const [Mode, setMode] = useState(getDefaultMode());
  const handleModeChange = () => {
    switch (props.state) {
      case 'creator':
        switch (Mode) {
          case Modes[0]:
            setMode(Modes[1]);
            break;
          case Modes[1]:
            setMode(Modes[2]);
            break;
          case Modes[2]:
            setMode(Modes[0]);
            break;
          default:
            break;
        }
        break;
      case 'calcs':
        switch (Mode) {
          case Modes[0]:
            setMode(Modes[1]);
            break;
          case Modes[1]:
            setMode(Modes[0]);
            break;
          default:
            break;
        }
        break;
      case 'profiles':
        break;
      default:
        break;
    }
  };

  const Update = (val) => {
    const buffer = { ...val };
    setValue(buffer);
  };

  /* Material-UI CSS Styles */
  /* Hard coding useStyles for eadch templates style */
  const classes1 = useStyles({
    Mode,
    Style: Styles[Templates['Blank'].Style],
  });
  const classes2 = useStyles({
    Mode,
    Style: Styles[Templates["Jojo's Bizarre Adventure"].Style],
  });
  const classes3 = useStyles({
    Mode,
    Style: Styles[Templates['Dark Souls III'].Style],
  });
  const classes4 = useStyles({
    Mode,
    Style: Styles[Templates['ArcheAge (V2020.10.13)'].Style],
  });

  /* Get useStyle of template */
  const getClass = () => {
    switch (style) {
      case "Jojo's Bizarre Adventure":
        return classes2.root;
      case 'Dark Souls III':
        return classes3.root;
      case 'ArcheAge':
        return classes4.root;
      default:
        return classes1.root;
    }
  };

  useEffect(() => {
    // Load First Save
    if (SM) SM.LoadFromEntry(setValue);
  }, []);

  // const CacheUserData = (props) => {
  //   const [info, setInfo] = useState('[No Loaded]');

  //   useEffect(() => {
  //     // load user data if available
  //   }, []);

  //   return (
  //     <div>
  //       <div>
  //         <button
  //           key="save"
  //           onClick={() => {
  //             // set save time state
  //             // set creation date if never set before
  //             const now = new Date();
  //             if (!value.DateCreated)
  //               value.DateCreated = DateTime.FormatDate(now);
  //             value.DateEdited = DateTime.FormatDate(now);
  //             setInfo(`[Last Saved:${JSON.stringify(value.DateEdited)}]`);
  //             UD.Set(formatSaveData(value));
  //           }}
  //         >
  //           Cache Data
  //         </button>
  //         <button
  //           key="clear"
  //           onClick={() => {
  //             setInfo('[Cache Cleared]');
  //             UD.Set('');
  //           }}
  //         >
  //           Clear Cache
  //         </button>
  //         <button
  //           key="Load"
  //           onClick={() => {
  //             const data = UD.Get();
  //             if (data !== '') {
  //               const buffer = deformatSaveData(data);
  //               setInfo(`[Last Loaded:${JSON.stringify(buffer.DateEdited)}]`);
  //               setValue(buffer);
  //             } else {
  //               setInfo(`[No data to load]`);
  //             }
  //           }}
  //         >
  //           Load Last Cache
  //         </button>
  //       </div>
  //       <div>
  //         <span
  //           style={{
  //             border: '2px solid black',
  //             justifyContent: 'center',
  //             display: 'flex',
  //           }}
  //         >
  //           {info}
  //         </span>
  //       </div>
  //     </div>
  //   );
  // };

  switch (props.state) {
    case 'creator':
    case 'calcs':
    case 'profiles':
    default:
  }

  // renderer
  switch (props.state) {
    case 'creator':
      return (
        <div style={{ display: 'flex' }}>
          <Paper style={{ margin: '4px', padding: '4px' }}>
            <TemplateSelector
              combobox
              label={'Series'}
              value={series}
              setter={(val) => {
                Update(Templates[val]);
                setSeries(Templates[val].Game);
                setStyle(Templates[val].Style);
              }}
              getter={(val) => {
                return val;
              }}
              list={TemplateList}
            />
            <TemplateSelector
              label={'Styles'}
              value={style}
              setter={(val) => {
                setStyle(val);
              }}
              getter={(val) => {
                return val;
              }}
              list={Object.keys(Styles).map((key) => {
                return key;
              })}
            />
            <Paper
              style={{
                display: 'flex',
                whiteSpace: 'pre',
                padding: '2px',
              }}
            >
              Mode:{' '}
              <button
                type="push"
                style={{ width: '80px' }}
                onClick={() => handleModeChange()}
              >
                {Mode}
              </button>
            </Paper>
            <div>
              <Paper style={{ display: 'flex', padding: '2px' }}>
                <SaveStatCard value={value}></SaveStatCard>
                <LoadStatCard setValue={setValue}></LoadStatCard>
              </Paper>
              {/* <CacheUserData key="UserData" /> */}
              <Saves
                key="UserData"
                indexName={SM.getName()}
                SM={SM}
                Update={() => {
                  Refresh();
                }}
                currentData={value}
                setData={setValue}
              ></Saves>
            </div>
          </Paper>

          <Paper
            className={getClass()}
            style={{ margin: '4px', padding: '4px' }}
          >
            <ProfileCard
              key="profile"
              Mode={Mode}
              value={value}
              Update={Update}
            ></ProfileCard>
          </Paper>
        </div>
      );
    case 'calcs':
      return (
        <div style={{ display: 'flex' }}>
          <Paper style={{ margin: '4px', padding: '4px' }}>
            <TemplateSelector
              combobox
              label={'Series'}
              value={series}
              setter={(val) => {
                Update(Templates[val]);
                setSeries(Templates[val].Game);
                setStyle(Templates[val].Style);
              }}
              getter={(val) => {
                return val;
              }}
              list={TemplateList}
            />
            <TemplateSelector
              label={'Styles'}
              value={style}
              setter={(val) => {
                setStyle(val);
              }}
              getter={(val) => {
                return val;
              }}
              list={Object.keys(Styles).map((key) => {
                return key;
              })}
            />
            <div></div>
            <Paper
              style={{
                display: 'flex',
                whiteSpace: 'pre',
                padding: '2px',
              }}
            >
              Mode:{' '}
              <button
                type="push"
                style={{ width: '80px' }}
                onClick={() => handleModeChange()}
              >
                {Mode}
              </button>
            </Paper>
          </Paper>

          <Paper
            className={getClass()}
            style={{ margin: '4px', padding: '4px' }}
          >
            <ProfileCard
              key="profile"
              Mode={Mode}
              value={value}
              Update={Update}
            ></ProfileCard>
          </Paper>
        </div>
      );
    case 'profiles':
    default:
      return null;
  }
};

export default Stats;
