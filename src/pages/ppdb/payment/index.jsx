import React from "react";
import Dropzone from "react-dropzone";
import { Formik } from "formik";
import * as Yup from "yup";
import Loading from "../../../components/loading";
import { uploadBuktiTransfer, detailBuktiTransfer } from "../../../api/santri";
import { useHistory } from "react-router-dom";
import { useToast, useClipboard } from "@chakra-ui/react";
import { payment } from "../../../redux/action/login";
import { useDispatch } from "react-redux";
let fileSchema = Yup.object().shape({
  files: Yup.string().required("Bukti Transfer wajib di Upload"),
});
export default function Payment() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [statusTransfer, setStatusTransfer] = React.useState(false);
  const [value] = React.useState(3310006100);
  const { hasCopied, onCopy } = useClipboard(value);
  let dispatch = useDispatch();
  let history = useHistory();
  let toast = useToast();
  let initialValues = {
    files: undefined,
    nominal: 450000,
    status: 1,
  };
  const onSubmit = async (values) => {
    setIsLoading(true);
    let result = await uploadBuktiTransfer(values);
    setIsLoading(false);
    if (result?.message === "Berhasil Menyimpan Data") {
      toast({
        position: "top-right",
        title: "Success",
        description: "Berhasil Mengupload Bukti",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      dispatch(payment());

      setStatusTransfer(true);
      return history.push("/ppdb/pembayaran");
      // history.push("/identitas/data-ibu");
    }
    if (result.response.status === 401) {
      toast({
        position: "top-right",
        title: "Fail",
        description: result.response.data.message,
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    }
  };

  const bukti = async () => {
    let result = await detailBuktiTransfer();
    console.log(result);
    if (result !== "") {
      return setStatusTransfer(true);
      // history.push("/identitas/data-ibu");
    }
  };
  React.useEffect(() => {
    bukti();
    console.log(statusTransfer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="p-2 lg:px-32 font-semibold relative">
      <div>
        <div>
          <p className="italic font-bold mb-5">Bismillah,</p>

          <p className="text-justify">
            Untuk Menyelesaikan proses pendaftaran, silahkan transfer Uang
            sejumlah Rp. 450.000,00 ke Rekening berikut.
          </p>
          <div className="mt-5 border p-5 bg-gray-50">
            <div className="grid grid-cols-12 font-bold  ">
              <div className=" col-span-6 lg:col-span-2 flex items-start lg:items-center justify-between">
                <span>Nomor Rekening</span>
                <span>:</span>
              </div>

              <div className="ml-5 col-span-6 lg:col-span-4">
                <button className="font-bold" onClick={onCopy}>
                  {" "}
                141801000600567
                </button>
              </div>
              {hasCopied ? (
                <p className="absolute z-50 top-0 right-0 flex  items-center text-center ">
                  <span className="text-center text-green-500 border shadow-lg px-4 rounded-md">
                    Copy ke clipboard
                  </span>
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="grid grid-cols-12 font-bold mt-5 lg:mt-2">
              <div className="col-span-6 lg:col-span-2 flex items-start lg:items-center justify-between">
                <span>Kode Bank</span>
                <span>:</span>
              </div>

              <div className="ml-5 col-span-6 lg:col-span-4">
                (002) BRI
              </div>
            </div>
            <div className="grid grid-cols-12 font-bold mt-5 lg:mt-2 ">
              <div className="col-span-6 lg:col-span-2 flex items-start lg:items-center justify-between">
                <span>Atas Nama</span>
                <span>:</span>
              </div>

              <div className="ml-5 col-span-6 lg:col-span-4">
                SMK MADINATULQURAN
              </div>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-justify">
              {" "}
              Apabila sudah transfer ke rekening di atas. Silahkan upload bukti
              transfer di form yang sudah disediakan.
            </p>
            <p className="text-justify">
              Semoga Allah{" "}
              <span className="italic">Subhana Wa Ta'ala mudahkan</span>.
            </p>
            <p className="italic text-justify">
              {" "}
              Syukron Wa Jazakumullahu Khairan
            </p>
          </div>

          <div className="flex items-center justify-end mt-5">
            Hormat Kami
            <br />
            <br />
            <br />
            Panitia PPDB
          </div>
        </div>
      </div>
      {statusTransfer ? (
        <div className="mt-5 text-sm text-green-500">
          <p className="text-justify">
            <span className="italic">Alhamdulilah</span> bukti Transfer sudah di
            upload. Selanjutnya admin akan mengecek bukti maksimal 24 jam.
          </p>
          <p className="text-justify">Kemudian Kami akan infokan kembali </p>
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={fileSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldTouched,
            setFieldValue,
          }) => {
            return (
              <form
                className="border px-5 py-10 mt-5 shadow-lg rounded-lg"
                onSubmit={handleSubmit}
              >
                <div>
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      setFieldValue(`files`, acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps({
                          className: `text-center border-dashed border-4 ${
                            errors.files && touched.files
                              ? "border-red-100"
                              : "border-light-blue-500"
                          } w-full p-5 col-span-4 relative`,
                        })}
                      >
                        <input
                          {...getInputProps()}
                          className="w-full h-full"
                          value={values.file}
                          variant="file"
                          type="file"
                          error={errors?.files && touched?.files}
                          onChange={(event) => {
                            setFieldValue(
                              `files`,
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setFieldValue(`files`, undefined);
                          }}
                          className={`${
                            values.files !== undefined ? "block" : "hidden"
                          } absolute top-0 right-4 z-10" text-xl`}
                        >
                          x
                        </button>
                        <p className="text-gray-400">
                          {values.files !== undefined
                            ? `${values.files.name}`
                            : "Jatukan Bukti Disini atau Klik untuk mengunggah"}
                        </p>
                      </div>
                    )}
                  </Dropzone>
                </div>
                <p className="text-center capitalize">
                  {errors?.files && touched?.files && (
                    <span className="text-red-500 text-md mt-1 italic font-bold text-center w-full">
                      {errors?.files}
                    </span>
                  )}
                </p>
                <div className="mt-5">
                  <button
                    disabled={isSubmitting}
                    className="bg-green-500 w-full flex items-center justify-center text-white py-5  font-bold"
                    type="submit"
                  >
                    {isLoading ? <Loading></Loading> : " Upload Bukti Transfer"}
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      )}
    </div>
  );
}
