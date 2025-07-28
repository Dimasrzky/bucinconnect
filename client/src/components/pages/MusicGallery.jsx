import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, Music, Plus, Edit, Trash2, Shuffle, Repeat, Search, Filter, Clock, User, Calendar, Headphones } from 'lucide-react';

const MusicGallery = () => {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('none'); // none, one, all
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddingSong, setIsAddingSong] = useState(false);
  const [isAddingPlaylist, setIsAddingPlaylist] = useState(false);
  const [editingSong, setEditingSong] = useState(null);
  const [newSong, setNewSong] = useState({
    title: '',
    artist: '',
    album: '',
    duration: '',
    category: 'love',
    mood: 'romantic',
    description: '',
    youtubeUrl: '',
    spotifyUrl: '',
    addedBy: 'both',
    specialMoment: ''
  });
  const [newPlaylist, setNewPlaylist] = useState({
    name: '',
    description: '',
    songs: []
  });

  const audioRef = useRef(null);

  // Sample music data
  useEffect(() => {
    const sampleSongs = [
      {
        id: 1,
        title: 'Perfect',
        artist: 'Ed Sheeran',
        album: '÷ (Divide)',
        duration: '4:23',
        category: 'love',
        mood: 'romantic',
        description: 'Lagu yang sempurna untuk menggambarkan perasaan kita',
        youtubeUrl: 'https://youtube.com/watch?v=2Vv-BfVoq4g',
        spotifyUrl: 'https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v',
        addedBy: 'him',
        specialMoment: 'Lagu pertama yang kita dengar bersama',
        addedDate: '2024-01-15',
        playCount: 25,
        isFavorite: true
      },
      {
        id: 2,
        title: 'All of Me',
        artist: 'John Legend',
        album: 'Love in the Future',
        duration: '4:29',
        category: 'love',
        mood: 'romantic',
        description: 'Lagu yang menggambarkan cinta tanpa syarat',
        youtubeUrl: 'https://youtube.com/watch?v=450p7goxZqg',
        spotifyUrl: 'https://open.spotify.com/track/3U4isOIWM3VvDubwSI28yQDQT',
        addedBy: 'her',
        specialMoment: 'Lagu dance wedding kita nanti',
        addedDate: '2024-01-20',
        playCount: 18,
        isFavorite: true
      },
      {
        id: 3,
        title: 'Thinking Out Loud',
        artist: 'Ed Sheeran',
        album: 'x (Multiply)',
        duration: '4:41',
        category: 'love',
        mood: 'romantic',
        description: 'Tentang cinta yang tumbuh seiring waktu',
        youtubeUrl: 'https://youtube.com/watch?v=lp-EO5I60KA',
        spotifyUrl: 'https://open.spotify.com/track/1qDrWA6lyx8cLECdZE7TV7',
        addedBy: 'both',
        specialMoment: 'Anniversary pertama kita',
        addedDate: '2024-02-14',
        playCount: 12,
        isFavorite: false
      },
      {
        id: 4,
        title: 'Make You Feel My Love',
        artist: 'Adele',
        album: '19',
        duration: '3:32',
        category: 'love',
        mood: 'emotional',
        description: 'Versi yang menyentuh hati dari Bob Dylan',
        youtubeUrl: 'https://youtube.com/watch?v=0put0_a--Ng',
        spotifyUrl: 'https://open.spotify.com/track/3HxGSKh0mh8U2wQQgEPMIZ',
        addedBy: 'her',
        specialMoment: 'Saat kita sedih dan saling menenangkan',
        addedDate: '2024-01-25',
        playCount: 8,
        isFavorite: true
      },
      {
        id: 5,
        title: 'Count on Me',
        artist: 'Bruno Mars',
        album: 'Doo-Wops & Hooligans',
        duration: '3:17',
        category: 'friendship',
        mood: 'happy',
        description: 'Tentang persahabatan dan saling mendukung',
        youtubeUrl: 'https://youtube.com/watch?v=fe4EK4HSPkI',
        spotifyUrl: 'https://open.spotify.com/track/69DGnoTj5jONUcTUOgxr7s',
        addedBy: 'him',
        specialMoment: 'Mengingatkan kita bahwa kita sahabat juga',
        addedDate: '2024-02-01',
        playCount: 15,
        isFavorite: false
      },
      {
        id: 6,
        title: 'Can\'t Help Myself',
        artist: 'The Four Tops',
        album: 'Four Tops Second Album',
        duration: '2:44',
        category: 'classic',
        mood: 'upbeat',
        description: 'Lagu klasik yang selalu bikin happy',
        youtubeUrl: 'https://youtube.com/watch?v=s3bksUSPB4c',
        spotifyUrl: 'https://open.spotify.com/track/1U1NrZNXnlqxyDqY8yyc4N',
        addedBy: 'both',
        specialMoment: 'Road trip pertama kita',
        addedDate: '2024-01-30',
        playCount: 22,
        isFavorite: true
      }
    ];

    const samplePlaylists = [
      {
        id: 1,
        name: 'Our Love Songs ❤️',
        description: 'Lagu-lagu romantis untuk kita berdua',
        songs: [1, 2, 3, 4],
        createdBy: 'both',
        createdDate: '2024-01-15',
        totalDuration: '17:05'
      },
      {
        id: 2,
        name: 'Happy Vibes 😊',
        description: 'Lagu yang bikin mood jadi happy',
        songs: [5, 6],
        createdBy: 'him',
        createdDate: '2024-02-01',
        totalDuration: '6:01'
      }
    ];

    setSongs(sampleSongs);
    setPlaylists(samplePlaylists);
  }, []);

  const categories = {
    all: { label: 'Semua', color: '#6b7280' },
    love: { label: 'Cinta', color: '#e91e63' },
    friendship: { label: 'Persahabatan', color: '#2196f3' },
    classic: { label: 'Klasik', color: '#ff9800' },
    indie: { label: 'Indie', color: '#9c27b0' },
    pop: { label: 'Pop', color: '#4caf50' }
  };

  const moods = {
    romantic: { label: 'Romantis', color: '#e91e63' },
    happy: { label: 'Bahagia', color: '#4caf50' },
    sad: { label: 'Sedih', color: '#607d8b' },
    emotional: { label: 'Emosional', color: '#ff5722' },
    upbeat: { label: 'Energik', color: '#ff9800' },
    chill: { label: 'Santai', color: '#3f51b5' }
  };

  // Audio control functions
  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    // In real implementation, would load and play actual audio file
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    if (!currentPlaylist || currentPlaylist.songs.length === 0) return;
    
    const currentIndex = currentPlaylist.songs.findIndex(songId => songId === currentSong?.id);
    let nextIndex;
    
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * currentPlaylist.songs.length);
    } else {
      nextIndex = (currentIndex + 1) % currentPlaylist.songs.length;
    }
    
    const nextSongId = currentPlaylist.songs[nextIndex];
    const nextSong = songs.find(song => song.id === nextSongId);
    if (nextSong) playSong(nextSong);
  };

  const previousSong = () => {
    if (!currentPlaylist || currentPlaylist.songs.length === 0) return;
    
    const currentIndex = currentPlaylist.songs.findIndex(songId => songId === currentSong?.id);
    const prevIndex = currentIndex === 0 ? currentPlaylist.songs.length - 1 : currentIndex - 1;
    
    const prevSongId = currentPlaylist.songs[prevIndex];
    const prevSong = songs.find(song => song.id === prevSongId);
    if (prevSong) playSong(prevSong);
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleRepeat = () => {
    const modes = ['none', 'one', 'all'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleFavorite = (songId) => {
    setSongs(songs.map(song => 
      song.id === songId 
        ? { ...song, isFavorite: !song.isFavorite }
        : song
    ));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const addSong = () => {
    if (newSong.title && newSong.artist) {
      const song = {
        ...newSong,
        id: Date.now(),
        addedDate: new Date().toISOString().split('T')[0],
        playCount: 0,
        isFavorite: false
      };
      
      if (editingSong) {
        setSongs(songs.map(s => s.id === editingSong.id ? { ...song, id: editingSong.id } : s));
        setEditingSong(null);
      } else {
        setSongs([...songs, song]);
      }
      
      resetSongForm();
    }
  };

  const editSong = (song) => {
    setEditingSong(song);
    setNewSong(song);
    setIsAddingSong(true);
  };

  const deleteSong = (songId) => {
    setSongs(songs.filter(song => song.id !== songId));
    if (currentSong?.id === songId) {
      setCurrentSong(null);
      setIsPlaying(false);
    }
  };

  const resetSongForm = () => {
    setNewSong({
      title: '',
      artist: '',
      album: '',
      duration: '',
      category: 'love',
      mood: 'romantic',
      description: '',
      youtubeUrl: '',
      spotifyUrl: '',
      addedBy: 'both',
      specialMoment: ''
    });
    setIsAddingSong(false);
  };

  const addPlaylist = () => {
    if (newPlaylist.name) {
      const playlist = {
        ...newPlaylist,
        id: Date.now(),
        createdBy: 'user',
        createdDate: new Date().toISOString().split('T')[0],
        totalDuration: '0:00'
      };
      setPlaylists([...playlists, playlist]);
      setNewPlaylist({ name: '', description: '', songs: [] });
      setIsAddingPlaylist(false);
    }
  };

  const playPlaylist = (playlist) => {
    setCurrentPlaylist(playlist);
    if (playlist.songs.length > 0) {
      const firstSong = songs.find(song => song.id === playlist.songs[0]);
      if (firstSong) playSong(firstSong);
    }
  };

  const filteredSongs = songs.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         song.album.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || song.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-2">Galeri Musik Cinta 🎵</h1>
            <p className="text-purple-100 text-lg">
              Koleksi lagu-lagu yang mengiringi perjalanan cinta kita
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-200" size={20} />
              <input
                type="text"
                placeholder="Cari lagu, artis, atau album..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-purple-200 focus:bg-white/30 focus:border-white/50 focus:outline-none"
              />
            </div>

            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:bg-white/30 focus:border-white/50 focus:outline-none"
              >
                {Object.entries(categories).map(([key, cat]) => (
                  <option key={key} value={key} className="text-gray-800">{cat.label}</option>
                ))}
              </select>

              <button
                onClick={() => setIsAddingSong(true)}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
              >
                <Plus size={20} />
                Tambah Lagu
              </button>

              <button
                onClick={() => setIsAddingPlaylist(true)}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
              >
                <Music size={20} />
                Buat Playlist
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Playlists */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Playlist</h3>
              <div className="space-y-3">
                {playlists.map((playlist) => (
                  <div
                    key={playlist.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      currentPlaylist?.id === playlist.id
                        ? 'bg-purple-100 border-2 border-purple-300'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => playPlaylist(playlist)}
                  >
                    <h4 className="font-medium text-gray-800 mb-1">{playlist.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{playlist.description}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{playlist.songs.length} lagu</span>
                      <span>{playlist.totalDuration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Statistik</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Lagu</span>
                  <span className="font-semibold text-purple-600">{songs.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Playlist</span>
                  <span className="font-semibold text-purple-600">{playlists.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Favorit</span>
                  <span className="font-semibold text-purple-600">
                    {songs.filter(song => song.isFavorite).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Play</span>
                  <span className="font-semibold text-purple-600">
                    {songs.reduce((sum, song) => sum + song.playCount, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Songs */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">
                    Lagu ({filteredSongs.length})
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={toggleShuffle}
                      className={`p-2 rounded-lg transition-all ${
                        isShuffled ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <Shuffle size={20} />
                    </button>
                    <button
                      onClick={toggleRepeat}
                      className={`p-2 rounded-lg transition-all ${
                        repeatMode !== 'none' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <Repeat size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Songs List */}
              <div className="overflow-auto max-h-96">
                {filteredSongs.map((song, index) => (
                  <div
                    key={song.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-all cursor-pointer ${
                      currentSong?.id === song.id ? 'bg-purple-50 border-purple-200' : ''
                    }`}
                    onClick={() => playSong(song)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-white font-bold">
                        {currentSong?.id === song.id && isPlaying ? (
                          <Pause size={20} />
                        ) : (
                          <Play size={20} />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-800">{song.title}</h4>
                          {song.isFavorite && <Heart className="text-red-500" size={16} fill="currentColor" />}
                        </div>
                        <p className="text-gray-600 text-sm">{song.artist} • {song.album}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span 
                            className="text-xs px-2 py-1 rounded-full text-white"
                            style={{ backgroundColor: categories[song.category].color }}
                          >
                            {categories[song.category].label}
                          </span>
                          <span 
                            className="text-xs px-2 py-1 rounded-full text-white"
                            style={{ backgroundColor: moods[song.mood].color }}
                          >
                            {moods[song.mood].label}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock size={12} />
                            {song.duration}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Headphones size={12} />
                            {song.playCount}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex gap-1 mb-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(song.id);
                            }}
                            className={`p-2 rounded-lg transition-all ${
                              song.isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'
                            }`}
                          >
                            <Heart size={16} fill={song.isFavorite ? 'currentColor' : 'none'} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              editSong(song);
                            }}
                            className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteSong(song.id);
                            }}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User size={12} />
                            {song.addedBy === 'both' ? 'Berdua' : song.addedBy === 'him' ? 'Dia' : 'Saya'}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Calendar size={12} />
                            {new Date(song.addedDate).toLocaleDateString('id-ID')}
                          </div>
                        </div>
                      </div>
                    </div>

                    {song.specialMoment && (
                      <div className="mt-3 p-2 bg-purple-50 rounded-lg">
                        <p className="text-sm text-purple-700 italic">💫 {song.specialMoment}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredSongs.length === 0 && (
                <div className="text-center py-12">
                  <Music size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Tidak ada lagu yang ditemukan
                  </h3>
                  <p className="text-gray-500">
                    Coba ubah kata kunci pencarian atau filter kategori
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Now Playing Bar */}
        {currentSong && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4">
                {/* Song Info */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-white">
                    <Music size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{currentSong.title}</h4>
                    <p className="text-gray-600 text-sm">{currentSong.artist}</p>
                  </div>
                  <button
                    onClick={() => toggleFavorite(currentSong.id)}
                    className={`p-2 rounded-lg transition-all ${
                      currentSong.isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart size={16} fill={currentSong.isFavorite ? 'currentColor' : 'none'} />
                  </button>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                  <button onClick={previousSong} className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
                    <SkipBack size={20} />
                  </button>
                  <button 
                    onClick={togglePlayPause}
                    className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button onClick={nextSong} className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
                    <SkipForward size={20} />
                  </button>
                </div>

                {/* Volume */}
                <div className="flex items-center gap-2">
                  <button onClick={toggleMute} className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
                    {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20"
                  />
                </div>

                {/* Progress */}
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-sm text-gray-500">{formatTime(currentTime)}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-1">
                    <div 
                      className="bg-purple-600 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Song Modal */}
        {isAddingSong && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">
                  {editingSong ? 'Edit Lagu' : 'Tambah Lagu Baru'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Judul lagu"
                    value={newSong.title}
                    onChange={(e) => setNewSong({...newSong, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  
                  <input
                    type="text"
                    placeholder="Artis"
                    value={newSong.artist}
                    onChange={(e) => setNewSong({...newSong, artist: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />

                  <input
                    type="text"
                    placeholder="Album"
                    value={newSong.album}
                    onChange={(e) => setNewSong({...newSong, album: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />

                  <input
                    type="text"
                    placeholder="Durasi (mis: 4:23)"
                    value={newSong.duration}
                    onChange={(e) => setNewSong({...newSong, duration: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />

                  <select
                    value={newSong.category}
                    onChange={(e) => setNewSong({...newSong, category: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {Object.entries(categories).filter(([key]) => key !== 'all').map(([key, cat]) => (
                      <option key={key} value={key}>{cat.label}</option>
                    ))}
                  </select>

                  <select
                    value={newSong.mood}
                    onChange={(e) => setNewSong({...newSong, mood: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {Object.entries(moods).map(([key, mood]) => (
                      <option key={key} value={key}>{mood.label}</option>
                    ))}
                  </select>

                  <input
                    type="url"
                    placeholder="YouTube URL (opsional)"
                    value={newSong.youtubeUrl}
                    onChange={(e) => setNewSong({...newSong, youtubeUrl: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />

                  <input
                    type="url"
                    placeholder="Spotify URL (opsional)"
                    value={newSong.spotifyUrl}
                    onChange={(e) => setNewSong({...newSong, spotifyUrl: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />

                  <select
                    value={newSong.addedBy}
                    onChange={(e) => setNewSong({...newSong, addedBy: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="both">Berdua</option>
                    <option value="him">Dia</option>
                    <option value="her">Saya</option>
                  </select>

                  <div className="md:col-span-2">
                    <textarea
                      placeholder="Deskripsi lagu..."
                      value={newSong.description}
                      onChange={(e) => setNewSong({...newSong, description: e.target.value})}
                      rows={2}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <textarea
                      placeholder="Momen spesial terkait lagu ini..."
                      value={newSong.specialMoment}
                      onChange={(e) => setNewSong({...newSong, specialMoment: e.target.value})}
                      rows={2}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setIsAddingSong(false);
                      setEditingSong(null);
                      resetSongForm();
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={addSong}
                    disabled={!newSong.title || !newSong.artist}
                    className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                      newSong.title && newSong.artist
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {editingSong ? 'Update Lagu' : 'Simpan Lagu'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Playlist Modal */}
        {isAddingPlaylist && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Buat Playlist Baru</h2>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nama playlist"
                    value={newPlaylist.name}
                    onChange={(e) => setNewPlaylist({...newPlaylist, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  
                  <textarea
                    placeholder="Deskripsi playlist..."
                    value={newPlaylist.description}
                    onChange={(e) => setNewPlaylist({...newPlaylist, description: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setIsAddingPlaylist(false);
                      setNewPlaylist({ name: '', description: '', songs: [] });
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={addPlaylist}
                    disabled={!newPlaylist.name}
                    className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                      newPlaylist.name
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Buat Playlist
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

export default MusicGallery;