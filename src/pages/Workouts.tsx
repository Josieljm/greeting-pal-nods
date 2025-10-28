import { Layout } from "@/components/Layout";
import { GymCard } from "@/components/GymCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { WorkoutMuscleSelector } from "@/components/WorkoutMuscleSelector";
import { Search, Play, Clock, Target, Flame, Plus, History, Dumbbell, Zap } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const workoutCategories = [
  { name: "Todos", count: "500+", active: true },
  { name: "Peito", count: "45", active: false },
  { name: "Costas", count: "52", active: false },
  { name: "Pernas", count: "68", active: false },
  { name: "Ombros", count: "38", active: false },
  { name: "Braços", count: "42", active: false },
  { name: "Cardio", count: "85", active: false },
];

const exercises = [
  {
    id: 1,
    name: "Supino Reto com Barra",
    muscle: "Peito",
    difficulty: "Intermediário",
    duration: "12-15 min",
    calories: "120-150",
    sets: "3x8-12",
    image: "🏋️‍♀️",
    description: "Exercício fundamental para desenvolvimento do peitoral maior"
  },
  {
    id: 2,
    name: "Agachamento Livre",
    muscle: "Pernas",
    difficulty: "Avançado",
    duration: "15-20 min",
    calories: "180-220",
    sets: "4x8-10",
    image: "🏋️‍♂️",
    description: "Movimento composto essencial para força das pernas"
  },
  {
    id: 3,
    name: "Barra Fixa",
    muscle: "Costas",
    difficulty: "Intermediário",
    duration: "10-12 min",
    calories: "100-130",
    sets: "3x6-10",
    image: "🤸‍♂️",
    description: "Excelente para desenvolver a largura das costas"
  },
  {
    id: 4,
    name: "Desenvolvimento com Halteres",
    muscle: "Ombros",
    difficulty: "Iniciante",
    duration: "8-10 min",
    calories: "80-100",
    sets: "3x10-15",
    image: "🏃‍♀️",
    description: "Fortalece os deltoides anterior e médio"
  },
  {
    id: 5,
    name: "Corrida na Esteira",
    muscle: "Cardio",
    difficulty: "Iniciante",
    duration: "20-30 min",
    calories: "200-300",
    sets: "Contínuo",
    image: "🏃‍♂️",
    description: "Exercício cardiovascular para queima de gordura"
  },
  {
    id: 6,
    name: "Rosca Direta com Barra",
    muscle: "Braços",
    difficulty: "Iniciante",
    duration: "8-10 min",
    calories: "60-80",
    sets: "3x12-15",
    image: "💪",
    description: "Isolamento do bíceps braquial"
  }
];

