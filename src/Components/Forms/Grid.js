import React, { useState } from "react";

function Grid(props)
{
    // init functions
    const initRowSize = (iSize = -1) => 
    { 
        let size = props.iRows ? props.iRows : -1;
        if(size === -1) size = iSize;
        if(size === -1) size = props.hRows ? props.hRows.length : 0;
        return size; 
    }
    const initColSize = (iSize = -1) => 
    {
        let size = props.iCols ? props.iCols : -1;
        if(size === -1) size = iSize;
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
                    // name
                    const name = hRows[y][x].props.name + `_(${x},${y})`;
                    tags.push(hRows[y][x].props.name);
                    // component
                    hRows[y][x] = {...hRows[y][x], props: {...hRows[y][x].props, value: Values !== undefined ? Values[y][x] : undefined, name: name}};
                }
            }
        }
        return hRows;
    }

    // States Vars
    const [Values, setValues] = useState(props.Values ? props.Values : undefined); //An Array of components
    const [tags, setTags] = useState([]); //An Array of components
    const [hHeader, setHeader] = useState(props.hHeader ? [props.hHeader] : undefined); //An Array of components
    const [iRows, setRowSize] = useState(initRowSize());
    const [iCols, setColSize] = useState(initColSize());
    if(props.Values !== Values && Values !== undefined)
    {
        setValues(props.Values);
        setRowSize(props.Values.length);
        setColSize(props.Values.length > 0 ? props.Values[0].length : 0);
    };
    // Rerender Vars
    const hFooter = props.hFooter ? [props.hFooter] : undefined; //An Array of components
    const hRows = initRows(); //A 2d Array of components
    const style = props.style ? props.style : undefined;
    const cellStyle = props.cellStyle ? props.cellStyle : undefined;
    const rowStyle = props.rowStyle ? props.rowStyle : undefined; // This style doesn't work at the moment


    const parseRows = (arr) =>
    {
        const rows = [];
        for(let y=0; y < arr.length; y)
        {
            let row = [];
            for(let x=0; x < arr[0].length; x)
            {
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
    const getGrid = () => 
    { 
        return <table style = {{...style, tableLayout: 'fixed'}} onChange={e => {props.onChange(e); }}><thead>{getHeader()}</thead>{getRows()}{getFooter()}</table>; 
    }

    // return render
    return (getGrid())
}

export default Grid;