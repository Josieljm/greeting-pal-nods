-- Adicionar colunas para armazenar detalhes da análise de alimentos
ALTER TABLE public.meals 
ADD COLUMN IF NOT EXISTS foods_details JSONB,
ADD COLUMN IF NOT EXISTS is_estimated BOOLEAN DEFAULT false;