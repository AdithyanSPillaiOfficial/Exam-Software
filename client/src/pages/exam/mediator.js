import { serverAddress } from "../../api";

export var examQuestions = [];

export const fetchQuestions = async () => {
    try {
        const responce = await fetch(serverAddress+'/fetchquestion',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({sessionid : sessionStorage.getItem('sessionId')}),
        });

        if(responce.ok){
            const data = await responce.json();
            console.log('Data Fetched');
            if(data.status==='OK'){
                examQuestions = data.questions;
                return(true);
            }
            else {
                return(false)
            }
        }
    } catch (error) {
        console.log(error);
        return(false)
    }
}

export var examdetails =  null;
export const fetchExamDetails = async () => {
    try {
        const responce = await fetch(serverAddress+'/examdetails',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({name : sessionStorage.getItem('examname')}),
        });

        if(responce.ok){
            const data = await responce.json();
            console.log('Data Fetched');
            if(data.status==='OK'){
                examdetails = data.examdetails;
                return(true);
            }
            else {
                return(false)
            }
        }
    } catch (error) {
        console.log(error)
        return(false)
    }
}

export var sessiondetails = null
export const fetchSessionDetails = async () => {
    try {
        const responce = await fetch(serverAddress+'/getsessiondetails',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({sessionid : sessionStorage.getItem('sessionId')}),
        });

        if(responce.ok){
            const data = await responce.json();
            console.log('Data Fetched', data);
            if(data.status==='OK'){
                sessiondetails = data.sessiondetails;
                return(true);
            }
            else {
                return(false)
            }
        }
    } catch (error) {
        console.log(error)
        return(false)
    }
}