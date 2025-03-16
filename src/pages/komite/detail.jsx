import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPembayaran = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pendaftar, setPendaftar] = useState(null);
    const [nominalBayar, setNominalBayar] = useState(0);
    const [keterangan, setKeterangan] = useState("");
    const [tanggalPembayaran, setTanggalPembayaran] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost/api/pendaftar_detail.php?id=${id}`);
                setPendaftar(response.data);
                setTanggalPembayaran(new Date().toISOString().split('T')[0]); // Set default tanggal
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost/api/update_pembayaran.php", {
                id,
                nominal_bayar: nominalBayar,
                keterangan,
                tanggal_pembayaran: tanggalPembayaran
            });
            alert("Data pembayaran berhasil diperbarui");
            navigate("/");
        } catch (error) {
            console.error("Error updating data: ", error);
        }
    };

    if (!pendaftar) return <p>Loading...</p>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
            <h1 className="text-xl font-bold mb-4">Edit Pembayaran</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium">ID</label>
                    <input type="text" value={pendaftar.id} disabled className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Nama Siswa</label>
                    <input type="text" value={pendaftar.nama_lengkap} disabled className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Asal Sekolah</label>
                    <input type="text" value={pendaftar.asal_sekolah} disabled className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Nomor HP</label>
                    <input type="text" value={pendaftar.nomor_hp} disabled className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Tanggal Pembayaran</label>
                    <input type="date" value={tanggalPembayaran} readOnly className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Nominal Bayar</label>
                    <input 
                        type="number" 
                        value={nominalBayar} 
                        onChange={(e) => setNominalBayar(e.target.value)} 
                        className="w-full p-2 border rounded" 
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Keterangan</label>
                    <textarea 
                        value={keterangan} 
                        onChange={(e) => setKeterangan(e.target.value)} 
                        className="w-full p-2 border rounded"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Tambah Pembayaran</button>
                </div>
            </form>
        </div>
    );
};

export default EditPembayaran;
