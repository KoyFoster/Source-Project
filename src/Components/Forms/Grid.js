import React, { useState } from "react";

function Grid(props)
{
    // console.log('Grid:',props.children);
    console.log('Grid:', props.Header);
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
        let hRows = props.hRows ? [props.hRows] : [];
        if(hRows.length === 0)
        { hRows = props.children ? [props.children] : []; }

        // Validate
        if(hRows.length === 0)
        {
            for(let y=0; y < props.iRows; y++)
            {
                hRows.push([new Array(iCols)]);
            }
        }
        // Multiple rows based on row size
        else if(hRows.length < props.iRows)
        {
            for(let y=1; y < props.iRows; y++)
            {
                hRows.push(hRows[0]);
            }

            // Update Cell Names
            
            for(let x=0; x < props.iCols; x++)
            for(let y=0; y < props.iRows; y++)
            {
                hRows[y][x].props.name = hRows[y][x].props.name + `_${iCols},${props.iRows}`;
                console.log('Renamed:', hRows[y][x]);
            }
        }
        return hRows;
    }

    // States
    const [hHeader, setHeader] = useState(props.header); //An Array of components
    const [hRows, setRows] = useState(initRows()); //A 2d Array of components
    // const [hCols, setCols] = useState(props.hRows ? props.hRows : -1); //An Array of
    const [iRows, setRowSize] = useState(initRowSize())
    const [iCols, setColSize] = useState(initColSize())

    // const [iW, setWidth] = useState(props.iW)
    // const [iH, setHeight] = useState(props.iH)
    const [style, SetStyle] = useState(props.style)


    const parseRows = (arr) =>
    {
        const rows = [];
        for(let y=0; y < arr.length; y)
        {
            let row = [];
            for(let x=0; x < arr[0].length; x)
            {
                // console.log('cell:',arr[y][x]);
                row.push(<th>{arr[y][x]}</th>);
                x += 1;
            }
            rows.push(<tr>{row}</tr>);
            y += 1;
        }
        // console.log('parseRows:',rows, hRows, iCols, iRows);
        return rows;
    }
    const getHeader = () =>
    {
        if(!hHeader) return '';
        return parseRows(hHeader);
        // <thead><tr>header</tr></thead><tr></tr>
    }
    const getRows = () =>
    {
        if(!hRows) return '';
        return parseRows(hRows);
        // <thead><tr>header</tr></thead><tr></tr>
    }
    const getGrid = () => { return <table style = {{...style, border: '1px solid red', tableLayout: 'fixed'}}><thead>{getHeader()}</thead>{getRows()}</table>; }

    return (getGrid())
}

export default Grid;