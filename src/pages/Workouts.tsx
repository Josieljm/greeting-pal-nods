import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Timer, Flame, Trophy } from "lucide-react";
import { Layout } from "@/components/Layout";
import { WorkoutCard } from "@/components/WorkoutCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Workout {
  id: string;
  name: string;
  description: string;
  category: string;
  duration_minutes: number;
  estimated_calories: number;
  difficulty: string;
  exercises_data: any[];
}

const categories = [
  { name: "Todos", key: "all" },
  { name: "7 Minutos", key: "7_minute" },
  { name: "Full Body", key: "full_body" },
  { name: "Abdômen", key: "abs" },
  { name: "HIIT", key: "hiit" },
  { name: "Força", key: "strength" },
  { name: "Pernas", key: "legs" },
  { name: "Costas", key: "back" },
  { name: "Cardio", key: "cardio" },
];

export default function Workouts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [workoutHistory, setWorkoutHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkouts();
    loadWorkoutHistory();
  }, []);

  const loadWorkouts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("workouts")
      .select("*")
      .order("category", { ascending: true });

    if (error) {
      toast.error("Erro ao carregar treinos");
    } else {
      setWorkouts(data as Workout[]);
    }
    setLoading(false);
  };

  const loadWorkoutHistory = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data } = await supabase
        .from("workout_history")
        .select("*, workouts(*)")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false })
        .limit(5);

      if (data) {
        setWorkoutHistory(data);
      }
    }
  };

  const filteredWorkouts = workouts.filter((workout) => {
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workout.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || workout.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="w-full mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Treinos Rápidos
          </h1>
          <p className="text-muted-foreground">
            Circuitos organizados por categorias e níveis de dificuldade
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Buscar treinos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide -mx-4 px-4">
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={activeCategory === category.key ? "default" : "outline"}
              onClick={() => setActiveCategory(category.key)}
              className="whitespace-nowrap"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Workout History */}
        {workoutHistory.length > 0 && (
          <Card className="mb-8 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Histórico Recente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {workoutHistory.map((history) => (
                  <div
                    key={history.id}
                    className="flex items-center justify-between p-3 bg-card rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{history.workouts?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(history.completed_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{history.calories_burned} kcal</p>
                      <p className="text-xs text-muted-foreground">
                        {Math.floor(history.duration_seconds / 60)} min
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Workouts Highlight */}
        {activeCategory === "all" && (
          <Card className="mb-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="w-6 h-6 text-primary" />
                Treino de 7 Minutos
              </CardTitle>
              <CardDescription>
                Circuito rápido e eficiente para o corpo inteiro - Ideal para começar o dia!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm mb-4">
                <div className="flex items-center gap-1">
                  <Timer className="w-4 h-4" />
                  <span>7 minutos</span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span>~80 kcal</span>
                </div>
                <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-400">
                  Iniciante
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Workouts Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-muted-foreground">Carregando treinos...</div>
          </div>
        ) : filteredWorkouts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum treino encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-24 w-full">
            {filteredWorkouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                id={workout.id}
                name={workout.name}
                description={workout.description}
                category={workout.category}
                duration_minutes={workout.duration_minutes}
                estimated_calories={workout.estimated_calories}
                difficulty={workout.difficulty}
                exercises_count={workout.exercises_data.length}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
