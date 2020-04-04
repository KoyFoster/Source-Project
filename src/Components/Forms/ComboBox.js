import React, { useState } from "react";
import {Select} from '@material-ui/core'

function ComboBox(props)
{
    const [value, setValue] = useState(props.value ? props.value : props.defaultValue.label);
    if((props.value !== value && value !== undefined) && (props.value !== '' && props.value !== undefined))
    {
        console.log('pv:',props.value, 'v:',value);
        setValue(props.value);
    };

    return (<div style={{display: 'flex', alignItems: 'stretch'}}>
            <input style={{height: 'auto', textAlign: 'center', color: 'white', flexGrow: 1, backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #c7c7c7', margin: 'none', padding: 'none'}} type='text' value={value} onChange={e => {setValue(e.target.value); if(props.setValue) props.setValue(e.target.value) }} />
            <Select style={{width: '24px', height: 'auto', color: 'transparent'}} defaultValue={props.defaultValue} onChange = {e => { setValue(e.target.value.label); if (props.onChange) props.onChange(e)}}>{props.children}</Select>
        </div>
        );
}

export default ComboBox;