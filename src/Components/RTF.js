/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-empty */
/* eslint-disable func-names */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */

/* Note: Currently background color does not maximize to the tallest character in the line. Probably a simple fix. */
import React, { useState } from 'react';

// Int to hex
const IntToHex = (int) => {
  let hex = Number(int).toString(16);
  if (hex.length < 2) {
    hex = `0${hex}`;
  }
  return hex;
};

const DefineStyle = (rtf, buffer /* result: { Style, Text}, html, FF */) => {
  // 1. style tags are always in cell 0
  // parse out numeric values that may exist
  let nVal = '';
  let sVal = '';
  Array.prototype.map.call(rtf[0], function (char) {
    if (Number.isNaN(parseInt(char, 10))) sVal += char;
    else nVal += char;
  });
  // convert to number
  nVal = parseInt(nVal, 10);
  switch (sVal) {
    case 'f': // font tag
      {
        if (!Number.isNaN(nVal))
          if (buffer.result.Style.fontFamily === undefined)
            buffer.result.Style = {
              ...buffer.result.Style,
              fontFamily: buffer.FF[nVal],
            };
          else buffer.result.Style.fontFamily = buffer.FF[nVal];
      }
      break;
    case 'highlight': // highlight tag
      {
        if (buffer.result.Style.backgroundColor === undefined)
          buffer.result.Style = {
            ...buffer.result.Style,
            backgroundColor: nVal > 0 ? buffer.colorTable[nVal - 1] : undefined,
          };
        else
          buffer.result.Style.backgroundColor =
            nVal > 0 ? buffer.colorTable[nVal - 1] : undefined;
      }
      break;
    case 'cf': // color tag
      {
        const color = nVal > 0 ? buffer.colorTable[nVal - 1] : undefined;

        if (buffer.result.Style.color === undefined)
          buffer.result.Style = {
            ...buffer.result.Style,
            color,
          };
        else
          buffer.result.Style.color =
            nVal > 0 ? buffer.colorTable[nVal - 1] : undefined;
      }
      break;
    case 'fs': // font size
      {
        if (buffer.result.Style.fontSize === undefined)
          buffer.result.Style = {
            ...buffer.result.Style,
            fontSize: `${nVal * (2 / 3)}px`,
          };
        else buffer.result.Style.fontSize = `${nVal * (2 / 3)}px`;
      }
      break;
    case 'b': // bold
      {
        if (buffer.result.Style.fontWeight === undefined)
          buffer.result.Style = {
            ...buffer.result.Style,
            fontWeight: nVal !== 0 ? 'bold' : 'normal',
          };
        else buffer.result.Style.fontWeight = nVal !== 0 ? 'bold' : 'normal';
      }
      break;
    case 'i': // italics
      {
        if (buffer.result.Style.fontStyle === undefined)
          buffer.result.Style = {
            ...buffer.result.Style,
            fontStyle: nVal !== 0 ? 'italic' : 'normal',
          };
        else {
          buffer.result.Style.fontStyle = nVal !== 0 ? 'italic' : 'normal';
        }
      }
      break;
    case 'ul': // underline
      {
        if (buffer.result.Style.textDecoration === undefined)
          buffer.result.Style = {
            ...buffer.result.Style,
            textDecoration: 'underline',
          };
        else {
          buffer.result.Style.textDecoration = 'underline';
        }
      }
      break;
    case 'ulnone': // underline
      {
        buffer.result.Style = {
          ...buffer.result.Style,
          textDecoration: 'none currentcolor solid',
        };
      }
      break;
    default:
      break;
  } // end of style switch

  // start new buffers

  if (buffer.result.Text) {
    // append previus buffer into the html buffer
    if (Object.keys(buffer.result.Style).length) {
      buffer.html.push({
        id: '',
        Type: 'span',
        Text: buffer.result.Text,
        Style: { ...buffer.result.Style },
      });
    }
    buffer.result.Text = '';
  }
};

