import React from "react";
import Dropzone from "react-dropzone";
import { Formik } from "formik";
import * as Yup from "yup";
import Loading from "../../../components/loading";
import Input from "../../../components/Input";
import { formatRupiah } from "../../../utils/formatRupiah";
import {
  uploadBuktiTransfer,
  detailBuktiTransfer,
  getBuktiTransfer,
} from "../../../api/santri";
import { useHistory } from "react-router-dom";
import { useToast, useClipboard } from "@chakra-ui/react";
import { payment } from "../../../redux/action/login";
import { useSelector, useDispatch } from "react-redux";
let fileSchema = Yup.object().shape({
  files: Yup.string().required("Bukti Transfer wajib di Upload"),
  nominal: Yup.number()
  .typeError("Nominal wajib dengan angka")
  .required("Nominal wajib diisi"),
});
export default function Pembayaran() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFecthing, setIsFetching] = React.useState(false);
  const [errorPost, setErrorPost] = React.useState();
  const [statusTransfer, setStatusTransfer] = React.useState(false);
  const [value, setValue] = React.useState(3310006100);
  const { hasCopied, onCopy } = useClipboard(value);
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const isLulus = useSelector((state) => state.auth.isLulus);
  let dispatch = useDispatch();
  let history = useHistory();
  let toast = useToast();
  let initialValues = {
    files: undefined,
    nominal: "",
    status: 1,
  };
  const onSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    let result = await uploadBuktiTransfer(values);
    setIsLoading(false);
    if (result?.message === "Berhasil Menyimpan Data") {
      toast({
        position: "top-right",
        title: "Success",
        description: "Berhasil Menyimpan Data",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      // dispatch(payment());
      bukti();
      resetForm();
      initialValues = {
        files: undefined,
        nominal: "",
        status: 1,
      };
      return setStatusTransfer(true);
      // history.push("/identitas/data-ibu");
    }
    if (result.response.status === 401) {
      setErrorPost(result.response.data);
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
    setIsFetching(true);
    let result = await getBuktiTransfer();
    console.log("hasil", result);
    setData(result.data);
    let total = 0;
    for (let data in result.data) {
      console.log(result.data[data]);

    
        total = total + result.data[data]?.nominal;
      
    }
    setTotal(total);
    setIsFetching(false);
    if (result !== "") {
      return setStatusTransfer(true);
      // history.push("/identitas/data-ibu");
    }
  };
  React.useEffect(() => {
    bukti();
    console.log(statusTransfer);
  }, []);

  return (
    <div className="p-2 lg:px-32 font-semibold relative">
      <div className="leading-relaxed border-b-2 pb-5">
        <h2 className="text-2xl font-bold mb-3 text-green-500">
          Catatan Pembayaran <br /> PPDB & Biaya Pendidikan <br /> Santri SMK
          MADINATULQURAN
        </h2>
      </div>
      <div className=" h-min-full p-5 pb-10 shadow-lg border">
        <h1 className="uppercase mb-5 font-bold text-green-500 text-center">
          {" "}
          RIWAYAT TRANSFER PROSES PEMBAYARAN PPDB SMK MADINATULQURAN
        </h1>
        <div className="overflow-auto w-full">
          {isFecthing ? (
            <div className="border  shadow rounded-md p-4  w-full mx-auto">
              <div className="animate-pulse flex space-x-4 w-full ">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-10 bg-gray-300 rounded w-full" />
                  <div className="grid grid-cols-7 gap-x-5">
                    <div className="h-6 bg-gray-300 rounded " />
                    <div className="h-6 bg-gray-300 rounded col-span-2 " />
                    <div className="h-6 bg-gray-300 rounded col-span-2 " />
                    <div className="h-6 bg-gray-300 rounded col-span-2 " />
                  </div>
                  <div className="grid grid-cols-7 gap-x-5">
                    <div className="h-6 bg-gray-300 rounded " />
                    <div className="h-6 bg-gray-300 rounded col-span-2 " />
                    <div className="h-6 bg-gray-300 rounded col-span-2 " />
                    <div className="h-6 bg-gray-300 rounded col-span-2 " />
                  </div>
                  <div className="grid grid-cols-7 gap-x-5">
                    <div className="h-6 bg-gray-300 rounded " />
                    <div className="h-6 bg-gray-300 rounded col-span-2 " />
                    <div className="h-6 bg-gray-300 rounded col-span-2 " />
                    <div className="h-6 bg-gray-300 rounded col-span-2 " />
                  </div>
                  <div className="grid grid-cols-7 gap-x-5">
                    
                    <div className="h-6 bg-gray-300 rounded col-span-5 " />
                    <div className="h-6 bg-gray-300 rounded col-span-2 " />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <table className="p-1  w-full ">
              <thead>
                <tr className="uppercase">
                  <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500 border-gray-500">
                    <div className="text-sm leading-5 text-green-500">No</div>
                  </th>

                  <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500 border-gray-500">
                    <div className="text-sm leading-5 text-green-500">
                      Status
                    </div>
                  </th>
                  <th className="px-6 py-4 whitespace-no-wrap border-b text-left  text-green-500 border-gray-500">
                    <div className="text-sm leading-5 text-green-500">
                      Bukti Transfer
                    </div>
                  </th>
                  <th className="px-6 py-4 whitespace-no-wrap border-b text-left  text-green-500 border-gray-500">
                    <div className="text-sm leading-5 text-green-500">
                      Nominal
                    </div>
                  </th>
                  {/* <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500  border-gray-500">
              <div className="text-sm leading-5 text-green-500"></div>
            </th>
            <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500 border-gray-500">
              <div className="text-sm leading-5 text-green-500">
                Status Kelulusan
              </div>
            </th> */}

                  {/* <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-green-500 tracking-wider">
                  Created_At
                </th> */}
                </tr>
              </thead>{" "}
              <tbody className="bg-white relative">
                {}
                {data?.map((dt, index) => (
                  <tr key={index} className="hover:bg-gray-200">
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm leading-5 text-gray-800">
                            {index + 1}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm leading-5 text-green-900">
                        {dt.status === 1 ? (
                          <p className="text-green-500 p-3 font-bold text-white">
                            Terkonfirmasi Admin
                          </p>
                        ) : (
                          <p className="text-red-500 p-3 font-bold text-white">
                            Belum Terkonfirmasi Admin
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-green-500">
                      <div className="text-sm leading-5 text-green-500">
                        <a
                          target="_blank"
                          className="hover:text-green-800 font-bold"
                          href={dt?.url_img}
                        >
                          Lihat Bukti
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm leading-5 text-green-500">
                        {dt.nominal === null
                          ? formatRupiah(350000)
                          : formatRupiah(dt.nominal)}
                      </div>
                    </td>
                  </tr>
                ))}
                <tr className="hover:bg-gray-200 text-xl font-bold">
                <td colSpan={3} className="px-6 py-4  whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm text-center  leading-5 text-green-500">
                       TOTAL PEMBAYARAN
                      </div>
                    </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-green-500">
                      {formatRupiah(total)}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div>
      <div className="mt-5 text-md text-red-500 font-bold">
          <p className="text-justify">
            <span className="italic">Note :</span> bukti Transfer dikonfirmasi admin maksimal dalam 24 jam.
          </p>
        
        </div>
        {/* upload bukti */}
       {isLulus === "1" ? ( <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={fileSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            setValues,
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
                <h1 className="uppercase mb-5 font-bold text-green-500 text-center">
                  {" "}
                  Form Upload Bukti Transfer pembayaran PSB
                </h1>
                <div className="mb-5">
                  <Input
                    label="nominal"
                    id="nominal"
                    placeholder="Nominal Transfer"
                    tabIndex="2"
                    type="text"
                    error={errors.nominal && touched.nominal}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nominal}
                    required
                  >
                    {" "}
                    {errors.nominal && touched.nominal && (
                      <p className="text-red-500 italic font-bold  text-sm mt-1">
                        {errors.nominal}
                      </p>
                    )}
                  </Input>
                </div>
                <label
                  className="font-bold mb-5   text-green-500 "
                  htmlFor="penghasilan_ayah"
                >
                  <span className="uppercase">File Bukti</span>{" "}
                  <span className="italic text-md text-red-500">(wajib)</span>
                </label>
                <div>
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      let reader = new FileReader();

                      setFieldValue(`files`, acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps({
                          className: `text-center border-dashed border-4 mt-5 ${
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
                            let reader = new FileReader();

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
        </Formik>) : ""}
      </div>
    </div>
  );
}
{
}
