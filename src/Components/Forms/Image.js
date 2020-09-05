/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */

class Image {
  // base members
  // this.data
  // this.dataTN = dataTN;
  // this.imgFormat = imgFormat;
  // this.imgPath = imgPath;

  // bahaves as a data type constructor
  constructor(dataTN, imgFormat, imgPath) {
    this.setup(dataTN, imgFormat, imgPath);
  }

  setup = (dataTN, imgFormat, imgPath) => {
    this.dataTN = dataTN;
    this.imgFormat = imgFormat;
    this.imgPath = imgPath;

    // check for missing image format
    let i = this.dataTN.search('data:image');

    if (i > -1) {
      i = this.dataTN.search(',');

      if (!this.imgFormat) {
        const iSlash = this.dataTN.search('/') + 1;
        const iSemi = this.dataTN.search(';');
        const imgType = this.dataTN.substr(iSlash, iSemi - iSlash);
        this.imgFormat = Image.getImgTypeID(imgType);
      }
    }
    // subtract image type if present
    if (i > -1) this.dataTN = this.dataTN.substr(i + 1, this.dataTN.length);
  };

  getDataBlob = () => {
    // convert base64 to raw binary data held in a string
    const byteString = atob(this.dataTN);

    const byteBlob = [];
    for (let i = 0; i < byteString.length; i) {
      byteBlob.push(byteString.charCodeAt(i));
      i += 1;
    }
    return byteBlob;
  };

  getData = () => this.getDataFormat(this.dataTN, this.imgFormat);

  getDataFormat(data, id) {
    return `data:image/${Image.getImgType(id)};base64,${data}`;
  }

  getExt = () => Image.getImgType(this.data.imgFormat);

  static getImgType = (id) => {
    switch (id) {
      case 85:
        return 'png';

      case 156:
        return 'tiff';

      case 31:
      default:
        return 'jpeg';
    }
  };

  static getImgTypeID = (type) => {
    switch (type.toLowerCase()) {
      case 'png':
        return 85;

      case 'tiff':
        return 156;

      case 'jpeg':
      case 'jpg':
      default:
        return 31;
    }
  };
}

// class Image extends React.Component {
//   render() {
//     return (
//       <svg style={props.style}>
//         <rect stroke-alignment="inside" />
//         <image
//           style={{
//             width: '100%',
//             height: '100%',
//           }}
//           href={
//             props.value
//               ? props.isPath
//                 ? `${process.env.API_URL}/exam/images/${props.value}`
//                 : `data:image/tiff;base64,${props.value}`
//               : undefined
//           } // can accept image value directly if desired
//         />
//       </svg>)
//   }
// }

export default Image;
