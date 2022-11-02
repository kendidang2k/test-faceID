import React, { createContext, useState } from "react";

export const StoreContext = createContext();

export default function StoreProvider({ children }) {
  const [videoRefCam, setVideoRefCam] = useState();
  const [isSwitchCam, setIsSwitchCam] = useState(false);
  const [frontCard, setFrontCard] = useState();
  const [backCard, setBackCard] = useState();
  const [moveToNextStep, setMoveToNextStep] = useState(false);
  const [istakePhotoAction, setIsTakePhotoAction] = useState(false);
  const [straightPhoto, setStraightPhoto] = useState();
  const [leftPhoto, setLeftPhoto] = useState();
  const [rightPhoto, setRightPhoto] = useState();
  const [upPhoto, setUpPhoto] = useState();
  const [downPhoto, setDownPhoto] = useState();
  const [detectFailModalVisible, setDetectFailModalVisible] = useState(false);
  const [compareFace, setCompareFace] = useState(true);

  const [isUploadFrontCard, setStatusUploadFrontCard] = useState(true);
  const [isUploadBackCard, setStatusUploadBackCard] = useState(false);
  const [isUploadLiveNess, setStatusUploadLiveNess] = useState(false);

  const [videoFrontCardUrl, setVideoFrontCard] = useState("");
  const [videoBackCardUrl, setVideoBackCard] = useState("");
  const [videoLiveNessUrl, setVideoLiveNess] = useState("");

  return (
    <StoreContext.Provider
      value={{
        videoRefCam,
        setVideoRefCam,
        moveToNextStep,
        setMoveToNextStep,
        istakePhotoAction,
        setIsTakePhotoAction,
        frontCard,
        setFrontCard,
        backCard,
        setBackCard,
        isSwitchCam,
        setIsSwitchCam,
        straightPhoto,
        setStraightPhoto,
        leftPhoto,
        setLeftPhoto,
        rightPhoto,
        setRightPhoto,
        upPhoto,
        setUpPhoto,
        downPhoto,
        setDownPhoto,
        detectFailModalVisible,
        setDetectFailModalVisible,
        compareFace,
        setCompareFace,
        videoFrontCardUrl,
        setVideoFrontCard,
        videoBackCardUrl,
        setVideoBackCard,
        videoLiveNessUrl,
        setVideoLiveNess,
        isUploadFrontCard,
        setStatusUploadFrontCard,
        isUploadBackCard,
        setStatusUploadBackCard,
        isUploadLiveNess,
        setStatusUploadLiveNess,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
