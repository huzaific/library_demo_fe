import { Container, Divider, Typography } from '@mui/material'
import React from 'react'
import * as StudentActions from '../../actions/students';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import CustomViewDetailsCard from '../../components/CustomViewDetailsCard';
import CustomBackButton from '../../components/CustomBackButton';

export default function StudentViewPage() {

  const { id } = useParams()

  const { data: student, loading } = useFetch(() => StudentActions.fetchSingleStudent(id))

  return (
    <Container maxWidth="lg">

      <CustomBackButton />


      <Typography p={2} variant="h4" gutterBottom component="div">
        {student?.firstname}
      </Typography>
      <Divider />

      <CustomViewDetailsCard data={student && [
        {
          title: 'Firstname',
          value: student.firstname
        },
        {
          title: 'Lastname',
          value: student.lastname
        },
        {
          title: 'Email',
          value: student.email
        }
      ]} />

    </Container>
  )
}
