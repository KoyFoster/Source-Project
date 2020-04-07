import React from 'react';
import ComboBox from './Forms/ComboBox'
import {Paper} from '@material-ui/core'

function TemplateSelector(props)
{
    return(
        <Paper style={{margin: 4, padding: 4, display: 'flex', flexDirection: 'column'}} display='flex'>
        Name
        <ComboBox value = {props.Name} setValue = {props.setValue} defaultValue={props.defaultValue} onChange={e => {if(props.OnChange) props.OnChange(e.target.value); if(props.setValue) props.setValue(e.target.value.label) }} >
            {props.MenuItems}
        </ComboBox>
        </Paper>
    )
};

export default TemplateSelector;