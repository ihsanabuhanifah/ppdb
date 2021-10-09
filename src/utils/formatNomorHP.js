
  export const formatNomorHp = (nomor) => {
    let nomorArray = nomor.split("");

    if (nomorArray[0] === "0") {
      nomorArray[0] = "+62";
    }
    return nomorArray.join("");
  };