import api from './axios'

export const wordExists = (word) => {
    return api.get('/api/validate', { params: { word } }).then(res => res.data.exists)
}