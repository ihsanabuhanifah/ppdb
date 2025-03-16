import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const [pendaftar, setPendaftar] = useState([]);
    const [lulusTes, setLulusTes] = useState(0);
    const [daftarUlang, setDaftarUlang] = useState(0);
    const [totalUangMasuk, setTotalUangMasuk] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost/api/pendaftar_lulus.php");
                setPendaftar(response.data);
                setLulusTes(response.data.length);
                setDaftarUlang(response.data.filter(p => p.status_daftar_ulang === "Ya").length);
                setTotalUangMasuk(response.data.reduce((total, p) => total + parseFloat(p.uang_sudah_bayar), 0));
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Dashboard PPDB</h1>
            
            <div className="grid grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-4 text-center">
                        <h2 className="text-lg font-semibold">Pendaftar Lulus Tes</h2>
                        <p className="text-2xl font-bold">{lulusTes}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <h2 className="text-lg font-semibold">Pendaftar Daftar Ulang</h2>
                        <p className="text-2xl font-bold">{daftarUlang}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <h2 className="text-lg font-semibold">Total Uang Masuk</h2>
                        <p className="text-2xl font-bold">Rp {totalUangMasuk.toLocaleString()}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Daftar Pendaftar Lulus Tes</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nama Lengkap</TableHead>
                            <TableHead>Asal Sekolah</TableHead>
                            <TableHead>Nomor HP</TableHead>
                            <TableHead>Uang Sudah Bayar</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pendaftar.map((p, index) => (
                            <TableRow key={index}>
                                <TableCell>{p.id}</TableCell>
                                <TableCell>{p.nama_lengkap}</TableCell>
                                <TableCell>{p.asal_sekolah}</TableCell>
                                <TableCell>{p.nomor_hp}</TableCell>
                                <TableCell>Rp {parseFloat(p.uang_sudah_bayar).toLocaleString()}</TableCell>
                                <TableCell>
                                    <button 
                                        className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
                                        onClick={() => navigate(`/edit/${p.id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button className="px-3 py-1 bg-green-500 text-white rounded">Lunas</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Dashboard;
