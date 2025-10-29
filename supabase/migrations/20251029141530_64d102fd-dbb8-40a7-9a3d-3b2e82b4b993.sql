-- Tabela de exercícios
CREATE TABLE public.exercises (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  gif_url TEXT,
  muscle_groups TEXT[] NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  equipment_needed TEXT[],
  calories_per_minute NUMERIC DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de treinos
CREATE TABLE public.workouts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('full_body', 'abs', 'hiit', 'strength', 'legs', 'back', 'cardio', '7_minute')),
  duration_minutes INTEGER NOT NULL,
  estimated_calories INTEGER NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  exercises_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de histórico de treinos
CREATE TABLE public.workout_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  workout_id UUID REFERENCES public.workouts(id),
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  duration_seconds INTEGER NOT NULL,
  calories_burned INTEGER NOT NULL,
  exercises_completed INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies para exercises (público para leitura)
CREATE POLICY "Todos podem ver exercícios"
ON public.exercises FOR SELECT
USING (true);

-- RLS Policies para workouts (público para leitura)
CREATE POLICY "Todos podem ver treinos"
ON public.workouts FOR SELECT
USING (true);

-- RLS Policies para workout_history
CREATE POLICY "Usuários podem ver seu próprio histórico"
ON public.workout_history FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar seu próprio histórico"
ON public.workout_history FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seu próprio histórico"
ON public.workout_history FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seu próprio histórico"
ON public.workout_history FOR DELETE
USING (auth.uid() = user_id);

-- Triggers para updated_at
CREATE TRIGGER update_exercises_updated_at
BEFORE UPDATE ON public.exercises
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_workouts_updated_at
BEFORE UPDATE ON public.workouts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir dados iniciais de treinos
INSERT INTO public.workouts (name, description, category, duration_minutes, estimated_calories, difficulty, exercises_data) VALUES
('Treino 7 Minutos', 'Circuito rápido e eficiente para o corpo inteiro', '7_minute', 7, 80, 'beginner', 
'[{"name":"Jumping Jacks","duration":30,"rest":10},{"name":"Wall Sit","duration":30,"rest":10},{"name":"Push-ups","duration":30,"rest":10},{"name":"Crunches","duration":30,"rest":10},{"name":"Step-ups","duration":30,"rest":10},{"name":"Squats","duration":30,"rest":10},{"name":"Tricep Dips","duration":30,"rest":10},{"name":"Plank","duration":30,"rest":10},{"name":"High Knees","duration":30,"rest":10},{"name":"Lunges","duration":30,"rest":10},{"name":"Push-up Rotation","duration":30,"rest":10},{"name":"Side Plank","duration":30,"rest":10}]'::jsonb),

('Full Body Completo', 'Treino balanceado para corpo inteiro com 15 exercícios', 'full_body', 30, 250, 'intermediate',
'[{"name":"Burpees","duration":45,"rest":15},{"name":"Mountain Climbers","duration":45,"rest":15},{"name":"Push-ups","duration":45,"rest":15},{"name":"Squats","duration":45,"rest":15},{"name":"Plank","duration":60,"rest":15},{"name":"Lunges","duration":45,"rest":15},{"name":"Tricep Dips","duration":45,"rest":15},{"name":"Bicycle Crunches","duration":45,"rest":15},{"name":"Jump Squats","duration":45,"rest":15},{"name":"Superman","duration":45,"rest":15},{"name":"High Knees","duration":45,"rest":15},{"name":"Russian Twists","duration":45,"rest":15},{"name":"Wall Sit","duration":60,"rest":15},{"name":"Pike Push-ups","duration":45,"rest":15},{"name":"Jumping Jacks","duration":45,"rest":15}]'::jsonb),

('Abdômen Intenso', 'Foco em core e estabilização com 14 exercícios', 'abs', 25, 180, 'intermediate',
'[{"name":"Crunches","duration":45,"rest":15},{"name":"Plank","duration":60,"rest":15},{"name":"Bicycle Crunches","duration":45,"rest":15},{"name":"Russian Twists","duration":45,"rest":15},{"name":"Leg Raises","duration":45,"rest":15},{"name":"Mountain Climbers","duration":45,"rest":15},{"name":"Side Plank L","duration":45,"rest":15},{"name":"Side Plank R","duration":45,"rest":15},{"name":"Flutter Kicks","duration":45,"rest":15},{"name":"V-ups","duration":45,"rest":15},{"name":"Dead Bug","duration":45,"rest":15},{"name":"Hollow Hold","duration":45,"rest":15},{"name":"Reverse Crunches","duration":45,"rest":15},{"name":"Plank Jacks","duration":45,"rest":15}]'::jsonb),