const Workouts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const { toast } = useToast();

  const filteredExercises = exercises.filter(exercise => 
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeCategory === "Todos" || exercise.muscle === activeCategory)
  );

  const handleDemonstration = (exerciseName: string) => {
    toast({
      title: "Demonstração",
      description: `Abrindo demonstração para ${exerciseName}`,
    });
  };

  const handleAddExercise = (exerciseName: string) => {
    toast({
      title: "Exercício Adicionado",
      description: `${exerciseName} foi adicionado ao seu treino`,
    });
  };

  const handleStartWorkout = (workoutName: string) => {
    toast({
      title: "Treino Iniciado",
      description: `Iniciando ${workoutName}`,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Iniciante": return "bg-green-500/10 text-green-500";
      case "Intermediário": return "bg-yellow-500/10 text-yellow-500";
      case "Avançado": return "bg-red-500/10 text-red-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <Layout>
      <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Treinos</h1>
          <p className="text-gray-400">Escolha seu treino e comece agora mesmo</p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Buscar categoria ou exercício..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <Button className="bg-[#22c55e] hover:bg-[#16a34a] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Criar Treino
          </Button>
          <Button variant="outline" className="border-gray-800 text-white hover:bg-gray-900">
            <History className="w-4 h-4 mr-2" />
            Histórico
          </Button>
          <Button variant="outline" className="border-gray-800 text-white hover:bg-gray-900">
            <Dumbbell className="w-4 h-4 mr-2" />
            Meus Treinos
          </Button>
        </div>

        {/* Muscle Selector Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-[#22c55e]" />
            <h2 className="text-xl font-bold text-white">Selecione o Grupo Muscular</h2>
          </div>
          <WorkoutMuscleSelector />
        </div>

        {/* Treinos Rápidos Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-[#22c55e]" />
            <h2 className="text-xl font-bold text-white">Treinos Rápidos</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Treino de 7 Minutos */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-all">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-white">Treino de 7 Minutos</h3>
                <Zap className="w-5 h-5 text-[#22c55e]" />
              </div>
              <p className="text-gray-400 text-sm mb-3">Circuito rápido e eficiente</p>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>7 min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="w-4 h-4" />
                  <span>~80 kcal</span>
                </div>
              </div>
              <Badge className="bg-[#22c55e]/10 text-[#22c55e] hover:bg-[#22c55e]/20">
                Todos os níveis
              </Badge>
            </div>

            {/* HIIT Intenso */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-all">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-white">HIIT Intenso</h3>
                <Zap className="w-5 h-5 text-[#22c55e]" />
              </div>
              <p className="text-gray-400 text-sm mb-3">Alta intensidade, máxima queima</p>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>15 min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="w-4 h-4" />
                  <span>~200 kcal</span>
                </div>
              </div>
              <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">
                Intermediário
              </Badge>
            </div>

            {/* Força Total */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-all">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-white">Força Total</h3>
                <Zap className="w-5 h-5 text-[#22c55e]" />
              </div>
              <p className="text-gray-400 text-sm mb-3">Trabalho completo do corpo</p>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>45 min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="w-4 h-4" />
                  <span>~350 kcal</span>
                </div>
              </div>
              <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
                Avançado
              </Badge>
            </div>
          </div>
        </div>

        {/* Categorias de Treino Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-white" />
            <h2 className="text-xl font-bold text-white">Categorias de Treino</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Full Body */}
            <div className="bg-gradient-to-br from-green-900/20 to-green-950/20 border border-green-800/30 rounded-lg p-6 hover:border-green-700/50 transition-all cursor-pointer">
              <div className="text-4xl mb-3">🏃‍♂️</div>
              <h3 className="text-xl font-semibold text-white mb-1">Full Body</h3>
              <p className="text-gray-400 text-sm">15 exercícios</p>
            </div>

            {/* Peito */}
            <div className="bg-gradient-to-br from-orange-900/20 to-orange-950/20 border border-orange-800/30 rounded-lg p-6 hover:border-orange-700/50 transition-all cursor-pointer">
              <div className="text-4xl mb-3">💪</div>
              <h3 className="text-xl font-semibold text-white mb-1">Peito</h3>
              <p className="text-gray-400 text-sm">12 exercícios</p>
            </div>

            {/* Pernas */}
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-950/20 border border-blue-800/30 rounded-lg p-6 hover:border-blue-700/50 transition-all cursor-pointer">
              <div className="text-4xl mb-3">🦵</div>
              <h3 className="text-xl font-semibold text-white mb-1">Pernas</h3>
              <p className="text-gray-400 text-sm">18 exercícios</p>
            </div>

            {/* Abdômen */}
            <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-950/20 border border-yellow-800/30 rounded-lg p-6 hover:border-yellow-700/50 transition-all cursor-pointer">
              <div className="text-4xl mb-3">🔥</div>
              <h3 className="text-xl font-semibold text-white mb-1">Abdômen</h3>
              <p className="text-gray-400 text-sm">14 exercícios</p>
            </div>

            {/* Costas */}
            <div className="bg-gradient-to-br from-emerald-900/20 to-emerald-950/20 border border-emerald-800/30 rounded-lg p-6 hover:border-emerald-700/50 transition-all cursor-pointer">
              <div className="text-4xl mb-3">🏋️‍♂️</div>
              <h3 className="text-xl font-semibold text-white mb-1">Costas</h3>
              <p className="text-gray-400 text-sm">16 exercícios</p>
            </div>

            {/* Cardio */}
            <div className="bg-gradient-to-br from-pink-900/20 to-pink-950/20 border border-pink-800/30 rounded-lg p-6 hover:border-pink-700/50 transition-all cursor-pointer">
              <div className="text-4xl mb-3">❤️</div>
              <h3 className="text-xl font-semibold text-white mb-1">Cardio</h3>
              <p className="text-gray-400 text-sm">10 exercícios</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Workouts;