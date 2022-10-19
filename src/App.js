import logo from './logo.svg';
import './App.css';
import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js'
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import * as facemesh from '@tensorflow-models/facemesh';
import * as tf from '@tensorflow/tfjs'
import { netCfg } from './config';

const stepFlow = [
  {
    id: 1,
    text: "Let's shook your head !!",
    status: false
  },
  {
    id: 2,
    text: "Let's bring your face closer !!",
    status: false
  },
  {
    id: 3,
    text: "Let's smile !!",
    status: false
  },
  {
    id: 4,
    text: "Let's shook your head !!",
    status: false
  },
  {
    id: 5,
    text: "Let's shook your head !!",
    status: false
  },
]

function App() {

  // const value = System.Configuration.ConfigurationManager.AppSettings[net];
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  const [noti, setNoti] = useState("")
  const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
  const [faceStatus, setFaceStatus] = useState({
    straight: false,
    left: false,
    right: false,
    up: false,
    down: false
  })
  const detectorConfig = {
    runtime: 'mediapipe',
    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
    // or 'base/node_modules/@mediapipe/face_mesh' in npm.
  };


  const runFacemess = async () => {
    // const model = await tf.train save('./detectbb.cfg')
    const faceApiNet = new faceapi.SsdMobilenetv1Options();
    const net = await facemesh.load(netCfg);
    const detector = await faceLandmarksDetection.createDetector(model, detectorConfig);
    setInterval(() => {
      // stepFlow.forEach(element => {

      // });
      detect(detector)
    }, 1000);
  }

  const detect = async (net) => {
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const estimationConfig = { flipHorizontal: false };
      const faces = await net.estimateFaces(video, estimationConfig);
      // const face = await net.estimateFaces(video)
      // const faceapi = await net.detectAllFaces(video)
      // if (face[0].scaledMesh[0].1 > face[0].scaledMesh[0].1) {

      // }
      // console.log("🚀 ~ file: App.js ~ line 68 ~ detect ~ face", face);
      // console.log("🚀 ~ file: App.js ~ line 68 ~ detect ~ face", faces[0].keypoints.filter(item => item.name == "lips"));
      const leftCoordinates = faces[0].keypoints[234];
      console.log("🚀 ~ file: App.js ~ line 95 ~ detect ~ leftCoordinates", leftCoordinates)
      const rightCoordinates = faces[0].keypoints[356];
      console.log("🚀 ~ file: App.js ~ line 96 ~ detect ~ rightCoordinates", rightCoordinates)
      const topCoordinates = faces[0].keypoints[10];
      console.log("🚀 ~ file: App.js ~ line 98 ~ detect ~ topCoordinates", topCoordinates)
      const bottomCoordinates = faces[0].keypoints[152];
      console.log("🚀 ~ file: App.js ~ line 100 ~ detect ~ bottomCoordinates", bottomCoordinates)
      // if (faceCoordinates.x > 290 && faceCoordinates.x < 320) {
      //   setFaceStatus({ ...faceStatus, straight: true })
      // }
      // if (faceCoordinates.x > 350) {
      //   setFaceStatus({ ...faceStatus, left: true })
      // }
      // if (faces[0].keypoints.filter(item => item.name == "faceOval")[0].x > 350) {
      //   setFaceStatus(faceStatus.left == true)
      // }
      // if (faces[0].keypoints.filter(item => item.name == "faceOval")[0].x > 350) {
      //   setFaceStatus(faceStatus.left == true)
      // }
      // if (faces[0].keypoints.filter(item => item.name == "faceOval")[0].x > 350) {
      //   setFaceStatus(faceStatus.left == true)
      // }

      // return face;

    }
  }

  runFacemess();

  return (
    <div className="App">
      {/* <div>
        {
          stepFlow.map((item, index) => {
            return (
              <div key={item.id}>
                <p>Step {item.id}</p>
                <p>{item.text}</p>
              </div>
            )
          })
        }
      </div> */}
      <p>{noti}</p>
      <Webcam className='webcam' ref={webcamRef} />
      <canvas className='webcam' ref={canvasRef} />
      <div className='cover__action'>
        <div className={faceStatus.straight ? 'action straight active' : 'action straight'}>
          Look straight
        </div>
        <div className={faceStatus.left ? 'action left active' : 'action left'}>
          Turn left
        </div>
        <div className={faceStatus.right ? 'action right active' : 'action right'}>
          Turn right
        </div>
        <div className={faceStatus.up ? 'action above active' : 'action above'}>
          Look up
        </div>
        <div className={faceStatus.down ? 'action under active' : 'action under'}>
          Look down
        </div>
      </div>
    </div>
  );
}

export default App;
