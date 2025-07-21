// src/components/VueLanding.js
import React, { useEffect, useRef } from "react";

const VueLanding = () => {
  // Gunakan useRef untuk referensi ke elemen DOM tempat Vue akan di-mount
  const vueAppContainerRef = useRef(null);

  useEffect(() => {
    // Array untuk menyimpan referensi elemen yang ditambahkan agar bisa dibersihkan
    const addedElements = [];

    // --- Langkah 1: Siapkan lingkungan untuk aplikasi Vue ---
    // (Opsional) Jika Font Awesome benar-benar dibutuhkan oleh aplikasi Vue dan tidak dimuat secara global di React
    const fontAwesomeLink = document.createElement("link");
    fontAwesomeLink.rel = "stylesheet";
    fontAwesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
    document.head.appendChild(fontAwesomeLink);
    addedElements.push(fontAwesomeLink);

    // --- Langkah 2: Muat CSS dari build Vue ---
    const vueCssLink = document.createElement("link");
    vueCssLink.rel = "stylesheet";
    // Pastikan path ini benar relatif terhadap folder public di proyek React Anda
    // Contoh: jika folder dist Vue Anda ada di public/vue-dist/, maka "/vue-dist/assets/index-xxxxxxxx.css"
    vueCssLink.href = "/dist/assets/index-BiM6Eutw.css";
    document.head.appendChild(vueCssLink);
    addedElements.push(vueCssLink);

    // --- Langkah 3: Muat JavaScript dari build Vue ---
    const vueJsScript = document.createElement("script");
    // Pastikan path ini benar relatif terhadap folder public di proyek React Anda
    // Contoh: jika folder dist Vue Anda ada di public/vue-dist/, maka "/vue-dist/assets/index-yyyyyyyy.js"
    vueJsScript.src = "/dist/assets/index-BNCWx2M6.js";
    vueJsScript.type = "module"; // Penting untuk modul ES
    document.body.appendChild(vueJsScript); // Muat di body, atau bisa juga di head jika aplikasi Vue siap setelah DOMContentLoaded
    addedElements.push(vueJsScript);

    // --- Langkah 4: Pastikan elemen mount Vue ada dan terisolasi ---
    // Vue akan mencari elemen dengan ID 'app' untuk me-mount dirinya.
    // Elemen div dengan id="app" sudah ada di return JSX, jadi tidak perlu membuat lagi di sini.
    // 'isolation: isolate' pada styling div di bawah sudah cukup untuk isolasi CSS.

    // --- Pembersihan saat komponen di-unmount ---
    return () => {
      addedElements.forEach((el) => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
      // Opsional: Hapus instance Vue jika diperlukan, meskipun Vue biasanya membersihkan dirinya sendiri jika elemen mount dihapus.
      // Jika Vue Anda memiliki lifecycle hook untuk unmount/destroy, Anda bisa memicu itu di sini jika Anda bisa mengakses instance Vue.
    };
  }, []); // Array dependensi kosong agar efek hanya berjalan sekali saat mount

  return (
    <div
      ref={vueAppContainerRef} // Referensi ke elemen div
      id="app" // ID yang dicari oleh aplikasi Vue Anda
      style={{
        minHeight: "100vh", // Pastikan ada tinggi yang cukup untuk Vue
        width: "100%",      // Pastikan ada lebar yang cukup
        isolation: "isolate", // Membantu mencegah konflik CSS global
        // Tambahkan styling lain jika diperlukan
      }}
    >
      {/* Konten Vue akan di-render di dalam div ini */}
    </div>
  );
};

export default VueLanding;