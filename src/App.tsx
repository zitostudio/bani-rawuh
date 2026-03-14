import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, Heart, Scroll, X, Moon, Settings, Home, Users } from 'lucide-react';
import { yasinData, tahlilData, doaData, ContentItem } from './data';
import logo from './assets/logo.png';

type Section = 'yasin' | 'tahlil' | 'doa' | 'home';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDevPopupOpen, setIsDevPopupOpen] = useState(false);
  const [fontSize, setFontSize] = useState(20);

  const navItems = [
    { id: 'home', name: 'Beranda', icon: <Home className="w-5 h-5" /> },
    { id: 'yasin', name: 'Yasin', icon: <Book className="w-5 h-5" /> },
    { id: 'tahlil', name: 'Tahlil', icon: <Scroll className="w-5 h-5" /> },
    { id: 'doa', name: 'Doa', icon: <Moon className="w-5 h-5" /> },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomeView onNavigate={setActiveSection} onShowDevPopup={() => setIsDevPopupOpen(true)} />;
      case 'yasin':
        return <ListView title="Surat Yasin" data={yasinData} fontSize={fontSize} isDocument={false} />;
      case 'tahlil':
        return <ListView title="Tahlil" data={tahlilData} fontSize={fontSize} />;
      case 'doa':
        return <ListView title="Doa" data={doaData} fontSize={fontSize} />;
      default:
        return <HomeView onNavigate={setActiveSection} onShowDevPopup={() => setIsDevPopupOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen text-white flex flex-col pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-b from-black/80 to-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 h-14 md:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveSection('home')}>
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-lg overflow-hidden border border-white/10">
              <img src={logo} alt="Bani Rawuh Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-lg font-bold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-amber-400">Bani Rawuh</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as Section)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 border ${
                  activeSection === item.id 
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.1)]' 
                    : 'text-stone-400 border-transparent hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </nav>
          
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 text-stone-400 hover:bg-white/5 rounded-full transition-all active:scale-90"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[70] bg-gradient-to-b from-stone-900 to-black border-t border-white/10 rounded-t-3xl p-6 shadow-2xl max-w-2xl mx-auto"
            >
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6" />
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-white">Pengaturan Tampilan</h3>
                <button onClick={() => setIsSettingsOpen(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5 text-stone-400" />
                </button>
              </div>

              <div className="space-y-8 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-stone-300">Ukuran Teks Arab</span>
                    <span className="text-amber-400 font-bold">{fontSize}px</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setFontSize(Math.max(20, fontSize - 4))} 
                      className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-xl transition-colors text-white border border-white/5"
                    >
                      -
                    </button>
                    <button 
                      onClick={() => setFontSize(Math.min(64, fontSize + 4))} 
                      className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white rounded-xl font-bold text-xl transition-all shadow-lg shadow-amber-900/20"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-2xl font-bold shadow-xl shadow-amber-900/20 active:scale-95 transition-all"
              >
                Simpan & Tutup
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Dev Popup Modal */}
      <AnimatePresence>
        {isDevPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsDevPopupOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-stone-900 border border-white/10 p-6 rounded-3xl shadow-2xl max-w-sm w-full text-center relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500/0 via-amber-500 to-amber-500/0" />
              <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Settings className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-white font-black text-xl mb-3">Mohon Maaf</h3>
              <p className="text-stone-400 text-sm mb-8 leading-relaxed">
                Fitur <span className="text-amber-500 font-bold">Silsilah Keluarga</span> sedang dalam proses pengembangan.
              </p>
              <button
                onClick={() => setIsDevPopupOpen(false)}
                className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-colors border border-white/10"
              >
                Tutup
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 md:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-2xl border-t border-white/5 px-4 py-2 md:hidden flex items-center justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id as Section)}
            className={`flex flex-col items-center gap-1 p-2 transition-all ${
              activeSection === item.id ? 'text-amber-400 scale-110' : 'text-stone-500'
            }`}
          >
            <div className={`p-1.5 rounded-xl transition-all ${activeSection === item.id ? 'bg-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : ''}`}>
              {item.icon}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Footer (Desktop Only) */}
      <footer className="hidden md:block p-8 text-center text-stone-500 text-sm border-t border-stone-800 bg-black transition-colors">
        <p>app bani rawuh versi 1.1</p>
      </footer>
    </div>
  );
}

