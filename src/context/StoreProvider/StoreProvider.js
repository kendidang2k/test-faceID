import React, { createContext, useState } from 'react'

export const StoreContext = createContext();

export default function StoreProvider({ children }) {
    const [videoRefCam, setVideoRefCam] = useState()

    return (
        <StoreContext.Provider value={{
            videoRefCam, setVideoRefCam
        }}>
            {children}
        </StoreContext.Provider>
    )
}