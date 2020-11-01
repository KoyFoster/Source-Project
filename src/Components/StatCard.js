import React, { useState, useEffect } from 'react';
import Selector from './Selector';
import ProfileCard from './Forms/Card';
import { Templates, Styles } from './Templates';
// import Grid from './Forms/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { SaveManager, Saves } from './UserData/UserData';

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
  // const [UD] = useState(new UserData('TemplateData'));
  const [SM] = useState(new SaveManager('Saves', 'Calc_Save'));
  const [refresh, setRefresh] = useState(false);
  const Refresh = () => {
    setRefresh(!refresh);
  };

  // member variables
  const [value, setValue] = useState(Templates['Blank']);
  // console.log('Stats:', value);
  const [style, setStyle] = useState('Default');

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

  useEffect(() => {}, []);

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
            <Selector
              combobox
              label={'Series'}
              value={value.Game}
              setter={(val) => {
                Update(Templates[val]);
                setStyle(Templates[val].Style);
              }}
              getter={(val) => {
                return val;
              }}
              list={Object.keys(Templates).map((key) => {
                return key;
              })}
            />
            <Selector
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
            <div>
              {/* <Paper style={{ display: 'flex', padding: '2px' }}>
                <SaveStatCard value={value}></SaveStatCard>
                <LoadStatCard setValue={setValue}></LoadStatCard>
              </Paper> */}
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
    case 'calcs':
      return (
        <div style={{ display: 'flex' }}>
          <Paper style={{ margin: '4px', padding: '4px' }}>
            <Selector
              combobox
              label={'Series'}
              value={value.Game}
              setter={(val) => {
                Update(Templates[val]);
                setStyle(Templates[val].Style);
              }}
              getter={(val) => {
                return val;
              }}
              list={Object.keys(Templates).map((key) => {
                return key;
              })}
            />
            <Selector
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
            <div>
              {/* <Paper style={{ display: 'flex', padding: '2px' }}>
                <SaveStatCard value={value}></SaveStatCard>
                <LoadStatCard setValue={setValue}></LoadStatCard>
              </Paper>
              <CacheUserData key="UserData" /> */}
            </div>
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
