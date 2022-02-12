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
import * as BookActions from '../../actions/books';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import { formatDate } from '../../utils/helper';
import useFetch from '../../hooks/useFetch';

export default function BooksListingPage() {

  const { data:books , loading } = useFetch(BookActions.fetchBooks)

  return (
    <Container maxWidth="lg" >
      {loading ?
        <CircularProgress /> :
        <>
          <Typography variant="h4" gutterBottom component="div">
            Books
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Author</TableCell>
                  <TableCell align="left">Borrowed By</TableCell>
                  <TableCell align="center">Date Of Borrow</TableCell>
                  <TableCell align="center">Expected Date Of Return</TableCell>
                  <TableCell align="center">Actions</TableCell>


                </TableRow>
              </TableHead>
              <TableBody>
                {books && books.map((book) => <BookTableRow key={book.id} data={book} />)}
              </TableBody>
            </Table>
          </TableContainer>
        </>}
    </Container>
  )
}

function BookTableRow({ data }) {

  const history = useHistory()
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {data.id}
      </TableCell>
      <TableCell align="left">{data.name}</TableCell>
      <TableCell align="left">{data.author}</TableCell>
      <TableCell align="left">{data.firstname}</TableCell>
      <TableCell align="center">{formatDate(data.date_of_borrow)}</TableCell>
      <TableCell align="centers">{formatDate(data.date_of_return)}</TableCell>

      <TableCell align="justify">

        <Box justifyContent={'space-around'} display={'flex'}>
          <IconButton onClick={() => history.push(`/books/${data.id}`)} color="primary" aria-label="view" component="span">
            <PreviewOutlined />
          </IconButton>

          <IconButton onClick={() => history.push(`/books/${data.id}/edit`)} color="primary" aria-label="view" component="span">
            <Edit />
          </IconButton>

        </Box>

      </TableCell>
    </TableRow>
  )
}