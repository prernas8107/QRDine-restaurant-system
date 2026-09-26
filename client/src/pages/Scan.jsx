import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  QrCode,
  Camera,
  ArrowLeft,
  ExternalLink,
  UtensilsCrossed,
  Sparkles,
  Loader2,
  Download,
  CheckCircle2,
} from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import api from '../lib/api';

const Scan = () => {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [loadingTables, setLoadingTables] = useState(true);
  const [scanResult, setScanResult] = useState('');
  const scannerRef = useRef(null);

  // Load public tables & their QR codes
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await api.get('/tables/public');
        if (res.data?.data) {
          setTables(res.data.data);
        }
      } catch (err) {
        console.warn('Failed to load tables:', err);
      } finally {
        setLoadingTables(false);
      }
    };
    fetchTables();
  }, []);

  // Initialize html5-qrcode scanner
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'qr-reader-container',
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        rememberLastUsedCamera: true,
      },
      false
    );

    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        scanner.clear().catch(() => {});

        // Handle URL or slug
        if (decodedText.includes('/t/')) {
          const parts = decodedText.split('/t/');
          const slug = parts[parts.length - 1];
          navigate(`/t/${slug}`);
        } else if (decodedText.includes('qr=')) {
          const params = new URLSearchParams(decodedText.split('?')[1]);
          const slug = params.get('qr');
          navigate(`/welcome?qr=${slug}`);
        } else {
          // Fallback redirect
          navigate(`/welcome?qr=${decodedText}`);
        }
      },
      (error) => {
        // Continuous scan errors are normal while seeking
      }
    );

    scannerRef.current = scanner;

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 border-b border-zinc-800/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-400/20">
              <QrCode className="w-5 h-5 text-black" />
            </div>
            <span className="font-black text-white text-base">QRDine Scanner</span>
          </div>
          <Link
            to="/welcome"
            className="text-xs text-amber-400 hover:text-amber-300 font-extrabold bg-amber-400/10 px-3 py-1.5 rounded-xl border border-amber-400/20"
          >
            Guest Menu
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        {/* Scanner Card */}
        <div className="max-w-lg mx-auto bg-zinc-900/90 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-2xl">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5" />
              <span>Camera Scanner</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Scan Table QR Code</h1>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
              Point your phone camera at the QR code on your table to instantly view the menu & place your order.
            </p>
          </div>

          {/* HTML5 QR Code Scanner Element */}
          <div className="overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-800 p-2 shadow-inner">
            <div id="qr-reader-container" className="w-full text-zinc-200"></div>
          </div>

          {scanResult && (
            <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-2xl text-center text-xs text-amber-300 font-bold">
              Scanned Code: {scanResult}
            </div>
          )}
        </div>

        {/* Available Restaurant Table QR Codes */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2.5">
                <UtensilsCrossed className="w-5 h-5 text-amber-400" />
                <span>Restaurant Table QR Codes</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                You can scan any table QR code or tap "Dine at Table" to start ordering immediately.
              </p>
            </div>
            <span className="text-xs font-extrabold text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-xl border border-amber-400/20 w-fit shrink-0">
              {tables.length} Tables Active
            </span>
          </div>

          {loadingTables ? (
            <div className="text-center py-16 text-zinc-500 text-sm font-semibold space-y-2">
              <Loader2 className="w-7 h-7 animate-spin mx-auto text-amber-400" />
              <p>Loading table QR codes...</p>
            </div>
          ) : tables.length === 0 ? (
            <div className="text-center py-16 bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 text-zinc-400 text-sm">
              No tables found. Please ensure backend is running.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tables.map((t) => (
                <div
                  key={t._id}
                  className="bg-zinc-900/80 border border-zinc-800/80 rounded-3xl p-6 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between gap-5 group shadow-lg backdrop-blur-md"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-widest">
                        Contactless Table
                      </span>
                      <h3 className="text-2xl font-black text-white">Table #{t.tableNumber}</h3>
                      <p className="text-xs text-zinc-400 font-medium">Capacity: {t.capacity || 4} Guests</p>
                    </div>
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-md shadow-emerald-400/30"></span>
                  </div>

                  {/* QR Image Box */}
                  <div className="flex flex-col items-center justify-center p-5 bg-zinc-950 rounded-2xl border border-zinc-800/80 group-hover:border-amber-400/20 transition-colors shadow-inner">
                    {t.qrImage ? (
                      <img
                        src={t.qrImage}
                        alt={`QR Code for Table ${t.tableNumber}`}
                        className="w-44 h-44 bg-white p-2.5 rounded-2xl shadow-xl"
                      />
                    ) : (
                      <div className="w-44 h-44 flex items-center justify-center text-zinc-600 text-xs font-bold">
                        No QR available
                      </div>
                    )}
                    <span className="text-[11px] text-zinc-500 mt-3 font-mono font-bold">
                      Slug: {t.qrSlug}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <Link
                      to={`/welcome?qr=${t.qrSlug}`}
                      className="py-3 px-3 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-2xl flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-amber-400/10 text-center active:scale-95"
                    >
                      <span>Dine Here</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    {t.qrImage ? (
                      <a
                        href={t.qrImage}
                        download={`Table-${t.tableNumber}-QR.png`}
                        className="py-3 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 transition-colors text-center border border-zinc-700/60 active:scale-95"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Save QR</span>
                      </a>
                    ) : (
                      <button
                        disabled
                        className="py-3 px-3 bg-zinc-800/50 text-zinc-600 font-bold text-xs rounded-2xl cursor-not-allowed text-center"
                      >
                        No QR
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Scan;
