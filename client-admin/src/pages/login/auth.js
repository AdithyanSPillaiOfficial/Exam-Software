import { serverAddress } from "../../api";
async function handleSubmit(userCred) {
    try {
        const responce = await fetch(serverAddress+'/admin/adminlogin',{
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
        const responce = await fetch(serverAddress+'/admin/userverify',{
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