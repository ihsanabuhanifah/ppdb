import postfirebase from "../api/axiosfirebae";

export const sendMessageJam = async (token, name) => {
  let payload = {
    to: token,
    priority: "high",
    soundName: "default",
    notification: {
      title: "Konfirmasi Jam Tes Online PPDB SMK MADINATULQURAN",
      body: `Alhamdulilah jadwal tes online sudah dibuat `,
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
