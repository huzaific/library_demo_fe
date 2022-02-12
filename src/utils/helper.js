import dayjs from 'dayjs'

export const formatDate = (date) => date && dayjs(date).format('YYYY/MM/DD ddd')