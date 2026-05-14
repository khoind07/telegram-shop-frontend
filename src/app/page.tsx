'use client';

import { useLaunchParams } from '@telegram-apps/sdk-react';
import { 
  KeyRound, Users, User, BarChart3, Clock, 
  DollarSign, Download, Trophy, Wallet, 
  Gamepad2, Package, Gem, ShoppingCart,
  LogOut, Menu, X, MessageCircle, Send,
  Shield, Info, Scale, Heart, Zap, ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/store/CartContext';

export default function Home() {
  const lp = useLaunchParams();
  const initData = lp?.initData as any;
  const { totalItems } = useCart();
  const user = initData?.user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Rain animation effect
  const [rainDrops, setRainDrops] = useState<any[]>([]);
  useEffect(() => {
    const drops = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      width: Math.random() > 0.5 ? 1 : 0.5,
      height: Math.random() * 40 + 15,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 3,
      diagonal: Math.random() > 0.5
    }));
    setRainDrops(drops);
  }, []);

  const navItems = [
    { label: 'MUA KEY', icon: <KeyRound size={20} />, active: true },
    { label: 'MUA ACC', icon: <Users size={20} /> },
    { label: 'HỒ SƠ', icon: <User size={20} /> },
    { label: 'THỐNG KÊ', icon: <BarChart3 size={20} /> },
    { label: 'LỊCH SỬ', icon: <Clock size={20} /> },
    { label: 'GIAO DỊCH', icon: <DollarSign size={20} /> },
    { label: 'LINK TẢI', icon: <Download size={20} /> },
    { label: 'NẠP TIỀN', icon: <Wallet size={20} /> },
    { label: 'TOP NẠP', icon: <Trophy size={20} /> },
  ];

  return (
    <div className="seller-mono min-h-screen relative bg-black text-white selection:bg-cyan-500/30">
      {/* Rain Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {rainDrops.map(drop => (
          <div 
            key={drop.id}
            className="absolute top-0"
            style={{
              left: `${drop.left}%`,
              width: `${drop.width}px`,
              height: `${drop.height}px`,
              background: 'linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.12))',
              opacity: drop.width === 1 ? 0.2 : 0.1,
              animation: `${drop.diagonal ? 'rainFallDiagonal' : 'rainFall'} ${drop.duration}s linear ${drop.delay}s infinite`,
              boxShadow: 'rgba(255, 255, 255, 0.3) 0px 0px 1.5px'
            }}
          />
        ))}
        <style jsx>{`
          @keyframes rainFall {
            0% { transform: translateY(-100vh); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
          @keyframes rainFallDiagonal {
            0% { transform: translateY(-100vh) translateX(0) rotate(15deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100vh) translateX(60px) rotate(15deg); opacity: 0; }
          }
        `}</style>
      </div>

      {/* Global Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black"></div>
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0px)', backgroundSize: '4px 4px' }}></div>
      </div>

      <div className="flex justify-center relative z-10">
        <div className="w-full max-w-[1800px] p-4 sm:p-6 md:p-8 lg:p-10">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6 sm:mb-8 gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/70 border border-cyan-500/30 flex items-center justify-center">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-100 via-cyan-200 to-slate-400 bg-clip-text text-transparent truncate">
                    {user?.username || 'Guest'}
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-cyan-500/5 border border-cyan-500/10 shadow-[0_0_5px_rgba(99,102,241,0.15)]">
                <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400/60" />
                <span className="text-gray-200 font-bold text-xs sm:text-base">0 ₫</span>
              </div>
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="sm:hidden w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-300 active:scale-95 bg-slate-900/40 border-gray-800/40 text-gray-400"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:flex sm:flex-wrap gap-2 sm:gap-3 md:gap-4 mb-[60px] sm:mb-[80px] lg:mb-[100px] justify-center">
            {navItems.map((item, idx) => (
              <button 
                key={idx}
                className={`flex items-center gap-3 px-6 py-3 font-bold rounded-2xl border transition-all text-base ${
                  item.active 
                    ? 'bg-cyan-600/20 border-cyan-500/30 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
                    : 'bg-slate-900/40 border-gray-800/40 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Side Menu */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-[100] sm:hidden flex justify-end">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
              <div className="relative w-[280px] bg-slate-950 border-l border-gray-800 shadow-2xl p-6 h-full overflow-y-auto animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-lg font-bold text-cyan-400 uppercase tracking-wider">Menu</span>
                  <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900/40 border border-gray-800/40 text-gray-400">
                    <X size={24} />
                  </button>
                </div>
                <div className="space-y-3">
                  {navItems.map((item, idx) => (
                    <button 
                      key={idx}
                      className={`flex items-center gap-3 px-6 py-3 font-bold rounded-2xl border transition-all text-base w-full ${
                        item.active 
                          ? 'bg-cyan-600/20 border-cyan-500/30 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
                          : 'bg-slate-900/40 border-gray-800/40 text-gray-400'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}
                  <button className="flex items-center justify-center gap-3 w-full px-6 py-3 font-bold rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 mt-6">
                    <LogOut size={20} />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex justify-center pb-24 sm:pb-0">
            <div className="w-full max-w-[1600px]">
              <div className="mb-4 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl border border-white/10 bg-slate-800/75 flex items-center justify-center shadow-inner shadow-cyan-500/10">
                    <KeyRound className="w-5 h-5 text-slate-100" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-white text-xl font-black tracking-tight leading-tight">Mua Key Game/Tool</h2>
                    <p className="text-slate-300 text-sm leading-tight mt-1">Hệ thống tự động cấp Key</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
                {/* Sidebar Info */}
                <div className="hidden lg:block lg:col-span-3 space-y-4">
                  <div className="rounded-3xl p-5 glass-panel">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                        <Zap className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <h1 className="text-xl font-bold text-white tracking-tight">Tạo key</h1>
                        <p className="text-cyan-400/70 text-xs font-medium uppercase tracking-wider">Mua key sản phẩm</p>
                      </div>
                    </div>
                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <div className="bg-slate-900/40 rounded-2xl p-3 border border-white/5">
                        <p className="text-slate-400 text-xs font-medium mb-1">Seller</p>
                        <p className="text-white text-sm font-semibold truncate">{user?.firstName || 'Guest'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl p-5 glass-panel space-y-4">
                    <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Thống kê</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center justify-between p-3 bg-slate-900/40 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-300 text-sm">Tổng Sản phẩm</span>
                        </div>
                        <span className="text-white font-bold">17</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-900/40 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-emerald-400" />
                          <span className="text-slate-300 text-sm">Có sẵn</span>
                        </div>
                        <span className="text-emerald-400 font-bold">16</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Shop Selection */}
                <div className="col-span-1 lg:col-span-9 space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div className="rounded-3xl p-4 sm:p-6 glass-panel">
                      <div className="space-y-6">
                        <div className="rounded-2xl border border-white/10 bg-slate-900/45 p-4">
                          <p className="text-xs font-black text-indigo-300 uppercase tracking-[0.18em] mb-3 flex items-center gap-2">
                            <Package className="w-3.5 h-3.5" /> CHỌN ỨNG DỤNG
                          </p>
                          <Link href="/products" className="w-full flex items-center justify-between gap-3 p-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-14 h-14 rounded-2xl bg-slate-900/70 border border-white/10 flex items-center justify-center">
                                <Gamepad2 className="w-6 h-6 text-indigo-300" />
                              </div>
                              <div className="min-w-0 text-left">
                                <p className="text-white font-bold truncate">Nhấn chọn game</p>
                                <p className="text-xs text-slate-400 mt-0.5">Chưa chọn</p>
                              </div>
                            </div>
                            <span className="text-slate-400 text-xl leading-none">›</span>
                          </Link>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="text-xs font-black text-cyan-500/70 uppercase tracking-[0.2em] pl-1 flex items-center gap-2">
                            <Gem className="w-3.5 h-3.5" /> CHỌN GÓI
                          </h4>
                          <div className="p-6 text-center rounded-2xl border border-white/10 bg-white/5 text-slate-400 text-sm">
                            Vui lòng chọn ứng dụng trước.
                          </div>
                        </div>
                      </div>

                      {/* Buy Action Box */}
                      <div className="mt-8 space-y-4">
                        <div className="p-3 rounded-2xl border bg-slate-900/60 border-white/10">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-400/25 flex items-center justify-center">
                                <Package className="w-4 h-4 text-indigo-300" />
                              </div>
                              <span className="text-slate-200 font-black tracking-wide uppercase">SỐ LƯỢNG</span>
                            </div>
                            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-800/70 px-1.5 py-1">
                              <button className="w-10 h-10 rounded-xl bg-slate-700/80 text-white flex items-center justify-center opacity-40">−</button>
                              <div className="w-14 h-10 rounded-xl bg-slate-700/50 flex items-center justify-center text-white font-black text-2xl">1</div>
                              <button className="w-10 h-10 rounded-xl bg-slate-600/80 text-white flex items-center justify-center opacity-40">+</button>
                            </div>
                          </div>
                        </div>

                        <div className="grid gap-2.5 grid-cols-[52px_52px_1fr]">
                          <button className="h-12 rounded-xl border border-white/10 bg-slate-800/70 flex items-center justify-center text-slate-200 hover:bg-slate-700">
                            <Download size={18} />
                          </button>
                          <button className="h-12 rounded-xl border border-white/10 bg-slate-800/70 flex items-center justify-center text-slate-200 hover:bg-slate-700">
                            <Send size={18} />
                          </button>
                          <button disabled className="h-12 rounded-xl border px-3 border-white/10 bg-slate-900/80 text-slate-400 font-black cursor-not-allowed">
                            MUA NGAY
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="rounded-3xl p-4 sm:p-6 glass-panel">
                      <div className="flex items-center gap-2 mb-4">
                        <Shield className="w-5 h-5 text-cyan-400" />
                        <h3 className="text-lg font-bold text-white">Giao dịch gần đây</h3>
                      </div>
                      <div className="space-y-3 overflow-y-auto max-h-[400px] custom-scrollbar pr-1">
                        <div className="rounded-2xl border p-4 border-emerald-500/30 bg-emerald-500/5 flex justify-between items-center">
                          <p className="text-white font-semibold text-sm">User123 nạp 500.000 ₫</p>
                          <span className="text-xs text-slate-400">01:28</span>
                        </div>
                        <div className="rounded-2xl border p-4 border-indigo-500/30 bg-indigo-500/5 flex justify-between items-center">
                          <p className="text-white font-semibold text-sm">Anh Bảo mua Migul Lite 1 Ngày</p>
                          <span className="text-xs text-slate-400">13:50</span>
                        </div>
                        {/* More mock entries if needed */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <footer className="mt-16 sm:mt-24 pb-12">
            <div className="p-6 sm:p-10 rounded-[28px] border border-white/10 bg-slate-900/30 backdrop-blur-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10">
                      <Shield className="w-6 h-6 text-cyan-300" />
                    </div>
                    <h3 className="text-xl font-bold">Reseller Dashboard</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">Nền tảng quản lý key sản phẩm chuyên nghiệp.</p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-200 flex items-center gap-2"><Info size={16} /> Liên kết</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li><Link href="#" className="hover:text-cyan-300 transition-colors">Về chúng tôi</Link></li>
                    <li><Link href="#" className="hover:text-cyan-300 transition-colors">Hỗ trợ</Link></li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-200 flex items-center gap-2"><Scale size={16} /> Pháp lý</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li><Link href="#" className="hover:text-cyan-300 transition-colors">Chính sách bảo mật</Link></li>
                    <li><Link href="#" className="hover:text-cyan-300 transition-colors">Điều khoản sử dụng</Link></li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-200 flex items-center gap-2"><MessageCircle size={16} /> Liên hệ</h4>
                  <div className="flex gap-3">
                    <Link href="https://t.me/canhioscrack" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 transition-all">
                      <Send size={18} className="text-cyan-300" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
                <p>© 2026 Reseller System. All rights reserved.</p>
                <p className="flex items-center gap-1">Created with <Heart size={12} className="text-rose-500 fill-rose-500/30" /> by Admin</p>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-24 sm:bottom-6 right-6 z-[95] flex flex-col items-end gap-3">
        <button className="w-12 h-12 rounded-2xl bg-yellow-500 flex items-center justify-center border border-yellow-400/50 shadow-lg shadow-yellow-500/20 animate-bounce">
          <span className="text-xl">🎲</span>
        </button>
        <button className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center border border-cyan-400/40 shadow-lg shadow-cyan-500/20">
          <Send size={20} className="text-white" />
        </button>
      </div>

      <style jsx global>{`
        .glass-panel {
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(12px) saturate(180%);
          border: 1px solid rgba(34, 211, 238, 0.15);
          box-shadow: rgba(0, 0, 0, 0.4) 0px 8px 32px 0px;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.2);
          border-radius: 10px;
        }
        .seller-mono {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        }
      `}</style>
    </div>
  );
}