('HIIT Intenso', 'Sistema de intervalos de alta intensidade', 'hiit', 15, 200, 'intermediate',
'[{"name":"Burpees","duration":30,"rest":10},{"name":"High Knees","duration":30,"rest":10},{"name":"Jump Squats","duration":30,"rest":10},{"name":"Mountain Climbers","duration":30,"rest":10},{"name":"Jumping Jacks","duration":30,"rest":10},{"name":"Sprint in Place","duration":30,"rest":10},{"name":"Box Jumps","duration":30,"rest":10},{"name":"Skater Jumps","duration":30,"rest":10},{"name":"Plank Jacks","duration":30,"rest":10},{"name":"Tuck Jumps","duration":30,"rest":10}]'::jsonb),

('Força Total', 'Treino completo com foco em força', 'strength', 45, 350, 'advanced',
'[{"name":"Push-ups","duration":60,"rest":20},{"name":"Squats","duration":60,"rest":20},{"name":"Pull-ups","duration":60,"rest":20},{"name":"Deadlift Position","duration":60,"rest":20},{"name":"Pike Push-ups","duration":60,"rest":20},{"name":"Bulgarian Squats","duration":60,"rest":20},{"name":"Tricep Dips","duration":60,"rest":20},{"name":"Lunges","duration":60,"rest":20},{"name":"Plank","duration":90,"rest":20},{"name":"Diamond Push-ups","duration":60,"rest":20}]'::jsonb),

('Pernas Completo', 'Treino focado em membros inferiores', 'legs', 35, 280, 'intermediate',
'[{"name":"Squats","duration":60,"rest":15},{"name":"Lunges","duration":60,"rest":15},{"name":"Jump Squats","duration":45,"rest":15},{"name":"Wall Sit","duration":60,"rest":15},{"name":"Calf Raises","duration":45,"rest":15},{"name":"Bulgarian Squats L","duration":45,"rest":15},{"name":"Bulgarian Squats R","duration":45,"rest":15},{"name":"Side Lunges","duration":45,"rest":15},{"name":"Glute Bridges","duration":60,"rest":15},{"name":"Step-ups","duration":45,"rest":15},{"name":"Sumo Squats","duration":60,"rest":15},{"name":"Single Leg Deadlift L","duration":45,"rest":15},{"name":"Single Leg Deadlift R","duration":45,"rest":15},{"name":"Box Jumps","duration":45,"rest":15},{"name":"Squat Pulses","duration":45,"rest":15},{"name":"Leg Raises","duration":45,"rest":15},{"name":"Fire Hydrants L","duration":45,"rest":15},{"name":"Fire Hydrants R","duration":45,"rest":15}]'::jsonb),

('Costas e Postura', 'Fortalecimento das costas e melhora postural', 'back', 30, 220, 'intermediate',
'[{"name":"Superman","duration":45,"rest":15},{"name":"Reverse Snow Angels","duration":45,"rest":15},{"name":"Pull-ups","duration":45,"rest":15},{"name":"Bent Over Rows","duration":60,"rest":15},{"name":"Plank","duration":60,"rest":15},{"name":"Bird Dog L","duration":45,"rest":15},{"name":"Bird Dog R","duration":45,"rest":15},{"name":"Lat Pulldown Position","duration":45,"rest":15},{"name":"Back Extensions","duration":45,"rest":15},{"name":"Y-raises","duration":45,"rest":15},{"name":"T-raises","duration":45,"rest":15},{"name":"W-raises","duration":45,"rest":15},{"name":"Prone Cobra","duration":45,"rest":15},{"name":"Reverse Plank","duration":45,"rest":15},{"name":"Scapular Push-ups","duration":45,"rest":15},{"name":"Dead Hang","duration":30,"rest":15}]'::jsonb),

('Cardio Explosivo', 'Alta intensidade cardiovascular', 'cardio', 20, 250, 'intermediate',
'[{"name":"Jumping Jacks","duration":60,"rest":10},{"name":"High Knees","duration":60,"rest":10},{"name":"Burpees","duration":45,"rest":10},{"name":"Mountain Climbers","duration":60,"rest":10},{"name":"Sprint in Place","duration":60,"rest":10},{"name":"Jump Rope","duration":60,"rest":10},{"name":"Skater Jumps","duration":45,"rest":10},{"name":"Box Jumps","duration":45,"rest":10},{"name":"Butt Kickers","duration":60,"rest":10},{"name":"Tuck Jumps","duration":45,"rest":10}]'::jsonb);