import React from "react";

function Row(props) {
    return (<div style={{display: "flex", justifyContent: props.justifyContent, background: props.background}}>
    {props.children}
    </div>)
}

export default Row;