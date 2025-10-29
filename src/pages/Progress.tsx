import { Layout } from "@/components/Layout";
import { GymCard } from "@/components/GymCard";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Calendar, Award, Flame, Dumbbell, Scale, Clock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

const Progress = () => {
  const { user } = useAuth();
  const [weeklyStats, setWeeklyStats] = useState({
    workouts: 0,
    calories: 0,
    nutritionGoal: 0,
    workoutTime: 0
  });
  const [progressData, setProgressData] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [bodyMetrics, setBodyMetrics] = useState<any>(null);
  const [monthlyStats, setMonthlyStats] = useState({
    workoutsCompleted: 0,
    caloriesBurned: 0,
    totalTime: 0,
    currentStreak: 0,
    mealsRegistered: 0,
    calorieGoalDays: 0,
    avgProtein: 0,
    aiAnalyses: 0
  });
  const [goals, setGoals] = useState<any[]>([]);
  useEffect(() => {
    const loadWeeklyStats = async () => {
      if (!user) return;

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      // Treinos completos
      const { data: workouts } = await supabase
        .from('workout_history')
        .select('id, duration_seconds, calories_burned')
        .eq('user_id', user.id)
        .gte('completed_at', sevenDaysAgo.toISOString());

      const workoutsCount = workouts?.length || 0;
      const totalCalories = workouts?.reduce((sum, w) => sum + (w.calories_burned || 0), 0) || 0;
      const totalSeconds = workouts?.reduce((sum, w) => sum + (w.duration_seconds || 0), 0) || 0;
      const totalHours = Math.round((totalSeconds / 3600) * 10) / 10;

      // Meta nutricional
      const { data: meals } = await supabase
        .from('meals')
        .select('total_calories, timestamp')
        .eq('user_id', user.id)
        .gte('timestamp', sevenDaysAgo.toISOString());

      let nutritionGoal = 0;
      if (meals && meals.length > 0) {
        const dailyCalories: { [key: string]: number } = {};
        meals.forEach((meal: any) => {
          const date = new Date(meal.timestamp).toISOString().split('T')[0];
          dailyCalories[date] = (dailyCalories[date] || 0) + (Number(meal.total_calories) || 0);
        });
        const days = Object.keys(dailyCalories).length;
        if (days > 0) {
          const totalPercentage = Object.values(dailyCalories).reduce((acc, cal) => 
            acc + Math.min((cal / 2200) * 100, 100), 0
          );
          nutritionGoal = Math.round(totalPercentage / days);
        }
      }

      setWeeklyStats({
        workouts: workoutsCount,
        calories: totalCalories,
        nutritionGoal,
        workoutTime: totalHours
      });
    };

    const loadProgressData = async () => {
      if (!user) return;

      const { data } = await supabase
        .from('progress_strength')
        .select('*')
        .eq('user_id', user.id)
        .order('exercise_name');

      if (data) {
        setProgressData(data.map(d => ({
          exercise: d.exercise_name,
          startWeight: Number(d.initial_weight),
          currentWeight: Number(d.current_weight),
          targetWeight: Number(d.target_weight),
          unit: d.unit
        })));
      }
    };

    const loadAchievements = async () => {
      if (!user) return;

      const { data } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at');

      if (data) {
        setAchievements(data.map(a => ({
          name: a.achievement_name,
          description: a.achievement_description,
          completed: a.completed,
          points: a.points,
          progress: a.progress_current && a.progress_target ? 
            Math.round((a.progress_current / a.progress_target) * 100) : undefined
        })));
      }
    };

    const loadBodyMetrics = async () => {
      if (!user) return;

      const { data } = await supabase
        .from('body_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('measurement_date', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data) {
        setBodyMetrics({
          weight: Number(data.weight),
          bodyFat: Number(data.body_fat_percentage),
          muscleMass: Number(data.muscle_mass),
          bmi: Number(data.bmi)
        });
      }
    };

    const loadMonthlyStats = async () => {
      if (!user) return;

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Treinos do mês
      const { data: monthWorkouts } = await supabase
        .from('workout_history')
        .select('calories_burned, duration_seconds, completed_at')
        .eq('user_id', user.id)
        .gte('completed_at', thirtyDaysAgo.toISOString());

      const workoutsCompleted = monthWorkouts?.length || 0;
      const caloriesBurned = monthWorkouts?.reduce((sum, w) => sum + (w.calories_burned || 0), 0) || 0;
      const totalSeconds = monthWorkouts?.reduce((sum, w) => sum + (w.duration_seconds || 0), 0) || 0;
      const totalTime = Math.round((totalSeconds / 3600) * 10) / 10;

      // Refeições do mês
      const { data: monthMeals } = await supabase
        .from('meals')
        .select('total_calories, total_protein, timestamp')
        .eq('user_id', user.id)
        .gte('timestamp', thirtyDaysAgo.toISOString());

      const mealsRegistered = monthMeals?.length || 0;
      
      // Calcular dias que atingiram meta calórica
      const dailyCalories: { [key: string]: number } = {};
      monthMeals?.forEach((meal: any) => {
        const date = new Date(meal.timestamp).toISOString().split('T')[0];
        dailyCalories[date] = (dailyCalories[date] || 0) + (Number(meal.total_calories) || 0);
      });
      const calorieGoalDays = Object.values(dailyCalories).filter(cal => cal >= 1800 && cal <= 2400).length;

      // Proteína média por dia
      const dailyProtein: { [key: string]: number } = {};
      monthMeals?.forEach((meal: any) => {
        const date = new Date(meal.timestamp).toISOString().split('T')[0];
        dailyProtein[date] = (dailyProtein[date] || 0) + (Number(meal.total_protein) || 0);
      });
      const avgProtein = Object.keys(dailyProtein).length > 0 ?
        Math.round(Object.values(dailyProtein).reduce((a, b) => a + b, 0) / Object.keys(dailyProtein).length) : 0;

      // Calcular streak
      let currentStreak = 0;
      const today = new Date();
      for (let i = 0; i < 30; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() - i);
        const dateStr = checkDate.toISOString().split('T')[0];
        
        const hasActivity = monthWorkouts?.some((w: any) => 
          new Date(w.completed_at).toISOString().split('T')[0] === dateStr
        ) || monthMeals?.some((m: any) => 
          new Date(m.timestamp).toISOString().split('T')[0] === dateStr
        );
        
        if (hasActivity) {
          currentStreak++;
        } else {
          break;
        }
      }

      setMonthlyStats({
        workoutsCompleted,
        caloriesBurned,
        totalTime,
        currentStreak,
        mealsRegistered,
        calorieGoalDays,
        avgProtein,
        aiAnalyses: mealsRegistered // Assumindo que todas refeições foram analisadas
      });
    };

    const loadGoals = async () => {
      if (!user) return;

      const { data } = await supabase
        .from('user_goals')
        .select('*')
        .eq('user_id', user.id)
        .eq('completed', false)
        .order('created_at')
        .limit(3);

      if (data) {
        setGoals(data.map(g => ({
          name: g.goal_name,
          type: g.goal_type,
          current: Number(g.current_value),
          target: Number(g.target_value),
          unit: g.unit,
          remaining: Number(g.target_value) - Number(g.current_value)
        })));
      }
    };

    loadWeeklyStats();
    loadProgressData();
    loadAchievements();
    loadBodyMetrics();
    loadMonthlyStats();
    loadGoals();
  }, [user]);

  const calculateProgress = (start: number, current: number, target: number) => {
    return Math.min(((current - start) / (target - start)) * 100, 100);
  };

  const weeklyStatsDisplay = [
    { icon: <Dumbbell className="w-6 h-6" />, title: "Treinos Completos", value: weeklyStats.workouts.toString(), change: "+25%", variant: "fitness" as const },
    { icon: <Flame className="w-6 h-6" />, title: "Calorias Queimadas", value: weeklyStats.calories >= 1000 ? `${(weeklyStats.calories / 1000).toFixed(1)}K` : weeklyStats.calories.toString(), change: "+18%", variant: "fitness" as const },
    { icon: <Target className="w-6 h-6" />, title: "Meta Nutricional", value: `${weeklyStats.nutritionGoal}%`, change: "+8%", variant: "nutrition" as const },
    { icon: <Clock className="w-6 h-6" />, title: "Tempo de Treino", value: `${weeklyStats.workoutTime}h`, change: "+12%", variant: "default" as const },
  ];

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
          {weeklyStatsDisplay.map((stat, index) => (
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
              {progressData.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Nenhum exercício rastreado ainda. Comece a registrar seu progresso!
                </p>
              ) : progressData.map((exercise, index) => (
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
              {bodyMetrics ? (
                <>
                  <div className="text-center p-4 rounded-lg bg-gradient-fitness-subtle">
                    <Scale className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">{bodyMetrics.weight} kg</div>
                    <div className="text-sm text-muted-foreground">Peso atual</div>
                  </div>
                  
                  <div className="space-y-3">
                    {bodyMetrics.bodyFat && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Gordura Corporal</span>
                          <span>{bodyMetrics.bodyFat}%</span>
                        </div>
                        <ProgressBar value={bodyMetrics.bodyFat} className="h-1" />
                      </div>
                    )}
                    
                    {bodyMetrics.muscleMass && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Massa Muscular</span>
                          <span>{bodyMetrics.muscleMass}kg</span>
                        </div>
                        <ProgressBar value={85} className="h-1" />
                      </div>
                    )}
                    
                    {bodyMetrics.bmi && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>IMC</span>
                          <span>{bodyMetrics.bmi}</span>
                        </div>
                        <ProgressBar value={Math.min(bodyMetrics.bmi * 3, 100)} className="h-1" />
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Nenhuma métrica corporal registrada ainda.
                </p>
              )}
              
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
            {achievements.length === 0 ? (
              <p className="text-muted-foreground text-center py-8 col-span-2">
                Nenhuma conquista ainda. Continue se esforçando!
              </p>
            ) : achievements.map((achievement, index) => (
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
                <span className="font-bold text-primary">{monthlyStats.workoutsCompleted}</span>
              </div>
              <div className="flex justify-between">
                <span>Calorias queimadas</span>
                <span className="font-bold text-primary">
                  {monthlyStats.caloriesBurned >= 1000 ? 
                    `${(monthlyStats.caloriesBurned / 1000).toFixed(1)}K` : 
                    monthlyStats.caloriesBurned}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tempo total</span>
                <span className="font-bold text-primary">{monthlyStats.totalTime}h</span>
              </div>
              <div className="flex justify-between">
                <span>Sequência atual</span>
                <span className="font-bold text-primary">{monthlyStats.currentStreak} dias</span>
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
                <span className="font-bold text-secondary">{monthlyStats.mealsRegistered}</span>
              </div>
              <div className="flex justify-between">
                <span>Meta calórica atingida</span>
                <span className="font-bold text-secondary">{monthlyStats.calorieGoalDays}/30</span>
              </div>
              <div className="flex justify-between">
                <span>Proteína média/dia</span>
                <span className="font-bold text-secondary">{monthlyStats.avgProtein}g</span>
              </div>
              <div className="flex justify-between">
                <span>Análises por IA</span>
                <span className="font-bold text-secondary">{monthlyStats.aiAnalyses}</span>
              </div>
            </div>
          </GymCard>
          
          <GymCard
            title="Próximas Metas"
            description="Objetivos em andamento"
          >
            <div className="space-y-4">
              {goals.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Nenhuma meta definida ainda.
                </p>
              ) : goals.map((goal, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/50">
                  <div className="text-sm font-medium mb-1">{goal.name}</div>
                  <div className="text-lg font-bold">{goal.target} {goal.unit}</div>
                  <div className="text-xs text-muted-foreground">
                    {goal.remaining.toFixed(1)}{goal.unit} restantes
                  </div>
                </div>
              ))}
              
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