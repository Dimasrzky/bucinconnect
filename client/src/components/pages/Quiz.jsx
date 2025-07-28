import React, { useState, useEffect } from 'react';
import { Heart, Brain, Trophy, Star, RefreshCw, Plus, Edit, Trash2, Clock, Check, X, ChevronRight, Award, Target } from 'lucide-react';

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [isAddingQuiz, setIsAddingQuiz] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [newQuiz, setNewQuiz] = useState({
    title: '',
    description: '',
    category: 'personality',
    difficulty: 'easy',
    questions: []
  });
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: ''
  });

  // Sample quiz data
  useEffect(() => {
    const sampleQuizzes = [
      {
        id: 1,
        title: 'Seberapa Kenal Kamu Denganku?',
        description: 'Quiz untuk menguji seberapa dalam kamu mengenal pasanganmu',
        category: 'personality',
        difficulty: 'medium',
        createdBy: 'her',
        playCount: 15,
        bestScore: 80,
        questions: [
          {
            id: 1,
            question: 'Apa makanan favoritku?',
            options: ['Nasi Gudeg', 'Mie Ayam', 'Rendang', 'Sate Ayam'],
            correctAnswer: 2,
            explanation: 'Aku paling suka rendang karena rasanya yang kaya rempah!'
          },
          {
            id: 2,
            question: 'Film genre apa yang paling aku suka?',
            options: ['Horror', 'Romance', 'Action', 'Comedy'],
            correctAnswer: 1,
            explanation: 'Aku suka film romance karena bisa bikin baper dan mellow'
          },
          {
            id: 3,
            question: 'Apa warna favoritku?',
            options: ['Biru', 'Pink', 'Ungu', 'Hijau'],
            correctAnswer: 2,
            explanation: 'Ungu adalah warna favoritku karena terlihat elegant dan mystical'
          },
          {
            id: 4,
            question: 'Kapan ulang tahunku?',
            options: ['15 September', '20 Oktober', '12 November', '5 Desember'],
            correctAnswer: 0,
            explanation: 'Jangan sampai lupa ya tanggal lahirku! 😊'
          },
          {
            id: 5,
            question: 'Apa hobiiku di waktu senggang?',
            options: ['Membaca', 'Menggambar', 'Menyanyi', 'Memasak'],
            correctAnswer: 1,
            explanation: 'Aku suka menggambar karena bisa mengekspresikan kreativitas'
          }
        ]
      },
      {
        id: 2,
        title: 'Kenangan Kita Berdua',
        description: 'Quiz tentang momen-momen spesial dalam hubungan kita',
        category: 'memories',
        difficulty: 'easy',
        createdBy: 'him',
        playCount: 12,
        bestScore: 100,
        questions: [
          {
            id: 1,
            question: 'Di mana kita pertama kali bertemu?',
            options: ['Kafe', 'Kampus', 'Mall', 'Taman'],
            correctAnswer: 1,
            explanation: 'Kita pertama bertemu di kampus saat orientasi mahasiswa baru'
          },
          {
            id: 2,
            question: 'Tanggal berapa kita jadian?',
            options: ['14 Februari', '15 Februari', '16 Februari', '17 Februari'],
            correctAnswer: 0,
            explanation: 'Hari Valentine yang spesial untuk kita berdua!'
          },
          {
            id: 3,
            question: 'Tempat kencan pertama kita?',
            options: ['Bioskop', 'Restoran', 'Taman', 'Museum'],
            correctAnswer: 0,
            explanation: 'Kita nonton film romantis di bioskop dan sharing popcorn'
          },
          {
            id: 4,
            question: 'Lagu apa yang sering kita dengar bareng?',
            options: ['Perfect - Ed Sheeran', 'All of Me - John Legend', 'Thinking Out Loud', 'A Thousand Years'],
            correctAnswer: 1,
            explanation: 'All of Me selalu jadi lagu favorit kita!'
          }
        ]
      },
      {
        id: 3,
        title: 'Rencana Masa Depan',
        description: 'Quiz tentang impian dan rencana kita di masa depan',
        category: 'future',
        difficulty: 'hard',
        createdBy: 'both',
        playCount: 8,
        bestScore: 75,
        questions: [
          {
            id: 1,
            question: 'Berapa anak yang kita inginkan?',
            options: ['1', '2', '3', '4'],
            correctAnswer: 1,
            explanation: 'Kita sepakat ingin punya 2 anak yang lucu dan sehat'
          },
          {
            id: 2,
            question: 'Di mana kita ingin tinggal nanti?',
            options: ['Jakarta', 'Bali', 'Yogyakarta', 'Bandung'],
            correctAnswer: 2,
            explanation: 'Yogyakarta dengan suasana yang tenang dan budayanya'
          },
          {
            id: 3,
            question: 'Umur berapa kita ingin menikah?',
            options: ['25', '26', '27', '28'],
            correctAnswer: 2,
            explanation: 'Di umur 27 kita sudah siap secara finansial dan mental'
          }
        ]
      }
    ];
    setQuizzes(sampleQuizzes);
  }, []);

  const categories = {
    personality: { label: 'Kepribadian', icon: Heart, color: '#e91e63' },
    memories: { label: 'Kenangan', icon: Star, color: '#3f51b5' },
    future: { label: 'Masa Depan', icon: Target, color: '#4caf50' },
    preferences: { label: 'Preferensi', icon: Brain, color: '#ff9800' }
  };

  const difficulties = {
    easy: { label: 'Mudah', color: '#4caf50' },
    medium: { label: 'Sedang', color: '#ff9800' },
    hard: { label: 'Sulit', color: '#f44336' }
  };

  const startQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer('');
    setShowResult(false);
    setQuizResult(null);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...answers, {
      questionId: currentQuiz.questions[currentQuestionIndex].id,
      selectedAnswer: selectedAnswer,
      correctAnswer: currentQuiz.questions[currentQuestionIndex].correctAnswer,
      isCorrect: selectedAnswer === currentQuiz.questions[currentQuestionIndex].correctAnswer
    }];
    
    setAnswers(newAnswers);

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    } else {
      // Quiz selesai
      const correctAnswers = newAnswers.filter(answer => answer.isCorrect).length;
      const score = Math.round((correctAnswers / currentQuiz.questions.length) * 100);
      
      setQuizResult({
        score: score,
        correctAnswers: correctAnswers,
        totalQuestions: currentQuiz.questions.length,
        answers: newAnswers
      });
      
      // Update best score
      setQuizzes(prevQuizzes => 
        prevQuizzes.map(quiz => 
          quiz.id === currentQuiz.id 
            ? { ...quiz, bestScore: Math.max(quiz.bestScore || 0, score), playCount: quiz.playCount + 1 }
            : quiz
        )
      );
      
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer('');
    setShowResult(false);
    setQuizResult(null);
  };

  const addQuestion = () => {
    if (newQuestion.question && newQuestion.options.every(option => option.trim() !== '')) {
      setNewQuiz({
        ...newQuiz,
        questions: [...newQuiz.questions, { ...newQuestion, id: Date.now() }]
      });
      setNewQuestion({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: ''
      });
    }
  };

  const removeQuestion = (index) => {
    const updatedQuestions = newQuiz.questions.filter((_, i) => i !== index);
    setNewQuiz({ ...newQuiz, questions: updatedQuestions });
  };

  const saveQuiz = () => {
    if (newQuiz.title && newQuiz.description && newQuiz.questions.length > 0) {
      const quiz = {
        ...newQuiz,
        id: Date.now(),
        createdBy: 'user',
        playCount: 0,
        bestScore: 0
      };
      
      if (editingQuiz) {
        setQuizzes(quizzes.map(q => q.id === editingQuiz.id ? { ...quiz, id: editingQuiz.id } : q));
        setEditingQuiz(null);
      } else {
        setQuizzes([...quizzes, quiz]);
      }
      
      resetQuizForm();
    }
  };

  const editQuiz = (quiz) => {
    setEditingQuiz(quiz);
    setNewQuiz(quiz);
    setIsAddingQuiz(true);
  };

  const deleteQuiz = (quizId) => {
    setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
  };

  const resetQuizForm = () => {
    setNewQuiz({
      title: '',
      description: '',
      category: 'personality',
      difficulty: 'easy',
      questions: []
    });
    setNewQuestion({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    });
    setIsAddingQuiz(false);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score) => {
    if (score >= 90) return '🏆 Luar biasa! Kamu benar-benar mengenal pasanganmu!';
    if (score >= 80) return '⭐ Bagus sekali! Kamu cukup mengenal pasanganmu';
    if (score >= 60) return '👍 Tidak buruk, masih ada yang perlu dipelajari';
    if (score >= 40) return '😅 Masih perlu belajar lebih banyak tentang pasanganmu';
    return '💔 Sepertinya kalian perlu lebih banyak quality time bersama';
  };

  // Quiz Playing Mode
  if (currentQuiz && !showResult) {
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">{currentQuiz.title}</h1>
              <button
                onClick={resetQuiz}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Pertanyaan {currentQuestionIndex + 1} dari {currentQuiz.questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 bg-gray-50 hover:border-purple-300 hover:bg-purple-25'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                      selectedAnswer === index
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswer === index && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    {option}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === ''}
              className={`w-full mt-6 py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all ${
                selectedAnswer !== ''
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentQuestionIndex < currentQuiz.questions.length - 1 ? 'Pertanyaan Selanjutnya' : 'Selesai'}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Result Mode
  if (showResult && quizResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
        <div className="max-w-3xl mx-auto">
          {/* Result Header */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-6">
            <div className="mb-4">
              <Trophy size={64} className="mx-auto text-yellow-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Selesai!</h1>
            <p className="text-gray-600 mb-4">{currentQuiz.title}</p>
            
            <div className={`text-6xl font-bold mb-2 ${getScoreColor(quizResult.score)}`}>
              {quizResult.score}%
            </div>
            
            <p className="text-lg text-gray-600 mb-4">
              {quizResult.correctAnswers} dari {quizResult.totalQuestions} jawaban benar
            </p>
            
            <p className="text-lg font-medium text-gray-700 mb-6">
              {getScoreMessage(quizResult.score)}
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => startQuiz(currentQuiz)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:shadow-lg transition-all"
              >
                <RefreshCw size={20} />
                Main Lagi
              </button>
              <button
                onClick={resetQuiz}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
              >
                Kembali
              </button>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Review Jawaban</h3>
            <div className="space-y-4">
              {currentQuiz.questions.map((question, index) => {
                const userAnswer = quizResult.answers[index];
                const isCorrect = userAnswer.isCorrect;
                
                return (
                  <div key={question.id} className={`p-4 rounded-lg border-l-4 ${
                    isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                  }`}>
                    <div className="flex items-start gap-3">
                      {isCorrect ? 
                        <Check className="text-green-600 mt-1" size={20} /> : 
                        <X className="text-red-600 mt-1" size={20} />
                      }
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          {index + 1}. {question.question}
                        </h4>
                        <p className={`mb-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          Jawaban kamu: {question.options[userAnswer.selectedAnswer]}
                        </p>
                        {!isCorrect && (
                          <p className="text-green-700 mb-2">
                            Jawaban benar: {question.options[question.correctAnswer]}
                          </p>
                        )}
                        {question.explanation && (
                          <p className="text-gray-600 text-sm italic">
                            💡 {question.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Quiz List Mode
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Quiz Tentang Pasangan 🧠
          </h1>
          <p className="text-gray-600 text-lg">
            Uji seberapa dalam kalian saling mengenal!
          </p>
        </div>

        {/* Add Quiz Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsAddingQuiz(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Plus size={20} />
            Buat Quiz Baru
          </button>
        </div>

        {/* Quiz Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {quizzes.map((quiz) => {
            const CategoryIcon = categories[quiz.category].icon;
            
            return (
              <div
                key={quiz.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {/* Header */}
                <div 
                  className="p-4 text-white"
                  style={{ backgroundColor: categories[quiz.category].color }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <CategoryIcon size={20} />
                      <span className="text-sm font-medium">{categories[quiz.category].label}</span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => editQuiz(quiz)}
                        className="text-white/80 hover:text-white transition-colors p-1"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteQuiz(quiz.id)}
                        className="text-white/80 hover:text-white transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{quiz.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{quiz.description}</p>

                  {/* Stats */}
                  <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                    <span>{quiz.questions.length} pertanyaan</span>
                    <span 
                      className="px-2 py-1 rounded-full text-white text-xs"
                      style={{ backgroundColor: difficulties[quiz.difficulty].color }}
                    >
                      {difficulties[quiz.difficulty].label}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>Dimainkan {quiz.playCount}x</span>
                    </div>
                    {quiz.bestScore > 0 && (
                      <div className="flex items-center gap-1">
                        <Award size={14} />
                        <span>Best: {quiz.bestScore}%</span>
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-gray-500 mb-4">
                    Dibuat oleh: {quiz.createdBy === 'both' ? 'Berdua' : quiz.createdBy === 'him' ? 'Dia' : 'Saya'}
                  </div>

                  <button
                    onClick={() => startQuiz(quiz)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all font-medium"
                  >
                    Mulai Quiz
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add/Edit Quiz Modal */}
        {isAddingQuiz && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">
                  {editingQuiz ? 'Edit Quiz' : 'Buat Quiz Baru'}
                </h2>
                
                {/* Quiz Basic Info */}
                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder="Judul quiz"
                    value={newQuiz.title}
                    onChange={(e) => setNewQuiz({...newQuiz, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  
                  <textarea
                    placeholder="Deskripsi quiz"
                    value={newQuiz.description}
                    onChange={(e) => setNewQuiz({...newQuiz, description: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={newQuiz.category}
                      onChange={(e) => setNewQuiz({...newQuiz, category: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {Object.entries(categories).map(([key, cat]) => (
                        <option key={key} value={key}>{cat.label}</option>
                      ))}
                    </select>

                    <select
                      value={newQuiz.difficulty}
                      onChange={(e) => setNewQuiz({...newQuiz, difficulty: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {Object.entries(difficulties).map(([key, diff]) => (
                        <option key={key} value={key}>{diff.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Questions Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Pertanyaan ({newQuiz.questions.length})</h3>
                  
                  {/* Add Question Form */}
                  <div className="border border-gray-200 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-3">Tambah Pertanyaan Baru</h4>
                    
                    <input
                      type="text"
                      placeholder="Pertanyaan"
                      value={newQuestion.question}
                      onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {newQuestion.options.map((option, index) => (
                        <input
                          key={index}
                          type="text"
                          placeholder={`Pilihan ${index + 1}`}
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...newQuestion.options];
                            newOptions[index] = e.target.value;
                            setNewQuestion({...newQuestion, options: newOptions});
                          }}
                          className="p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      ))}
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Jawaban Benar:</label>
                      <select
                        value={newQuestion.correctAnswer}
                        onChange={(e) => setNewQuestion({...newQuestion, correctAnswer: parseInt(e.target.value)})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {newQuestion.options.map((option, index) => (
                          <option key={index} value={index}>Pilihan {index + 1} - {option || 'Kosong'}</option>
                        ))}
                      </select>
                    </div>

                    <input
                      type="text"
                      placeholder="Penjelasan (opsional)"
                      value={newQuestion.explanation}
                      onChange={(e) => setNewQuestion({...newQuestion, explanation: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />

                    <button
                      onClick={addQuestion}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Tambah Pertanyaan
                    </button>
                  </div>

                  {/* Questions List */}
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {newQuiz.questions.map((question, index) => (
                      <div key={question.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-800 mb-1">
                              {index + 1}. {question.question}
                            </h5>
                            <div className="text-sm text-gray-600">
                              <div className="grid grid-cols-2 gap-1 mb-1">
                                {question.options.map((option, optIndex) => (
                                  <span 
                                    key={optIndex}
                                    className={`${optIndex === question.correctAnswer ? 'text-green-600 font-medium' : ''}`}
                                  >
                                    {optIndex + 1}. {option}
                                  </span>
                                ))}
                              </div>
                              {question.explanation && (
                                <p className="text-gray-500 italic text-xs mt-1">
                                  💡 {question.explanation}
                                </p>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => removeQuestion(index)}
                            className="text-red-500 hover:text-red-700 transition-colors ml-2"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setIsAddingQuiz(false);
                      setEditingQuiz(null);
                      resetQuizForm();
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={saveQuiz}
                    disabled={!newQuiz.title || !newQuiz.description || newQuiz.questions.length === 0}
                    className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                      newQuiz.title && newQuiz.description && newQuiz.questions.length > 0
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {editingQuiz ? 'Update Quiz' : 'Simpan Quiz'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {quizzes.length === 0 && (
          <div className="text-center py-12">
            <Brain size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Belum ada quiz
            </h3>
            <p className="text-gray-500">
              Mulai buat quiz untuk menguji seberapa kenal kalian satu sama lain!
            </p>
          </div>
        )}

        {/* Statistics */}
        {quizzes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{quizzes.length}</div>
              <div className="text-gray-600 text-sm">Total Quiz</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {quizzes.reduce((sum, quiz) => sum + quiz.questions.length, 0)}
              </div>
              <div className="text-gray-600 text-sm">Total Pertanyaan</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg text-center">
              <div className="text-2xl font-bold text-purple-600">
                {quizzes.reduce((sum, quiz) => sum + quiz.playCount, 0)}
              </div>
              <div className="text-gray-600 text-sm">Total Dimainkan</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg text-center">
              <div className="text-2xl font-bold text-orange-600">
                {quizzes.filter(quiz => quiz.bestScore > 0).length > 0 
                  ? Math.round(quizzes.filter(quiz => quiz.bestScore > 0)
                      .reduce((sum, quiz) => sum + quiz.bestScore, 0) / 
                    quizzes.filter(quiz => quiz.bestScore > 0).length)
                  : 0}%
              </div>
              <div className="text-gray-600 text-sm">Rata-rata Skor</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;