import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, CircularProgress, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import * as BookActions from '../../actions/books';
import * as StudentActions from '../../actions/students';
import { useHistory, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import AdapterDateFns from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import CustomBackButton from '../../components/CustomBackButton';

export default function BookEditPage() {

    const { id } = useParams()

    const { data: book, loading: fetchLoading } = useFetch(() => BookActions.fetchSingleBook(id))
    const { data: students } = useFetch(StudentActions.fetchStudents)


    const [loading, setLoading] = React.useState(false)


    const [name, setName] = React.useState('')
    const [author, setAuthor] = React.useState('')
    const [dateOfBorrow, setDateOfBorrow] = React.useState()
    const [dateOfReturn, setDateOfReturn] = React.useState()
    const [borrowedBy, setBorrowedBy] = React.useState(0)

    const history = useHistory()

    React.useEffect(() => {
        if (!fetchLoading && book) {
            setName(book.name);
            setAuthor(book.author)
            setDateOfBorrow(book.date_of_borrow && dayjs(book.date_of_borrow))
            setDateOfReturn(book.date_of_return && dayjs(book.date_of_return))
            setBorrowedBy(book.borrowed_by_id)
        }
        return () => { }
    }, [fetchLoading, book])

    const onBorrowedByChange = (e) => {
        setBorrowedBy(e.target.value)

        if (e.target.value === 0) {
            setDateOfBorrow(null)
            setDateOfReturn(null)
        }
    }

    const onUpdateClick = () => {
        setLoading(true)
        BookActions.updateBook(id, {
            name,
            author,
            date_of_borrow: dateOfBorrow?.toISOString() || null,
            date_of_return: dateOfReturn?.toISOString() || null,
            borrowed_by_id: borrowedBy !== 0 ? borrowedBy : null
        })
            .then(response => {
                history.push(`/books/${id}`)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setLoading(false))
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Container maxWidth="lg">

                <CustomBackButton />

                <Typography p={2} variant="h4" gutterBottom component="div">
                    {book?.name}
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
                                <TextField id="outlined-basic" value={name} onChange={(e) => setName(e.target.value)} fullWidth label="Name" variant="outlined" />

                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="outlined-basic" value={author} onChange={(e) => setAuthor(e.target.value)} fullWidth label="Author" variant="outlined" />

                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Borrowed By</InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={borrowedBy}
                                        label="Borrowed By"
                                        onChange={onBorrowedByChange}
                                    >
                                        <MenuItem value={0}>none</MenuItem>
                                        {students?.map(student => <MenuItem key={student.id} value={student.id}>{student.firstname}</MenuItem>)}

                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>

                                <DesktopDatePicker
                                    label="Date of Borrow"
                                    inputFormat="MM/DD/YYYY"
                                    value={dateOfBorrow}
                                    onChange={(value) => setDateOfBorrow((value))}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />

                            </Grid>
                            <Grid item xs={6}>
                                <DesktopDatePicker
                                    label="Date of Return"
                                    inputFormat="MM/DD/YYYY"
                                    value={dateOfReturn}
                                    onChange={(value) => setDateOfReturn((value))}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
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
        </LocalizationProvider>

    )
}
