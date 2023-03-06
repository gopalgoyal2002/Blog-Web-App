async function signUpCall(data){

let item=data
return fetch("/api/signup",{
    method:"POST",
    body:JSON.stringify(item),
    headers:{
        "Content-Type":'application/json',
        "Accept":'application/json'
    }
}).then(response=>{
    return response.json();
})
.catch(err=>console.log(err));
}

async function signInCall(data){
    // console.log(data)
    let item=data
    // console.log(item)
    return fetch("/api/signin",{
        method:"POST",
        headers:{
            "Content-Type":'application/json',
            "Accept":'application/json'
        }, 
        body:JSON.stringify(item)
    }).then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));
    }

async function signOutCall(){

        // console.log(item)
      
        return fetch("/api/signout",{
            method:"GET",
            credentials: 'include',
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json'
            }, 
        }).then(response=>{
            return response.json();
        })
        .catch(err=>{console.log(err)
        return err});
        }


async function checkLogin(){

    // console.log(item)
    return fetch("/api/checklogin",{
        method:"GET",
        credentials: 'include',
        headers:{
            "Content-Type":'application/json',
            "Accept":'application/json',
        }, 
        
    }).then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));
}

async function dummy(){
        // console.log(data)
        // const data=localStorage.getItem('user-info')
        // console.log(data)
        // JSON.parse(data)
        // const token=""
        // const token=(JSON.parse(data).token)
        return fetch("/api/dummy",{
            method:"GET",
            credentials: 'include',
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json',
                // "Authorization": `Bearer ${token}`
            }
        }).then(response=>{
            return response.json();
        })
        .catch(err=>console.log(err));
        }
export {signUpCall,signInCall,dummy,signOutCall,checkLogin}


