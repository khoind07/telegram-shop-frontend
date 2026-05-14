'use client';

import { useLaunchParams, useRawInitData } from '@telegram-apps/sdk-react';
import { 
  KeyRound, Users, User, BarChart3, Clock, 
  DollarSign, Download, Trophy, Wallet, 
  Gamepad2, Package, Gem, ShoppingCart,
  LogOut, Menu, X, MessageCircle, Send,
  Shield, Info, Scale, Heart, Zap, ChevronRight,
  Minus, Plus, Globe, Crown, RotateCcw,
  QrCode, Loader2, AlertTriangle,
  ChevronLeft, Earth, Archive, SendHorizontal,
  ShieldHalf
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/store/CartContext';

type View = 'shop' | 'acc' | 'dep' | 'top' | 'pro' | 'adm';

export default function Home() {
  const lp = useLaunchParams();
  const rawInitData = useRawInitData();
  const initData = lp?.initData as any;
  const user = initData?.user;
  
  const [activeView, setActiveView] = useState<View>('shop');
  const [qty, setQty] = useState(1);
  const [lang, setLang] = useState<'vi' | 'en'>('vi');

  const formatMoney = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const navItems: { label: string, icon: any, view: View, i18n: string }[] = [
    { label: 'Mua Key', icon: <KeyRound size={22} />, view: 'shop', i18n: 'tab_key' },
    { label: 'Mua Acc', icon: <Users size={22} />, view: 'acc', i18n: 'tab_acc' },
    { label: 'Nạp Tiền', icon: <Wallet size={22} />, view: 'dep', i18n: 'tab_deposit' },
    { label: 'Top Nạp', icon: <Trophy size={22} />, view: 'top', i18n: 'tab_top' },
    { label: 'Cá Nhân', icon: <User size={22} />, view: 'pro', i18n: 'tab_profile' },
  ];

  return (
    <div className="min-h-screen relative text-[#f8fafc] overflow-x-hidden pb-[100px]">
      {/* Background Blobs */}
      <div className="blob b1"></div>
      <div className="blob b2"></div>
      <div className="blob b3"></div>

      {/* Header */}
      <header className="hdr px-4 py-2 flex items-center justify-between sticky top-0 z-[90]">
        <div className="hdr-left flex items-center gap-2 flex-1">
          <div className="avt w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border-2 border-white/10 shadow-lg">
            {user?.photoUrl ? (
              <img src={user.photoUrl} alt="avt" className="w-full h-full object-cover" />
            ) : (
              <span className="text-white font-bold">{user?.firstName?.charAt(0) || 'U'}</span>
            )}
          </div>
          <div className="hdr-info">
            <h3 className="text-sm font-extrabold truncate max-w-[100px]">{user?.firstName || 'Guest'}</h3>
            <p className="text-[10px] text-[#94a3b8] font-mono">ID: {user?.id || '5190559062'}</p>
          </div>
        </div>

        <div className="hdr-center flex items-center gap-1">
          <button 
            onClick={() => setLang('vi')}
            className={`lang-btn flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold border ${lang === 'vi' ? 'border-[#6366f1] bg-[#6366f1]/15 text-white' : 'border-white/10 text-[#94a3b8]'}`}
          >
            <span className="text-xs">🇻🇳</span> VI
          </button>
          <span className="text-white/10 text-xs">|</span>
          <button 
            onClick={() => setLang('en')}
            className={`lang-btn flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold border ${lang === 'en' ? 'border-[#6366f1] bg-[#6366f1]/15 text-white' : 'border-white/10 text-[#94a3b8]'}`}
          >
            <span className="text-xs">🇬🇧</span> EN
          </button>
        </div>

        <div className="hdr-right text-right pl-2">
          <b className="text-sm text-[#6366f1] block">0đ</b>
          <span className="text-[9px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-[#cbd5e1] font-bold uppercase">Customer</span>
        </div>
      </header>

      {/* Main Views */}
      <main className="animate-in fade-in duration-500">
        
        {/* SHOP VIEW */}
        {activeView === 'shop' && (
          <div className="view-shop px-4 py-4 space-y-4">
            <div className="shop-hdr flex items-center gap-3 px-2">
              <div className="icon-bg w-12 h-12 rounded-2xl bg-[#6366f1]/10 flex items-center justify-center text-[#6366f1] border border-[#6366f1]/20">
                <KeyRound size={24} />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-white">Mua Key Game/Tool</h2>
                <p className="text-xs text-[#94a3b8]">Hệ thống tự động cấp Key</p>
              </div>
            </div>

            <div className="glass-panel p-5 rounded-[24px] space-y-5">
              <div className="step-lbl flex items-center gap-2 text-xs font-bold text-white/70 uppercase tracking-wider">
                <Package size={14} /> Chọn ứng dụng
              </div>
              <Link href="/products" className="sel-box flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <div className="sel-left flex items-center gap-3">
                  <div className="sel-icon w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-[#6366f1]">
                    <Gamepad2 size={24} />
                  </div>
                  <div className="sel-txt">
                    <b className="text-white block text-sm">Nhấn chọn game</b>
                    <span className="text-[10px] text-[#94a3b8]">Chưa chọn</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-[#64748b]" />
              </Link>

              <div className="step-lbl flex items-center gap-2 text-xs font-bold text-white/70 uppercase tracking-wider mt-6">
                <Gem size={14} /> Chọn gói
              </div>
              <div className="pkg-list py-8 text-center rounded-2xl bg-white/5 border border-white/10 border-dashed">
                <Archive size={30} className="mx-auto mb-2 opacity-20" />
                <span className="text-xs text-[#64748b]">Danh sách trống</span>
              </div>

              <div className="qty-wrap flex items-center justify-between pt-4 border-t border-white/5">
                <div className="step-lbl flex items-center gap-2 text-xs font-bold text-white/70 uppercase tracking-wider">
                   <Package size={14} /> Số lượng
                </div>
                <div className="qty-ctrl flex items-center gap-2 bg-slate-800/50 p-1 rounded-xl border border-white/5">
                  <button onClick={() => setQty(Math.max(1, qty-1))} className="w-9 h-9 rounded-lg bg-slate-700/50 text-white flex items-center justify-center"><Minus size={16} /></button>
                  <input type="number" readOnly value={qty} className="w-12 bg-transparent text-center font-extrabold text-lg p-0 border-none shadow-none" />
                  <button onClick={() => setQty(qty+1)} className="w-9 h-9 rounded-lg bg-slate-700/50 text-white flex items-center justify-center"><Plus size={16} /></button>
                </div>
              </div>

              <div className="bot-actions grid grid-cols-[48px_48px_1fr] gap-3">
                <div className="ic-btn h-12 rounded-xl border border-white/10 bg-slate-800/70 flex items-center justify-center text-white hover:bg-slate-700 transition-all cursor-pointer"><Download size={18} /></div>
                <div className="ic-btn h-12 rounded-xl border border-white/10 bg-slate-800/70 flex items-center justify-center text-white hover:bg-slate-700 transition-all cursor-pointer"><SendHorizontal size={18} /></div>
                <button className="buy-big h-12 rounded-xl bg-slate-900 border border-white/5 flex flex-col items-center justify-center cursor-not-allowed opacity-60">
                   <b className="text-sm font-extrabold text-white">Mua ngay</b>
                   <span className="text-[10px] text-[#94a3b8]">chưa chọn gói</span>
                </button>
              </div>
            </div>

            <div className="glass-panel p-5 rounded-[24px]">
              <h3 className="text-sm font-extrabold text-white mb-4 flex items-center gap-2">
                <Globe size={18} className="text-[#6366f1]" /> Giao Dịch Gần Đây
              </h3>
              <div className="space-y-2">
                {[
                  { name: 'Shop Clone Free Fire', action: 'nạp', amt: '500.000đ', time: '09:11', color: '#10b981' },
                  { name: 'Ngọc Đông', action: 'mua', amt: '31 Ngày', time: '08:43', color: '#6366f1' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-2.5 bg-white/5 rounded-xl border-l-[3px]" style={{ borderColor: item.color }}>
                    <div className="text-xs text-[#cbd5e1] flex items-center gap-1.5">
                       {item.action === 'nạp' ? <Wallet size={12} style={{ color: item.color }} /> : <ShoppingCart size={12} style={{ color: item.color }} />}
                       <b className="text-white">{item.name}</b> {item.action} <b style={{ color: item.color }}>{item.amt}</b>
                    </div>
                    <span className="text-[10px] text-[#64748b]">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DEPOSIT VIEW */}
        {activeView === 'dep' && (
          <div className="view-dep px-4 py-6 space-y-4">
             <div className="glass-panel p-8 rounded-[32px] border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-transparent relative overflow-hidden">
                <div className="absolute top-[-20px] right-[-20px] opacity-10 rotate-12"><Crown size={120} /></div>
                <h3 className="text-lg font-black text-[#fde047] mb-2 flex items-center gap-2">
                  <Crown size={20} /> Nạp Tiền Tự Động 24/7
                </h3>
                <p className="text-xs text-[#cbd5e1] mb-6">Giao dịch được xử lý tự động trong vòng 5 giây.</p>
                <div className="inp-grp relative mb-4">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500" size={18} />
                  <input type="number" placeholder="Nhập số tiền (Tối thiểu 2.000đ)" className="w-full pl-12 bg-black/30 border-white/10 rounded-2xl py-4 font-bold" />
                </div>
                <button className="btn btn-gold w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-600 to-yellow-400 text-white font-black flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20 active:scale-95">
                  <QrCode size={20} /> TẠO MÃ QR NẠP TIỀN
                </button>
             </div>

             <div className="glass-panel p-5 rounded-[24px]">
                <h3 className="text-sm font-extrabold text-white mb-4 flex items-center gap-2">
                  <RotateCcw size={18} className="text-[#64748b]" /> Lịch Sử Nạp Của Bạn
                </h3>
                <div className="py-10 text-center text-[#64748b] text-xs">Chưa có giao dịch nạp.</div>
             </div>
          </div>
        )}

        {/* TOP VIEW */}
        {activeView === 'top' && (
          <div className="view-top px-4 py-4 space-y-4">
             <div className="shop-hdr flex items-center gap-3 px-2">
                <div className="icon-bg w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 border border-yellow-500/20">
                  <Trophy size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-white">Bảng Xếp Hạng</h2>
                  <p className="text-xs text-[#94a3b8]">Top người dùng nạp nhiều nhất</p>
                </div>
              </div>

              <div className="glass-panel p-3 rounded-[24px]">
                 <div className="top-tabs flex gap-1 p-1 bg-black/30 rounded-2xl mb-4">
                   {['Tháng này', 'Tuần này', 'Tất cả'].map((t, i) => (
                     <button key={i} className={`flex-1 py-2 rounded-xl text-[11px] font-extrabold transition-all ${i === 0 ? 'bg-[#6366f1]/20 text-[#6366f1] border border-[#6366f1]/30' : 'text-[#64748b]'}`}>{t}</button>
                   ))}
                 </div>
                 
                 <div className="space-y-2">
                   {[
                     { name: 'Vanthienios', amount: '4.810.000đ', rank: '🥇', id: '5820303294', color: 'text-yellow-400' },
                     { name: 'Hai Dang', amount: '4.335.000đ', rank: '🥈', id: '6167618125', color: 'text-slate-300' },
                     { name: 'ThienAn.', amount: '3.790.000đ', rank: '🥉', id: '8322398598', color: 'text-orange-400' },
                   ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 ${i < 3 ? 'border-l-4' : ''}`} style={{ borderLeftColor: i === 0 ? '#eab308' : i === 1 ? '#cbd5e1' : i === 2 ? '#f97316' : '' }}>
                      <div className="rank-badge w-6 text-center text-lg">{item.rank}</div>
                      <div className="top-avt w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white border border-white/5">{item.name.charAt(0)}</div>
                      <div className="flex-1 min-w-0">
                         <span className="block text-xs font-black truncate">{item.name}</span>
                         <span className="text-[9px] text-[#94a3b8]">ID: {item.id}</span>
                      </div>
                      <div className={`font-black text-xs ${item.color}`}>{item.amount}</div>
                    </div>
                   ))}
                 </div>
              </div>
          </div>
        )}

        {/* PROFILE VIEW */}
        {activeView === 'pro' && (
          <div className="view-pro px-4 py-4 space-y-4">
             <div className="glass-panel p-5 rounded-[24px]">
                <h3 className="text-sm font-extrabold text-white mb-4 flex items-center gap-2"><User size={18} className="text-[#6366f1]" /> Tổng Quan Tài Khoản</h3>
                <div className="grid grid-cols-3 gap-2">
                   <div className="stat-glass flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
                     <KeyRound size={16} className="text-[#6366f1] mb-1" />
                     <b className="text-sm block">0</b>
                     <span className="text-[8px] text-[#94a3b8] uppercase font-bold">SP Đã Mua</span>
                   </div>
                   <div className="stat-glass flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
                     <ShoppingCart size={16} className="text-yellow-500 mb-1" />
                     <b className="text-sm block">0đ</b>
                     <span className="text-[8px] text-[#94a3b8] uppercase font-bold">Tổng Chi</span>
                   </div>
                   <div className="stat-glass flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
                     <Wallet size={16} className="text-[#10b981] mb-1" />
                     <b className="text-sm block">0đ</b>
                     <span className="text-[8px] text-[#94a3b8] uppercase font-bold">Tổng Nạp</span>
                   </div>
                </div>
             </div>

             <div className="glass-panel p-5 rounded-[24px] space-y-3">
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2"><Users size={18} /> Hệ Thống Giới Thiệu (Ref)</h3>
                <p className="text-[11px] text-[#94a3b8]">Nhận ngay <b className="text-[#10b981]">0%</b> hoa hồng khi người được bạn mời nạp tiền thành công.</p>
                <div className="inp-grp no-icon">
                  <input readOnly value="https://t.me/bot?start=5190559062" className="py-2.5 rounded-xl bg-black/40 text-[11px]" />
                </div>
                <button className="w-full py-2.5 rounded-xl bg-[#6366f1] text-white font-bold text-xs">Copy Link Giới Thiệu</button>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10 mt-2">
                   <span className="text-xs text-[#cbd5e1] font-bold">Hoa hồng đã nhận:</span>
                   <b className="text-yellow-500">0đ</b>
                </div>
             </div>

             <div className="glass-panel p-5 rounded-[24px]">
                <h3 className="text-sm font-extrabold text-white mb-4 flex items-center gap-2"><Package size={18} /> Kho Của Bạn</h3>
                <div className="py-12 text-center text-[#64748b] text-xs">Chưa có SP nào.</div>
             </div>
          </div>
        )}

        {/* ADMIN VIEW */}
        {activeView === 'adm' && (
          <div className="view-adm px-4 py-4 space-y-4">
             <div className="glass-panel p-5 rounded-[24px]">
                <h3 className="text-sm font-extrabold text-white mb-4 flex items-center gap-2"><BarChart3 size={18} /> Thống Kê Chung</h3>
                <div className="grid grid-cols-3 gap-2">
                   <div className="p-3 bg-white/5 rounded-xl text-center border border-white/5">
                      <p className="text-[10px] text-[#94a3b8] mb-1">User</p>
                      <b className="text-lg">0</b>
                   </div>
                   <div className="p-3 bg-white/5 rounded-xl text-center border border-white/5">
                      <p className="text-[10px] text-[#94a3b8] mb-1">Nạp</p>
                      <b className="text-lg text-[#6366f1]">0</b>
                   </div>
                   <div className="p-3 bg-white/5 rounded-xl text-center border border-white/5">
                      <p className="text-[10px] text-[#94a3b8] mb-1">Spam</p>
                      <b className="text-lg text-red-500">0</b>
                   </div>
                </div>
             </div>
             
             <div className="glass-panel p-4 rounded-[24px] flex items-center justify-between">
                <Link href="/admin" className="w-full flex items-center justify-between text-[#6366f1] font-bold text-sm">
                   <span>Mở trang quản trị nâng cao</span>
                   <ChevronRight size={18} />
                </Link>
             </div>
          </div>
        )}

      </main>

      {/* Navigation Bar */}
      <nav className="tbar fixed bottom-0 left-0 right-0 z-[99] flex items-center justify-around px-2">
        {navItems.map((item, idx) => (
          <div 
            key={idx} 
            onClick={() => setActiveView(item.view)}
            className={`titem flex flex-col items-center justify-center flex-1 cursor-pointer transition-all ${activeView === item.view ? 'act text-[#6366f1]' : 'text-[#64748b]'}`}
          >
            <div className={`transition-transform duration-300 ${activeView === item.view ? 'scale-110 -translate-y-1 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]' : ''}`}>
              {item.icon}
            </div>
            <span className="text-[9px] font-bold uppercase tracking-tighter mt-1">{item.label}</span>
          </div>
        ))}
        {initData?.user?.id && (
           <div 
            onClick={() => setActiveView('adm')}
            className={`titem flex flex-col items-center justify-center flex-1 cursor-pointer transition-all ${activeView === 'adm' ? 'act text-indigo-400' : 'text-[#64748b]'}`}
          >
            <ShieldHalf size={22} className={`${activeView === 'adm' ? 'scale-110 -translate-y-1' : ''}`} />
            <span className="text-[9px] font-bold uppercase tracking-tighter mt-1">Admin</span>
          </div>
        )}
      </nav>

      {/* Global CSS from source */}
      <style jsx global>{`
        .hdr { background: rgba(20, 24, 36, 0.5); backdrop-filter: blur(25px) saturate(150%); border-bottom: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 4px 30px rgba(0,0,0,0.5); }
        .hdr-right b { color: #6366f1; }
        
        .tbar { background: rgba(20, 24, 36, 0.6); backdrop-filter: blur(25px) saturate(150%); border-top: 1px solid rgba(255,255,255,0.08); border-top-left-radius: 25px; border-top-right-radius: 25px; box-shadow: 0 -10px 40px rgba(0,0,0,0.4); }
        
        .btn-gold { background: linear-gradient(135deg, #eab308, #b45309); box-shadow: 0 5px 20px rgba(234, 179, 8, 0.3); }
        
        .qty-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); }
        
        input { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); outline: none; }
        input:focus { border-color: #6366f1; }

        .view { display: none; }
        .view.act { display: block; }
      `}</style>
    </div>
  );
}
