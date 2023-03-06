async function allBlogs(){
   return fetch("/api/getallblogs",{
    method:"GET",
    headers:{
        "Content-Type":'application/json',
        "Accept":'application/json'
    }
 })
 .then(res=>{
   return res.json()
 }).catch(err=>{
    console.log(err)
 })
}

async function userBlogs(userId){

   return fetch(`/api/getuserblogs/${userId}`,{
    method:"GET",
    credentials:'include',
    headers:{
        "Content-Type":'application/json',
        "Accept":'application/json'
    }
 })
 .then(res=>{
   return res.json()
 }).catch(err=>{
    console.log(err)
 })
}

async function BlogById(blogId){

   return fetch(`/api/getblog/${blogId}`,{
    method:"GET",
    credentials:'include',
    headers:{
        "Content-Type":'application/json',
        "Accept":'application/json'
    }
 })
 .then(res=>{
   return res.json()
 }).catch(err=>{
    console.log(err)
 })
}

async function deleteBlog(BlogId){
   // userId="63fdfd8414999f16787b1ad1"
   return await fetch(`/api/deleteblog/${BlogId}`,{
    method:"DELETE",
    credentials:'include',
    headers:{
        "Content-Type":'application/json',
        "Accept":'application/json'
    }
 })
 .then(res=>{
   return res.json()
 }).catch(err=>{
    console.log(err)
 })
}

async function writeBlog(item){
   return await fetch("/api/addblog",{
      method:"POST",
      credentials:'include',
      headers:{
         "Content-Type":"application/json",
         "Accept":"application/json"
      },
      body:JSON.stringify(item)
   }).then((res)=>{
      return res.json()})
      .catch(err=>{
         console.log(err)
      })
}
async function updataBlog(item){
   return await fetch("/api/updateblog",{
      method:"PUT",
      credentials:'include',
      headers:{
         "Content-Type":"application/json",
         "Accept":"application/json"
      },
      body:JSON.stringify(item)
   }).then((res)=>{
      return res.json()})
      .catch(err=>{
         console.log(err)
      })
}

export {userBlogs,deleteBlog,allBlogs,writeBlog,updataBlog,BlogById}