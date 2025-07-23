import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const VueLanding = () => {
  const iframeRef = useRef(null);
  const [iframeUrl, setIframeUrl] = useState("hthttps://pmb-smkmq.vercel.app/");
  const history = useHistory();

  console.log("his", history.location.pathname);

  useEffect(() => {
    const iframe = iframeRef.current;
    
    // Method 1: Menggunakan postMessage (Recommended)
    const handleMessage = (event) => {
      // Pastikan origin sesuai dengan aplikasi Vue Anda
      if (event.origin === "https://pmb-smkmq.vercel.app/") {
        if (event.data.type === "URL_CHANGE" && event.data.url) {
          console.log("URL iframe berubah:", event.data.url);
          setIframeUrl(event.data.url);
        }
      }
    };

    // Method 2: Menggunakan load event (Terbatas karena same-origin policy)
    const handleLoad = () => {
      try {
        // Ini hanya akan bekerja jika iframe dan parent memiliki origin yang sama
        const currentUrl = iframe.contentWindow.location.href;
        console.log("URL iframe saat load:", currentUrl);

         history.replace('/login');
        setIframeUrl(currentUrl);
      } catch (error) {
        console.log("Tidak bisa mengakses URL iframe karena same-origin policy");
      }
    };

    // Menambahkan event listeners
    window.addEventListener("message", handleMessage);
    if (iframe) {
      iframe.addEventListener("load", handleLoad);
    }

    // Cleanup
    return () => {
      window.removeEventListener("message", handleMessage);
      if (iframe) {
        iframe.removeEventListener("load", handleLoad);
      }
    };
  }, []);

  return (
    <div>
      {/* Display current iframe URL */}
    
      
      <iframe
        ref={iframeRef}
        src="https://pmb-smkmq.vercel.app/"
        style={{ width: '100%', height: 'calc(100vh - 60px)', border: 'none' }}
      />
    </div>
  );
};

export default VueLanding;