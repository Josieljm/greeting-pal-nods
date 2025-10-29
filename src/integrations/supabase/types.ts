export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      body_metrics: {
        Row: {
          bmi: number | null
          body_fat_percentage: number | null
          created_at: string
          id: string
          measurement_date: string
          muscle_mass: number | null
          notes: string | null
          user_id: string
          weight: number | null
        }
        Insert: {
          bmi?: number | null
          body_fat_percentage?: number | null
          created_at?: string
          id?: string
          measurement_date?: string
          muscle_mass?: number | null
          notes?: string | null
          user_id: string
          weight?: number | null
        }
        Update: {
          bmi?: number | null
          body_fat_percentage?: number | null
          created_at?: string
          id?: string
          measurement_date?: string
          muscle_mass?: number | null
          notes?: string | null
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
      calories_burned: {
        Row: {
          activity_type: string | null
          calories: number
          created_at: string
          date: string
          duration_minutes: number | null
          id: string
          notes: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          activity_type?: string | null
          calories: number
          created_at?: string
          date?: string
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          activity_type?: string | null
          calories?: number
          created_at?: string
          date?: string
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      exercises: {
        Row: {
          calories_per_minute: number | null
          created_at: string
          description: string | null
          difficulty: string
          equipment_needed: string[] | null
          gif_url: string | null
          id: string
          muscle_groups: string[]
          name: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          calories_per_minute?: number | null
          created_at?: string
          description?: string | null
          difficulty: string
          equipment_needed?: string[] | null
          gif_url?: string | null
          id?: string
          muscle_groups: string[]
          name: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          calories_per_minute?: number | null
          created_at?: string
          description?: string | null
          difficulty?: string
          equipment_needed?: string[] | null
          gif_url?: string | null
          id?: string
          muscle_groups?: string[]
          name?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      meals: {
        Row: {
          calories: number | null
          carbs: number | null
          created_at: string
          fat: number | null
          foods_details: Json | null
          id: string
          is_estimated: boolean | null
          meal_time: string
          name: string
          notes: string | null
          protein: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          calories?: number | null
          carbs?: number | null
          created_at?: string
          fat?: number | null
          foods_details?: Json | null
          id?: string
          is_estimated?: boolean | null
          meal_time?: string
          name: string
          notes?: string | null
          protein?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          calories?: number | null
          carbs?: number | null
          created_at?: string
          fat?: number | null
          foods_details?: Json | null
          id?: string
          is_estimated?: boolean | null
          meal_time?: string
          name?: string
          notes?: string | null
          protein?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          avatar_url: string | null
          created_at: string
          daily_calories_burn_goal: number | null
          daily_calories_goal: number | null
          daily_carbs_goal: number | null
          daily_fat_goal: number | null
          daily_protein_goal: number | null
          fitness_goal: string | null
          height: number | null
          id: string
          name: string | null
          onboarding_completed: boolean | null
          updated_at: string
          user_id: string
          weight: number | null
        }
        Insert: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          daily_calories_burn_goal?: number | null
          daily_calories_goal?: number | null
          daily_carbs_goal?: number | null
          daily_fat_goal?: number | null
          daily_protein_goal?: number | null
          fitness_goal?: string | null
          height?: number | null
          id?: string
          name?: string | null
          onboarding_completed?: boolean | null
          updated_at?: string
          user_id: string
          weight?: number | null
        }
        Update: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          daily_calories_burn_goal?: number | null
          daily_calories_goal?: number | null
          daily_carbs_goal?: number | null
          daily_fat_goal?: number | null
          daily_protein_goal?: number | null
          fitness_goal?: string | null
          height?: number | null
          id?: string
          name?: string | null
          onboarding_completed?: boolean | null
          updated_at?: string
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
      progress_strength: {
        Row: {
          created_at: string
          current_weight: number
          exercise_name: string
          id: string
          initial_weight: number
          target_weight: number
          unit: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_weight: number
          exercise_name: string
          id?: string
          initial_weight: number
          target_weight: number
          unit?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_weight?: number
          exercise_name?: string
          id?: string
          initial_weight?: number
          target_weight?: number
          unit?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_description: string
          achievement_id: string
          achievement_name: string
          completed: boolean
          completed_at: string | null
          created_at: string
          id: string
          points: number
          progress_current: number | null
          progress_target: number | null
          user_id: string
        }
        Insert: {
          achievement_description: string
          achievement_id: string
          achievement_name: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          points?: number
          progress_current?: number | null
          progress_target?: number | null
          user_id: string
        }
        Update: {
          achievement_description?: string
          achievement_id?: string
          achievement_name?: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          points?: number
          progress_current?: number | null
          progress_target?: number | null
          user_id?: string
        }
        Relationships: []
      }
      user_goals: {
        Row: {
          completed: boolean
          created_at: string
          current_value: number
          deadline: string | null
          goal_name: string
          goal_type: string
          id: string
          target_value: number
          unit: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          current_value: number
          deadline?: string | null
          goal_name: string
          goal_type: string
          id?: string
          target_value: number
          unit: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          current_value?: number
          deadline?: string | null
          goal_name?: string
          goal_type?: string
          id?: string
          target_value?: number
          unit?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      workout_history: {
        Row: {
          calories_burned: number
          completed_at: string
          created_at: string
          duration_seconds: number
          exercises_completed: number
          id: string
          notes: string | null
          user_id: string
          workout_id: string | null
        }
        Insert: {
          calories_burned: number
          completed_at?: string
          created_at?: string
          duration_seconds: number
          exercises_completed: number
          id?: string
          notes?: string | null
          user_id: string
          workout_id?: string | null
        }
        Update: {
          calories_burned?: number
          completed_at?: string
          created_at?: string
          duration_seconds?: number
          exercises_completed?: number
          id?: string
          notes?: string | null
          user_id?: string
          workout_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workout_history_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      workouts: {
        Row: {
          category: string
          created_at: string
          description: string | null
          difficulty: string
          duration_minutes: number
          estimated_calories: number
          exercises_data: Json
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          difficulty: string
          duration_minutes: number
          estimated_calories: number
          exercises_data: Json
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          difficulty?: string
          duration_minutes?: number
          estimated_calories?: number
          exercises_data?: Json
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
