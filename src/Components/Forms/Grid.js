import React, { useState } from "react";

function Grid(props)
{
    // init functions
    const initRowSize = () => 
    { 
        let size = props.iRows ? props.iRows : -1;
        if(size === -1) size = props.hRows ? props.hRows.length : 0;
        return size; 
    }
    const initColSize = () => 
    {
        let size = props.iCols ? props.iCols : -1;
        if(size === -1) size = props.hRows ? props.hRows[0].length : -1;
        if(size === -1) size = props.children ? 1 : 0;
        return size;
    }
    const initRows = () =>
    {
        let hRows = props.hRows ? [[...props.hRows]] : [];
        if(hRows.length === 0)
        { hRows = props.children ? [[...props.children]] : []; }

        // Copy to hRow if single row passed
        let hRow = hRows.length === 1 ? [...hRows] : [];

        // Validate
        if(hRows.length === 0 && props.iRows)
        {
            for(let y=0; y < props.iRows; y++)
            {
                hRows.push([new Array(iCols)]);
            }
        }
        // Multiple rows based on row size
        if(props.iRows)
        if(hRows.length < props.iRows)
        {
            // Clear first row as it will be replaced
            if(hRows.length === 1) hRows.splice(0,1);
            // Add Rows and Update Names
            for(let y=0; y < props.iRows; y++)
            {                
                hRows.push([...hRow[0]]);
                for(let x=0; x < hRows[0].length; x++)
                {
                    // value
                    let value = props.value !== undefined ? props.value[y][x] : undefined;
                    console.log('value:',value)
                    // name
                    const name = hRows[y][x].props.name + `_(${x},${y})`;
                    // component
                    hRows[y][x] = {...hRows[y][x], props: {...hRows[y][x].props, value, name: name}};
                }
            }
        }
        return hRows;
    }

    // States
    const [hHeader, setHeader] = useState(props.hHeader ? [[...props.hHeader]] : undefined); //An Array of components
    const [hFooter, setFooter] = useState(props.hFooter ? [[...props.hFooter]] : undefined); //An Array of components
    const [hRows, setRows] = useState(initRows()); //A 2d Array of components
    // const [hCols, setCols] = useState(props.hRows ? props.hRows : -1); //An Array of
    const [iRows, setRowSize] = useState(initRowSize());
    const [iCols, setColSize] = useState(initColSize());
    // const [iW, setWidth] = useState(props.iW)
    // const [iH, setHeight] = useState(props.iH)
    const [style, SetStyle] = useState(props.style);
    const cellStyle = props.cellStyle ? props.cellStyle : undefined;
    const rowStyle = props.rowStyle ? props.rowStyle : undefined; // This style doesn't work at the moment
    const values = props.values ? props.values : [];

    const parseRows = (arr) =>
    {
        const rows = [];
        for(let y=0; y < arr.length; y)
        {
            let row = [];
            for(let x=0; x < arr[0].length; x)
            {
                // console.log('cell:',arr[y][x]);
                row.push(<th style={{...cellStyle}}>{arr[y][x]}</th>);
                x += 1;
            }
            rows.push(<tr style={{...rowStyle}}>{row}</tr>);
            y += 1;
        }
        return rows;
    }
    const getHeader = () =>
    {
        if(!hHeader) return '';
        return parseRows(hHeader);
    }
    const getFooter = () =>
    {
        if(!hFooter) return '';
        return parseRows(hFooter);
    }
    const getRows = () =>
    {
        if(!hRows) return '';
        return parseRows(hRows);
    }
    const getGrid = () => { return <table style = {{...style, tableLayout: 'fixed'}}><thead>{getHeader()}</thead>{getRows()}{getFooter()}</table>; }

    return (getGrid())
}

export default Grid;