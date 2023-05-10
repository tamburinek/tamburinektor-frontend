import axios from 'axios';
import {baseUrl} from "../config/const";
import authHeader from "./auth-header";

const headers = authHeader();

const createAnswer = (id, text) => {
    console.log("trying to create question answer: " + text)
    return (axios.post(`${baseUrl}/questionanswer/${id}`,
        {
            "questionId": id,
            "answer" : text
        },{headers}).then(response => {
        console.log(response)
        return response
    }));
}

const getAllAnswers = (id) => {
    return (axios.get(`${baseUrl}/questionanswer/${id}`,{headers}).then(response => {
        console.log(response)
        return response
    }));
}


const MaterialsApi = {
    createAnswer, getAllAnswers
};
export default MaterialsApi;