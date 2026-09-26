import React, { useEffect, useState } from 'react';
import { QrCode, X, ExternalLink, Loader2 } from 'lucide-react';
import api from '../lib/api';
import { useToast } from '../context/ToastContext';
import { useDispatch } from 'react-redux';
import { setTableInfo } from '../redux/cartSlice';

const TableQRModal = ({ isOpen, onClose, currentTableNumber }) => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
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
    toast.success(`Switched to Table #${table.tableNumber}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-7 max-w-xl w-full space-y-6 max-h-[85vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Restaurant Tables & QR Codes
              </h2>
              <p className="text-xs text-zinc-400">
                Scan with phone or click to simulate sitting at a table
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tables Grid */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {loading ? (
            <div className="text-center py-8 text-zinc-500 text-xs">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-amber-400" />
              Loading tables...
            </div>
          ) : tables.length === 0 ? (
            <div className="text-center py-8 text-zinc-500 text-xs">
              No tables generated yet. Add your first table above!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tables.map((t) => {
                const isCurrent =
                  String(t.tableNumber) === String(currentTableNumber);
                return (
                  <div
                    key={t._id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                      isCurrent
                        ? 'bg-amber-400/10 border-amber-400/40 shadow-lg'
                        : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">
                            Table #{t.tableNumber}
                          </h4>
                          {isCurrent && (
                            <span className="text-[10px] bg-amber-400 text-black font-extrabold px-2 py-0.5 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          Capacity: {t.capacity || 4} Guests
                        </p>
                      </div>

                      {t.qrImage && (
                        <img
                          src={t.qrImage}
                          alt={`QR for Table ${t.tableNumber}`}
                          className="w-14 h-14 bg-white p-1 rounded-lg shrink-0 shadow-sm"
                        />
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/60">
                      <button
                        onClick={() => handleSelectTable(t)}
                        className="flex-1 py-1.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        Select Table
                      </button>

                      <a
                        href={`/welcome?qr=${t.qrSlug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="py-1.5 px-2.5 bg-zinc-800 hover:bg-amber-400 hover:text-black text-zinc-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
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
