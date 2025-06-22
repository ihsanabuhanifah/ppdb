import Layout from "../../layout/auth";

export default function Register() {
  return (
    <Layout page="register">
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center p-4">
        <div className="w-full max-w-3xl rounded-xl bg-white p-8 shadow-lg">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">
              Pendaftaran Online Sudah Ditutup
            </h2>
            
            <p className="mb-6 text-lg text-gray-600">
              Saat ini kami hanya menerima pendaftaran offline. Silakan datang langsung ke:
            </p>
            
            <div className="mb-8 rounded-lg bg-blue-50 p-4 text-left">
              <p className="font-semibold text-blue-800">MAN 1 Kota Sukabumi</p>
              <p className="text-gray-700">Jl. Pramuka No.4, Gedongpanjang, Kec. Citamiang, Kota Sukabumi, Jawa Barat 43144</p>
            </div>
            
            <p className="text-lg font-medium text-red-600">
              Batas akhir pendaftaran: 01 Juli 2025
            </p>
            
           
          </div>
        </div>
      </div>
    </Layout>
  );
}