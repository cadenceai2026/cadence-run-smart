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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          average_heartrate: number | null
          average_speed: number | null
          created_at: string | null
          distance: number | null
          elapsed_time: number | null
          id: number
          max_heartrate: number | null
          max_speed: number | null
          moving_time: number | null
          name: string | null
          sport_type: string | null
          start_date: string | null
          start_date_local: string | null
          strava_id: string | null
          total_elevation_gain: number | null
          user_id: string | null
        }
        Insert: {
          average_heartrate?: number | null
          average_speed?: number | null
          created_at?: string | null
          distance?: number | null
          elapsed_time?: number | null
          id?: number
          max_heartrate?: number | null
          max_speed?: number | null
          moving_time?: number | null
          name?: string | null
          sport_type?: string | null
          start_date?: string | null
          start_date_local?: string | null
          strava_id?: string | null
          total_elevation_gain?: number | null
          user_id?: string | null
        }
        Update: {
          average_heartrate?: number | null
          average_speed?: number | null
          created_at?: string | null
          distance?: number | null
          elapsed_time?: number | null
          id?: number
          max_heartrate?: number | null
          max_speed?: number | null
          moving_time?: number | null
          name?: string | null
          sport_type?: string | null
          start_date?: string | null
          start_date_local?: string | null
          strava_id?: string | null
          total_elevation_gain?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      group_members: {
        Row: {
          group_id: string | null
          id: string
          joined_at: string | null
          user_id: string | null
        }
        Insert: {
          group_id?: string | null
          id?: string
          joined_at?: string | null
          user_id?: string | null
        }
        Update: {
          group_id?: string | null
          id?: string
          joined_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          city: string | null
          country: string | null
          created_at: string | null
          created_by: string | null
          flag: string | null
          id: string
          name: string
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          created_by?: string | null
          flag?: string | null
          id?: string
          name: string
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          created_by?: string | null
          flag?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "groups_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          plan: string | null
          trial_ends_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          plan?: string | null
          trial_ends_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          plan?: string | null
          trial_ends_at?: string | null
        }
        Relationships: []
      }
      strava_connections: {
        Row: {
          access_token: string | null
          athlete_city: string | null
          athlete_country: string | null
          athlete_firstname: string | null
          athlete_id: string | null
          athlete_lastname: string | null
          athlete_profile: string | null
          connected_at: string | null
          expires_at: string | null
          last_sync_at: string | null
          refresh_token: string | null
          scope: string | null
          strava_athlete_id: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token?: string | null
          athlete_city?: string | null
          athlete_country?: string | null
          athlete_firstname?: string | null
          athlete_id?: string | null
          athlete_lastname?: string | null
          athlete_profile?: string | null
          connected_at?: string | null
          expires_at?: string | null
          last_sync_at?: string | null
          refresh_token?: string | null
          scope?: string | null
          strava_athlete_id?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string | null
          athlete_city?: string | null
          athlete_country?: string | null
          athlete_firstname?: string | null
          athlete_id?: string | null
          athlete_lastname?: string | null
          athlete_profile?: string | null
          connected_at?: string | null
          expires_at?: string | null
          last_sync_at?: string | null
          refresh_token?: string | null
          scope?: string | null
          strava_athlete_id?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          current_period_end: string | null
          price_id: string | null
          status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_end: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          current_period_end?: string | null
          price_id?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          current_period_end?: string | null
          price_id?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_my_strava_connection: {
        Args: never
        Returns: {
          athlete_city: string
          athlete_country: string
          athlete_firstname: string
          athlete_id: string
          athlete_lastname: string
          athlete_profile: string
          connected_at: string
          expires_at: string
          last_sync_at: string
          scope: string
          strava_athlete_id: number
          updated_at: string
          user_id: string
        }[]
      }
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
