import { axiosInstance } from "../config"

export const fetchStudents = () => {
    return axiosInstance.get('/users')
        .then(response => response.data)
        .catch(err => {
            throw err
        })
}

export const fetchSingleStudent = (id) => {
    return axiosInstance.get(`/users/${id}`)
        .then(response => response.data)
        .catch(err => {
            throw err
        })
}

export const updateStudent = (id, data) => {
    return axiosInstance.put(`/users/${id}`, data)
        .then(response => response.data)
        .catch(err => {
            throw err
        })
}