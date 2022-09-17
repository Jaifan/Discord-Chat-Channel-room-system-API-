const axios = require('axios');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjM1NzViNjQ5MTRjYzlmZjdiMDZiOCIsImVtYWlsIjoibWFvMTIxM0BnbWFpbC5jb20iLCJuYW1lIjoiTW9heWEgSmFubmF0IiwiaWF0IjoxNjYzMzQ5NzkxLCJleHAiOjE2NjM0MzYxOTF9.RyfeKbNYFFO6EH_P2SDpMSw2dekz5tQ4gpILEBGQ1ho'
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    
    }
    const data = {
        meetName: "Coding Room",
        meetPassword: 'hello123'
    }

const create=async()=>{
    try {
        const res = await axios.post('http://localhost:5000/api/v1/auth/register',{
            firstName: "Arifa",
            secondName: 'Akter',
            email: 'arifa1213@gmail.com',
            password: 'Hello3',
        })
        console.log(res.data, res.status, res.statusText);
    } catch (error) {
        console.log(error.response.data,error.response.status,error.response.statusText);        
    }

}



const deleteAll =async()=>{
    try {
        const res = await axios.delete('http://localhost:5000/api/v1/auth/register');
        console.log(res.data, res.status, res.statusText);
    } catch (error) {
        console.log(error.response.data,error.response.status,error.response.statusText);        
    }

}

const getAll =async()=>{
    try {
        const res = await axios.get('http://localhost:5000/api/v1/auth/register');
        console.log(res.data, res.status, res.statusText);
    } catch (error) {
        console.log(error.response.data,error.response.status,error.response.statusText);        
    }

}


const login=async()=>{
    try {
        const res = await axios.post('http://localhost:5000/api/v1/auth/login',{
            email: 'mao1213@gmail.com',
            password: 'Hello3',
        })
        console.log(res.data, res.status, res.statusText);
    } catch (error) {
        console.log('err');
        console.log(error.response.data,error.response.status,error.response.statusText);        
    }
}
const createMeet=async()=>{
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    
    }
    const data = {
        meetName: "Coding Room",
        meetPassword: 'hello123'
    }
    try {
        const res = await axios.post('http://localhost:5000/api/v1/meetroom/',data,config);
        console.log(res.data,res.status, res.statusText);
    } catch (error) {
        console.log('err');
        console.log(error.response.data,error.response.status,error.response.statusText);
    }
    
}
const meet=async()=>{
    try {
        let value = await axios.get('http://localhost:5000/api/v1/meetroom/',config);
        console.log(value.data);
    } catch (error) {
        console.log(error);
    }
}
const addMember=async()=>{
    try {
        const res = await axios.post('http://localhost:5000/api/v1/meetroom/addMember',data,config);
        console.log(res.data);
    } catch (error) {
        console.log(error.response.data);
    }
}
const removeMember=async()=>{
    try {
        const res = await axios.get('http://localhost:5000/api/v1/meetroom/632305b4524eb7284faa99a6/removeMember',config);
        console.log(res.data);
    } catch (error) {
        console.log(error.response.data);
    }
}

const removeMemberOwner=async()=>{
    try {
        const res = await axios.get('http://localhost:5000/api/v1/meetroom/632305b4524eb7284faa99a6/removeMember/63232bf405da41a916637f49',config);
        console.log(res.data);
    } catch (error) {
        console.log(error.response.data);
    }
}
const sendmsg=async()=>{
    try {
        const res = await axios.post('http://localhost:5000/api/v1/meetroom/632359553d8fe83ad38f19c9/sendMessage',{
            message: 'Hello System'
        },config);
        console.log(res.data);
    } catch (error) {
        console.log(error.response.data);
    }
}
const removemsg=async()=>{
    try {
        const res = await axios.get('http://localhost:5000/api/v1/meetroom/632359553d8fe83ad38f19c9/removeMessage/632568fd4205be30fffb3079',config);
        console.log(res.data);
    } catch (error) {
        console.log(error.response.data);
    }
}
removemsg();






