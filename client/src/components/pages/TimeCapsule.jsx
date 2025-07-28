import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Lock, Unlock, Archive, Heart, Gift, Image, FileText, Music, Video, Plus, Edit, Trash2, Eye, EyeOff, Star, Timer, Package, MessageCircle, Camera, Mail, Sparkles } from 'lucide-react';

const TimeCapsule = () => {
  const [capsules, setCapsules] = useState([]);
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid, timeline
  const [filterStatus, setFilterStatus] = useState('all'); // all, locked, unlocked
  const [sortBy, setSortBy] = useState('openDate'); // openDate, createDate, title
  const [newCapsule, setNewCapsule] = useState({
    title: '',
    description: '',
    openDate: '',
    category: 'memory',
    isPrivate: false,
    items: []
  });
  const [newItem, setNewItem] = useState({
    type: 'text',
    title: '',
    content: '',
    file: null
  });

  // Sample time capsules
  useEffect(() => {
    const sampleCapsules = [
      {
        id: 1,
        title: 'Anniversary Pertama',
        description: 'Kenangan dan harapan untuk anniversary pertama kita',
        createdDate: '2024-02-14',
        openDate: '2025-02-14',
        category: 'anniversary',
        isPrivate: false,
        status: 'locked',
        createdBy: 'both',
        itemCount: 5,
        items: [
          {
            id: 1,
            type: 'text',
            title: 'Pesan Cinta',
            content: 'Untuk anniversary pertama kita, aku ingin kamu tahu betapa bahagianya aku bisa bersama denganmu. Semoga kita terus bersama sampai tua nanti.',
            createdBy: 'him',
            createdDate: '2024-02-14'
          },
          {
            id: 2,
            type: 'text',
            title: 'Harapan Masa Depan',
            content: 'Aku berharap satu tahun lagi kita sudah punya rencana yang lebih jelas tentang masa depan kita. Maybe engagement? 💍',
            createdBy: 'her',
            createdDate: '2024-02-14'
          },
          {
            id: 3,
            type: 'photo',
            title: 'Foto Valentine',
            content: 'Foto kita di hari Valentine pertama sebagai couple',
            file: '/placeholder-photo.jpg',
            createdBy: 'both',
            createdDate: '2024-02-14'
          },
          {
            id: 4,
            type: 'letter',
            title: 'Surat Cinta',
            content: 'Surat yang aku tulis untuk kamu di hari Valentine yang sangat special ini. Isinya rahasia sampai anniversary nanti!',
            createdBy: 'her',
            createdDate: '2024-02-14'
          },
          {
            id: 5,
            type: 'audio',
            title: 'Lagu Favorit Kita',
            content: 'Recording lagu yang sering kita nyanyikan bareng',
            file: '/audio-placeholder.mp3',
            createdBy: 'both',
            createdDate: '2024-02-14'
          }
        ]
      },
      {
        id: 2,
        title: 'Surat untuk 5 Tahun Kemudian',
        description: 'Pesan untuk diri kita di masa depan ketika sudah 5 tahun bersama',
        createdDate: '2024-01-15',
        openDate: '2029-01-15',
        category: 'future',
        isPrivate: false,
        status: 'locked',
        createdBy: 'both',
        itemCount: 4,
        items: [
          {
            id: 1,
            type: 'text',
            title: 'Target 5 Tahun',
            content: 'Semoga 5 tahun lagi kita sudah menikah, punya rumah sendiri, dan mungkin punya baby pertama. Aamiin!',
            createdBy: 'both',
            createdDate: '2024-01-15'
          },
          {
            id: 2,
            type: 'text',
            title: 'Resolusi Bersama',
            content: 'Kita berjanji akan selalu komunikasi yang baik, saling support, dan tetap romantis meski sudah lama bersama.',
            createdBy: 'both',
            createdDate: '2024-01-15'
          },
          {
            id: 3,
            type: 'photo',
            title: 'Foto Sekarang',
            content: 'Foto kita sekarang, untuk dibandingkan dengan 5 tahun lagi',
            file: '/current-photo.jpg',
            createdBy: 'both',
            createdDate: '2024-01-15'
          },
          {
            id: 4,
            type: 'video',
            title: 'Video Message',
            content: 'Video message untuk diri kita di masa depan',
            file: '/video-message.mp4',
            createdBy: 'both',
            createdDate: '2024-01-15'
          }
        ]
      },
      {
        id: 3,
        title: 'Kenangan Pertemuan Pertama',
        description: 'Time capsule tentang hari dimana kita pertama kali bertemu',
        createdDate: '2024-01-01',
        openDate: '2024-12-25',
        category: 'memory',
        isPrivate: false,
        status: 'unlocked',
        createdBy: 'her',
        itemCount: 4,
        items: [
          {
            id: 1,
            type: 'text',
            title: 'Kesan Pertama',
            content: 'Pertama kali lihat kamu, aku langsung merasa ada chemistry. Kamu terlihat sangat baik dan penuh perhatian.',
            createdBy: 'her',
            createdDate: '2024-01-01'
          },
          {
            id: 2,
            type: 'text',
            title: 'Momen Lucu',
            content: 'Inget ga waktu kamu gugup sampai tumpah kopi? Lucu banget! Tapi justru itu yang bikin aku makin tertarik.',
            createdBy: 'her',
            createdDate: '2024-01-01'
          },
          {
            id: 3,
            type: 'photo',
            title: 'Lokasi Pertama Bertemu',
            content: 'Foto kafe tempat kita pertama kali bertemu',
            file: '/first-meeting-place.jpg',
            createdBy: 'her',
            createdDate: '2024-01-01'
          },
          {
            id: 4,
            type: 'letter',
            title: 'Thank You Note',
            content: 'Terima kasih sudah mau kenal denganku dan memberikan kesempatan untuk kita bersama',
            createdBy: 'her',
            createdDate: '2024-01-01'
          }
        ]
      },
      {
        id: 4,
        title: 'Rencana Liburan Impian',
        description: 'Tempat-tempat yang ingin kita kunjungi bersama',
        createdDate: '2024-03-01',
        openDate: '2024-08-01',
        category: 'travel',
        isPrivate: false,
        status: 'unlocked',
        createdBy: 'him',
        itemCount: 3,
        items: [
          {
            id: 1,
            type: 'text',
            title: 'Destinasi Impian',
            content: 'Jepang untuk lihat sakura, Bali untuk honeymoon suatu hari nanti, dan Eropa untuk backpacking bareng.',
            createdBy: 'him',
            createdDate: '2024-03-01'
          },
          {
            id: 2,
            type: 'photo',
            title: 'Bucket List Photos',
            content: 'Kumpulan foto tempat-tempat yang ingin kita kunjungi',
            file: '/travel-wishlist.jpg',
            createdBy: 'him',
            createdDate: '2024-03-01'
          },
          {
            id: 3,
            type: 'text',
            title: 'Budget Planning',
            content: 'Rencana nabung untuk trip-trip impian kita. Target 2 tahun lagi bisa ke Jepang!',
            createdBy: 'both',
            createdDate: '2024-03-01'
          }
        ]
      },
      {
        id: 5,
        title: 'Secret Wishes',
        description: 'Harapan dan impian yang masih rahasia',
        createdDate: '2024-04-01',
        openDate: '2025-04-01',
        category: 'personal',
        isPrivate: true,
        status: 'locked',
        createdBy: 'her',
        itemCount: 2,
        items: [
          {
            id: 1,
            type: 'text',
            title: 'Secret Hope',
            content: 'Aku berharap kamu akan propose di tempat pertama kita ketemu...',
            createdBy: 'her',
            createdDate: '2024-04-01'
          },
          {
            id: 2,
            type: 'letter',
            title: 'Future Self Letter',
            content: 'Surat untuk diriku sendiri setahun lagi',
            createdBy: 'her',
            createdDate: '2024-04-01'
          }
        ]
      }
    ];
    setCapsules(sampleCapsules);
  }, []);

  const categories = {
    memory: { label: 'Kenangan', icon: Heart, color: '#e91e63' },
    anniversary: { label: 'Anniversary', icon: Gift, color: '#9c27b0' },
    future: { label: 'Masa Depan', icon: Star, color: '#3f51b5' },
    travel: { label: 'Perjalanan', icon: Archive, color: '#00bcd4' },
    personal: { label: 'Personal', icon: Lock, color: '#ff9800' }
  };

  const itemTypes = {
    text: { label: 'Teks/Pesan', icon: FileText, color: '#2196f3' },
    photo: { label: 'Foto', icon: Image, color: '#4caf50' },
    video: { label: 'Video', icon: Video, color: '#ff5722' },
    audio: { label: 'Audio', icon: Music, color: '#9c27b0' },
    letter: { label: 'Surat', icon: Mail, color: '#ff9800' }
  };

  // Check if capsule can be opened
  const canOpenCapsule = (capsule) => {
    const today = new Date();
    const openDate = new Date(capsule.openDate);
    return today >= openDate;
  };

  // Calculate days until opening
  const getDaysUntilOpen = (openDate) => {
    const today = new Date();
    const target = new Date(openDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Add item to capsule
  const addItemToCapsule = () => {
    if (newItem.title && (newItem.content || newItem.file)) {
      const item = {
        ...newItem,
        id: Date.now(),
        createdBy: 'user',
        createdDate: new Date().toISOString().split('T')[0]
      };
      setNewCapsule({
        ...newCapsule,
        items: [...newCapsule.items, item]
      });
      setNewItem({
        type: 'text',
        title: '',
        content: '',
        file: null
      });
    }
  };

  // Remove item from capsule
  const removeItemFromCapsule = (itemId) => {
    setNewCapsule({
      ...newCapsule,
      items: newCapsule.items.filter(item => item.id !== itemId)
    });
  };

  // Create new capsule
  const createCapsule = () => {
    if (newCapsule.title && newCapsule.openDate && newCapsule.items.length > 0) {
      const capsule = {
        ...newCapsule,
        id: Date.now(),
        createdDate: new Date().toISOString().split('T')[0],
        status: 'locked',
        createdBy: 'user',
        itemCount: newCapsule.items.length
      };
      setCapsules([...capsules, capsule]);
      resetForm();
    }
  };

  // Reset form
  const resetForm = () => {
    setNewCapsule({
      title: '',
      description: '',
      openDate: '',
      category: 'memory',
      isPrivate: false,
      items: []
    });
    setNewItem({
      type: 'text',
      title: '',
      content: '',
      file: null
    });
    setIsCreating(false);
  };

  // Open capsule
  const openCapsule = (capsule) => {
    if (canOpenCapsule(capsule)) {
      setCapsules(capsules.map(c => 
        c.id === capsule.id ? { ...c, status: 'unlocked' } : c
      ));
    }
  };

  // Delete capsule
  const deleteCapsule = (capsuleId) => {
    setCapsules(capsules.filter(c => c.id !== capsuleId));
    setSelectedCapsule(null);
  };

  // Filter and sort capsules
  const filteredCapsules = capsules
    .filter(capsule => {
      if (filterStatus === 'all') return true;
      return capsule.status === filterStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'openDate') return new Date(a.openDate) - new Date(b.openDate);
      if (sortBy === 'createDate') return new Date(b.createdDate) - new Date(a.createdDate);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  // Render capsule detail modal
  const renderCapsuleDetail = () => {
    if (!selectedCapsule) return null;

    const canOpen = canOpenCapsule(selectedCapsule);
    const daysLeft = getDaysUntilOpen(selectedCapsule.openDate);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedCapsule.title}</h2>
                <p className="text-gray-600">{selectedCapsule.description}</p>
              </div>
              <button
                onClick={() => setSelectedCapsule(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Capsule Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} className="text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">Dibuat</span>
                </div>
                <div className="text-gray-900">{formatDate(selectedCapsule.createdDate)}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Timer size={16} className="text-green-500" />
                  <span className="text-sm font-medium text-gray-700">Dibuka</span>
                </div>
                <div className="text-gray-900">{formatDate(selectedCapsule.openDate)}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  {selectedCapsule.status === 'locked' ? 
                    <Lock size={16} className="text-red-500" /> : 
                    <Unlock size={16} className="text-green-500" />
                  }
                  <span className="text-sm font-medium text-gray-700">Status</span>
                </div>
                <div className={`font-medium ${selectedCapsule.status === 'locked' ? 'text-red-600' : 'text-green-600'}`}>
                  {selectedCapsule.status === 'locked' ? 
                    `Terkunci (${daysLeft} hari lagi)` : 
                    'Sudah terbuka'
                  }
                </div>
              </div>
            </div>

            {/* Open Button */}
            {selectedCapsule.status === 'locked' && canOpen && (
              <div className="text-center mb-6">
                <button
                  onClick={() => openCapsule(selectedCapsule)}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
                >
                  <Unlock size={20} />
                  Buka Time Capsule
                </button>
              </div>
            )}

            {/* Items */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Package size={20} />
                Isi Time Capsule ({selectedCapsule.items.length} item)
              </h3>

              {selectedCapsule.status === 'unlocked' || canOpen ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCapsule.items.map((item) => {
                    const ItemIcon = itemTypes[item.type].icon;
                    
                    return (
                      <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <ItemIcon size={16} style={{ color: itemTypes[item.type].color }} />
                          <h4 className="font-medium text-gray-800">{item.title}</h4>
                        </div>
                        
                        {item.type === 'text' && (
                          <p className="text-gray-700 text-sm leading-relaxed">{item.content}</p>
                        )}
                        
                        {item.type === 'photo' && (
                          <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center mb-2">
                            <Camera size={24} className="text-gray-400" />
                            <span className="text-gray-500 text-sm ml-2">Foto: {item.title}</span>
                          </div>
                        )}
                        
                        {item.type === 'video' && (
                          <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center mb-2">
                            <Video size={24} className="text-gray-400" />
                            <span className="text-gray-500 text-sm ml-2">Video: {item.title}</span>
                          </div>
                        )}
                        
                        {item.type === 'audio' && (
                          <div className="bg-gray-200 rounded-lg h-16 flex items-center justify-center mb-2">
                            <Music size={20} className="text-gray-400" />
                            <span className="text-gray-500 text-sm ml-2">Audio: {item.title}</span>
                          </div>
                        )}
                        
                        {item.type === 'letter' && (
                          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-3 mb-2">
                            <Mail size={16} className="text-orange-500 mb-2" />
                            <p className="text-gray-700 text-sm italic">{item.content}</p>
                          </div>
                        )}
                        
                        <div className="mt-3 text-xs text-gray-500">
                          Oleh: {item.createdBy === 'both' ? 'Berdua' : item.createdBy === 'him' ? 'Dia' : 'Saya'} • {formatDate(item.createdDate)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Lock size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Time capsule masih terkunci</p>
                  <p className="text-sm text-gray-400">Tunggu {daysLeft} hari lagi untuk membukanya</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => deleteCapsule(selectedCapsule.id)}
                className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 size={16} />
                Hapus
              </button>
              <button
                onClick={() => setSelectedCapsule(null)}
                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main render
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Time Capsule Digital 📦
          </h1>
          <p className="text-gray-600 text-lg">
            Simpan kenangan dan pesan untuk dibuka di masa depan
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <div className="text-2xl font-bold text-indigo-600">{capsules.length}</div>
            <div className="text-gray-600 text-sm">Total Capsules</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <div className="text-2xl font-bold text-green-600">
              {capsules.filter(c => c.status === 'unlocked').length}
            </div>
            <div className="text-gray-600 text-sm">Terbuka</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <div className="text-2xl font-bold text-red-600">
              {capsules.filter(c => c.status === 'locked').length}
            </div>
            <div className="text-gray-600 text-sm">Terkunci</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <div className="text-2xl font-bold text-purple-600">
              {capsules.reduce((sum, c) => sum + c.itemCount, 0)}
            </div>
            <div className="text-gray-600 text-sm">Total Items</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">Semua Status</option>
                <option value="locked">Terkunci</option>
                <option value="unlocked">Terbuka</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="openDate">Tanggal Buka</option>
                <option value="createDate">Tanggal Dibuat</option>
                <option value="title">Judul</option>
              </select>
            </div>

            <button
              onClick={() => setIsCreating(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Plus size={20} />
              Buat Time Capsule
            </button>
          </div>
        </div>

        {/* Capsules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCapsules.map((capsule) => {
            const CategoryIcon = categories[capsule.category].icon;
            const canOpen = canOpenCapsule(capsule);
            const daysLeft = getDaysUntilOpen(capsule.openDate);
            
            return (
              <div
                key={capsule.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                  capsule.status === 'unlocked' ? 'ring-2 ring-green-200' : ''
                }`}
                onClick={() => setSelectedCapsule(capsule)}
              >
                {/* Header */}
                <div 
                  className="p-4 text-white"
                  style={{ backgroundColor: categories[capsule.category].color }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CategoryIcon size={20} />
                      <span className="text-sm font-medium">{categories[capsule.category].label}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {capsule.status === 'locked' ? 
                        <Lock size={16} /> : 
                        <Unlock size={16} />
                      }
                      {capsule.isPrivate && <EyeOff size={16} />}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{capsule.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{capsule.description}</p>

                  {/* Dates */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={14} />
                      <span>Dibuat: {formatDate(capsule.createdDate)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Timer size={14} />
                      <span>Buka: {formatDate(capsule.openDate)}</span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">{capsule.itemCount} items</span>
                    <span className={`text-sm font-medium ${
                      capsule.status === 'locked' ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {capsule.status === 'locked' 
                        ? `${daysLeft} hari lagi` 
                        : 'Sudah terbuka'
                      }
                    </span>
                  </div>

                  {/* Open Button */}
                  {capsule.status === 'locked' && canOpen && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openCapsule(capsule);
                      }}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all font-medium"
                    >
                      Buka Sekarang!
                    </button>
                  )}

                  {capsule.status === 'unlocked' && (
                    <div className="w-full bg-green-100 text-green-700 py-2 px-4 rounded-lg text-center font-medium">
                      ✅ Sudah Terbuka
                    </div>
                  )}

                  {capsule.status === 'locked' && !canOpen && (
                    <div className="w-full bg-gray-100 text-gray-600 py-2 px-4 rounded-lg text-center">
                      🔒 Masih Terkunci
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCapsules.length === 0 && (
          <div className="text-center py-12">
            <Archive size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Belum ada time capsule
            </h3>
            <p className="text-gray-500">
              Mulai buat time capsule untuk menyimpan kenangan indah kalian!
            </p>
          </div>
        )}

        {/* Create Capsule Modal */}
        {isCreating && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Buat Time Capsule Baru</h2>
                
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Judul time capsule"
                    value={newCapsule.title}
                    onChange={(e) => setNewCapsule({...newCapsule, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  
                  <input
                    type="date"
                    value={newCapsule.openDate}
                    onChange={(e) => setNewCapsule({...newCapsule, openDate: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />

                  <select
                    value={newCapsule.category}
                    onChange={(e) => setNewCapsule({...newCapsule, category: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {Object.entries(categories).map(([key, cat]) => (
                      <option key={key} value={key}>{cat.label}</option>
                    ))}
                  </select>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isPrivate"
                      checked={newCapsule.isPrivate}
                      onChange={(e) => setNewCapsule({...newCapsule, isPrivate: e.target.checked})}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="isPrivate" className="text-gray-700">
                      Private (hanya saya yang bisa buka)
                    </label>
                  </div>
                </div>

                <textarea
                  placeholder="Deskripsi time capsule..."
                  value={newCapsule.description}
                  onChange={(e) => setNewCapsule({...newCapsule, description: e.target.value})}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />

                {/* Add Items Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold mb-4">Tambah Item ke Time Capsule</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <select
                      value={newItem.type}
                      onChange={(e) => setNewItem({...newItem, type: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      {Object.entries(itemTypes).map(([key, type]) => (
                        <option key={key} value={key}>{type.label}</option>
                      ))}
                    </select>

                    <input
                      type="text"
                      placeholder="Judul item"
                      value={newItem.title}
                      onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  {(newItem.type === 'text' || newItem.type === 'letter') && (
                    <textarea
                      placeholder={newItem.type === 'letter' ? "Tulis surat..." : "Tulis pesan atau kenangan..."}
                      value={newItem.content}
                      onChange={(e) => setNewItem({...newItem, content: e.target.value})}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  )}

                  {(newItem.type === 'photo' || newItem.type === 'video' || newItem.type === 'audio') && (
                    <div className="mb-4">
                      <input
                        type="file"
                        accept={
                          newItem.type === 'photo' ? 'image/*' :
                          newItem.type === 'video' ? 'video/*' :
                          newItem.type === 'audio' ? 'audio/*' : '*'
                        }
                        onChange={(e) => setNewItem({...newItem, file: e.target.files[0]})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {newItem.type === 'photo' && 'Upload foto (JPG, PNG, GIF)'}
                        {newItem.type === 'video' && 'Upload video (MP4, AVI, MOV)'}
                        {newItem.type === 'audio' && 'Upload audio (MP3, WAV, M4A)'}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={addItemToCapsule}
                    disabled={!newItem.title || (!newItem.content && !newItem.file)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      newItem.title && (newItem.content || newItem.file)
                        ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Tambah Item
                  </button>
                </div>

                {/* Items List */}
                {newCapsule.items.length > 0 && (
                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h3 className="text-lg font-semibold mb-4">Item dalam Time Capsule ({newCapsule.items.length})</h3>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {newCapsule.items.map((item) => {
                        const ItemIcon = itemTypes[item.type].icon;
                        
                        return (
                          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <ItemIcon size={16} style={{ color: itemTypes[item.type].color }} />
                              <div>
                                <h4 className="font-medium text-gray-800">{item.title}</h4>
                                <p className="text-sm text-gray-600">
                                  {item.type === 'text' || item.type === 'letter' ? 
                                    `${item.content.substring(0, 50)}${item.content.length > 50 ? '...' : ''}` :
                                    `${itemTypes[item.type].label}${item.file ? ` - ${item.file.name}` : ''}`
                                  }
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeItemFromCapsule(item.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={resetForm}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={createCapsule}
                    disabled={!newCapsule.title || !newCapsule.openDate || newCapsule.items.length === 0}
                    className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                      newCapsule.title && newCapsule.openDate && newCapsule.items.length > 0
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Buat Time Capsule
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Capsule Detail Modal */}
        {renderCapsuleDetail()}
      </div>
    </div>
  );
};

export default TimeCapsule;