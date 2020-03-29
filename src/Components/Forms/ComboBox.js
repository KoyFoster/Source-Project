import React, { useState } from "react";
import {Select} from '@material-ui/core'

function ComboBox(props)
{
    const [value, setValue] = useState(props.defaultValue.label);


    console.log('props:',props)
return (<div style={{display: 'flex', alignItems: 'stretch'}}>
            <input style={{height: 'auto', textAlign: 'center', color: 'white', flexGrow: 1, backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #c7c7c7', margin: 'none', padding: 'none'}} type='text' value={value} onChange={e => setValue(e.target.value)} />
            <Select style={{width: '24px', height: 'auto', color: 'transparent'}} defaultValue={props.defaultValue} onChange = {e => {props.onChange(e); setValue(e.target.value.label)}}>{props.children}</Select>
        </div>
        );
}

export default ComboBox;