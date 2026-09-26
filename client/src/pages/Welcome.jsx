import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams, useParams } from 'react-router-dom';
import {
  UtensilsCrossed,
  Sparkles,
  QrCode,
  ArrowRight,
  User,
  LogIn,
  UserPlus,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Flame,
  Award,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { session } from '../redux/guestSlice';
import { setTableInfo } from '../redux/cartSlice';
import api from '../lib/api';

const Welcome = () => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const qrSlugFromUrl = searchParams.get('qr') || slug;
  const [tableData, setTableData] = useState(null);
  const [availableTables, setAvailableTables] = useState([]);
  const [selectedTableNumber, setSelectedTableNumber] = useState(
    localStorage.getItem('tableNumber') || '1'
  );
  const [loadingTable, setLoadingTable] = useState(false);
  const [startingSession, setStartingSession] = useState(false);

  const getDeviceId = () => {
    let id = localStorage.getItem('deviceId');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('deviceId', id);
    }
    return id;
  };

  // Fetch table data if QR slug provided or load tables list for selection
  useEffect(() => {
    const fetchTableInfo = async () => {
      if (qrSlugFromUrl) {
        setLoadingTable(true);
        try {
          const res = await api.get(`/tables/${qrSlugFromUrl}`);
          if (res.data?.data) {
            setTableData(res.data.data);
            setSelectedTableNumber(String(res.data.data.tableNumber));
            dispatch(
              setTableInfo({
                tableNumber: res.data.data.tableNumber,
                tableSlug: qrSlugFromUrl,
              })
            );
          }
        } catch (e) {
          console.warn('Could not fetch table by QR slug:', e.message);
        } finally {
          setLoadingTable(false);
        }
      } else {
        // Fetch all tables so user can pick one if testing without QR code
        try {
          const res = await api.get('/tables/public');
          if (res.data?.data && res.data.data.length > 0) {
            setAvailableTables(res.data.data);
            setSelectedTableNumber(String(res.data.data[0].tableNumber));
          }
        } catch (e) {
          console.warn('Could not load tables list:', e.message);
        }
      }
    };

    fetchTableInfo();
  }, [qrSlugFromUrl, dispatch]);

  const handleStartDineIn = async () => {
    setStartingSession(true);
    try {
      const deviceId = getDeviceId();
      const qrSlug = qrSlugFromUrl || tableData?.qrSlug || null;

      await dispatch(session({ deviceId, qrSlug })).unwrap();
      const tableNum = tableData?.tableNumber || Number(selectedTableNumber) || 1;

      dispatch(
        setTableInfo({
          tableNumber: tableNum,
          tableSlug: qrSlug,
        })
      );
      localStorage.setItem('tableNumber', String(tableNum));
      if (qrSlug) localStorage.setItem('tableSlug', qrSlug);

      navigate('/');
    } catch (err) {
      console.error('Session start failed:', err);
      // Fallback: set local table number and allow navigation
      localStorage.setItem('tableNumber', String(selectedTableNumber || 1));
      navigate('/');
    } finally {
      setStartingSession(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-white flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Glows & Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-amber-500/15 via-orange-600/10 to-transparent blur-[140px]" />
        <div className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] bg-amber-400/5 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Top Bar Header */}
      <header className="relative z-10 max-w-5xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
            <UtensilsCrossed className="w-5 h-5 text-black" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              QRDine
            </h1>
            <p className="text-[10px] text-amber-400 font-bold tracking-widest uppercase">
              Smart Dine-In Experience
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 text-xs font-semibold">
          <Link
            to="/login"
            className="px-3 py-1.5 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-all"
          >
            Member Login
          </Link>
          <Link
            to="/register"
            className="px-3.5 py-1.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 transition-all shadow-sm"
          >
            Join Rewards
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-lg mx-auto w-full px-4 sm:px-6 py-8 flex-1 flex flex-col justify-center">
        {/* Table Card */}
        <div className="bg-zinc-900/90 border border-zinc-800/90 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
          {/* Header section */}
          <div className="text-center space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-bold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <QrCode className="w-3.5 h-3.5 text-amber-400" />
              <span>Smart Table Connected</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              {tableData ? (
                <>Welcome to Table #{tableData.tableNumber}</>
              ) : (
                <>Welcome to Your Table</>
              )}
            </h2>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-xs mx-auto leading-relaxed font-normal">
              Order fresh vegetarian culinary specialties directly to your seat. Fast, contactless, and chef-made.
            </p>
          </div>

          {/* Table Selector Box */}
          <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between shadow-inner">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 font-black text-xl shadow-md">
                {tableData ? tableData.tableNumber : selectedTableNumber}
              </div>
              <div>
                <p className="text-[11px] text-zinc-400 font-medium">Assigned Seating</p>
                <p className="text-sm font-bold text-zinc-100">
                  {tableData
                    ? `Dine-In • Table #${tableData.tableNumber}`
                    : `Dine-In Table #${selectedTableNumber}`}
                </p>
              </div>
            </div>

            {tableData ? (
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/25">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified</span>
              </div>
            ) : availableTables.length > 0 ? (
              <select
                value={selectedTableNumber}
                onChange={(e) => setSelectedTableNumber(e.target.value)}
                className="bg-zinc-900 border border-zinc-700 text-xs font-bold text-white rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {availableTables.map((t) => (
                  <option key={t._id} value={t.tableNumber}>
                    Table {t.tableNumber}
                  </option>
                ))}
              </select>
            ) : (
              <div className="text-xs text-zinc-400 font-semibold bg-zinc-900 px-2.5 py-1 rounded-lg">
                Table #1
              </div>
            )}
          </div>

          {/* Primary CTA */}
          <button
            onClick={handleStartDineIn}
            disabled={startingSession || loadingTable}
            className="w-full py-4 px-6 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-black font-black text-base rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-amber-500/25 flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
          >
            {startingSession ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-black" />
                <span>Connecting to Kitchen...</span>
              </>
            ) : (
              <>
                <span>View Full Menu & Order</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Perks Row */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800/80 text-center">
            <div className="p-2 rounded-xl bg-zinc-950/40 border border-zinc-800/60">
              <Zap className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-zinc-200">Zero Waiting</p>
              <p className="text-[9px] text-zinc-500">Instant Kitchen Alert</p>
            </div>
            <div className="p-2 rounded-xl bg-zinc-950/40 border border-zinc-800/60">
              <Sparkles className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-zinc-200">30% OFF Code</p>
              <p className="text-[9px] text-zinc-500">FIRST30</p>
            </div>
            <div className="p-2 rounded-xl bg-zinc-950/40 border border-zinc-800/60">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-zinc-200">100% Pure Veg</p>
              <p className="text-[9px] text-zinc-500">Artisanal Quality</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-5 text-center text-xs text-zinc-500 font-medium">
        <p>QRDine • Contactless Tabletop Dining & POS</p>
      </footer>
    </div>
  );
};

export default Welcome;