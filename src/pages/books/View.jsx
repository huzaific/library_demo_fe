import { Container, Divider, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import * as BookActions from '../../actions/books';
import * as StudentActions from '../../actions/students';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../utils/helper';
import useFetch from '../../hooks/useFetch';
import CustomViewDetailsCard from '../../components/CustomViewDetailsCard';
import CustomBackButton from '../../components/CustomBackButton';

export default function BookViewPage() {

  const { id } = useParams()

  const { data: book, loading } = useFetch(() => BookActions.fetchSingleBook(id))

  const { data: student, fetch: fetchStudent } = useFetch(() => StudentActions.fetchSingleStudent(book?.borrowed_by_id), false)

  useEffect(() => {
    if (book)
      fetchStudent()
  }, [book])

  return (
    <Container maxWidth="lg">

      <CustomBackButton />
      <Typography p={2} variant="h4" gutterBottom component="div">
        {book?.name}
      </Typography>
      <Divider />

      <CustomViewDetailsCard data={book && [
        {
          title: 'Name',
          value: book.name
        },
        {
          title: 'Author',
          value: book.author
        },
        {
          title: 'Borrowed By',
          value: student?.firstname
        },
        {
          title: 'Date of Borrow',
          value: formatDate(book?.date_of_borrow)
        },
        {
          title: 'Date of Return',
          value: formatDate(book?.date_of_return)
        }
      ]} />

    </Container>
  )
}
