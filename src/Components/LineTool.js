import React from "react";

/* Array of coordinates */
var colors = [];

/*Line Properties*/
var LineProps =
React.createClass({
    render:function(){
      var circleStyle = {
        padding:10,
        margin:20,
        display:"inline-block",
        backgroundColor: this.props.bgColor,
        borderRadius: "50%",
        width:100,
        height:100,
      };
      return (
        <div style={circleStyle}>
        </div>
      );
    }
  });

  var renderData = [];

  for (var i = 0; i < colors.length; i++) {
    var color = colors[i];
    renderData.push(<Circle key={i + color} bgColor={color}/>);
  }


function LineTool(props)
{
    return(
    <div style={{}}>
    </div>)
}

export default LineTool; 