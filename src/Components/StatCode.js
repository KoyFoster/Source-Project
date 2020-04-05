import React from "react";
import { Button, Paper } from '@material-ui/core';

class StatCode extends React.Component
{
    copyCodeToClipboard = (val) => 
    {
        this.textArea.value = this.props.GetURLCode();
        const el = this.textArea;
        el.select();
        document.execCommand("copy")
    };

    render(){return(<Paper style={{margin: 4, padding: 4}}>
        <Button style={{width: "128px"}} onClick={() => this.copyCodeToClipboard()}>Copy Code</Button>
            <textarea style={{position: 'absolute', top: '-2px', left: '-2px', bottom: '-2px', right: '-2px', width: '0px', height: '0px' , margin: 0, padding: 0 }} ref={(textarea) => this.textArea = textarea} value={this.props.code}/>
        </Paper>)}
};

export default StatCode;