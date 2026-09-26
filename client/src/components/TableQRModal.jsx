import React, { useEffect, useState } from 'react';
import { QrCode, X, ExternalLink, Loader2, Users } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 max-w-xl w-full space-y-5 max-h-[85vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shadow-xs">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Restaurant Tables & QR Stands
              </h3>
              <p className="text-xs text-slate-500">
                Switch table or open contactless QR scan session
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tables Grid */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {loading ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              <Loader2 className="w-7 h-7 animate-spin mx-auto mb-2 text-emerald-600" />
              Loading restaurant tables...
            </div>
          ) : tables.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
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
                        ? 'bg-emerald-50/70 border-emerald-300 shadow-xs'
                        : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-black text-slate-900">
                            Table #{t.tableNumber}
                          </h4>
                          {isCurrent && (
                            <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                          <Users className="w-3 h-3 text-slate-400" />
                          Capacity: {t.capacity || 4} Guests
                        </p>
                      </div>

                      {t.qrImage && (
                        <img
                          src={t.qrImage}
                          alt={`QR for Table ${t.tableNumber}`}
                          className="w-14 h-14 bg-white p-1 rounded-xl shrink-0 shadow-xs border border-slate-200"
                        />
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                      <button
                        onClick={() => handleSelectTable(t)}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {isCurrent ? 'Current Table' : 'Select Table'}
                      </button>

                      <a
                        href={`/welcome?qr=${t.qrSlug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2 px-3 bg-white hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
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
