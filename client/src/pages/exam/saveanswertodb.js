import { serverAddress } from "../../api";

async function saveAnswertoDB(index, answer){
    try {
        const responce = await fetch(serverAddress+'/saveanswer',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({sessionid : sessionStorage.getItem('sessionId'), index : index, answer : answer}),
        });

        if(responce.ok){
            const data = await responce.json();
            console.log('Data Fetched');
            console.log(data);
            if(data.status==='OK'){
                console.log('Answer Saved');
                return(true);
            }
            else {
                return(false)
            }
        }
    } catch (error) {
        console.log('error : '+error)
        return(false);
    }

}

export {saveAnswertoDB}