-- Adicionar campo notes para descrição detalhada das análises de refeições
ALTER TABLE public.meals ADD COLUMN IF NOT EXISTS notes TEXT;