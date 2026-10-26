import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { Check, Info, X } from 'lucide-react';

const NoticeContext = createContext(null);
export function NoticeProvider({ children }) {
  const [notice, setNotice] = useState(null);
  const notify = useCallback((message, type = 'success') => setNotice({ message, type, id: Date.now() }), []);
  const copy = useCallback(async (value, label = 'Copied to clipboard') => {
    try { await navigator.clipboard.writeText(value); notify(label); return true; }
    catch { notify(`Copy unavailable. ${value}`, 'error'); return false; }
  }, [notify]);
  useEffect(() => { if (!notice) return; const timer = setTimeout(() => setNotice(null), 5000); return () => clearTimeout(timer); }, [notice]);
  const context = useMemo(() => ({ notify, copy }), [notify, copy]);
  return <NoticeContext.Provider value={context}>{children}<div className="app-notices"><AnimatePresence>{notice && <m.div key={notice.id} className={`app-notice ${notice.type}`} role={notice.type === 'error' ? 'alert' : 'status'} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>{notice.type === 'error' ? <Info aria-hidden="true"/> : <Check aria-hidden="true"/>}<span>{notice.message}</span><button type="button" aria-label="Dismiss notification" onClick={() => setNotice(null)}><X aria-hidden="true"/></button></m.div>}</AnimatePresence></div></NoticeContext.Provider>;
}
export const useNotice = () => useContext(NoticeContext);
