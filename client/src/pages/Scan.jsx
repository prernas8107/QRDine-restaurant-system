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
  RefreshCw,
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
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 border-b border-zinc-800/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
              <QrCode className="w-4 h-4 text-black" />
            </div>
            <span className="font-black text-white text-base">QRDine Scanner</span>
          </div>
          <Link
            to="/welcome"
            className="text-xs text-amber-400 hover:text-amber-300 font-bold"
          >
            Guest Menu
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        {/* Scanner Card */}
        <div className="max-w-lg mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold">
              <Camera className="w-3.5 h-3.5" />
              <span>Camera Scanner</span>
            </div>
            <h1 className="text-2xl font-black text-white">Scan Table QR Code</h1>
            <p className="text-xs text-zinc-400">
              Point your camera at the QR code on your restaurant table to view the menu & order.
            </p>
          </div>

          {/* HTML5 QR Code Scanner Element */}
          <div className="overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-800 p-2">
            <div id="qr-reader-container" className="w-full text-zinc-200"></div>
          </div>

          {scanResult && (
            <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-xl text-center text-xs text-amber-300 font-semibold">
              Scanned: {scanResult}
            </div>
          )}
        </div>

        {/* Available Restaurant Table QR Codes */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-amber-400" />
                <span>Restaurant Table QR Codes</span>
              </h2>
              <p className="text-xs text-zinc-400">
                Aap neeche diye gaye kisi bhi table ke QR code ko scan kar sakte hain ya direct "Dine at Table" click kar sakte hain.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-xl border border-amber-400/20 w-fit">
              {tables.length} Tables Active
            </span>
          </div>

          {loadingTables ? (
            <div className="text-center py-12 text-zinc-500 text-sm">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-amber-400" />
              Loading table QR codes...
            </div>
          ) : tables.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 text-sm">
              No tables found. Please ensure backend is running.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {tables.map((t) => (
                <div
                  key={t._id}
                  className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 hover:border-amber-400/40 transition-all flex flex-col justify-between gap-4 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                        Contactless Table
                      </span>
                      <h3 className="text-xl font-black text-white">Table #{t.tableNumber}</h3>
                      <p className="text-xs text-zinc-400">Capacity: {t.capacity || 4} Guests</p>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>

                  {/* QR Image Box */}
                  <div className="flex flex-col items-center justify-center p-4 bg-zinc-950 rounded-2xl border border-zinc-800/80 group-hover:border-amber-400/20 transition-colors">
                    {t.qrImage ? (
                      <img
                        src={t.qrImage}
                        alt={`QR Code for Table ${t.tableNumber}`}
                        className="w-40 h-40 bg-white p-2 rounded-xl shadow-md"
                      />
                    ) : (
                      <div className="w-40 h-40 flex items-center justify-center text-zinc-600 text-xs">
                        No QR available
                      </div>
                    )}
                    <span className="text-[11px] text-zinc-500 mt-2 font-mono">
                      Slug: {t.qrSlug}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      to={`/welcome?qr=${t.qrSlug}`}
                      className="py-2.5 px-3 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-amber-400/10 text-center"
                    >
                      <span>Dine Here</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    {t.qrImage && (
                      <a
                        href={t.qrImage}
                        download={`Table-${t.tableNumber}-QR.png`}
                        className="py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors text-center"
                      >
                        <span>Save QR</span>
                      </a>
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
