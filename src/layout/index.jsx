import { Box } from '@mui/material'
import React from 'react'
import CustomDrawer from './CustomDrawer'
import CssBaseline from '@mui/material/CssBaseline';
export default function Layout({ children }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <CustomDrawer />
            <Box
                flexGrow={1}
                bgcolor='background.default'
                p={3}
                component="main"
            >
                {children}
            </Box>
        </Box>
    )
}
