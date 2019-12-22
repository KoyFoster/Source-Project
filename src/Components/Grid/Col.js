import React from "react";

function Col(props) {
    return (<div style={{display: "inline", justifyContent: props.justifyContent, background: props.background}}>
    {props.children}
    </div>)
}

export default Col;