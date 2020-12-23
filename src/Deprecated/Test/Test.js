import React from 'react';
import Drag from '../../Components/Forms/Drag';

const Test = (props) => {
  // const [checked, setChecked] = useState(false);
  // const [value, setValue] = useState('');

  // const handleChange = (e) => {
  //   setValue(e.target.value);
  // };

  return (
    <div
      style={
        {
          // position: 'absolute',
          // top: '100px',
          // left: '100px',
        }
      }
    >
      <Drag></Drag>
    </div>
  );
};

export default Test;
