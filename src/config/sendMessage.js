import postfirebase from "../api/axiosfirebae";

export const sendMessageJam = async (token, name) => {
  let payload = {
    to: token,
    priority: "high",
    soundName: "default",
    notification: {
      title: "PPDB SMK MADINATULQURAN",
      body: `Konfirmasi jam tes online, Alhamdulilah jadwal tes online sudah dibuat `,
      icon : "https://res.cloudinary.com/smk-madinatul-quran/image/upload/v1633820893/ce4h2qg7y3dl1kpbjlsr.png",
      image:
        "https://res.cloudinary.com/smk-madinatul-quran/image/upload/v1633619642/errrbiql1jigobojg5iv.png",
      click_action:
        "https://ppdb.smkmadinatulquran.sch.id/ppdb/tes-diniyah-dan-interview",
    },
    webpush: {
      fcm_options: {
        link: "https://ppdb.smkmadinatulquran.sch.id/ppdb/tes-diniyah-dan-interview",
      },
    },
  };
  await postfirebase.post("/send", payload);
  //  "dTwHKcTDIw01birvmSdbeH:APA91bE4EoVEChzlAX1y-QREDqrBJQO6pClbfCuN2uymMsRj_Gi01mEfc4jYyC7WU8I8eXR-WDAmG-Bj-5qcwvBPySRqqhJtUXaCdZwULr482OZ763GFfBsLZouQA8qsuLCiw1DHuQFK",
};

export const sendMessageBukti = async (token, name) => {
  let payload = {
    to: token,
    priority: "high",
    soundName: "default",
    notification: {
      title: "PPDB SMK MADINATULQURAN",
      body:  `Konfirmasi bukti Transfer, Alhamdulilah bukti transfer sudah di konfirmasi`,
      icon : "https://res.cloudinary.com/smk-madinatul-quran/image/upload/v1633820893/ce4h2qg7y3dl1kpbjlsr.png",
      image:
        "https://res.cloudinary.com/smk-madinatul-quran/image/upload/v1633619642/errrbiql1jigobojg5iv.png",
      click_action:
        "https://ppdb.smkmadinatulquran.sch.id/ppdb/pembayaran",
    },
    webpush: {
      fcm_options: {
        link: "https://ppdb.smkmadinatulquran.sch.id/ppdb/tes-diniyah-dan-interview",
      },
    },
  };
  await postfirebase.post("/send", payload);
  //  "dTwHKcTDIw01birvmSdbeH:APA91bE4EoVEChzlAX1y-QREDqrBJQO6pClbfCuN2uymMsRj_Gi01mEfc4jYyC7WU8I8eXR-WDAmG-Bj-5qcwvBPySRqqhJtUXaCdZwULr482OZ763GFfBsLZouQA8qsuLCiw1DHuQFK",
}