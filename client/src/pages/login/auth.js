import { serverAddress } from "../../api";
async function handleSubmit(userCred) {
    try {
        const responce = await fetch(serverAddress+'/login',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(userCred),
        });

        if(responce.ok){
            const data = await responce.json();
            console.log('Data Fetched');
            if(data.status==='OK'){
                return(data);
            }
            else {
                return(false)
            }
        }
    } catch (error) {
        return('error : '+error)
    }
}

async function handleVerify(userCred){
    try {
        const responce = await fetch(serverAddress+'/verify',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(userCred),
        });

        if(responce.ok){
            const data = await responce.json();
            console.log('Data Fetched');
            if(data.status==='OK'){
                return(data.userdetails);
            }
            else if(data.status == 'Exam Already Submitted'){
                return('Exam Already Submitted')
            }
            else {
                return(false)
            }
        }
    } catch (error) {
        return('error : '+error)
    }

}

export {handleSubmit};
export {handleVerify};