export function saveData(
  key:string,
  data:any
){

  localStorage.setItem(
    key,
    JSON.stringify(data)
  );

}



export function getData(
  key:string
){

  const data =
    localStorage.getItem(key);


  if(!data){
    return null;
  }


  return JSON.parse(data);

}