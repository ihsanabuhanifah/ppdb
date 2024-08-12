import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { Collapse, useDisclosure, Tooltip, Button } from "@chakra-ui/react";
import PaginationInfo from "../../../components/paginationInfo";
import TableHeader from "../../../components/TableHeader";
import Loading from "../../../components/loading";
import Modal from "../../../components/Modal";
import ReactWhatsapp from "react-whatsapp";
import postfirebase from "../../../api/axiosfirebae";
import { sendMessageJam } from "../../../config/sendMessage";
import Swal from "sweetalert2";
import {
  getJadwal,
  updateStatusTes,
  updateStatusKelulusan,
  updateJamTes,
  sendJadwal,
  updateBatal,
} from "../../../api/admin";

import { formatTanggal, formatNomorHp } from "../../../utils";
import { useToast } from "@chakra-ui/react";
import useDebounce from "../../../hooks/useDebounce";

import swal from "sweetalert";
import TableLoading from "../../../components/tableLoading";

export default function JadwalTes() {
  const [page] = React.useState(1);
  const [per_page, setPer_page] = React.useState(100);
  const [isLoadingKonfirmasi] = React.useState(false);
  const [isLoadingKelulusan, setIsLoadingKelulusan] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");
  const [indexSelect, setIndexSelect] = React.useState(null);
  const [indexKelulusan, setIndexKelulusan] = React.useState(null);
  let debouncedKeyword = useDebounce(keyword, 500);
  const [show, setShow] = React.useState(false);
  const [] = React.useState("");
  let queryClient = useQueryClient();
  const [filter, setFilter] = React.useState("all");
  const handleToggle = () => setShow(!show);
  const { data, isFetching } = useQuery(
    //query key
    [
      "jadwal_tes",
      {
        page: page,
        filter: filter,
        per_page: per_page,
        search: debouncedKeyword,
      },
    ],

    () =>
      getJadwal({
        page: page,
        per_page: per_page,
        keyword: debouncedKeyword,
      }),

    {
      staleTime: 1000 * 60 * 10,
      keepPreviousData: true,
      select: (response) => {
        let dataAwal = response.data;

        let result = [];
        if (filter === "belum") {
          dataAwal.forEach((da) => {
            if (da.tes_diniyyah === undefined) {
              result.push(da);
            }
          });
        }
        if (filter === "sudah") {
          dataAwal.forEach((da) => {
            if (da.tes_diniyyah !== undefined) {
              result.push(da);
            }
          });
        }
        if (filter === "all") {
          result = dataAwal;
        }

        result.sort(function (a, b) {
          return (
            new Date(b?.tes_diniyyah?.tanggal) -
            new Date(a?.tes_diniyyah?.tanggal)
          );
        });
        let jumlahSantri = result.length;
        let terjadwal = 0;
        let sudahTes = 0;
        result.forEach((rs) => {
          if (rs.tes_diniyyah !== undefined) {
            terjadwal = terjadwal + 1;
            if (rs.tes_diniyyah.status === 1) {
              sudahTes = sudahTes + 1;
            }
          }
        });
        let rpl = 0;
        let tkj = 0;

        dataAwal.forEach((da) => {
          if (da.jurusan === 1) {
            tkj = tkj + 1;
          } else {
            rpl = rpl + 1;
          }
        });
        return {
          data: result,
          jumlahSantri: jumlahSantri,
          terjadwal: terjadwal,
          sudahTes: sudahTes,
          jurusanRPL: rpl,
          jurusanTKJ: tkj,
        };
      },
    }
  );

  let toast = useToast();
  const updateStatus = async () => {
    setIsLoadingStatus(true);
    let result = await updateStatusTes(values);

    queryClient.invalidateQueries("jadwal_tes");
    if (result?.status === "success") {
      toast({
        position: "top-right",
        title: "Berhasil",
        description: "Update Status",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setIsLoadingStatus(false);

      setIndexSelect(null);
      return onClose();
    }
  };
  const updateStatusLulus = async (id, status) => {
    let result = await updateStatusKelulusan(id, status);

    queryClient.invalidateQueries("jadwal_tes");

    if (result?.status === "success") {
      toast({
        position: "top-right",
        title: "Berhasil",
        description: "Update Status",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setIsLoadingKelulusan(false);
      setIndexKelulusan(null);
    }
  };

  const updateJam = async () => {
    setIsLoadingStatus(true);
    let result = await updateJamTes(jamTes);
    sendMessageJam(jamTes.token, "ihsan");
    queryClient.invalidateQueries("jadwal_tes");
    if (result?.status === "success") {
      toast({
        position: "top-right",
        title: "Berhasil",
        description: "Berhasil mengupdate Jam Tes",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setIsLoadingStatus(false);

      setIndexSelect(null);
      return onCloseJamTes();
    }
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  const nilaiHandle = (kode, nilai) => {
    if (kode === "Tes001") {
      return Math.ceil(nilai);
    }
    if (kode === "Tes002") {
      return Math.ceil(nilai);
    }
    if (kode === "Tes003") {
      return Math.ceil(nilai);
    }
    if (kode === "Tes004") {
      return Math.ceil(nilai);
    }
  };

  const sendMessage = async (token, name) => {
    let payload = {
      to: token,
      priority: "high",
      soundName: "default",
      notification: {
        title: "PPDB SMK MADINATULQURAN",
        body: `Bismillah, Selamat ananda ${name} telah lulus di SMK MADINATULQURAN`,
        image:
          "https://res.cloudinary.com/smk-madinatul-quran/image/upload/v1633619642/errrbiql1jigobojg5iv.png",
        icon: "https://res.cloudinary.com/smk-madinatul-quran/image/upload/v1633820893/ce4h2qg7y3dl1kpbjlsr.png",
        click_action:
          "https://ppdb.smkmadinatulquran.sch.id/ppdb/pengumuman-kelulusan",
      },
      webpush: {
        fcm_options: {
          link: "https://ppdb.smkmadinatulquran.sch.id/ppdb/pengumuman-kelulusan",
        },
      },
    };
    await postfirebase.post("/send", payload);
    //  "dTwHKcTDIw01birvmSdbeH:APA91bE4EoVEChzlAX1y-QREDqrBJQO6pClbfCuN2uymMsRj_Gi01mEfc4jYyC7WU8I8eXR-WDAmG-Bj-5qcwvBPySRqqhJtUXaCdZwULr482OZ763GFfBsLZouQA8qsuLCiw1DHuQFK",
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isOpenJamTes,
    onOpen: onOpenJamTes,
    onClose: onCloseJamTes,
  } = useDisclosure();
  const [values, setValues] = React.useState({
    id: 0,
    laporan: "",
    status: 1,
  });
  const [jamTes, setJamTes] = React.useState({
    id: 0,
    jam: "",
  });

  const handleLaporan = (e) => {
    setValues((values) => ({
      ...values,
      laporan: e.target.value,
    }));
  };
  const handleJamTes = (e) => {
    setJamTes((jamTes) => ({
      ...jamTes,
      jam: e.target.value,
    }));
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    updateStatus();
  };
  const handlesubmitJam = (e) => {
    e.preventDefault();

    updateJam();
  };

  const [isLoadingStatus, setIsLoadingStatus] = React.useState(false);
  const handleBatal = (id) => {
    Swal.fire({
      title: "Apakah yakin",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await updateBatal(id);
          Swal.fire("Batal!", result.message, "success");
          queryClient.invalidateQueries("jadwal_tes");
        } catch {
          Swal.fire("Batal!", "Ada Kesalahan", "error");
        }
      }
    });
  };
  return (
    <React.Fragment>
      <Modal onOpen={onOpen} onClose={onClose} isOpen={isOpen}>
        <form onSubmit={handlesubmit}>
          <div className="grid gric-cols-1">
            <label className="font-bold mb-5" htmlFor="laporan">
              Laporan Kelulusan
            </label>
            <textarea
              placeholder="Buatlah laporan tes "
              className="border p-4"
              name="laporan"
              onChange={handleLaporan}
              id="laporan"
              cols="30"
              rows="10"
            ></textarea>
            <p className="text-xs italic text-red-500 font-bold mt-3">
              Note : Tuliskan Nama Ust penguji dan kesan terhadap santri{" "}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-5 mt-5 mb-5">
            <button
              className="col-start-2 p-2 rounded-md text-white bg-red-500 w-full"
              onClick={() => {
                setValues((values) => ({
                  ...values,
                  id: "",
                  laporan: "",
                }));
                return onClose();
              }}
              type="button"
            >
              Batal
            </button>
            <button
              disabled={values.laporan === "" ? true : false}
              className={`p-2 rounded-md text-white ${
                values.laporan === "" ? "bg-green-100" : "bg-green-500"
              }  w-full`}
              type="submit"
            >
              {isLoadingStatus ? <Loading></Loading> : "Simpan"}
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        onOpen={onOpenJamTes}
        onClose={onCloseJamTes}
        isOpen={isOpenJamTes}
      >
        <form onSubmit={handlesubmitJam}>
          <div className="grid gric-cols-1">
            <label className="font-bold mb-5" htmlFor="jam_tes">
              jam
            </label>
            <input
              className="border p-4"
              name="jam_tes"
              onChange={handleJamTes}
              id="jam_tes"
              type="time"
              value={values.jam}
            ></input>
            <p className="text-xs italic text-red-500 font-bold mt-3">
              Note : Tuliskan Nama Ust penguji dan kesan terhadap santri{" "}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-5 mt-5 mb-5">
            <button
              className="col-start-2 p-2 rounded-md text-white bg-red-500 w-full"
              onClick={() => {
                setJamTes((jamTes) => ({
                  ...jamTes,
                  id: 0,
                  jam: "",
                  token: "",
                }));
                return onCloseJamTes();
              }}
              type="button"
            >
              Batal
            </button>
            <button
              disabled={values.jam === "" ? true : false}
              className={`p-2 rounded-md text-white ${
                values.jam === "" ? "bg-green-100" : "bg-green-500"
              }  w-full`}
              type="submit"
            >
              {isLoadingStatus ? <Loading></Loading> : "Simpan"}
            </button>
          </div>
        </form>
      </Modal>
      <div className="text-green-500 grid grid-cols-1 gap-5 ">
        <div className="border-b-2 pb-10">
          <h1 className="text-2xl  font-semibold">
            DAFTAR JADWAL TES PPDB SMK MADINATULQURAN
          </h1>
        </div>
        {/* table */}
        <button
          className="font-bold uppercase"
          type="button"
          variantColor="blue"
          onClick={() => {
            return handleToggle();
          }}
        >
          {show
            ? " Sembunyikan Detail Informasi"
            : " Tampilkan Detail Informasi"}
        </button>
        <Collapse in={show} animateOpacity>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="p-2 border w-full">
              <label className="font-bold uppercase" htmlFor="">
                Jumlah Santri <span className="text-red-500">sudah bayar</span>
              </label>
              <br />
              <input
                className="bg-white w-full"
                type="text"
                disabled
                value={`${data?.jumlahSantri} Santri`}
              />
            </div>
            <div className="p-2 border w-full">
              <label className="font-bold uppercase" htmlFor="">
                Jumlah <span className="text-red-500">Belum buat Jadwal</span>
              </label>
              <br />
              <input
                className="bg-white w-full"
                type="text"
                disabled
                value={`${data?.jumlahSantri - data?.terjadwal} Santri`}
              />
            </div>
            <div className="p-2 border w-full col-start-1">
              <label className="font-bold uppercase" htmlFor="">
                Santri{" "}
                <span className="text-red-500">Sudah Membuat Jadwal</span>
              </label>
              <br />
              <input
                className="bg-white w-full"
                type="text"
                disabled
                value={`${data?.terjadwal} Santri`}
              />
            </div>
            <div className="p-2 border w-full">
              <label className="font-bold uppercase" htmlFor="">
                Santri <span className="text-red-500">Sudah Tes</span>
              </label>
              <br />
              <input
                className="bg-white w-full"
                type="text"
                disabled
                value={`${data?.sudahTes} Santri`}
              />
            </div>
            <div className="p-2 border w-full">
              <label className="font-bold uppercase" htmlFor="">
                Santri <span className="text-red-500">Belum Belum Tes</span>
              </label>
              <br />
              <input
                className="bg-white w-full"
                type="text"
                disabled
                value={`${data?.terjadwal - data?.sudahTes} Santri`}
              />
            </div>
            <div className="p-2 border w-full">
              <label className="font-bold uppercase" htmlFor="">
                Santri <span className="text-red-500">RPL</span>
              </label>
              <br />
              <input
                className="bg-white w-full"
                type="text"
                disabled
                value={`${data?.jurusanRPL} Santri`}
              />
            </div>
            <div className="p-2 border w-full">
              <label className="font-bold uppercase" htmlFor="">
                Santri <span className="text-red-500">TKJ</span>
              </label>
              <br />
              <input
                className="bg-white w-full"
                type="text"
                disabled
                value={`${data?.jurusanTKJ} Santri`}
              />
            </div>
          </div>
        </Collapse>

        <div className="p-1 ">
          <TableHeader
            setKeyword={setKeyword}
            setPer_page={setPer_page}
          ></TableHeader>
        </div>
        <select
          className="border rounded-md py-2 pl-3 font-bold"
          onChange={handleFilter}
          name="jadwal"
          id=""
        >
          <option value="all">Tampilkan Semua</option>
          <option value="sudah">Tampilkan Sudah Terjadwal</option>
          <option value="belum">Tampilkan Belum Terjadwal</option>
        </select>

        {isFetching ? (
          <TableLoading></TableLoading>
        ) : (
          <div style={{ zoom: "80%" }} className="overflow-auto">
            <table className="p-1 w-full ">
              <thead>
                <tr className="uppercase">
                  <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500 border-gray-500">
                    <div className="text-sm leading-5 text-green-500">No</div>
                  </th>

                  <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500 border-gray-500">
                    <div className="text-sm leading-5 text-green-500">
                      Jadwal Tes
                    </div>
                  </th>

                  <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500 border-gray-500">
                    <div className="text-sm leading-5 text-green-500">
                      Nama Siswa
                    </div>
                  </th>
                  <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500 border-gray-500">
                    <div className="text-sm leading-5 text-green-500">
                      Sekolah Asal
                    </div>
                  </th>
                  <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500 border-gray-500">
                    <div className="text-sm leading-5 text-green-500">
                      Jurusan
                    </div>
                  </th>

                  <th className="px-6 py-4 whitespace-no-wrap border-b text-left  text-green-500 border-gray-500">
                    <div className="text-sm leading-5 text-green-500">
                      Tanggal Tes
                    </div>
                  </th>
                  <th className="px-6 py-4 whitespace-no-wrap border-b text-left  text-green-500 border-gray-500">
                    <div className="text-sm leading-5 text-green-500">
                      Jam Tes
                    </div>
                  </th>
                  <th className="px-6 py-4 whitespace-no-wrap border-b text-left  text-green-500 border-gray-500">
                    <div className="text-sm leading-5 text-green-500">
                      Catatan
                    </div>
                  </th>
                  <th className="px-6 py-4 whitespace-no-wrap border-b text-left  text-green-500 border-gray-500">
                    <div className="text-sm leading-5 text-green-500">
                      Nomor HP
                    </div>
                  </th>

                  <th className="px-6 py-4 whitespace-no-wrap border-b text-left  text-green-500 border-gray-500">
                    <div className="text-sm leading-5 text-green-500">
                      Metode
                    </div>
                  </th>
                  <th className="px-6 py-4 whitespace-no-wrap border-b text-left  text-green-500 border-gray-500">
                    <div className="text-sm leading-5 text-green-500">
                      Nilai Matematika
                    </div>
                  </th>
                  <th className="px-6 py-4 whitespace-no-wrap border-b text-left  text-green-500 border-gray-500">
                    <div className="text-sm leading-5 text-green-500">
                      Nilai Diniyah Dasar
                    </div>
                  </th>
                  <th className="px-6 py-4 whitespace-no-wrap border-b text-left  text-green-500 border-gray-500">
                    <div className="text-sm leading-5 text-green-500">
                      Nilai Tes analogi
                    </div>
                  </th>
                  <th className="px-6 py-4 whitespace-no-wrap border-b text-left  text-green-500 border-gray-500">
                    <div className="text-sm leading-5 text-green-500">
                      Nilai Bahasa Inggris
                    </div>
                  </th>

                  <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500  border-gray-500">
                    <div className="text-sm leading-5 text-green-500">
                      Status Tes Alquran dan Wawancara
                    </div>
                  </th>
                  <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500 border-gray-500">
                    <div className="text-sm leading-5 text-green-500">
                      Status Kelulusan
                    </div>
                  </th>
                  <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500 border-gray-500">
                    <div className="text-sm leading-5 text-green-500">
                      Batal
                    </div>
                  </th>

                  {/* <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-green-500 tracking-wider">
                  Created_At
                </th> */}
                </tr>
              </thead>{" "}
              <tbody className="bg-white relative">
                {console.log("data", data)}
                {data?.data?.map((dt, index) => (
                  <tr
                    key={index}
                    className={` ${
                      Number(dt.is_batal) === 1 ? "bg-red-300" : " hover:bg-gray-200"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm leading-5 text-gray-800">
                            {(page - 1) * per_page + index + 1}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      {dt.is_batal === 1 ? (
                        <>
                          <button className="text-white border border-white">
                            Batal Mendaftar
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={async () => {
                            const send = await sendJadwal(dt.phone);
                            console.log("send", send);
                          }}
                          className={` text-white bg-blue-500 px-2 py-1 rounded-sm font-bold`}
                        >
                          Kirim Pesan
                        </button>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm leading-5 text-blue-900">
                        <Tooltip
                          hasArrow
                          label={`Nama Akun ${dt?.name}`}
                          bg="red.600"
                        >
                          <p>
                            {" "}
                            {dt.name_siswa}
                            {dt?.device === null ? "" : " - R"}
                          </p>
                        </Tooltip>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm leading-5 text-blue-900">
                        {dt.asal_sekolah}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm leading-5 text-blue-900">
                        {dt.jurusan === 1 ? "TKJ" : "RPL"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm leading-5 text-blue-900">
                        {dt?.tes_diniyyah === undefined ? (
                          <p className="text-red-500 font-bold italic text-xs">
                            Belum buat jadwal
                          </p>
                        ) : (
                          formatTanggal(dt?.tes_diniyyah?.tanggal)
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm leading-5 text-blue-900">
                        {dt?.tes_diniyyah === undefined ? (
                          <p className="text-red-500 font-bold italic text-xs">
                            Belum buat jadwal
                          </p>
                        ) : dt?.tes_diniyyah?.metode === 1 ? (
                          "Tes Offline"
                        ) : (
                          <Tooltip
                            hasArrow
                            label={`Jadwal dibuat oleh ${dt?.tes_diniyyah?.dibuat_oleh}`}
                            bg="red.600"
                          >
                            <button
                              className="border px-3 py-2 text-white bg-green-500"
                              onClick={() => {
                                setJamTes((jamTes) => ({
                                  ...jamTes,
                                  id: dt?.tes_diniyyah?.user_id,
                                  jam: dt?.tes_diniyyah?.jam_tes,
                                  token: dt?.device,
                                }));
                                return onOpenJamTes();
                              }}
                            >
                              {dt?.tes_diniyyah?.jam_tes === null
                                ? "-"
                                : dt?.tes_diniyyah?.jam_tes}
                            </button>
                          </Tooltip>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm leading-5 text-blue-900">
                        {dt?.tes_diniyyah?.catatan === undefined ? (
                          <p className="text-red-500 font-bold italic text-xs">
                            Belum buat jadwal
                          </p>
                        ) : (
                          dt?.tes_diniyyah?.catatan
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                      <ReactWhatsapp
                        number={formatNomorHp(dt.phone)}
                        message={"bismillah"}
                      >
                        <p className="hover:text-green-500 hover:font-bold hover:text-lg">
                          {formatNomorHp(dt.phone)}
                        </p>
                      </ReactWhatsapp>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm leading-5 text-blue-900">
                        {dt?.tes_diniyyah === undefined ? (
                          <p className="text-red-500 font-bold italic text-xs">
                            Belum buat jadwal
                          </p>
                        ) : dt?.tes_diniyyah?.metode === 1 ? (
                          <span className="uppercase font-bold text-blue-500">
                            {" "}
                            Offline
                          </span>
                        ) : (
                          <span className="uppercase font-bold text-green-500">
                            {" "}
                            Online
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm leading-5 text-blue-900">
                        {dt?.tes_umum === undefined ? (
                          <p className="bg-red-500 text-white p-2 text-center font-bold">
                            Belum Tes
                          </p>
                        ) : (
                          <p className="text-center font-bold">
                            {nilaiHandle(
                              dt?.tes_umum[0]?.kode_mapel,
                              dt?.tes_umum[0]?.nilai
                            )}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm leading-5 text-blue-900">
                        {dt?.tes_umum === undefined ? (
                          <p className="bg-red-500 text-white p-2 text-center font-bold">
                            Belum Tes
                          </p>
                        ) : (
                          <p className="text-center font-bold">
                            {nilaiHandle(
                              dt?.tes_umum[1]?.kode_mapel,
                              dt?.tes_umum[1]?.nilai
                            )}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm leading-5 text-blue-900">
                        {dt?.tes_umum === undefined ? (
                          <p className="bg-red-500 text-white p-2 text-center font-bold">
                            Belum Tes
                          </p>
                        ) : (
                          <p className="text-center font-bold">
                            {nilaiHandle(
                              dt?.tes_umum[2]?.kode_mapel,
                              dt?.tes_umum[2]?.nilai
                            )}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm leading-5 text-blue-900">
                        {dt?.tes_umum === undefined ? (
                          <p className="bg-red-500 text-white p-2 text-center font-bold">
                            Belum Tes
                          </p>
                        ) : (
                          <p className="text-center font-bold">
                            {nilaiHandle(
                              dt?.tes_umum[3]?.kode_mapel,
                              dt?.tes_umum[3]?.nilai
                            )}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm leading-5 text-blue-900">
                        {dt?.tes_diniyyah === undefined ? (
                          <p className="text-red-500 font-bold italic text-xs">
                            Belum buat jadwal
                          </p>
                        ) : (
                          <Tooltip
                            hasArrow
                            label={dt?.tes_diniyyah?.laporan}
                            bg="red.600"
                          >
                            <button
                              onClick={() => {
                                if (dt?.tes_diniyyah?.status === 1) {
                                  return;
                                }
                                setValues((values) => ({
                                  ...values,
                                  id: dt?.tes_diniyyah?.user_id,
                                  laporan: "",
                                }));
                                onOpen();
                              }}
                              className={`${
                                dt?.tes_diniyyah?.status === 0
                                  ? "bg-red-500"
                                  : "bg-blue-500"
                              } text-white px-2 py-1 rounded-sm font-bold`}
                            >
                              {dt?.tes_diniyyah?.status === 0
                                ? isLoadingKonfirmasi
                                  ? indexSelect === index
                                    ? "Mengupdate Status"
                                    : "Belum Tes"
                                  : "Belum Tes"
                                : "Sudah Tes"}
                            </button>
                          </Tooltip>
                        )}
                      </div>
                      {/* {dt?.tes_diniyyah?.status} */}
                    </td>

                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm leading-5 text-blue-900">
                        {dt?.tes_diniyyah === undefined ? (
                          <p className="text-red-500 font-bold italic text-xs">
                            Belum buat jadwal
                          </p>
                        ) : (
                          <button
                            disabled={
                              dt?.tes_diniyyah?.status === 0 ? true : false
                            }
                            onClick={() => {
                              swal(
                                `Apakah ananda ${dt.name} dinyatakan Lulus ? `,
                                {
                                  buttons: {
                                    cancel: "Cancel",
                                    lulus: {
                                      text: "Lulus",
                                      value: "lulus",
                                    },
                                    tidak: {
                                      text: "Tidak Lulus",
                                      value: "tidak",
                                      color: "red",
                                    },
                                  },
                                }
                              ).then((value) => {
                                switch (value) {
                                  case "lulus":
                                    setIsLoadingKelulusan(true);
                                    setIndexKelulusan(index);
                                    updateStatusLulus(
                                      dt?.tes_diniyyah?.user_id,
                                      1
                                    );
                                    return sendMessage(dt?.device, dt?.name);

                                  case "tidak":
                                    setIsLoadingKelulusan(true);
                                    setIndexKelulusan(index);
                                    updateStatusLulus(
                                      dt?.tes_diniyyah?.user_id,
                                      2
                                    );
                                    break;

                                  default:
                                }
                              });
                            }}
                            className={`${
                              dt?.tes_diniyyah?.kelulusan === null &&
                              dt?.tes_diniyyah?.status === 0
                                ? "bg-red-200"
                                : (dt?.tes_diniyyah?.kelulusan === "1") &
                                  (dt?.tes_diniyyah?.status === 1)
                                ? "bg-blue-500"
                                : dt?.tes_diniyyah?.kelulusan === "2" &&
                                  dt?.tes_diniyyah?.status === 1
                                ? "bg-red-500"
                                : "bg-yellow-500"
                            } text-white px-2 py-1 rounded-sm font-bold`}
                          >
                            {isLoadingKelulusan && index === indexKelulusan
                              ? "Mengupdate Status "
                              : dt?.tes_diniyyah?.kelulusan === null &&
                                dt?.tes_diniyyah?.status === 0
                              ? "Belum Tes"
                              : dt?.tes_diniyyah?.kelulusan === null &&
                                dt?.tes_diniyyah?.status === 1
                              ? "Belum diumukan "
                              : dt?.tes_diniyyah?.kelulusan === "1"
                              ? "Lulus"
                              : "Tidak Lulus"}
                          </button>
                        )}
                      </div>
                    </td>
                    <td>
                      {dt.is_batal === 1 ? (
                        <></>
                      ) : (
                        <Button
                          onClick={() => handleBatal(dt.user_id)}
                          colorScheme="red"
                        >
                          Batal
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between mt-5 text-green-500">
              <PaginationInfo
                totalItems={5}
                currentPage={1}
                pageSize={per_page}
              ></PaginationInfo>
              {/* <Pagination
            totalItems={20}
            currentPage={1}
            pageSize={pageSize}
          ></Pagination> */}
            </div>
          </div>
        )}
        {/* table */}
      </div>
    </React.Fragment>
  );
}