function HomeView({ onNavigate, onShowDevPopup }: { onNavigate: (s: Section) => void, onShowDevPopup: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="w-48 h-48 md:w-64 md:h-64 bg-black rounded-[3rem] flex items-center justify-center shadow-[0_20px_50px_rgba(245,158,11,0.3)] relative overflow-hidden group border border-white/10"
      >
        <img src={logo} alt="Bani Rawuh Logo" className="w-full h-full object-cover relative z-10 group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl" />
      </motion.div>

      <div className="space-y-2">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-amber-500/50">
            Bani Rawuh
          </h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ delay: 0.4, duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-amber-500/60 font-bold tracking-[0.3em] uppercase text-xs md:text-sm"
        >
          Yasin • Tahlil • Doa Khusus
        </motion.p>
        
        <motion.button
          onClick={onShowDevPopup}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-6 mb-2 mx-auto flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-amber-400 font-bold tracking-widest uppercase text-xs transition-all active:scale-95 shadow-lg"
        >
          <Users className="w-4 h-4" />
          Silsilah Keluarga
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-stone-500 text-[8px] md:text-[10px] tracking-widest uppercase pt-2"
        >
          Dibuat oleh Zito Studio
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="pt-8"
      >
        <div className="flex items-center gap-4 text-amber-500/20">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-current" />
          <Heart className="w-4 h-4 fill-current animate-pulse" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-current" />
        </div>
      </motion.div>
    </div>
  );
}

function ListView({ title, data, fontSize, isDocument = false }: { title: string, data: ContentItem[], fontSize: number, isDocument?: boolean }) {
  if (isDocument) {
    return (
      <div className="space-y-6 md:space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-stone-900 to-black p-8 md:p-24 rounded-none md:rounded-[3rem] shadow-2xl relative overflow-hidden border-[16px] md:border-[32px] border-amber-900/10"
        >
          {/* Mushaf Decorative Frame */}
          <div className="absolute inset-0 border-[2px] border-amber-400/10 pointer-events-none" />
          <div className="absolute inset-2 md:inset-4 border border-amber-400/5 pointer-events-none" />
          
          {/* Corner Ornaments */}
          <div className="absolute top-4 left-4 w-16 h-16 md:w-24 md:h-24 pointer-events-none opacity-30">
            <div className="absolute top-0 left-0 w-full h-full border-t-4 border-l-4 border-amber-500 rounded-tl-3xl" />
            <div className="absolute top-2 left-2 w-4 h-4 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
          </div>
          <div className="absolute top-4 right-4 w-16 h-16 md:w-24 md:h-24 pointer-events-none opacity-30">
            <div className="absolute top-0 right-0 w-full h-full border-t-4 border-r-4 border-amber-500 rounded-tr-3xl" />
            <div className="absolute top-2 right-2 w-4 h-4 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
          </div>
          <div className="absolute bottom-4 left-4 w-16 h-16 md:w-24 md:h-24 pointer-events-none opacity-30">
            <div className="absolute bottom-0 left-0 w-full h-full border-b-4 border-l-4 border-amber-500 rounded-bl-3xl" />
            <div className="absolute bottom-2 left-2 w-4 h-4 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
          </div>
          <div className="absolute bottom-4 right-4 w-16 h-16 md:w-24 md:h-24 pointer-events-none opacity-30">
            <div className="absolute bottom-0 right-0 w-full h-full border-b-4 border-r-4 border-amber-500 rounded-br-3xl" />
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
          </div>

          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
          
          <div 
            className="arabic-text text-center leading-[2.8] text-white relative z-10"
            style={{ fontSize: `${fontSize}px`, textAlign: 'justify', textJustify: 'inter-word' }}
          >
            <div className="text-center mb-16 md:mb-28">
              <p className="text-5xl md:text-8xl text-amber-400 opacity-90 mb-6 arabic-text drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
              <div className="flex items-center justify-center gap-6">
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
                <div className="w-4 h-4 rotate-45 border border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]" />
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
              </div>
            </div>
            
            <div className="space-x-reverse">
              {data.filter(item => item.id !== 0).map((item) => (
                <React.Fragment key={item.id}>
                  <span className="inline-block mb-2">{item.arabic}</span>
                  <span className="inline-flex items-center justify-center w-8 h-8 md:w-12 md:h-12 mx-2 md:mx-4 border border-amber-500/20 rounded-full text-[10px] md:text-sm font-serif align-middle text-amber-400 bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.1)] select-none">
                    {item.id}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="py-10 flex flex-col items-center gap-4">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-stone-800 to-transparent" />
          <div className="p-4 bg-white/5 border border-white/5 rounded-2xl text-stone-400 text-sm font-bold flex items-center gap-3 backdrop-blur-sm">
            <Moon className="w-4 h-4 text-amber-500" />
            SHADAQALLAHUL 'ADZIM
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4 md:space-y-6">
        {data.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.03 }}
            key={item.id}
            className="group bg-gradient-to-br from-stone-900/80 via-black to-stone-900/40 p-6 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl hover:border-amber-500/30 transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className={`flex items-start gap-8 relative z-10 ${item.id === 0 ? 'justify-center' : ''}`}>
              {item.id !== 0 && (
                <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl text-sm font-black text-amber-500/40 group-hover:text-amber-500 group-hover:bg-amber-500/10 shrink-0 border border-white/5 transition-all duration-500">
                  {item.id}
                </div>
              )}
              <p 
                className={`arabic-text leading-[2.5] text-white w-full drop-shadow-sm ${item.id === 0 ? 'text-center text-amber-400' : 'text-right'}`}
                style={{ fontSize: `${fontSize}px` }}
              >
                {item.arabic}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

