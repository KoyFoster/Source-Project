import React from "react";

function Col(props) {
    return (<div style={{display: "inline", justifyContent: props.justifyContent, background: props.background}}>
    {props.children}
    </div>)
};

function Row(props) {
    return (<div style={{display: "flex", justifyContent: props.justifyContent, background: props.background}}>
    {props.children}
    </div>)
};

export {Col, Row};