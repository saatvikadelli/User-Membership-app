import axios from 'axios';

const URL = "http://localhost:5000/api/users";

export const getUser = async (id)=>{
    try{
        return await axios.get(`${URL}/${id}`)
        
    }catch(error){
        console.log("error while calling API getUser",error)
    }
}

export const editUser = async (user , id) =>{
    try{
        return await axios.post(`${URL}/${id}`, user);
    }catch(error){
        console.log("error while calling editUser API",error)
    }
}