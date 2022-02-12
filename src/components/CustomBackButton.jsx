import React from 'react'
import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';

export default function CustomBackButton() {
    const history = useHistory()
    return (
        <IconButton onClick={history.goBack}>
            <ArrowBack />
        </IconButton>

    )
}
