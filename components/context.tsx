'use client'
import React, { createContext, useState, useContext } from 'react'

interface ContextType {
    openModal: boolean
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>

}
const Context = createContext<ContextType | undefined>(undefined)

function ContextProvider({ children }: { children: React.ReactNode }) {

    const [openModal, setOpenModal] = useState(false)
    const data = {
        openModal, setOpenModal
    }

    return (
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider

export const useSigortaContext = (): ContextType => {
    const context = useContext(Context)
    if (context === undefined) {
        throw new Error('useDashboardContext must be used within a Provider');
    }
    return context;
}