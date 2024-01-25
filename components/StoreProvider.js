
import React from 'react'
import { Toaster } from './ui/toaster'

const StoreProvider = ({children}) => {
  return (
   <main>
     {children}
    <Toaster />
   </main>
  )
}

export default  StoreProvider;