import { Paper, Typography } from '@mui/material'
import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';


export default function CustomViewDetailsCard({ data }) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">

                <TableBody>

                    {data?.map((d, index) => (
                        <TableRow key={index}>
                            <TableCell align="left">
                                <Typography variant='h6'>{d.title}</Typography>
                            </TableCell>
                            <TableCell align="left">{d.value}</TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </TableContainer>
    )
}
