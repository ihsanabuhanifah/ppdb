
  export const formatNomorHp = (nomor) => {

    if(nomor === null){
      console.log(nomor)
      return "+62"
    }
    let nomorArray = nomor?.split("");

    if (nomorArray[0] === "0") {
      nomorArray[0] = "+62";
    }
    return nomorArray.join("");
  };