export async function sendResquest(url,options,setErrorMessage){
  try{
      const resp=await fetch(url,options);
      if(!resp.ok){
        throw new Error(resp.message);
      }
      return resp;
  }catch(error){
    setErrorMessage(error.message);
    throw error;
  }
}