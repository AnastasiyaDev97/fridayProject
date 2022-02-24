import {instance} from "../apiConfig";



export const fileAPI = {
    async setFile(file: File) {
        let formData = new FormData()
        formData.append('image', file)
        const res = await instance.post(`file`, formData);
        return res.data;
    },

    getFile() {
        return instance.get(`file`)
            .then(res => res.data)
    },
    }