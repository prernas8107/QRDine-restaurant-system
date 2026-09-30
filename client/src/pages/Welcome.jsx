import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams, useParams } from 'react-router-dom';
import {
  UtensilsCrossed,
  Sparkles,
  QrCode,
  ArrowRight,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { session } from '../redux/guestSlice';
import { setTableInfo } from '../redux/cartSlice';
import api from '../lib/api';
import { Logo } from '../components/Logo';

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
      localStorage.setItem('tableNumber', String(selectedTableNumber || 1));
      navigate('/');
    } finally {
      setStartingSession(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Background Soft Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-orange-100/50 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Top Bar Header */}
      <header className="relative z-10 max-w-5xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <Link to="/welcome" className="focus:outline-none">
          <Logo showText={true} subtitle="Smart Dine-In Experience" />
        </Link>

        <div className="flex items-center gap-2 sm:gap-4 text-xs font-bold">
          <Link
            to="/login"
            className="px-3.5 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 transition-all"
          >
            Member Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-xs transition-all"
          >
            Join Rewards
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-lg mx-auto w-full px-4 sm:px-6 py-8 flex-1 flex flex-col justify-center">
        {/* Table Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          {/* Header section */}
          <div className="text-center space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <QrCode className="w-3.5 h-3.5 text-orange-500" />
              <span>Smart Table Connected</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              {tableData ? (
                <>Welcome to Table #{tableData.tableNumber}</>
              ) : (
                <>Welcome to Your Table</>
              )}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-xs mx-auto leading-relaxed font-normal">
              Order fresh vegetarian culinary specialties directly to your seat. Fast, contactless, and chef-made.
            </p>
          </div>

          {/* Table Selector Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-800 font-black text-xl shadow-xs">
                {tableData ? tableData.tableNumber : selectedTableNumber}
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-semibold">Assigned Seating</p>
                <p className="text-sm font-bold text-slate-900">
                  {tableData
                    ? `Dine-In • Table #${tableData.tableNumber}`
                    : `Dine-In Table #${selectedTableNumber}`}
                </p>
              </div>
            </div>

            {tableData ? (
              <div className="flex items-center gap-1.5 text-xs text-orange-800 font-bold bg-orange-100 px-3 py-1.5 rounded-full border border-orange-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-700" />
                <span>Verified</span>
              </div>
            ) : availableTables.length > 0 ? (
              <select
                value={selectedTableNumber}
                onChange={(e) => setSelectedTableNumber(e.target.value)}
                className="bg-white border border-slate-300 text-xs font-bold text-slate-900 rounded-xl px-3 py-2 focus:outline-none focus:border-orange-500 cursor-pointer shadow-xs"
              >
                {availableTables.map((t) => (
                  <option key={t._id} value={t.tableNumber}>
                    Table {t.tableNumber}
                  </option>
                ))}
              </select>
            ) : (
              <div className="text-xs text-slate-600 font-bold bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                Table #1
              </div>
            )}
          </div>

          {/* Primary CTA */}
          <button
            onClick={handleStartDineIn}
            disabled={startingSession || loadingTable}
            className="w-full py-4 px-6 bg-orange-500 hover:bg-orange-600 text-white font-black text-base rounded-2xl transition-all shadow-md shadow-orange-500/20 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
          >
            {startingSession ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
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
          <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-slate-100 text-center">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <Zap className="w-4 h-4 text-orange-500 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-slate-900">Zero Waiting</p>
              <p className="text-[9px] text-slate-500">Kitchen Alert</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <Sparkles className="w-4 h-4 text-orange-500 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-slate-900">30% OFF Code</p>
              <p className="text-[9px] text-slate-500 font-semibold">FIRST30</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-orange-500 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-slate-900">100% Pure Veg</p>
              <p className="text-[9px] text-slate-500">Fresh Flavors</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-5 text-center text-xs text-slate-500 font-medium">
        <p>QRDine • Contactless Tabletop Dining & POS</p>
      </footer>
    </div>
  );
};

export default Welcome;