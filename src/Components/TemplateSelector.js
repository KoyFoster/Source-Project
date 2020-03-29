import React from 'react';
import ComboBox from './Forms/ComboBox'
import {Paper} from '@material-ui/core'

function TemplateSelector(props)
{
    var OnTemplateChange = event =>
    {
        props.OnTemplateChange(event.target.value);
    }

    return(
        <Paper style={{margin: 4, padding: 4, display: 'flex', flexDirection: 'column'}} display='flex'>
        Template
        <ComboBox defaultValue={props.defaultValue} onChange={e => OnTemplateChange(e)} >
            {props.MenuItems}
        </ComboBox>
        </Paper>
    )
};

export default TemplateSelector;