import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Flame, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WorkoutCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  duration_minutes: number;
  estimated_calories: number;
  difficulty: string;
  exercises_count: number;
}

export function WorkoutCard({
  id,
  name,
  description,
  category,
  duration_minutes,
  estimated_calories,
  difficulty,
  exercises_count,
}: WorkoutCardProps) {
  const navigate = useNavigate();

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "intermediate":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "advanced":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      default:
        return "bg-muted";
    }
  };

  const getCategoryName = (cat: string) => {
    const names: Record<string, string> = {
      "7_minute": "7 Minutos",
      full_body: "Full Body",
      abs: "Abdômen",
      hiit: "HIIT",
      strength: "Força",
      legs: "Pernas",
      back: "Costas",
      cardio: "Cardio",
    };
    return names[cat] || cat;
  };

  const getDifficultyLabel = (level: string) => {
    const labels: Record<string, string> = {
      beginner: "Iniciante",
      intermediate: "Intermediário",
      advanced: "Avançado",
    };
    return labels[level] || level;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all hover:scale-[1.02] bg-gradient-to-br from-card to-card/50">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <Badge variant="outline" className="mb-2">
              {getCategoryName(category)}
            </Badge>
            <h3 className="text-xl font-bold mb-1">{name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration_minutes} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>~{estimated_calories} kcal</span>
          </div>
          <Badge className={getDifficultyColor(difficulty)} variant="secondary">
            {getDifficultyLabel(difficulty)}
          </Badge>
        </div>

        <div className="text-xs text-muted-foreground mb-4">
          {exercises_count} exercícios
        </div>

        <Button
          onClick={() => navigate(`/workout-player/${id}`)}
          className="w-full"
          size="lg"
        >
          <Play className="w-5 h-5 mr-2" />
          Iniciar Treino
        </Button>
      </div>
    </Card>
  );
}
