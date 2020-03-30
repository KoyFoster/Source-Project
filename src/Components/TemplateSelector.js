import React from 'react';
import ComboBox from './Forms/ComboBox'
import {Paper} from '@material-ui/core'

function TemplateSelector(props)
{

    return(
        <Paper style={{margin: 4, padding: 4, display: 'flex', flexDirection: 'column'}} display='flex'>
        Template
        <ComboBox defaultValue={props.defaultValue} onChange={e => props.OnTemplateChange(e.target.value)} >
            {props.MenuItems}
        </ComboBox>
        </Paper>
    )
};

export default TemplateSelector;