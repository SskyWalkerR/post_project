import { getPost } from "../services/lib/postApi"

export const fetchPost = async(id) => {
    try {
        const response = await getPost(id)
        return {response}
    } catch (error) {
        if(error.response.data.message === "Post with id 'undefined' not found"){
            return {response:error.response.data.message}
        }
    }
}