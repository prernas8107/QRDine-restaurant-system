import React, { useEffect, useState } from 'react';
import { QrCode, X, ExternalLink, Loader2, Check, Users } from 'lucide-react';
import api from '../lib/api';
import { useToast } from '../context/ToastContext';
import { useDispatch } from 'react-redux';
import { setTableInfo } from '../redux/cartSlice';

const TableQRModal = ({ isOpen, onClose, currentTableNumber }) => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchTables();
    }
  }, [isOpen]);

  const fetchTables = async () => {
    setLoading(true);
    try {
      const res = await api.get('/tables/public');
      if (res.data?.data) {
        setTables(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load tables:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTable = (table) => {
    dispatch(
      setTableInfo({
        tableNumber: table.tableNumber,
        tableSlug: table.qrSlug,
      })
    );
    localStorage.setItem('tableNumber', String(table.tableNumber));
    if (table.qrSlug) {
      localStorage.setItem('tableSlug', table.qrSlug);
    }
    toast.success(`Switched to Table #${table.tableNumber}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-7 max-w-xl w-full space-y-5 max-h-[85vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center shadow-md">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">
                Restaurant Tables & QR Stands
              </h2>
              <p className="text-xs text-zinc-400">
                Switch table or open contactless QR scan session
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tables Grid */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {loading ? (
            <div className="text-center py-12 text-zinc-500 text-xs">
              <Loader2 className="w-7 h-7 animate-spin mx-auto mb-2 text-amber-400" />
              Loading restaurant tables...
            </div>
          ) : tables.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 text-xs">
              No tables generated yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {tables.map((t) => {
                const isCurrent =
                  String(t.tableNumber) === String(currentTableNumber);
                return (
                  <div
                    key={t._id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                      isCurrent
                        ? 'bg-amber-400/10 border-amber-400/50 shadow-lg shadow-amber-500/10'
                        : 'bg-zinc-950/80 border-zinc-800/90 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-black text-white">
                            Table #{t.tableNumber}
                          </h4>
                          {isCurrent && (
                            <span className="text-[10px] bg-amber-400 text-black font-black px-2 py-0.5 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-400 flex items-center gap-1 mt-1">
                          <Users className="w-3 h-3 text-zinc-500" />
                          Capacity: {t.capacity || 4} Guests
                        </p>
                      </div>

                      {t.qrImage && (
                        <img
                          src={t.qrImage}
                          alt={`QR for Table ${t.tableNumber}`}
                          className="w-14 h-14 bg-white p-1 rounded-xl shrink-0 shadow-md"
                        />
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/60">
                      <button
                        onClick={() => handleSelectTable(t)}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-amber-400 text-black shadow-md'
                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                        }`}
                      >
                        {isCurrent ? 'Current Table' : 'Select Table'}
                      </button>

                      <a
                        href={`/welcome?qr=${t.qrSlug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2 px-3 bg-zinc-800 hover:bg-amber-400 hover:text-black text-zinc-300 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        title="Simulate Mobile Scan"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Scan</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableQRModal;
