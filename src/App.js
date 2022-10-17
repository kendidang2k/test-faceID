import logo from './logo.svg';
import './App.css';
import { useRef } from 'react';
import Webcam from 'react-webcam';
import { FaceMesh } from '@tensorflow-models/facemesh';

function App() {

  const webcamRef = useRef(null)
  const canvasRef = useRef(null)

  const runFacemess = async () => {
    const net = await FaceMesh.load({
      inputResolution: { width: '700px', height: '700px' },
      scale: 0.8,
    });
    setInterval(() => {
      detect(net)
    }, 100);
  }

  const detect = async (net) => {
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readState === 4) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const face = await net.estimateFaces(video)
      console.log("🚀 ~ file: App.js ~ line 32 ~ detect ~ face", face)

    }
  }

  return (
    <div className="App">
      <Webcam className='webcam' ref={webcamRef} />
      <canvas className='canvas' ref={canvasRef} />
    </div>
  );
}

export default App;
