import { axiosInstance } from "../config"

export const fetchBooks = () => {
    return axiosInstance.get('/books')
        .then(response => response.data)
        .catch(err => {
            throw err
        })
}

export const fetchSingleBook = (id) => {
    return axiosInstance.get(`/books/${id}`)
        .then(response => response.data)
        .catch(err => {
            throw err
        })
}

export const updateBook = (id, data) => {
    return axiosInstance.put(`/books/${id}`, data)
        .then(response => response.data)
        .catch(err => {
            throw err
        })
}