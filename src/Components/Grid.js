import React from "react";

function Col(props) {
    return (<div style={{display: "inline", justifyContent: props.justifyContent||'center', background: props.background, alignItems: props.alignItems}}>
    {props.children}
    </div>)
};

function Row(props) {
    return (<div style={{display: "flex",   justifyContent: props.justifyContent||'center', background: props.background, alignItems: props.alignItems}}>
    {props.children}
    </div>)
};

export {Col, Row};