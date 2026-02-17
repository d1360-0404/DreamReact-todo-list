export async function sendResquest(url,options,setErrorMessage){
  try{
      const resp=await fetch(url,options);
      if(!resp.ok){
        const errorMSG=await resp.json();
        console.log(errorMSG.error);
        throw new Error(errorMSG?.error?.message);
      }
      return resp;
  }catch(error){
    console.log(error)
    setErrorMessage(error.message);
    throw error;
  }
}