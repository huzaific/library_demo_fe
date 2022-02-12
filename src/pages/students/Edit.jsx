import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, CircularProgress, Container, Grid, Paper, Typography } from '@mui/material';
import * as StudentActions from '../../actions/students';
import { useHistory, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { LoadingButton } from '@mui/lab';
import CustomBackButton from '../../components/CustomBackButton';

export default function StudentEditPage() {

    const { id } = useParams()

    const { data: student, loading: fetchLoading } = useFetch(() => StudentActions.fetchSingleStudent(id))

    const [loading, setLoading] = React.useState(false)

    const [firstname, setFirstname] = React.useState('')
    const [lastname, setLastname] = React.useState('')
    const [email, setEmail] = React.useState('')

    const history = useHistory()

    React.useEffect(() => {
        if (!fetchLoading && student) {
            setFirstname(student.firstname)
            setLastname(student.lastname)
            setEmail(student.email)
        }

        return () => { }
    }, [fetchLoading, student])

    const onUpdateClick = () => {
        setLoading(true)
        StudentActions.updateStudent(id, {
            firstname,
            lastname,
            email
        })
            .then(response => {
                history.push(`/students/${id}`)
            })
            .catch(err => {

            })
            .finally(() => setLoading(false))
    }

    return (
        <Container maxWidth="lg">

            <CustomBackButton />
            <Typography p={2} variant="h4" gutterBottom component="div">
                {student?.firstname}
            </Typography>
            <Paper elevation={2}>
                <Box
                    flex={1}
                    component="form"
                    noValidate
                    autoComplete="off"
                    padding={2}
                >

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField id="outlined-basic" value={firstname} onChange={(e) => setFirstname(e.target.value)} fullWidth label="Firstname" variant="outlined" />

                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="outlined-basic" value={lastname} onChange={(e) => setLastname(e.target.value)} fullWidth label="Lastname" variant="outlined" />

                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth label="Email" variant="outlined" />
                        </Grid>

                        <Grid item xs={12}>

                            <LoadingButton onClick={onUpdateClick} loading={loading} variant="outlined">
                                Update
                            </LoadingButton>

                        </Grid>


                    </Grid>

                </Box>
            </Paper>
        </Container>

    )
}
