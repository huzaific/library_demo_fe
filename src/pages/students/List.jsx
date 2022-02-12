import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, CircularProgress, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Edit, PreviewOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import * as StudentActions from '../../actions/students';
import { useHistory } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

export default function StudentsListingPage() {

  const { data:students , loading } = useFetch(StudentActions.fetchStudents)

  return (
    <Container maxWidth="lg" >
      {loading ?
        <CircularProgress /> :
        <>
          <Typography variant="h4" gutterBottom component="div">
            Students
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="left">Firstname</TableCell>
                  <TableCell align="left">Lastname</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="center">Actions</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {students && students.map((student) => <StudentTableRow key={student.id} data={student} />)}
              </TableBody>
            </Table>
          </TableContainer>
        </>}
    </Container>
  )
}


function StudentTableRow({ data }) {

  const history = useHistory()
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {data.id}
      </TableCell>
      <TableCell align="left">{data.firstname}</TableCell>
      <TableCell align="left">{data.lastname}</TableCell>
      <TableCell align="left">{data.email}</TableCell>
      <TableCell align="justify">

        <Box justifyContent={'space-around'} display={'flex'}>
          <IconButton onClick={() => history.push(`/students/${data.id}`)} color="primary" aria-label="view" component="span">
            <PreviewOutlined />
          </IconButton>

          <IconButton onClick={() => history.push(`/students/${data.id}/edit`)} color="primary" aria-label="view" component="span">
            <Edit />
          </IconButton>

        </Box>

      </TableCell>
    </TableRow>
  )
}
