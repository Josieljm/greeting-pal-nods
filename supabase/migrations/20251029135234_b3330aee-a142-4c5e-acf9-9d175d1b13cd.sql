-- Criar tabela de registros de calorias queimadas
CREATE TABLE public.calories_burned (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  calories INTEGER NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  activity_type TEXT,
  duration_minutes INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.calories_burned ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Usuários podem ver seus próprios registros"
ON public.calories_burned
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar seus próprios registros"
ON public.calories_burned
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios registros"
ON public.calories_burned
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus próprios registros"
ON public.calories_burned
FOR DELETE
USING (auth.uid() = user_id);

-- Adicionar campos de meta de calorias no perfil
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS daily_calories_burn_goal INTEGER DEFAULT 500;

-- Trigger para atualizar updated_at
CREATE TRIGGER update_calories_burned_updated_at
BEFORE UPDATE ON public.calories_burned
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Índice para melhor performance
CREATE INDEX idx_calories_burned_user_date ON public.calories_burned(user_id, date DESC);