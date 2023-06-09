import axios from 'axios';
import {baseUrl} from "../config/const";
import authHeader from "./auth-header";
import {bool} from "prop-types";

const headers = authHeader();

const createLecture = (description, entities) => {
    console.log("trying to create lecture: " + description + " " + entities.length)
    return (axios.post(`${baseUrl}/lecture`,
        {
            "description": description,
            "lectureEntities": entities
        },{headers}).then(response => {
        console.log(response)
        return response
    }));
}

const getAllLectures = () => {
    console.log("trying to get all lectures")
    return (axios.get(`${baseUrl}/lecture`,{headers}).then(response => {
        console.log(response)
        return response
    }));
}

const getLectureById = (id) => {
    console.log("trying to get lecture " + id)
    return (axios.get(`${baseUrl}/lecture/${id}`,{headers}).then(response => {
        console.log(response)
        return response
    }));
}

const updateLecture = (id, description, entities) => {
    console.log("trying to update lecture: " + description + " " + entities.length)
    return (axios.patch(`${baseUrl}/lecture/${id}`,
        {
            "description": description,
            "lectureEntities": entities
        },{headers}).then(response => {
        console.log(response)
        return response
    }));
}

const getLast = () => {
    console.log("trying to get last lecture")
    return (axios.get(`${baseUrl}/lecture/last`,{headers}).then(response => {
        console.log(response)
        return response
    }));
}

const isActive = (id) => {
    return (axios.get(`${baseUrl}/lecture/${id}/active`,{headers}).then(response => {
        console.log(response)
        return response
    }));
}

const setActive = (id, active) => {
    return (axios.post(`${baseUrl}/lecture/${id}`,{
        active:active
    },{headers}).then(response => {
        console.log(response)
        return response
    }));
}

const setActiveItem = (id, active) => {
    return (axios.post(`${baseUrl}/lecture/${id}/last`,{
        id:active
    },{headers}).then(response => {
        console.log(response)
        return response
    }));
}

const getActiveItem = (id) => {
    return (axios.get(`${baseUrl}/lecture/${id}/last`,{headers}).then(response => {
        console.log(response)
        return response
    }));
}


const MaterialsApi = {
    createLecture, getAllLectures, getLectureById, updateLecture, getLast, isActive, setActive, setActiveItem, getActiveItem
};
export default MaterialsApi;