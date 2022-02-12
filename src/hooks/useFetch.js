import React from 'react'

const useFetch = (action, isInitial = true) => {

    const [data, setData] = React.useState(null)
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)

    const fetch = () => {
        if (action) {
            setLoading(true)
            setData(null)
            setError(null)
            action()
                .then((response) => {
                    setData(response)
                })
                .catch(err => setError(false))
                .finally(() => setLoading(false))
        }
    }

    React.useEffect(() => {
        if (isInitial)
            fetch()
        return () => { }
    }, [])

    return { data, error, loading, fetch }
}

export default useFetch;