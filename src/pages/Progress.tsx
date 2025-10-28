import { Layout } from "@/components/Layout";
import { GymCard } from "@/components/GymCard";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Calendar, Award, Flame, Dumbbell, Scale, Clock } from "lucide-react";

const weeklyStats = [
  { icon: <Dumbbell className="w-6 h-6" />, title: "Treinos Completos", value: "5", change: "+25%", variant: "fitness" as const },
  { icon: <Flame className="w-6 h-6" />, title: "Calorias Queimadas", value: "2.1K", change: "+18%", variant: "fitness" as const },
  { icon: <Target className="w-6 h-6" />, title: "Meta Nutricional", value: "92%", change: "+8%", variant: "nutrition" as const },
  { icon: <Clock className="w-6 h-6" />, title: "Tempo de Treino", value: "4.2h", change: "+12%", variant: "default" as const },
];

const achievements = [
  { name: "Primeira Semana", description: "Complete 7 dias consecutivos", completed: true, points: 50 },
  { name: "Força Crescente", description: "Aumente 10kg no supino", completed: true, points: 100 },
  { name: "Maratonista", description: "Complete 30 treinos de cardio", completed: false, points: 150, progress: 23 },
  { name: "Nutri Expert", description: "Registre 100 refeições", completed: false, points: 75, progress: 67 },
];

const progressData = [
  { exercise: "Supino Reto", startWeight: 60, currentWeight: 80, targetWeight: 100, unit: "kg" },
  { exercise: "Agachamento", startWeight: 80, currentWeight: 110, targetWeight: 140, unit: "kg" },
  { exercise: "Deadlift", startWeight: 100, currentWeight: 130, targetWeight: 160, unit: "kg" },
  { exercise: "Desenvolvimento", startWeight: 30, currentWeight: 45, targetWeight: 60, unit: "kg" },
];

const Progress = () => {
  const calculateProgress = (start: number, current: number, target: number) => {
    return Math.min(((current - start) / (target - start)) * 100, 100);
  };

  return (
    <Layout>
      <div className="p-4 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Seu Progresso</h1>
            <p className="text-muted-foreground">Acompanhe sua evolução e conquistas</p>
          </div>
          <div className="flex gap-2">
            <Button variant="fitness">
              <TrendingUp className="w-4 h-4" />
              Relatório Completo
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4" />
              Histórico
            </Button>
          </div>
        </div>

        {/* Weekly Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {weeklyStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Progress Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Strength Progress */}
          <GymCard
            variant="fitness"
            title="Evolução de Força"
            description="Progresso nos exercícios principais"
            className="lg:col-span-2"
          >
            <div className="space-y-6">
              {progressData.map((exercise, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{exercise.exercise}</h3>
                    <Badge variant="outline">
                      {exercise.currentWeight}{exercise.unit} / {exercise.targetWeight}{exercise.unit}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Inicial: {exercise.startWeight}{exercise.unit}</span>
                    <span>•</span>
                    <span>Meta: {exercise.targetWeight}{exercise.unit}</span>
                    <span>•</span>
                    <span className="text-primary font-medium">
                      +{exercise.currentWeight - exercise.startWeight}{exercise.unit}
                    </span>
                  </div>
                  
                  <ProgressBar 
                    value={calculateProgress(exercise.startWeight, exercise.currentWeight, exercise.targetWeight)} 
                    className="h-2"
                  />
                </div>
              ))}
              
              <Button variant="fitness" className="w-full mt-4">
                <Target className="w-4 h-4" />
                Definir Novas Metas
              </Button>
            </div>
          </GymCard>

          {/* Body Metrics */}
          <GymCard
            title="Métricas Corporais"
            description="Acompanhe mudanças físicas"
          >
            <div className="space-y-4">
              <div className="text-center p-4 rounded-lg bg-gradient-fitness-subtle">
                <Scale className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">75.2 kg</div>
                <div className="text-sm text-muted-foreground">Peso atual</div>
                <div className="text-xs text-green-500 mt-1">-2.3kg este mês</div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Gordura Corporal</span>
                    <span>15.2%</span>
                  </div>
                  <ProgressBar value={15.2} className="h-1" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Massa Muscular</span>
                    <span>63.8kg</span>
                  </div>
                  <ProgressBar value={85} className="h-1" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>IMC</span>
                    <span>22.1</span>
                  </div>
                  <ProgressBar value={70} className="h-1" />
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                <TrendingUp className="w-4 h-4" />
                Atualizar Medidas
              </Button>
            </div>
          </GymCard>
        </div>

        {/* Achievements */}
        <GymCard
          title="Conquistas"
          description="Desbloqueie medalhas e ganhe pontos"
        >
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-colors ${
                  achievement.completed
                    ? "bg-gradient-fitness-subtle border-primary/30"
                    : "bg-muted/30 border-border"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      achievement.completed 
                        ? "bg-primary text-white" 
                        : "bg-muted-foreground/20 text-muted-foreground"
                    }`}>
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{achievement.name}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                  <Badge variant={achievement.completed ? "default" : "outline"}>
                    {achievement.points} pts
                  </Badge>
                </div>
                
                {!achievement.completed && achievement.progress && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso</span>
                      <span>{achievement.progress}%</span>
                    </div>
                    <ProgressBar value={achievement.progress} className="h-1" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </GymCard>

        {/* Monthly Summary */}
        <div className="grid md:grid-cols-3 gap-6">
          <GymCard
            variant="fitness"
            title="Este Mês"
            description="Resumo de atividades"
          >
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Treinos realizados</span>
                <span className="font-bold text-primary">18</span>
              </div>
              <div className="flex justify-between">
                <span>Calorias queimadas</span>
                <span className="font-bold text-primary">8.4K</span>
              </div>
              <div className="flex justify-between">
                <span>Tempo total</span>
                <span className="font-bold text-primary">15.2h</span>
              </div>
              <div className="flex justify-between">
                <span>Sequência atual</span>
                <span className="font-bold text-primary">7 dias</span>
              </div>
            </div>
          </GymCard>
          
          <GymCard
            variant="nutrition"
            title="Nutrição"
            description="Dados alimentares"
          >
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Refeições registradas</span>
                <span className="font-bold text-secondary">89</span>
              </div>
              <div className="flex justify-between">
                <span>Meta calórica atingida</span>
                <span className="font-bold text-secondary">23/30</span>
              </div>
              <div className="flex justify-between">
                <span>Proteína média/dia</span>
                <span className="font-bold text-secondary">118g</span>
              </div>
              <div className="flex justify-between">
                <span>Análises por IA</span>
                <span className="font-bold text-secondary">67</span>
              </div>
            </div>
          </GymCard>
          
          <GymCard
            title="Próximas Metas"
            description="Objetivos em andamento"
          >
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="text-sm font-medium mb-1">Peso alvo</div>
                <div className="text-lg font-bold">73.0 kg</div>
                <div className="text-xs text-muted-foreground">2.2kg restantes</div>
              </div>
              
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="text-sm font-medium mb-1">Supino</div>
                <div className="text-lg font-bold">100 kg</div>
                <div className="text-xs text-muted-foreground">20kg restantes</div>
              </div>
              
              <Button variant="outline" className="w-full">
                <Target className="w-4 h-4" />
                Ver Todas
              </Button>
            </div>
          </GymCard>
        </div>
      </div>
    </Layout>
  );
};

export default Progress;