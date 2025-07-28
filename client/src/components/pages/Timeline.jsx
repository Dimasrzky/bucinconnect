import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Calendar, MapPin, Camera, Plus, Edit, Trash2 } from 'lucide-react';

const Timeline = () => {
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    description: '',
    location: '',
    category: 'milestone',
    image: null,
    color: '#ff6b6b'
  });

  // Sample initial data
  useEffect(() => {
    const sampleEvents = [
      {
        id: 1,
        title: 'Pertemuan Pertama',
        date: '2023-01-15',
        description: 'Hari dimana takdir mempertemukan kita di kafe kecil di sudut kota. Masih ingat bagaimana gugupnya kita saat pertama kali saling menyapa.',
        location: 'Kafe Sederhana, Jakarta',
        category: 'milestone',
        color: '#ff6b6b',
        image: null
      },
      {
        id: 2,
        title: 'Kencan Pertama',
        date: '2023-01-22',
        description: 'Kencan pertama yang canggung tapi manis. Kita menonton film di bioskop dan makan es krim sambil berjalan di taman.',
        location: 'Mall Central Park',
        category: 'date',
        color: '#4ecdc4',
        image: null
      },
      {
        id: 3,
        title: 'Jadian Resmi',
        date: '2023-02-14',
        description: 'Di hari Valentine yang romantis, akhirnya kita resmi menjadi sepasang kekasih. Moment yang tak akan pernah terlupakan!',
        location: 'Pantai Ancol',
        category: 'milestone',
        color: '#ff6b6b',
        image: null
      },
      {
        id: 4,
        title: 'Trip Pertama Bersama',
        date: '2023-04-10',
        description: 'Liburan pertama ke Bandung. Kita jalan-jalan ke Tangkuban Perahu, makan makanan enak, dan menghabiskan waktu berkualitas bersama.',
        location: 'Bandung, Jawa Barat',
        category: 'travel',
        color: '#45b7d1',
        image: null
      },
      {
        id: 5,
        title: 'Anniversary 6 Bulan',
        date: '2023-08-14',
        description: 'Perayaan 6 bulan bersama dengan dinner romantis di restoran favorit kita. Waktu berlalu begitu cepat!',
        location: 'Restoran Atmosphere',
        category: 'anniversary',
        color: '#f39c12',
        image: null
      }
    ];
    setTimelineEvents(sampleEvents);
  }, []);

  const categoryIcons = {
    milestone: Heart,
    date: Calendar,
    travel: MapPin,
    anniversary: Heart,
    memory: Camera
  };

  const categoryColors = {
    milestone: '#ff6b6b',
    date: '#4ecdc4',
    travel: '#45b7d1',
    anniversary: '#f39c12',
    memory: '#9b59b6'
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date) {
      const event = {
        ...newEvent,
        id: Date.now(),
        color: categoryColors[newEvent.category]
      };
      setTimelineEvents([...timelineEvents, event].sort((a, b) => new Date(a.date) - new Date(b.date)));
      setNewEvent({
        title: '',
        date: '',
        description: '',
        location: '',
        category: 'milestone',
        image: null,
        color: '#ff6b6b'
      });
      setIsAddingEvent(false);
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setNewEvent(event);
  };

  const handleUpdateEvent = () => {
    setTimelineEvents(timelineEvents.map(event => 
      event.id === editingEvent.id ? { ...newEvent, color: categoryColors[newEvent.category] } : event
    ));
    setEditingEvent(null);
    setNewEvent({
      title: '',
      date: '',
      description: '',
      location: '',
      category: 'milestone',
      image: null,
      color: '#ff6b6b'
    });
  };

  const handleDeleteEvent = (eventId) => {
    setTimelineEvents(timelineEvents.filter(event => event.id !== eventId));
    setSelectedEvent(null);
  };

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const getTimeAgo = (dateString) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - eventDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} hari yang lalu`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} bulan yang lalu`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} tahun yang lalu`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Memory Lane 💕
          </h1>
          <p className="text-gray-600 text-lg">
            Perjalanan indah kita berdua dalam satu timeline
          </p>
        </div>

        {/* Add Event Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsAddingEvent(true)}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Plus size={20} />
            Tambah Kenangan Baru
          </button>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-pink-300 to-purple-300 h-full"></div>

          {timelineEvents.map((event, index) => {
            const IconComponent = categoryIcons[event.category] || Heart;
            const isLeft = index % 2 === 0;

            return (
              <div key={event.id} className={`flex items-center mb-12 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Content Card */}
                <div className={`w-5/12 ${isLeft ? 'pr-8' : 'pl-8'}`}>
                  <div 
                    className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-l-4`}
                    style={{ borderLeftColor: event.color }}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditEvent(event);
                          }}
                          className="text-blue-500 hover:text-blue-700 transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEvent(event.id);
                          }}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-3">{event.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(event.date)}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {event.location}
                        </span>
                      )}
                    </div>
                    <div className="mt-3">
                      <span className="text-xs text-gray-400">{getTimeAgo(event.date)}</span>
                    </div>
                  </div>
                </div>

                {/* Timeline Icon */}
                <div className="w-2/12 flex justify-center">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg z-10"
                    style={{ backgroundColor: event.color }}
                  >
                    <IconComponent size={20} />
                  </div>
                </div>

                {/* Empty Space */}
                <div className="w-5/12"></div>
              </div>
            );
          })}
        </div>

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedEvent.title}</h2>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={18} />
                    <span>{formatDate(selectedEvent.date)}</span>
                  </div>
                  
                  {selectedEvent.location && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={18} />
                      <span>{selectedEvent.location}</span>
                    </div>
                  )}
                  
                  <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
                  
                  {selectedEvent.image && (
                    <img 
                      src={selectedEvent.image} 
                      alt={selectedEvent.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Event Modal */}
        {(isAddingEvent || editingEvent) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">
                  {editingEvent ? 'Edit Kenangan' : 'Tambah Kenangan Baru'}
                </h2>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Judul kenangan"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  
                  <input
                    type="text"
                    placeholder="Lokasi (opsional)"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="milestone">Milestone</option>
                    <option value="date">Kencan</option>
                    <option value="travel">Perjalanan</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="memory">Kenangan</option>
                  </select>
                  
                  <textarea
                    placeholder="Ceritakan kenangan ini..."
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setIsAddingEvent(false);
                      setEditingEvent(null);
                      setNewEvent({
                        title: '',
                        date: '',
                        description: '',
                        location: '',
                        category: 'milestone',
                        image: null,
                        color: '#ff6b6b'
                      });
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={editingEvent ? handleUpdateEvent : handleAddEvent}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    {editingEvent ? 'Update' : 'Simpan'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;