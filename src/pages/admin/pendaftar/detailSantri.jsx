import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useGetDetailSantri } from "../../../api/santri";

export default function DetailSantri() {
    const params = useParams();
    const { isLoading, data, isFetching } = useGetDetailSantri(params?.id);

    

    if (isLoading || isFetching | !data) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500">
                    Loading
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-700">Data tidak ditemukan</h2>
                    <p className="text-gray-500">Tidak dapat memuat data santri</p>
                </div>
            </div>
        );
    }

    // Helper functions
    const formatValue = (value) => value || '-';
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };
    const formatDateTime = (dateString) => {
        if (!dateString) return '-';
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
                    <h1 className="text-2xl font-bold">Detail Santri</h1>
                    <p className="opacity-90">Informasi lengkap tentang santri</p>
                </div>

                <div className="p-6 space-y-6">
                    {/* User Information Card */}
                    <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Informasi Pengguna
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Nama Lengkap</p>
                                <p className="font-medium">{formatValue(data.name)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{formatValue(data.email)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Nomor Telepon</p>
                                <p className="font-medium">{formatValue(data.phone)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Tahun Ajaran</p>
                                <p className="font-medium">{formatValue(data.tahun_ajar)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Sumber Informasi</p>
                                <p className="font-medium">{formatValue(data.informasi)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Dibuat Pada</p>
                                <p className="font-medium">{formatDateTime(data.created_at)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Diupdate Pada</p>
                                <p className="font-medium">{formatDateTime(data.updated_at)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <p className="font-medium">
                                    <span className={`px-2 py-1 rounded-full text-xs ${data.is_batal === 1 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                        {data.is_batal === 1 ? "Dibatalkan" : "Aktif"}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Student Information Card */}
                    <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Data Calon Siswa
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Nama Siswa</p>
                                <p className="font-medium">{formatValue(data.calon_siswa?.name_siswa)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">NIK Siswa</p>
                                <p className="font-medium">{formatValue(data.calon_siswa?.nik_siswa)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Tempat/Tanggal Lahir</p>
                                <p className="font-medium">
                                    {formatValue(data.calon_siswa?.tempat_lahir_siswa)}, {formatDate(data.calon_siswa?.tanggal_lahir_siswa)}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Jenis Kelamin</p>
                                <p className="font-medium">
                                    {data.calon_siswa?.jenis_kelamin === "1" ? "Laki-laki" : "Perempuan"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Agama</p>
                                <p className="font-medium">{formatValue(data.calon_siswa?.agama)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Golongan Darah</p>
                                <p className="font-medium">{formatValue(data.calon_siswa?.golongan_darah)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Alamat</p>
                                <p className="font-medium">{formatValue(data.calon_siswa?.alamat_siswa)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Nomor Telepon</p>
                                <p className="font-medium">{formatValue(data.calon_siswa?.nomor_telepon_siswa)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Pihak yang Dihubungi</p>
                                <p className="font-medium">{formatValue(data.calon_siswa?.pihak_yg_dihubungi)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Tinggi Badan</p>
                                <p className="font-medium">{data.calon_siswa?.tinggi_badan || 0} cm</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Berat Badan</p>
                                <p className="font-medium">{data.calon_siswa?.berat_badan || 0} kg</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Ukuran Baju</p>
                                <p className="font-medium">{formatValue(data.calon_siswa?.ukuran_baju)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Cita-cita</p>
                                <p className="font-medium">{formatValue(data.calon_siswa?.cita_cita)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Jurusan</p>
                                <p className="font-medium">
                                    {data.calon_siswa?.jurusan === 1 ? "IPA" : data.calon_siswa?.jurusan === 2 ? "IPS" : "-"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Education History Card */}
                    <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            Pendidikan Sebelumnya
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Asal Sekolah</p>
                                <p className="font-medium">{formatValue(data.pendidikan_sebelumnya?.asal_sekolah)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Alamat Sekolah</p>
                                <p className="font-medium">{formatValue(data.pendidikan_sebelumnya?.alamat_sekolah)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Nomor Telepon Sekolah</p>
                                <p className="font-medium">{formatValue(data.pendidikan_sebelumnya?.nomor_telepon_sekolah)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">NISN</p>
                                <p className="font-medium">{formatValue(data.pendidikan_sebelumnya?.nisn)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">NPSN</p>
                                <p className="font-medium">{formatValue(data.pendidikan_sebelumnya?.npsn)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Parent Information Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Father's Information */}
                        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Data Ayah
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500">Nama Ayah</p>
                                    <p className="font-medium">{formatValue(data.data_ayah?.name_ayah)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">NIK Ayah</p>
                                    <p className="font-medium">{formatValue(data.data_ayah?.nik_ayah)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Tempat Lahir</p>
                                    <p className="font-medium">{formatValue(data.data_ayah?.tempat_lahir_ayah)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Tanggal Lahir</p>
                                    <p className="font-medium">{formatDate(data.data_ayah?.tanggal_lahir_ayah)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Pekerjaan</p>
                                    <p className="font-medium">{formatValue(data.data_ayah?.pekerjaan_ayah)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Nomor Telepon</p>
                                    <p className="font-medium">{formatValue(data.data_ayah?.nomor_telepon_ayah)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Penghasilan</p>
                                    <p className="font-medium">{formatValue(data.data_ayah?.penghasilan_ayah)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Mother's Information */}
                        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Data Ibu
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500">Nama Ibu</p>
                                    <p className="font-medium">{formatValue(data.data_ibu?.name_ibu)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">NIK Ibu</p>
                                    <p className="font-medium">{formatValue(data.data_ibu?.nik_ibu)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Tempat Lahir</p>
                                    <p className="font-medium">{formatValue(data.data_ibu?.tempat_lahir_ibu)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Tanggal Lahir</p>
                                    <p className="font-medium">{formatDate(data.data_ibu?.tanggal_lahir_ibu)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Pekerjaan</p>
                                    <p className="font-medium">{formatValue(data.data_ibu?.pekerjaan_ibu)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Nomor Telepon</p>
                                    <p className="font-medium">{formatValue(data.data_ibu?.nomor_telepon_ibu)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Penghasilan</p>
                                    <p className="font-medium">{formatValue(data.data_ibu?.penghasilan_ibu)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Test Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Tes Masuk */}
                        {data.tes_masuk && data.tes_masuk.length > 0 && (
                            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Tes Masuk
                                </h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode Mapel</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nilai</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ulangi</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {data.tes_masuk.map((tes, index) => (
                                                <tr key={index}>
                                                    <td className="px-4 py-2 whitespace-nowrap">{formatValue(tes.kode_mapel)}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap">{formatValue(tes.nilai)}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap">{tes.ulangi === 1 ? "Ya" : "Tidak"}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap">{formatDateTime(tes.created_at)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Tes Diniyyah */}
                        {data.tes_diniyyah && (
                            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Tes Diniyyah
                                </h2>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Tanggal Tes</p>
                                        <p className="font-medium">{formatDateTime(data.tes_diniyyah.tanggal)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Metode</p>
                                        <p className="font-medium">
                                            {data.tes_diniyyah.metode === 1 ? "Online" : 
                                             data.tes_diniyyah.metode === 2 ? "Offline" : "-"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Status</p>
                                        <p className="font-medium">
                                            {data.tes_diniyyah.status === 1 ? "Selesai" : "Belum Selesai"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Kelulusan</p>
                                        <p className="font-medium">
                                            {data.tes_diniyyah.kelulusan === "1" ? "Lulus" : "Tidak Lulus"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Laporan</p>
                                        <p className="font-medium">{formatValue(data.tes_diniyyah.laporan)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Disetujui Oleh</p>
                                        <p className="font-medium">{formatValue(data.tes_diniyyah.approved_by)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Dibatalkan</p>
                                        <p className="font-medium">
                                            {data.tes_diniyyah.is_batal === 1 ? "Ya" : "Tidak"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bukti Pembayaran */}
                    {data.bukti && (
                        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Bukti Pembayaran
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <p className="font-medium">
                                        {data.bukti.status === 1 ? "Diterima" : "Menunggu"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Nominal</p>
                                    <p className="font-medium">{formatValue(data.bukti.nominal)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Upload Ulang</p>
                                    <p className="font-medium">
                                        {data.bukti.upload_ulang === 1 ? "Ya" : "Tidak"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Disetujui Oleh</p>
                                    <p className="font-medium">{formatValue(data.bukti.approved_by)}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <p className="text-sm text-gray-500">Bukti Transfer</p>
                                    {data.bukti.url_img ? (
                                        <a href={data.bukti.url_img} target="_blank" rel="noopener noreferrer" className="inline-block mt-2">
                                            <img src={data.bukti.url_img} alt="Bukti transfer" className="h-32 rounded-md border" />
                                        </a>
                                    ) : (
                                        <p className="font-medium">-</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Additional Information */}
                    {(data.data_wali || data.prestasi_belajar || data.prestasi_smp) && (
                        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Informasi Tambahan</h2>
                            <div className="space-y-4">
                                {data.data_wali && (
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-700 mb-2">Data Wali</h3>
                                        <p className="text-gray-600">Data wali tersedia</p>
                                    </div>
                                )}
                                {data.prestasi_belajar && (
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-700 mb-2">Prestasi Belajar</h3>
                                        <p className="text-gray-600">Data prestasi belajar tersedia</p>
                                    </div>
                                )}
                                {data.prestasi_smp && (
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-700 mb-2">Prestasi SMP</h3>
                                        <p className="text-gray-600">Data prestasi SMP tersedia</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}