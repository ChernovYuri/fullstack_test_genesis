import axios from 'axios'

export const instance = axios.create({
    baseURL: 'http://localhost:3000/api'
})

export const entityAPI = {
    createEntity(entityType: string) {
        return instance.post<any>('/create', {entityType: entityType})
            .then(response => {
                return response.data
            }).catch((err) => {
                console.error(err)
            })
    }
}
