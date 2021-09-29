import dayjs from "dayjs";
export function formatDate(timeStamps){
    let hari =   dayjs(timeStamps).format("dddd")
  
    if(hari === "Monday"){
        hari = "Senin"
    }
    if(hari === "Tuesday"){
        hari = "Selasa"
    }
    if(hari === "Wednesday"){
        hari = "Rabu"
    }
    if(hari === "Thursday"){
        hari = "Kamis"
    }
    if(hari === "Friday"){
        hari = "Jumat"
    }
    if(hari === "Saturday"){
        hari = "Sabtu"
    }
    if(hari === "Sunday"){
        hari = "Minggu"
    }
    return  `${hari} , ${dayjs(timeStamps).format("DD-MM-YYYY")}`
}