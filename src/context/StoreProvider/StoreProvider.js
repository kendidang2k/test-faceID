import React, { createContext, useState } from 'react'

export const StoreContext = createContext();

export default function StoreProvider({ children }) {
    const [videoRefCam, setVideoRefCam] = useState()
    const [isSwitchCam, setIsSwitchCam] = useState(false)
    const [frontCard, setFrontCard] = useState()
    const [backCard, setBackCard] = useState()
    const [moveToNextStep, setMoveToNextStep] = useState(false)
    const [istakePhotoAction, setIsTakePhotoAction] = useState(false)

    return (
        <StoreContext.Provider value={{
            videoRefCam, setVideoRefCam,
            moveToNextStep, setMoveToNextStep,
            istakePhotoAction, setIsTakePhotoAction,
            frontCard, setFrontCard,
            backCard, setBackCard,
            isSwitchCam, setIsSwitchCam
        }}>
            {children}
        </StoreContext.Provider>
    )
}