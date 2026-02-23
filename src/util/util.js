export async function sendResquest(url,options){
  const errorMessage="Unknown error"

  try {
    const resp=await fetch(url,options);
    if(!resp.ok){
      let errorMSG=null;
      try{
        //second try if await resp.json() fails
        errorMSG=await resp.json();
      }
      catch{
      }
      throw new Error(
        //catches each possible edge case
        errorMSG?.error?.message ||
        errorMSG?.error ||
        resp.statusText ||
        errorMessage
      );
    }
    return resp;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}