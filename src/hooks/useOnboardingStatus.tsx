import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

export const useOnboardingStatus = () => {
  const { user } = useAuth();
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!user) {
        setOnboardingCompleted(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles' as any)
          .select('onboarding_completed')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Erro ao buscar status do onboarding:', error);
          // Fallback para localStorage
          const localStatus = localStorage.getItem('onboardingCompleted') === 'true';
          setOnboardingCompleted(localStatus);
        } else {
          const profile = data as any;
          setOnboardingCompleted(!!profile?.onboarding_completed);
        }
      } catch (error) {
        console.error('Erro ao verificar onboarding:', error);
        setOnboardingCompleted(false);
      } finally {
        setLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [user]);

  return { onboardingCompleted, loading };
};
