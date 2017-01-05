import React from 'react';
import Quagga from 'quagga';

import { FloatingActionButton, FontIcon } from 'material-ui';

export default class Scanner extends React.Component {
  constructor(props) {
    super(props);
  }

  snapshot() {
    const canvas = document.querySelector('#barcode-scanner > canvas');
    const video = document.querySelector('#barcode-scanner > video');
    canvas.getContext('2d').drawImage(video, 0, 0);
    const scannerDataURL = canvas.toDataURL();
  }

  // Initiate the barcode scanner on component mount
  componentDidMount() {
    const video = document.querySelector('#barcode-scanner > video');
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { video: true },
        (stream) => {
          video.src = window.URL.createObjectURL(stream);
        },
        (err) => console.error(err)
      );
    } else {
      console.log('getUserMedia is not supported')
    }
  }

  // Turn off the camera
  componentWillUnmount() {
    // Quagga.stop();
  }

  render() {
    return (
    <div id="scanner">
      <div id="barcode-scanner">
        <video autoPlay="true" />
        <canvas />
      </div>
      <FloatingActionButton onClick={ this.snapshot }>
        <FontIcon className={'material-icons'}>photo_camera</FontIcon>
      </FloatingActionButton>
    </div>
    )
  }
}


//QUAGGA STATIC IMAGE ANALYSIS ATTEMPT
// Quagga.decodeSingle({
//   decoder: {
//     readers: ['ean_reader']
//   },
//   locate: true,
//   src: scannerDataURL
// }, function(result) {
//   if (result && result.codeResult) {
//     console.log('result', result.codeResult.code);
//   } else {
//     console.log('not detected');
//   }
// });

// QUAGGA STREAMING ATTEMPT
// detectedBarcode(result) {
//   console.log(result);
//   if (result && result.code) console.log(result.code);
// }
// processedBarcode(result) {
//   console.log(result);
//   if (result) console.log(result.code);
// }
// Quagga.init({
//   inputStream: {
//     name: 'Live',
//     type: 'LiveStream',
//     target: '#barcode-scanner'
//   },
//   decoder: {
//     readers: ['ean_reader', 'upc_reader']
//   },
//   locator: {
//     debug: {
//       showCanvas: true,
//       showPatches: true,
//       showFoundPatches: true,
//       showSkeleton: true
//     }
//   }
// }, (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('Initialization finished. Ready to start');
//   Quagga.onProcessed(this.processedBarcode);
//   Quagga.onDetected(this.detectedBarcode);
//   Quagga.start();
// });