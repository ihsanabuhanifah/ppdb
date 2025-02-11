import {
  Page,
  Document,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import Image2 from "./image1.png";
import Image3 from "./image.png";

const styles = StyleSheet.create({
  page: {
    padding: 18,
    fontSize: 8,
    lineHeight: "1.28px",
    position: "relative",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 3,
  },

  label: {
    width: 100,
    fontWeight: "bold",
  },
  value: {
    flex: 1,
  },
  statement: {
    fontSize: 10,
    textAlign: "justify",
    marginTop: 5,
  },
  signatureContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  photoBox: {
    width: 100,
    height: 120,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  signatureSection: {
    alignItems: "center",
  },
  signatureBox: {
    width: 150,
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    marginTop: 10,
  },
  photoBox: {
    width: 100,
    height: 120,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
});

const Description = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>: {value}</Text>
  </View>
);

const Description2 = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>: {value}</Text>
  </View>
);

export const Resume = ({ data }) => {
  let space = 11;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark */}
        <Image
          src={Image3}
          style={{
            position: "absolute",
            top: "30%",
            left: "20%",
            width: "60%",
            opacity: 0.1, // Transparansi agar tidak mengganggu konten

            zIndex: -1, // Di belakang teks
          }}
        />

        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            border: "1px solid #000",
            marginTop: space,
          }}
        >
          <View style={{ width: "50%" }}>
            <Image src={Image2} style={{ width: "100%", marginLeft: "auto" }} />
          </View>
          <View style={{ width: "60%", marginLeft: 10 }}>
            <Text style={{ fontWeight: 600, textAlign: "left", fontSize: 12 }}>
              REKAP ISIAN DATA PENDAFTAR
            </Text>
            <Text style={{ fontWeight: 600, textAlign: "left", fontSize: 10 }}>
              Nomor Pendaftaran : {data.nomor_pendaftaran}
            </Text>
            <Text style={{ fontWeight: 600, textAlign: "left", fontSize: 10 }}>
              Jenis Seleksi : {data.jalur_seleksi}
            </Text>
          </View>
        </View>

        {/* Body */}

        <Text
          style={{
            fontSize: 10,
            fontWeight: 100,
            textAlign: "center",
            marginTop: 10,
            fontWeight: 100,
          }}
        >
          INFORMASI DATA SISWA{" "}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <View style={[styles.section, { flex: 1, marginRight: 10 }]}>
            <Description label="Nama Lengkap" value={data.name} />
            <Description label="NISN" value={data.nisn} />
            <Description label="NIK" value={data.nik} />
            <Description label="Email" value={data.email} />
            <Description label="Phone" value={data.phone} />
            <Description label="Jenis Kelamin" value={data.jenis_kelamin} />
            <Description label="Tempat Lahir" value={data.tempat_lahir} />
            <Description
              label="Tanggal Lahir"
              value={formatMonth(data.tanggal_lahir)}
            />
            <Description label="Agama" value={data.agama} />
            <Description label="Anak Ke" value={data.anak_ke} />
            <Description
              label="Jumlah Saudara Kandung"
              value={data.jumlah_saudara_kandung}
            />
            <Description label="Jenis Sekolah" value={data.jenis_sekolah} />
            <Description label="Nama Sekolah" value={data.asal_sekolah} />
            <Description label="Hobi" value={data.hobi} />
            <Description label="Cita-cita" value={data.cita_cita} />
          </View>

          <View style={[styles.section, { flex: 1, marginLeft: 10 }]}>
            <Description label="RT" value={data.rt} />
            <Description label="RW" value={data.rw} />
            <Description label="Desa/Kelurahan" value={data.desa} />
            <Description label="Kecamatan" value={data.kecamatan} />
            <Description label="Kabupaten/Kota" value={data.kab_kota} />
            <Description label="Provinsi" value={data.provinsi} />
            <Description label="Kodepos" value={data.kodepos} />
            <Description label="Alamat" value={data.alamat} />
            <Description
              label="Jarak Rumah ke MAN 1 Kota Sukabumi"
              value={data.tempat_tinggal}
            />
            <Description label="Transportasi" value={data.transportasi} />
          </View>
        </View>

        <Text
          style={{
            fontSize: 10,
            fontWeight: 100,
            textAlign: "center",
            marginTop: 5,
          }}
        >
          INFORMASI ORANGTUA/WALI{" "}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <View style={[styles.section, { flex: 1, marginRight: 10 }]}>
            <Description label="Nomor Kartu Keluarga" value={data.nomor_kk} />
            <Description label="Nama Ayah" value={data.nama_ayah} />
            <Description label="NIK ayah" value={data.nik_ayah} />
            <Description
              label="Tempat Lahir ayah"
              value={data.tempat_lahir_ayah}
            />
            <Description
              label="Tanggal Lahir ayah"
              value={formatMonth(data.tanggal_lahir_ayah)}
            />
            <Description label="Pendidikan Ayah" value={data.pendidikan_ayah} />
            <Description label="Pekerjaan Ayah" value={data.pekerjaan_ayah} />
            <Description label="Nama Ibu" value={data.nama_ibu} />
            <Description label="NIK Ibu" value={data.nik_ibu} />
            <Description
              label="Tempat Lahir Ibu"
              value={data.tempat_lahir_ibu}
            />
            <Description
              label="Tanggal Lahir Ibu"
              value={formatMonth(data.tanggal_lahir_ibu)}
            />
          </View>

          <View style={[styles.section, { flex: 1, marginLeft: 10 }]}>
            <Description label="Pendidikan Ibu" value={data.pendidikan_ibu} />
            <Description label="Pekerjaan Ibu" value={data.pekerjaan_ibu} />
            <Description
              label="Penghasilan Orang Tua"
              value={data.penghasilan_ayah}
            />
            <Description label="Nama Wali" value={data.nama_wali} />
            <Description label="NIK Wali" value={data.nik_wali} />
            <Description
              label="Tahun Lahir Wali"
              value={data.tahun_lahir_wali}
            />
            <Description label="Pendidikan Wali" value={data.pendidikan_wali} />
            <Description label="Pekerjaan Wali" value={data.pekerjaan_wali} />
            <Description
              label="Penghasilan Wali"
              value={data.penghasilan_wali}
            />
          </View>
        </View>

        <View>
          {data?.jalur_seleksi === "Jalur Afirmasi" && (
            <>
              {" "}
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 100,
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                JALUR AFIRMASI{" "}
              </Text>
              <View style={{ width: "100%" }}>
                {[
                  {
                    label:
                      "Nomor Kartu Keluarga Sejahtera/Kartu Perlindungan Sosial",
                    value: ": " + data.nomor_kks === null ? "" : data.nomor_kks,
                  },
                  {
                    label: "Nomor Kartu Program Keluarga Harapan",
                    value: ": " + data.nomor_pkh === null ? "" : data.nomor_pkh,
                  },
                  {
                    label: "Nomor Kartu Indonesia Pintar",
                    value: ": " + data.nomor_kip === null ? "" : data.nomor_kip,
                  },
                ].map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 5,
                    }}
                  >
                    {/* Label dengan lebar tetap */}
                    <Text
                      style={{
                        width: 250, // Sesuaikan panjang maksimum label
                        fontWeight: "bold",
                        flexShrink: 0, // Agar label tidak wrap ke bawah
                      }}
                    >
                      {item.label}
                    </Text>

                    {/* Value agar menyesuaikan */}
                    <Text style={{ flex: 1 }}>{item.value}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          <View>
            {data?.jalur_seleksi === "Jalur Prestasi" && (
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {[1, 2, 3].map((index) => (
                  <View
                    key={index}
                    style={{ width: "50%", paddingRight: 5, marginTop: 4 }}
                  >
                    <Text
                      style={{
                        fontSize: 8,
                        fontWeight: "bold",
                        marginBottom: 5,
                      }}
                    >
                      Prestasi {index}
                    </Text>
                    <Description
                      label="Nama Prestasi"
                      value={data[`nama_prestasi${index}`]}
                    />
                    <Description
                      label="Tingkat"
                      value={data[`tingkat${index}`]}
                    />
                    <Description
                      label="Juara"
                      value={data[`juara_ke_${index}`]}
                    />
                  </View>
                ))}
              </View>
            )}
          </View>

          <View></View>

          {/* Pernyataan */}
          <View style={styles.signatureContainer}>
            {/* Kotak Foto */}
            <View style={styles.photoBox}>
              <Text>Pas Foto</Text>
            </View>

            {/* Bagian Tanda Tangan */}
            <View style={styles.signatureSection}>
              <Text>Sukabumi, {formatMonth(new Date())}</Text>
              <Text>Tanda Tangan:</Text>
             
              <Text style={{ marginTop: 50 }}>({data.name})</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

// import dayjs from 'dayjs';
// export function formatMonth(timeStamps, args = { simple: false }) {
//   let hari = dayjs(timeStamps).format('dddd');
//   let bulan = dayjs(timeStamps).format('MM');

//   if (hari === 'Monday') {
//     hari = 'Senin';
//   }
//   if (hari === 'Tuesday') {
//     hari = 'Selasa';
//   }
//   if (hari === 'Wednesday') {
//     hari = 'Rabu';
//   }
//   if (hari === 'Thursday') {
//     hari = 'Kamis';
//   }
//   if (hari === 'Friday') {
//     hari = 'Jumat';
//   }
//   if (hari === 'Saturday') {
//     hari = 'Sabtu';
//   }
//   if (hari === 'Sunday') {
//     hari = 'Minggu';
//   }
//   if (bulan === "1") {
//     bulan = 'Januari';
//   }
//   if (bulan === "3") {
//     bulan = 'Februari';
//   }
//   if (bulan === "3") {
//     bulan = 'Maret';
//   }
//   if (bulan === "4") {
//     bulan = 'April';
//   }
//   if (bulan === "5") {
//     bulan = 'Mei';
//   }
//   if (bulan === "6") {
//     bulan = 'Juni';
//   }
//   if (bulan === "7") {
//     bulan = 'Juli';
//   }
//   if (bulan === "8") {
//     bulan = 'Agustus';
//   }
//   if (bulan === "9") {
//     bulan = 'November';
//   }
//   if (bulan === "10") {
//     bulan = 'Oktober';
//   }
//   if (bulan === "11") {
//     bulan = 'November';
//   }
//   if (bulan === "12") {
//     bulan = 'Desember';
//   }

//   if (args.simple) {
//     return `${dayjs(timeStamps).format('DD')} ${bulan} ${dayjs(timeStamps).format('YYYY')}`
//   }

//   return `${hari} , ${dayjs(timeStamps).format('DD')} ${bulan} ${dayjs(
//     timeStamps
//   ).format('YYYY')}`;
// }

export const formatMonth = (date) => {
  if (date === null || date === "") {
    return "-";
  }
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};
