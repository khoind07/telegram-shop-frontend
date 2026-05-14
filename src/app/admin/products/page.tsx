'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/store/CartContext';
import { ChevronLeft, Plus, Trash2, Edit } from 'lucide-react';
import Link from 'next/link';

export default function AdminProductsPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setImage('');
    setCategory('');
    setStock('');
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setDescription(p.description || '');
    setPrice(p.price.toString());
    setImage(p.image || '');
    setCategory(p.category || '');
    setStock(p.stock.toString());
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingProduct 
      ? `${API_URL}/api/products/${editingProduct.id}`
      : `${API_URL}/api/products`;
    const method = editingProduct ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': window.Telegram?.WebApp?.initData || ''
        },
        body: JSON.stringify({ name, description, price, image, category, stock })
      });

      if (res.ok) {
        alert(editingProduct ? 'Cập nhật thành công!' : 'Thêm thành công!');
        resetForm();
        fetchProducts();
      } else {
        const err = await res.json();
        alert('Lỗi: ' + err.error);
      }
    } catch (error) {
      alert('Lỗi kết nối');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': window.Telegram?.WebApp?.initData || ''
        }
      });
      if (res.ok) {
        fetchProducts();
      }
    } catch (error) {
      alert('Lỗi xóa sản phẩm');
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <header className="p-4 flex items-center justify-between sticky top-0 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="font-bold text-lg">Quản lý sản phẩm</h1>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 text-white shadow-lg"
        >
          <Plus size={24} />
        </button>
      </header>

      {showForm && (
        <div className="p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 animate-in slide-in-from-top duration-300">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <h2 className="font-bold">{editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Tên sản phẩm" className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700 border-none outline-none" required />
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Mô tả" className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700 border-none outline-none min-h-[100px]" />
            <div className="grid grid-cols-2 gap-3">
              <input value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="Giá (đ)" className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700 border-none outline-none" required />
              <input value={stock} onChange={e => setStock(e.target.value)} type="number" placeholder="Kho" className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700 border-none outline-none" required />
            </div>
            <input value={image} onChange={e => setImage(e.target.value)} placeholder="URL Hình ảnh" className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700 border-none outline-none" />
            <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Danh mục" className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700 border-none outline-none" />
            <div className="flex gap-3">
              <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold">Lưu</button>
              <button type="button" onClick={resetForm} className="bg-slate-200 dark:bg-slate-700 px-6 py-3 rounded-xl">Hủy</button>
            </div>
          </form>
        </div>
      )}

      <div className="p-4 flex flex-col gap-3">
        {loading ? (
          <p className="text-center opacity-50 py-10">Đang tải...</p>
        ) : products.length > 0 ? (
          products.map(p => (
            <div key={p.id} className="bg-white dark:bg-slate-800 p-3 rounded-2xl flex gap-3 border border-slate-200 dark:border-slate-700">
              <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-700 overflow-hidden flex-shrink-0">
                {p.image && <img src={p.image} className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm truncate">{p.name}</h3>
                <p className="text-xs text-blue-600 font-bold">{p.price.toLocaleString('vi-VN')}₫ • Kho: {p.stock}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => handleEdit(p)} className="p-2 text-blue-500"><Edit size={18} /></button>
                <button onClick={() => handleDelete(p.id)} className="p-2 text-red-500"><Trash2 size={18} /></button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center opacity-50 py-10">Chưa có sản phẩm.</p>
        )}
      </div>
    </div>
  );
}
