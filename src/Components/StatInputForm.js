import React from 'react';
import {
  Box,
  Button,
  TextField,
  InputLabel,
  Checkbox,
} from '@material-ui/core';
import { Row, Col } from './DivGrid.js';
import '../App.css';
import Grid from './Forms/Grid';

//User Input Class
function StatInputForm(props) {
  const Table = props.data().vTable(props.iD);

  const Update = (dataObj) => {
    // console.log('dataObj:', dataObj);
    if (dataObj.name === 'Name') {
      props.setData.setName(props.iD, dataObj.value);
      props.setData.setUpdate(!props.data().update);
      return;
    }
    if (dataObj.name === 'Level Cap') {
      props.UpdatePointLimit(props.iD, dataObj.value);
      return;
    }
    if (dataObj.name === 'RNG') {
      props.RandomizeStats(props.iD);
      return;
    }
    if (dataObj.name === 'PointDiff') {
      props.Update(props.iD, dataObj);
      return;
    }
    //Update Diagram
    props.Update(props.iD, { ...dataObj, y: dataObj.y - 1 });
  };

  const inputProps = {
    'aria-label': 'naked',
    disableUnderline: true,
    style: { textAlign: 'center' },
  };
  const FIELD = (PROPS) => {
    // if (props.bCalc) return <div style={{ ...PROPS.style }}>{PROPS.value}</div>;
    // else
    // const events = undefined;
    // = props.bCalc
    // ? {
    //     onFocus: (event) => {
    //       // event.stopPropagation();
    //       // event.preventDefault();
    //       event.target.value = 'butts';
    //     },
    //     onChange: (e) => {
    //       // e.stopPropagation();
    //       // e.preventDefault();
    //       e.target.value = 234523;
    //       console.log('e:', e.target.value);
    //     },
    //   }
    // : props.onChange; // onChange={(event) => Update(event)}

    return <TextField {...inputProps} {...PROPS} bMUI={true}></TextField>;
  };

  /* Validate Presence of stats */
  const hLimit =
    props.bCalc === true || props.data().PointLimit(props.iD) === -1 ? (
      ''
    ) : (
      <div>
        <TextField
          label="Limit:"
          type="number"
          name="Limit"
          value={props.data().PointLimit(props.iD)}
          onChange={(event) =>
            Update({
              name: 'Level Cap',
              value: parseFloat(event.target.value, 10),
            })
          }
        ></TextField>
      </div>
    );
  const hTotal =
    props.bCalc === true || props.data().PointLimit(props.iD) === -1 ? (
      ''
    ) : (
      <InputLabel>
        :Min - Total Points: {props.data().PointTotal(props.iD)}{' '}
      </InputLabel>
    );
  const hPointDiff =
    props.bCalc === true ||
    props.data().PointDiff(props.iD) === undefined ||
    props.data().PointLimit(props.iD) === -1 ? (
      ''
    ) : (
      <Checkbox
        name="PointDiff"
        checked={Boolean(props.data().PointDiff(props.iD))}
        style={{ width: 10, height: 0 }}
        onChange={(e) => {
          Update({
            name: 'PointDiff',
            checked: e.target.checked,
          });
        }}
      />
    );
  const hRandom =
    props.bCalc !== true ? (
      <Button name="RNG" onClick={() => Update({ name: 'RNG' })}>
        {' '}
        Random{' '}
      </Button>
    ) : (
      ''
    );

  const hFooter =
    props.bCalc === true ||
    (props.data().PointTotal(props.iD) === -1 &&
      props.data().PointMin(props.iD) === -1 &&
      props.data().PointMax(props.iD) === -1)
      ? undefined
      : [
          <div
            style={{
              background: '#00000033',
            }}
          >
            Totals
          </div>,
          props.data().PointTotal(props.iD) !== -1 ? (
            <TextField
              value={props.data().PointTotal(props.iD)}
              disabled
            ></TextField>
          ) : (
            <div></div>
          ),
          props.data().PointMin(props.iD) !== -1 ? (
            <TextField
              value={props.data().PointMin(props.iD)}
              style={{
                background: '#FFFFFF33',
              }}
              disabled
            ></TextField>
          ) : (
            <div></div>
          ),
          props.data().PointMax(props.iD) !== -1 ? (
            <TextField
              value={props.data().PointMax(props.iD)}
              disabled
            ></TextField>
          ) : (
            <div></div>
          ),
          <div></div>,
        ];

  return (
    <div>
      <Col name="GraphBody">
        <Row>
          <TextField
            label="Stats"
            type="number"
            name="Quantity"
            value={Number(Table.length)}
            onChange={(e) =>
              Update({ name: 'Quantity', value: e.target.value })
            }
          ></TextField>
          {hLimit}
        </Row>
        <Row alignItems="center">
          {hPointDiff}
          {hTotal}
        </Row>
      </Col>
      <Row>
        <Box name="FormBody" align="center">
          <Col>
            <TextField
              label="Name"
              name={`Name_${props.iD}`}
              value={props.data().Name(props.iD)}
              onChange={(e) => Update({ name: 'Name', value: e.target.value })}
            />
            <Grid
              bRowHeader={false}
              colOrder={[0, 1, 4, 2, 3]}
              onChange={(e) => Update(e)}
              hHeader={[
                <div
                  style={{
                    background: '#00000033',
                  }}
                >
                  Stats
                </div>,
                <div>Value</div>,
                <div
                  style={{
                    background: '#FFFFFF33',
                  }}
                >
                  Min
                </div>,
                <div>Max</div>,
                <div>(unit)</div>,
              ]}
              hFooter={hFooter}
              iRows={Table.length}
              cellStyle={{ borderBottom: '2px solid white' }}
              Values={Table}
            >
              <TextField
                name={'Types'}
                style={{
                  width: '136px',
                  background: '#00000033',
                }}
                inputProps={{ ...inputProps, style: { textAlign: 'center' } }}
              />
              {/*[iRow][0]*/}
              <FIELD
                type="number"
                name={'Value'}
                style={{}}
                inputProps={{ ...inputProps, style: { textAlign: 'right' } }}
              />
              {/*[iRow][1]*/}
              <FIELD
                type="number"
                name={'Min'}
                style={{
                  width: '56px',
                  borderBottom: 'none',
                  background: '#FFFFFF33',
                }}
              />
              {/*[iRow][2]*/}
              <FIELD type="number" name={'Max'} style={{ width: '56px' }} />

              {/*[iRow][3]*/}

              <FIELD name={'Unit'} style={{ width: '56px' }} />
              {/* <Select
                name={'Unit'}
                style={{ width: '24px', height: 'auto', color: 'transparent' }}
                inputProps={{ ...inputProps, style: { textAlign: 'left' } }}
                onChange={(e) => {
                  Update({ name: 'Unit', value: e.target.value });
                }}
              > */}
              {/* <MenuItem key="" value="">
                  %
                </MenuItem>
                <MenuItem key="" value="">
                  %
                </MenuItem> */}
              {/* </Select> */}
              {/*[iRow][4]*/}
            </Grid>
          </Col>
          {hRandom}
        </Box>
      </Row>
    </div>
  );
}

export default StatInputForm;
