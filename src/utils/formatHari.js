import dayjs from "dayjs";
export function formatDate(timeStamps){
    let hari =   dayjs(timeStamps).format("dddd")
    let bulan =  dayjs(timeStamps).format("MM")
    if(bulan === "01"){
        bulan = "Januari"
    }
    if(bulan === "02"){
        bulan = "Februari"
    }
    if(bulan === "03"){
        bulan = "Maret"
    }
    if(bulan === "04"){
        bulan = "April"
    }
    if(bulan === "05"){
        bulan = "Mei"
    }
    if(bulan === "06"){
        bulan = "Juni"
    }
    if(bulan === "07"){
        bulan = "Juli"
    }
    if(bulan === "08"){
        bulan = "Agustus"
    }
    if(bulan === "09"){
        bulan = "September"
    }
    if(bulan === "10"){
        bulan = "Oktober"
    }
    if(bulan === "11"){
        bulan = "November"
    }
    if(bulan === "12"){
        bulan = "Desember"
    }
  
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
    return  `${hari} , ${dayjs(timeStamps).format("DD")} ${bulan} ${dayjs(timeStamps).format("YYYY hh:ss")}`
}

// `${hari} , ${dayjs(timeStamps).format("DD-MM-YYYY")}`