const ProcessElement = (Elem, i, arr, docWidth, docPos) => {
  const iI = i;
  const w = Elem.getBoundingClientRect().width;
  const x = Elem.getBoundingClientRect().left;
  const l = x - docPos;
  const r = l + w;

  if (!(r > docWidth)) return i;

  // determine how many parts this element needs to be broken down into
  let iParts = 0;
  if (docWidth !== 0) {
    iParts = parseInt(r / docWidth, 10) + 1;
  }

  // get info
  const { Text } = arr.data[i];
  const PS = parseInt(Text.length / iParts, 10);

  // replace current val element with itself divided into parts
  let iP = 0;
  for (iP; iP < iParts; iP) {
    const iEnd = PS * (iP + 1);
    const slice = Text.slice(PS * iP, iEnd > Text.length ? Text.length : iEnd);
    const elem = { ...arr.data[iI], Text: slice };

    // add parts
    arr.data.splice(iI + iP + 1, 0, elem);
    iP += 1;
  }
  // remove original
  arr.data.splice(iI, 1);
  // update index
  i += iP + 1;

  // return index in case it's changed to handle the additional elements
  return i;
};

const RTF = {
  // this is made with the intention os being ran once after loading
  CalculateWrap(arr, docWidth) {
    // arr: data, html
    // process first element as the relative position
    let Elem = document.getElementById(arr.data[0].id);
    const docPos = Elem ? Elem.getBoundingClientRect().left : 0;
    let i = 0;
    let iInit = 0;
    if (Elem) {
      i = ProcessElement(Elem, 0, arr, docWidth, docPos);
    }
    iInit = i;
    i += 1;

    // check each element for wrap
    for (i; i < arr.data.length; i) {
      // get element and position and width and determine if exceeds document width

      // skip non span elements
      if (arr.data[i].Type === 'span') {
        Elem = document.getElementById(arr.data[i].id);
        // validation
        if (!Elem) {
          // console.error('No Elements To Wrap');
          return arr;
        }

        if (Elem) i = ProcessElement(Elem, i, arr, docWidth, docPos);
      }
      i += 1;
    }

    // remap objects after iInit

    return arr;
  },

  // Doc Width is used to determine word wrap
  ToHTML(val, key) {
    // console.log('val:', val, 'key:', key);
    // HTML to RTf
    const FamilyFonts = [];
    let colorTable = [];
    const html = [];
    let rtf = [];
    let plainText = '';
    let value = val.split('{');

    // drop first three rows. Note: these first two rows should be the rtf tag and font table tag and a empty row caused by split
    if (value.length > 2) {
      value = value.splice(3, value.length);
    }

    // Break down rtf
    // Parse by dash
    const iEnd = value.length - 1;
    for (let y = 0; y <= iEnd; y) {
      let rowBuff;

      // take last cell as that appears to be the only relevant one
      // Note: hard-coding the font tags for convenience. Will have to do it dynamically in the future is it's ever reasonable got these not to be in order
      // FYI: font tag is: f0, f1, etc.
      if (y !== iEnd) {
        rowBuff = value[y];
        // colortbl check
        if (rowBuff.search('colortbl') > -1) {
          // break down row into color array
          rowBuff = rowBuff.slice(0, rowBuff.length - 1); // remove '}'
          colorTable = rowBuff.split('red').join('');
          colorTable = colorTable.split('green').join('');
          colorTable = colorTable.split('blue').join('');
          colorTable = colorTable.split(';');

          // compile colors
          for (let i = 0; i < colorTable.length; i) {
            colorTable[i] = colorTable[i].split('\\').slice(1, 4);
            colorTable[i] = `#${IntToHex(
              parseInt(colorTable[i][0], 10),
            )}${IntToHex(parseInt(colorTable[i][1], 10))}${IntToHex(
              parseInt(colorTable[i][2], 10),
            )}`;
            i += 1;
          }
          colorTable = colorTable.slice(1, colorTable.length); // remove first empty cell
          colorTable = colorTable.slice(0, colorTable.length - 1); // remove last empty cell
        } else {
          rowBuff = value[y].split('\\');
          rowBuff = rowBuff.slice(rowBuff.length - 1, rowBuff.length); // remove '}'
          rowBuff = rowBuff[0].split(' ').slice(1).join(' '); // remove 'fcharset0 '
          const iColon = rowBuff.search(';');
          if (iColon > -1) {
            {
              rowBuff = rowBuff.slice(0, iColon);
            }
          }
          // VS or windows applies '@' to some fonts. I don't know why, but they need to be removed for these fonts to work in HTML
          const bAt = rowBuff[0] === '@';
          if (bAt) {
            rowBuff = rowBuff.slice(1, rowBuff.length);
          }
          FamilyFonts.push(rowBuff);
        }
      } // save text
      else if (y === iEnd) {
        rowBuff = value[y].split('\\');
        rtf = rowBuff;
        let iStart = -1;
        const fBuffer = { Style: {}, Text: '' };
        // skip last cell
        for (let x = 0; x < rtf.length; x) {
          // find when text cells start
          // if (iStart === -1 && rtf[x]) if (rtf[x] === 'pard') iStart = x;
          if (iStart === -1 && rtf[x]) {
            if (rtf[x] === 'pard') iStart = x;
          }

          // continue
          // eslint-disable-next-line no-empty
          if (iStart === -1) {
          }
          // find when text of cell starts
          else {
            const text = rtf[x].split(' ');
            rtf[x] = text;
            // handle data
            // 2. plain text is always in cell 1
            // 3. cell 3 is always a space
            if (rtf[x].length > 2) {
              const TB1 = rtf[x][1] === ' ' ? '' : `${rtf[x][1]} `;
              const TB2 = rtf[x][2] === '' ? '' : `${rtf[x][2]}`;
              plainText += TB1 + TB2;
              fBuffer.Text += TB1 + TB2;
            } else if (rtf[x].length > 1) {
              const TB = rtf[x][1] === '' ? '' : rtf[x][1];
              plainText += TB;
              fBuffer.Text += TB;
            }

            // handle styles
            // console.log('ToHTML:', rtf[x], rtf[x][0].substr(0, 3));
            if (rtf[x][0].substr(0, 3) === 'par') {
              plainText += '\r\n';
              // prevent redundent line breaks
              html.push({
                id: '',
                Type: 'div',
                // Style: { ...fBuffer.Style },
              });

              if (rtf[x].length > 1)
                if (rtf[x][1].length > 1) {
                  // define children text styles
                  DefineStyle(rtf[x], {
                    result: fBuffer,
                    FF: FamilyFonts,
                    colorTable,
                    html,
                    key,
                  });
                }
            } else {
              // define children text styles
              DefineStyle(rtf[x], {
                result: fBuffer,
                FF: FamilyFonts,
                colorTable,
                html,
                key,
              });
            }
          }
          x += 1;
        } // end of cell loop
      }

      // increment
      y += 1;
    } // wns of dash parser

    // drop first two rows
    if (value.length > 2) value = value.slice(2, value.length);
    else return '';

    // console.log('htmlObj:', plainText, html);
    return { plainText, html };
  },

  getHTML(objArr) {
    // console.log('objArr:', objArr);
    if (!objArr) return [];
    const result = [];
    let buffer = [];
    // loop
    let iD = 0;
    for (let i = 0; i < objArr.length; i) {
      // update end slice
      const { Text } = objArr[i];
      const { Style } = objArr[i];
      switch (objArr[i].Type) {
        // span case
        case 'span':
          objArr[i].id = `span_${i}`;
          buffer.push(
            <span
              id={`span_${i}`}
              key={`span_${i}`}
              data-i={iD}
              style={{
                ...Style,
                whiteSpace: 'pre',
              }}
            >
              {Text}
            </span>,
          );
          iD += 1;
          break;

        // div case
        // in this case we are using div as the paragraph end marker
        // what this means is that we are slicing the previously non div container elements into a parent div
        case 'div':
          {
            // update id of object
            objArr[i].id = `div_${i}`;

            result.push(
              <div
                id={`div_${i}`}
                key={`div_${i}`}
                data-i={undefined}
                style={{
                  ...Style,

                  //   display: 'flex',
                  //   flexWrap: 'wrap',
                  alignContent: 'bottom',
                  whiteSpace: 'pre',
                  padding: 'none',
                  margin: 'none',
                }}
              >
                {buffer.length ? buffer : '\r\n'}
              </div>,
            );
            // update slice markers
            // clear buffer
            buffer = [];
          }
          break;

        // ? case
        default:
          break;
      }
      i += 1;
    }

    // console.log('result:', result);
    return result;
  },
};
const ToRTF = (val) => '';

export { RTF };
