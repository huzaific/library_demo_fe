import React from 'react'
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import BookEditPage from './pages/books/Edit';
import BooksListingPage from './pages/books/List';
import BookViewPage from './pages/books/View';
import StudentEditPage from './pages/students/Edit';
import StudentsListingPage from './pages/students/List';
import StudentViewPage from './pages/students/View';

export default function Router() {
    return (

        <Switch>

            <Route exact path="/books">
                <BooksListingPage />
            </Route>

            <Route exact path="/books/:id">
                <BookViewPage />
            </Route>

            <Route exact path="/books/:id/edit">
                <BookEditPage />
            </Route>

            <Route exact path="/students">
                <StudentsListingPage />
            </Route>

            <Route exact path="/students/:id">
                <StudentViewPage />
            </Route>

            <Route path="/students/:id/edit">
                <StudentEditPage />
            </Route>

            <Route path="/">
                <Redirect
                    to={{
                        pathname: "/students"
                    }}
                />
            </Route>

        </Switch>
    )
}
