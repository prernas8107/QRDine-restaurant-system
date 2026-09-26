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
  Table,
  Zap,
  ChevronRight,
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
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-amber-500/15 via-orange-500/5 to-transparent blur-3xl pointer-events-none"></div>

      {/* Top Navigation Bar */}
      <header className="relative z-10 max-w-5xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <UtensilsCrossed className="w-5 h-5 text-black" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              QRDine
            </h1>
            <p className="text-[10px] text-amber-400 font-extrabold tracking-wider uppercase">
              Smart Restaurant Platform
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Link
            to="/login"
            className="text-zinc-400 hover:text-white transition-colors text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-zinc-900 border border-transparent hover:border-zinc-800"
          >
            Member Login
          </Link>
          <span className="text-zinc-800">•</span>
          <Link
            to="/register"
            className="text-amber-400 hover:text-amber-300 transition-colors text-xs font-bold bg-amber-400/10 px-3.5 py-1.5 rounded-xl border border-amber-400/20"
          >
            Join Rewards
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-lg mx-auto w-full px-6 py-6 flex-1 flex flex-col justify-center">
        {/* Table Detection Card */}
        <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
              <QrCode className="w-3.5 h-3.5" />
              <span>QR Dine-In Active</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              {tableData ? (
                <>Table #{tableData.tableNumber}</>
              ) : (
                <>Welcome to Your Table</>
              )}
            </h2>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-xs mx-auto leading-relaxed">
              Browse our freshly crafted vegetarian menu, customize your order,
              and have food delivered straight to your table.
            </p>
          </div>

          {/* Table Selector Box */}
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-4 flex items-center justify-between shadow-inner">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 font-black text-xl">
                {tableData ? tableData.tableNumber : selectedTableNumber}
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Current Table</p>
                <p className="text-sm font-extrabold text-zinc-100">
                  {tableData
                    ? `Dine-In • Capacity ${tableData.capacity || 4}`
                    : `Dine-In Table #${selectedTableNumber}`}
                </p>
              </div>
            </div>

            {tableData ? (
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified</span>
              </div>
            ) : availableTables.length > 0 ? (
              <select
                value={selectedTableNumber}
                onChange={(e) => setSelectedTableNumber(e.target.value)}
                className="bg-zinc-900 border border-zinc-700 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400 font-bold"
              >
                {availableTables.map((t) => (
                  <option key={t._id} value={t.tableNumber}>
                    Table {t.tableNumber}
                  </option>
                ))}
              </select>
            ) : (
              <div className="text-xs text-zinc-500 font-bold">Auto Table #1</div>
            )}
          </div>

          {/* CTA Primary Button */}
          <button
            onClick={handleStartDineIn}
            disabled={startingSession || loadingTable}
            className="w-full py-4 px-6 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-black font-black text-base rounded-2xl hover:brightness-110 active:scale-[0.99] transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {startingSession ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-black" />
                <span>Opening Menu...</span>
              </>
            ) : (
              <>
                <span>View Digital Menu & Order</span>
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Secondary Perks Banner */}
          <div className="pt-3 border-t border-zinc-800/80">
            <div className="flex items-center justify-between text-xs text-zinc-400 py-1">
              <span className="flex items-center gap-1.5 font-semibold">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Use code <b className="text-amber-400 font-black">FIRST30</b> for 30% OFF
              </span>
              <Link
                to="/register"
                className="text-amber-400 hover:text-amber-300 font-extrabold underline underline-offset-4"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-zinc-500 font-medium">
        <p>QRDine • Contactless Table Ordering System</p>
      </footer>
    </div>
  );
};

export default Welcome;
