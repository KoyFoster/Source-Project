import React from "react";

function Col(props) {
    return (<div style={{...props.style, display: props.display||"inline", background: props.background,
        justifyContent: props.justifyContent||'center',
        justifyItems:   props.justifyItems||'center',
        justifySelf:    props.justifySelf||'center',
        alignContent:   props.alignContent||'center',
        alignItems:     props.alignItems||'center',
        alignSelf:      props.alignSelf||'center'}}>
    {props.children}
    </div>)
};

function Row(props) {
    return (<div style={{...props.style, display: props.display||"flex", background: props.background,
        justifyContent: props.justifyContent||'center',
        justifyItems:   props.justifyItems||'center',
        justifySelf:    props.justifySelf||'center',
        alignContent:   props.alignContent||'center',
        alignItems:     props.alignItems||'center',
        alignSelf:      props.alignSelf||'center'}}>
    {props.children}
    </div>)
};

export {Col, Row};