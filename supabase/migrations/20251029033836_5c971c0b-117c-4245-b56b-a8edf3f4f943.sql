-- Adicionar campos de metas nutricionais na tabela profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS daily_calories_goal integer DEFAULT 2200,
ADD COLUMN IF NOT EXISTS daily_protein_goal numeric DEFAULT 120,
ADD COLUMN IF NOT EXISTS daily_carbs_goal numeric DEFAULT 220,
ADD COLUMN IF NOT EXISTS daily_fat_goal numeric DEFAULT 60;