import React, { useState, useEffect } from 'react';
import { GamepadIcon, Trophy, Star, Heart, Clock, RotateCcw, Play, Pause, Medal, Target, Sparkles, Gift, Shuffle, ChevronRight, ChevronLeft, Home } from 'lucide-react';

const GameMemory = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameState, setGameState] = useState('menu'); // menu, playing, paused, completed
  const [gameStats, setGameStats] = useState({
    gamesPlayed: 0,
    totalScore: 0,
    bestStreak: 0,
    achievements: []
  });

  // Memory Card Game State
  const [memoryCards, setMemoryCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameTimer, setGameTimer] = useState(null);

  // Love Quiz Game State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  // Word Association Game State
  const [wordChain, setWordChain] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('player1');
  const [wordTimer, setWordTimer] = useState(30);

  // Story Building Game State
  const [storyParts, setStoryParts] = useState([]);
  const [currentTurn, setCurrentTurn] = useState('player1');

  const games = [
    {
      id: 'memory-cards',
      title: 'Memory Cards Kenangan',
      description: 'Cocokkan kartu-kartu berisi foto dan momen spesial kalian',
      icon: Heart,
      difficulty: 'Medium',
      players: '1-2 Players',
      time: '5-10 menit',
      color: '#e91e63'
    },
    {
      id: 'love-quiz',
      title: 'Love Quiz Challenge',
      description: 'Quiz cepat tentang pasangan dengan timer',
      icon: Trophy,
      difficulty: 'Easy',
      players: '2 Players',
      time: '10-15 menit',
      color: '#2196f3'
    },
    {
      id: 'word-association',
      title: 'Word Association',
      description: 'Sambung kata yang berhubungan dengan hubungan kalian',
      icon: Sparkles,
      difficulty: 'Easy',
      players: '2 Players',
      time: '15-20 menit',
      color: '#4caf50'
    },
    {
      id: 'story-builder',
      title: 'Story Builder',
      description: 'Buat cerita romantis bersama-sama secara bergantian',
      icon: Gift,
      difficulty: 'Easy',
      players: '2 Players',
      time: '20-30 menit',
      color: '#ff9800'
    }
  ];

  // Memory Cards Data
  const memoryCardsData = [
    { id: 1, content: '💕', type: 'emoji', pair: 1 },
    { id: 2, content: '💕', type: 'emoji', pair: 1 },
    { id: 3, content: '🌹', type: 'emoji', pair: 2 },
    { id: 4, content: '🌹', type: 'emoji', pair: 2 },
    { id: 5, content: '💍', type: 'emoji', pair: 3 },
    { id: 6, content: '💍', type: 'emoji', pair: 3 },
    { id: 7, content: '🏠', type: 'emoji', pair: 4 },
    { id: 8, content: '🏠', type: 'emoji', pair: 4 },
    { id: 9, content: '🎂', type: 'emoji', pair: 5 },
    { id: 10, content: '🎂', type: 'emoji', pair: 5 },
    { id: 11, content: '✈️', type: 'emoji', pair: 6 },
    { id: 12, content: '✈️', type: 'emoji', pair: 6 },
    { id: 13, content: '💐', type: 'emoji', pair: 7 },
    { id: 14, content: '💐', type: 'emoji', pair: 7 },
    { id: 15, content: '🎵', type: 'emoji', pair: 8 },
    { id: 16, content: '🎵', type: 'emoji', pair: 8 }
  ];

  // Love Quiz Questions
  const loveQuizQuestions = [
    {
      question: "Apa makanan favorit pasanganmu?",
      options: ["Pizza", "Sushi", "Rendang", "Mie Ayam"],
      correct: 2,
      timer: 15
    },
    {
      question: "Kapan ulang tahun pasanganmu?",
      options: ["15 September", "20 Oktober", "12 November", "5 Desember"],
      correct: 0,
      timer: 10
    },
    {
      question: "Apa warna favorit pasanganmu?",
      options: ["Biru", "Pink", "Ungu", "Hijau"],
      correct: 2,
      timer: 10
    },
    {
      question: "Di mana kalian pertama kali bertemu?",
      options: ["Kampus", "Kafe", "Mall", "Taman"],
      correct: 0,
      timer: 15
    },
    {
      question: "Apa hobi favorit pasanganmu?",
      options: ["Membaca", "Menggambar", "Menyanyi", "Memasak"],
      correct: 1,
      timer: 12
    }
  ];

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && selectedGame?.id === 'memory-cards') {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      setGameTimer(interval);
      return () => clearInterval(interval);
    } else if (gameTimer) {
      clearInterval(gameTimer);
      setGameTimer(null);
    }
  }, [gameState, selectedGame]);

  // Initialize Memory Cards Game
  const initMemoryGame = () => {
    const shuffled = [...memoryCardsData].sort(() => Math.random() - 0.5);
    setMemoryCards(shuffled);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTimer(0);
    setGameState('playing');
  };

  // Handle Memory Card Click
  const handleCardClick = (cardId) => {
    if (flippedCards.length === 2 || flippedCards.includes(cardId) || matchedCards.includes(cardId)) {
      return;
    }

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      const firstCard = memoryCards.find(card => card.id === first);
      const secondCard = memoryCards.find(card => card.id === second);

      if (firstCard.pair === secondCard.pair) {
        setMatchedCards([...matchedCards, first, second]);
        setFlippedCards([]);
        
        // Check if game is completed
        if (matchedCards.length + 2 === memoryCards.length) {
          setGameState('completed');
          setGameStats(prev => ({
            ...prev,
            gamesPlayed: prev.gamesPlayed + 1,
            totalScore: prev.totalScore + calculateScore()
          }));
        }
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Calculate Score
  const calculateScore = () => {
    const timeBonus = Math.max(0, 300 - timer); // Bonus for faster completion
    const moveBonus = Math.max(0, (32 - moves) * 10); // Bonus for fewer moves
    return timeBonus + moveBonus;
  };

  // Initialize Love Quiz
  const initLoveQuiz = () => {
    setCurrentQuestion(0);
    setQuizScore(0);
    setSelectedAnswers([]);
    setGameState('playing');
  };

  // Handle Quiz Answer
  const handleQuizAnswer = (answerIndex) => {
    const newAnswers = [...selectedAnswers, answerIndex];
    setSelectedAnswers(newAnswers);

    if (answerIndex === loveQuizQuestions[currentQuestion].correct) {
      setQuizScore(quizScore + 10);
    }

    if (currentQuestion < loveQuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameState('completed');
      setGameStats(prev => ({
        ...prev,
        gamesPlayed: prev.gamesPlayed + 1,
        totalScore: prev.totalScore + quizScore + 10
      }));
    }
  };

  // Format Time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Start Game
  const startGame = (game) => {
    setSelectedGame(game);
    
    switch (game.id) {
      case 'memory-cards':
        initMemoryGame();
        break;
      case 'love-quiz':
        initLoveQuiz();
        break;
      case 'word-association':
        setWordChain([]);
        setCurrentPlayer('player1');
        setWordTimer(30);
        setGameState('playing');
        break;
      case 'story-builder':
        setStoryParts([]);
        setCurrentTurn('player1');
        setGameState('playing');
        break;
      default:
        setGameState('playing');
    }
  };

  // Reset Game
  const resetGame = () => {
    if (selectedGame?.id === 'memory-cards') {
      initMemoryGame();
    } else if (selectedGame?.id === 'love-quiz') {
      initLoveQuiz();
    }
  };

  // Back to Menu
  const backToMenu = () => {
    setSelectedGame(null);
    setGameState('menu');
    if (gameTimer) {
      clearInterval(gameTimer);
      setGameTimer(null);
    }
  };

  // Render Game Menu
  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Game Kenangan 🎮
            </h1>
            <p className="text-gray-600 text-lg">
              Bermain sambil mengenang momen-momen indah bersama
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{gameStats.gamesPlayed}</div>
              <div className="text-gray-600 text-sm">Games Played</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{gameStats.totalScore}</div>
              <div className="text-gray-600 text-sm">Total Score</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg text-center">
              <div className="text-2xl font-bold text-pink-600">{gameStats.bestStreak}</div>
              <div className="text-gray-600 text-sm">Best Streak</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg text-center">
              <div className="text-2xl font-bold text-green-600">{gameStats.achievements.length}</div>
              <div className="text-gray-600 text-sm">Achievements</div>
            </div>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {games.map((game) => {
              const IconComponent = game.icon;
              
              return (
                <div
                  key={game.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  onClick={() => startGame(game)}
                >
                  <div 
                    className="p-6 text-white"
                    style={{ backgroundColor: game.color }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <IconComponent size={24} />
                      <h3 className="text-xl font-bold">{game.title}</h3>
                    </div>
                    <p className="text-white/90">{game.description}</p>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Target size={14} />
                          {game.difficulty}
                        </span>
                        <span className="flex items-center gap-1">
                          <GamepadIcon size={14} />
                          {game.players}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {game.time}
                        </span>
                      </div>
                    </div>

                    <button
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
                    >
                      <Play size={20} />
                      Main Sekarang
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Render Memory Cards Game
  if (selectedGame?.id === 'memory-cards') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Game Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{selectedGame.title}</h2>
                <p className="text-gray-600">Cocokkan semua kartu untuk menang!</p>
              </div>
              <div className="flex gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">{moves}</div>
                  <div className="text-sm text-gray-600">Moves</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{formatTime(timer)}</div>
                  <div className="text-sm text-gray-600">Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pink-600">{matchedCards.length / 2}</div>
                  <div className="text-sm text-gray-600">Pairs</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={backToMenu}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Home size={16} />
                Menu
              </button>
              <button
                onClick={resetGame}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <RotateCcw size={16} />
                Reset
              </button>
            </div>
          </div>

          {/* Game Board */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-4 gap-3">
              {memoryCards.map((card) => {
                const isFlipped = flippedCards.includes(card.id) || matchedCards.includes(card.id);
                const isMatched = matchedCards.includes(card.id);
                
                return (
                  <div
                    key={card.id}
                    className={`aspect-square rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      isFlipped
                        ? isMatched
                          ? 'bg-green-400 text-white'
                          : 'bg-purple-400 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    onClick={() => handleCardClick(card.id)}
                  >
                    <div className="w-full h-full flex items-center justify-center text-2xl font-bold">
                      {isFlipped ? card.content : '?'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Game Completed */}
          {gameState === 'completed' && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-8 text-center max-w-md">
                <Trophy size={64} className="mx-auto text-yellow-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Selamat!</h3>
                <p className="text-gray-600 mb-4">Kamu berhasil mencocokkan semua kartu!</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600">{moves}</div>
                    <div className="text-sm text-gray-600">Moves</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">{formatTime(timer)}</div>
                    <div className="text-sm text-gray-600">Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600">{calculateScore()}</div>
                    <div className="text-sm text-gray-600">Score</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={resetGame}
                    className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Main Lagi
                  </button>
                  <button
                    onClick={backToMenu}
                    className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Menu
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Render Love Quiz Game
  if (selectedGame?.id === 'love-quiz') {
    const question = loveQuizQuestions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
        <div className="max-w-2xl mx-auto">
          {/* Game Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{selectedGame.title}</h2>
              <div className="flex gap-4">
                <button
                  onClick={backToMenu}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <Home size={16} />
                  Menu
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold text-purple-600">
                Pertanyaan {currentQuestion + 1} dari {loveQuizQuestions.length}
              </div>
              <div className="text-lg font-semibold text-blue-600">
                Score: {quizScore}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / loveQuizQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              {question.question}
            </h3>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleQuizAnswer(index)}
                  className="w-full p-4 text-left bg-gray-50 hover:bg-purple-50 border-2 border-transparent hover:border-purple-300 rounded-lg transition-all"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 mr-3 flex items-center justify-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full opacity-0"></div>
                    </div>
                    {option}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quiz Completed */}
          {gameState === 'completed' && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-8 text-center max-w-md">
                <Medal size={64} className="mx-auto text-yellow-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Quiz Selesai!</h3>
                <p className="text-gray-600 mb-4">
                  Skor akhir: <span className="font-bold text-purple-600">{quizScore}</span>
                </p>
                <p className="text-gray-600 mb-6">
                  Kamu menjawab {selectedAnswers.filter((answer, index) => answer === loveQuizQuestions[index].correct).length} dari {loveQuizQuestions.length} pertanyaan dengan benar!
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => initLoveQuiz()}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Main Lagi
                  </button>
                  <button
                    onClick={backToMenu}
                    className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Menu
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Render Other Games (Simple placeholder)
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedGame?.title}</h2>
          <p className="text-gray-600 mb-6">{selectedGame?.description}</p>
          <p className="text-lg text-purple-600 mb-6">🚧 Game ini sedang dalam pengembangan! 🚧</p>
          
          <button
            onClick={backToMenu}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Kembali ke Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameMemory;