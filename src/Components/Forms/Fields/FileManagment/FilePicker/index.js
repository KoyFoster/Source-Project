/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
import React from 'react';

class FileTools extends React.Component {
  static GetFileBlob = (File, setData) => {
    const urlPromise = new Promise(function makePromise(resolve, reject) {
      // file reader
      const reader = new FileReader();
      // read data
      reader.readAsDataURL(File);

      // on load end
      reader.onloadend = function () {
        // set data via function
        if (setData) {
          setData(reader.result);
        }
      };
    });
    return urlPromise;
  };

  static dataURLtoBlob(dataURL) {
    // convert base64 to raw binary data held in a string
    const byteString = atob(dataURL);

    // separate out the mime component
    // const mimeString = dataURL
    //   .split(',')[0]
    //   .split(':')[1]
    //   .split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    // const arrayBuffer = new ArrayBuffer(byteString.length);
    // const ia = new Uint8Array(arrayBuffer);
    const byteBlob = [];
    for (let i = 0; i < byteString.length; i) {
      // ia[i] = byteString.charCodeAt(i);
      byteBlob.push(byteString.charCodeAt(i));
      i += 1;
    }

    // const dataView = new DataView(arrayBuffer);
    // const blob = new Blob([dataView], { type: mimeString });
    return byteBlob;
  }
}

const FilePicker = props => {
  // Upload
  const Upload = File => {
    const FileCopy = { ...File };
    const urlPromise = new Promise(function makePromise(resolve, reject) {
      // file reader
      const reader = new FileReader();
      // read data
      reader.readAsDataURL(File);

      // on load end
      reader.onloadend = function () {
        // set data via value
        props.setValue ? props.setValue(reader.result) : undefined;
        // set data via function
        if (props.getData) {
          props.getData({
            FileName: File.name,
            File: FileCopy,
            Icon: reader.result,
          });
        }
      };
    });
    return urlPromise;
  };

  function download(filename, data) {
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      // `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`,
      data,
    );
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  // Download
  const Download = FileName => {
    if (!props.data) return;
    download(FileName ? `Untitled_${FileName}` : 'Untitled.JPEG', props.data);
  };

  // eslint-disable-next-line no-unused-vars
  function getDataURL(File) {
    if (File === undefined) return '';
    return Upload(File);
  } // End of getDataURL

  function getFileName(e) {
    if (e.target.files.length <= 0) return '-Missing-';
    return e.target.files[0].name;
  }

  // eslint-disable-next-line no-unused-vars
  const HandleChange = e => {
    if (props.directory) {
      Download();
    } else if (e.target.files.length > 0) {
      getDataURL(e.target.files[0]);
    } // this is the cancel case
    else {
      // props.setValue ? props.setValue('') : undefined;
    }
  };

  return (
    <button
      type="button"
      style={{ padding: 0, margin: 0, justifyItems: 'center' }}
      onClick={e => {
        props.directory ? HandleChange(e) : null;
      }}
    >
      <label
        style={{
          padding: 0,
          margin: 0,
          alignSelf: 'center',
        }}
      >
        {props.directory ? null : (
          <input
            type="file"
            className="file-picker"
            id="contained-button-file"
            accept="image/*"
            // multiple
            onChange={e => {
              HandleChange(e);
            }}
          />
        )}
        {/* eslint-disable-next-line react/prop-types */}
        {props.children}
      </label>
    </button>
  );
};

export { FilePicker, FileTools };
