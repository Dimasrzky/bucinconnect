import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Camera, Gift, Plane, Coffee, Mountain, Star, Plus, Edit, Trash2, Check, Clock, DollarSign, Calendar, Filter, Search } from 'lucide-react';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    category: 'travel',
    priority: 'medium',
    estimatedCost: '',
    targetDate: '',
    status: 'planned',
    notes: '',
    addedBy: 'both'
  });

  // Sample initial data
  useEffect(() => {
    const sampleWishlist = [
      {
        id: 1,
        title: 'Trip ke Jepang',
        description: 'Melihat sakura mekar di musim semi dan merasakan budaya Jepang',
        category: 'travel',
        priority: 'high',
        estimatedCost: 25000000,
        targetDate: '2025-04-15',
        status: 'planned',
        notes: 'Ingin ke Tokyo, Kyoto, dan Osaka. Sudah mulai nabung!',
        addedBy: 'both',
        createdAt: '2024-01-15',
        completedAt: null
      },
      {
        id: 2,
        title: 'Belajar Masak Bersama',
        description: 'Mengikuti kelas memasak dan bisa masak makanan favorit masing-masing',
        category: 'activity',
        priority: 'medium',
        estimatedCost: 2000000,
        targetDate: '2025-03-01',
        status: 'in-progress',
        notes: 'Sudah daftar di cooking class di Kemang',
        addedBy: 'her',
        createdAt: '2024-02-01',
        completedAt: null
      },
      {
        id: 3,
        title: 'Hiking ke Gunung Bromo',
        description: 'Sunrise hunting di Gunung Bromo dan camping bersama',
        category: 'adventure',
        priority: 'high',
        estimatedCost: 3000000,
        targetDate: '2025-08-17',
        status: 'planned',
        notes: 'Butuh persiapan fisik dan peralatan camping',
        addedBy: 'him',
        createdAt: '2024-01-20',
        completedAt: null
      },
      {
        id: 4,
        title: 'Photoshoot Pre-wedding',
        description: 'Foto pre-wedding di tempat yang romantis dan berkesan',
        category: 'milestone',
        priority: 'high',
        estimatedCost: 8000000,
        targetDate: '2025-06-01',
        status: 'planned',
        notes: 'Lokasi: Bali atau Yogyakarta, perlu riset photographer',
        addedBy: 'both',
        createdAt: '2024-01-10',
        completedAt: null
      },
      {
        id: 5,
        title: 'Nonton Konser Musik Favorit',
        description: 'Menonton konser band/artis favorit kita bersama-sama',
        category: 'entertainment',
        priority: 'medium',
        estimatedCost: 1500000,
        targetDate: '2025-12-31',
        status: 'completed',
        notes: 'Sudah nonton konser Tulus bulan lalu, amazing!',
        addedBy: 'both',
        createdAt: '2024-01-05',
        completedAt: '2024-11-15'
      },
      {
        id: 6,
        title: 'Adopsi Kucing',
        description: 'Mengadopsi kucing dan merawatnya bersama sebagai anak pertama kita',
        category: 'lifestyle',
        priority: 'medium',
        estimatedCost: 5000000,
        targetDate: '2025-09-01',
        status: 'planned',
        notes: 'Perlu persiapan rumah yang pet-friendly',
        addedBy: 'her',
        createdAt: '2024-02-10',
        completedAt: null
      },
      {
        id: 7,
        title: 'Staycation Resort Mewah',
        description: 'Menginap di resort 5 bintang untuk merayakan anniversary',
        category: 'travel',
        priority: 'low',
        estimatedCost: 4000000,
        targetDate: '2025-02-14',
        status: 'in-progress',
        notes: 'Sedang cari promo untuk Valentine',
        addedBy: 'him',
        createdAt: '2024-01-25',
        completedAt: null
      }
    ];
    setWishlistItems(sampleWishlist);
  }, []);

  const categories = {
    travel: { icon: Plane, label: 'Perjalanan', color: '#3b82f6' },
    activity: { icon: Coffee, label: 'Aktivitas', color: '#8b5cf6' },
    adventure: { icon: Mountain, label: 'Petualangan', color: '#059669' },
    milestone: { icon: Heart, label: 'Milestone', color: '#dc2626' },
    entertainment: { icon: Star, label: 'Hiburan', color: '#ea580c' },
    lifestyle: { icon: Gift, label: 'Lifestyle', color: '#7c3aed' }
  };

  const priorities = {
    low: { label: 'Rendah', color: '#6b7280' },
    medium: { label: 'Sedang', color: '#f59e0b' },
    high: { label: 'Tinggi', color: '#dc2626' }
  };

  const statuses = {
    planned: { label: 'Direncanakan', color: '#6b7280', icon: Clock },
    'in-progress': { label: 'Sedang Berjalan', color: '#f59e0b', icon: Star },
    completed: { label: 'Selesai', color: '#059669', icon: Check }
  };

  const handleAddItem = () => {
    if (newItem.title && newItem.description) {
      const item = {
        ...newItem,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0],
        completedAt: null,
        estimatedCost: newItem.estimatedCost ? parseInt(newItem.estimatedCost) : 0
      };
      setWishlistItems([...wishlistItems, item]);
      resetForm();
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setNewItem({
      ...item,
      estimatedCost: item.estimatedCost.toString()
    });
  };

  const handleUpdateItem = () => {
    setWishlistItems(wishlistItems.map(item => 
      item.id === editingItem.id 
        ? { 
            ...newItem, 
            estimatedCost: newItem.estimatedCost ? parseInt(newItem.estimatedCost) : 0,
            completedAt: newItem.status === 'completed' && editingItem.status !== 'completed' 
              ? new Date().toISOString().split('T')[0] 
              : newItem.status !== 'completed' 
                ? null 
                : item.completedAt
          }
        : item
    ));
    setEditingItem(null);
    resetForm();
  };

  const handleDeleteItem = (itemId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
  };

  const handleCompleteItem = (itemId) => {
    setWishlistItems(wishlistItems.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            status: item.status === 'completed' ? 'planned' : 'completed',
            completedAt: item.status === 'completed' ? null : new Date().toISOString().split('T')[0]
          }
        : item
    ));
  };

  const resetForm = () => {
    setNewItem({
      title: '',
      description: '',
      category: 'travel',
      priority: 'medium',
      estimatedCost: '',
      targetDate: '',
      status: 'planned',
      notes: '',
      addedBy: 'both'
    });
    setIsAddingItem(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const filteredItems = wishlistItems.filter(item => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const completedCount = wishlistItems.filter(item => item.status === 'completed').length;
  const totalEstimatedCost = wishlistItems
    .filter(item => item.status !== 'completed')
    .reduce((sum, item) => sum + item.estimatedCost, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Bucket List Berdua 🎯
          </h1>
          <p className="text-gray-600 text-lg">
            Impian dan rencana yang ingin kita capai bersama
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <div className="text-2xl font-bold text-indigo-600">{wishlistItems.length}</div>
            <div className="text-gray-600 text-sm">Total Wishlist</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            <div className="text-gray-600 text-sm">Sudah Tercapai</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <div className="text-2xl font-bold text-orange-600">
              {wishlistItems.filter(item => item.status === 'in-progress').length}
            </div>
            <div className="text-gray-600 text-sm">Sedang Berjalan</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <div className="text-lg font-bold text-purple-600">
              {formatCurrency(totalEstimatedCost)}
            </div>
            <div className="text-gray-600 text-sm">Total Estimasi</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari wishlist..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">Semua Status</option>
                <option value="planned">Direncanakan</option>
                <option value="in-progress">Sedang Berjalan</option>
                <option value="completed">Selesai</option>
              </select>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">Semua Kategori</option>
                {Object.entries(categories).map(([key, cat]) => (
                  <option key={key} value={key}>{cat.label}</option>
                ))}
              </select>
            </div>

            {/* Add Button */}
            <button
              onClick={() => setIsAddingItem(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Plus size={20} />
              Tambah Wishlist
            </button>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredItems.map((item) => {
            const CategoryIcon = categories[item.category].icon;
            const StatusIcon = statuses[item.status].icon;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  item.status === 'completed' ? 'ring-2 ring-green-200' : ''
                }`}
              >
                {/* Header */}
                <div 
                  className="p-4 text-white"
                  style={{ backgroundColor: categories[item.category].color }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <CategoryIcon size={20} />
                      <span className="text-sm font-medium">{categories[item.category].label}</span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEditItem(item)}
                        className="text-white/80 hover:text-white transition-colors p-1"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-white/80 hover:text-white transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.description}</p>

                  {/* Status & Priority */}
                  <div className="flex gap-2 mb-3">
                    <span 
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: statuses[item.status].color }}
                    >
                      <StatusIcon size={12} />
                      {statuses[item.status].label}
                    </span>
                    <span 
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: priorities[item.priority].color }}
                    >
                      {priorities[item.priority].label}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm text-gray-600">
                    {item.estimatedCost > 0 && (
                      <div className="flex items-center gap-2">
                        <DollarSign size={14} />
                        <span>{formatCurrency(item.estimatedCost)}</span>
                      </div>
                    )}
                    {item.targetDate && (
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>Target: {formatDate(item.targetDate)}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Heart size={14} />
                      <span>Ditambahkan oleh: {
                        item.addedBy === 'both' ? 'Berdua' : 
                        item.addedBy === 'him' ? 'Dia' : 'Saya'
                      }</span>
                    </div>
                  </div>

                  {/* Notes */}
                  {item.notes && (
                    <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 italic">"{item.notes}"</p>
                    </div>
                  )}

                  {/* Completed date */}
                  {item.status === 'completed' && item.completedAt && (
                    <div className="mt-3 p-2 bg-green-50 rounded-lg">
                      <p className="text-xs text-green-600 font-medium">
                        ✅ Selesai pada {formatDate(item.completedAt)}
                      </p>
                    </div>
                  )}

                  {/* Action Button */}
                  <button
                    onClick={() => handleCompleteItem(item.id)}
                    className={`w-full mt-4 py-2 px-4 rounded-lg transition-all font-medium ${
                      item.status === 'completed'
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg'
                    }`}
                  >
                    {item.status === 'completed' ? 'Tandai Belum Selesai' : 'Tandai Selesai'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add/Edit Modal */}
        {(isAddingItem || editingItem) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">
                  {editingItem ? 'Edit Wishlist' : 'Tambah Wishlist Baru'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      placeholder="Judul wishlist"
                      value={newItem.title}
                      onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <textarea
                      placeholder="Deskripsi detail..."
                      value={newItem.description}
                      onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {Object.entries(categories).map(([key, cat]) => (
                      <option key={key} value={key}>{cat.label}</option>
                    ))}
                  </select>

                  <select
                    value={newItem.priority}
                    onChange={(e) => setNewItem({...newItem, priority: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {Object.entries(priorities).map(([key, priority]) => (
                      <option key={key} value={key}>{priority.label}</option>
                    ))}
                  </select>

                  <input
                    type="number"
                    placeholder="Estimasi biaya (IDR)"
                    value={newItem.estimatedCost}
                    onChange={(e) => setNewItem({...newItem, estimatedCost: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />

                  <input
                    type="date"
                    value={newItem.targetDate}
                    onChange={(e) => setNewItem({...newItem, targetDate: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />

                  <select
                    value={newItem.status}
                    onChange={(e) => setNewItem({...newItem, status: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {Object.entries(statuses).map(([key, status]) => (
                      <option key={key} value={key}>{status.label}</option>
                    ))}
                  </select>

                  <select
                    value={newItem.addedBy}
                    onChange={(e) => setNewItem({...newItem, addedBy: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="both">Berdua</option>
                    <option value="him">Dia</option>
                    <option value="her">Saya</option>
                  </select>

                  <div className="md:col-span-2">
                    <textarea
                      placeholder="Catatan tambahan..."
                      value={newItem.notes}
                      onChange={(e) => setNewItem({...newItem, notes: e.target.value})}
                      rows={2}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setIsAddingItem(false);
                      setEditingItem(null);
                      resetForm();
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={editingItem ? handleUpdateItem : handleAddItem}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    {editingItem ? 'Update' : 'Simpan'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Gift size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {searchTerm || filterStatus !== 'all' || filterCategory !== 'all' 
                ? 'Tidak ada wishlist yang sesuai filter' 
                : 'Belum ada wishlist'}
            </h3>
            <p className="text-gray-500">
              {searchTerm || filterStatus !== 'all' || filterCategory !== 'all'
                ? 'Coba ubah filter atau kata kunci pencarian'
                : 'Mulai tambahkan impian dan rencana kalian berdua!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;