import axios from 'axios'

const ERR_OK = 0

export function get(url) {
    return function (params = {}) {
        return axios.get(url, {
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
