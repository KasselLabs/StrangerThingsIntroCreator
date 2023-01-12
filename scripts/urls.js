export const postUrl = () => {
  return "https://strangerthingsic-b-default-rtdb.firebaseio.com/openings.json";
};

export const getUrl = key => {
  let code = key;
  let id = key.charAt(0);
  if(id === "A"){
    code = key.substr(1);
    return "https://strangerthingsic-a.firebaseio.com/openings/-"+code + ".json";
  }
  if(id === "B"){
    code = key.substr(1);
    return "https://strangerthingsic-b-default-rtdb.firebaseio.com/openings/-" + code + ".json";
  }
  else{
    return "https://strangerthingsintrocreator.firebaseio.com/openings/-"+code + ".json";
  }
};