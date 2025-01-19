import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../shared'
import { useSelector } from 'react-redux'

export const MainLayout = () => {
    const authuser = useSelector((state) => state?.auth?.authUser);

  return (
      <React.Fragment>
      {/* <Box> */}
        {authuser && <Navbar />}
              <Outlet/>
          {/* </Box> */}
    </React.Fragment>
  )
}
