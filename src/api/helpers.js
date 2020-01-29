import axios from 'axios'

const urlMap = {
    development: '/',
    production: 'your address'
}
const baseUrl = urlMap[process.env.NODE_ENV]
const ERR_OK = 0

export function get(url) {
    return function (params = {}) {
        return axios.get(baseUrl + url, {
            params
        }).then(res => {
            const {errno, data} = res.data
            if (errno === ERR_OK) {
                return data
            }
            // eslint-disable-next-line no-unused-vars
        }).catch(e => {

        })
    }
}
