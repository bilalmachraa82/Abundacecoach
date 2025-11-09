export interface Database {
  public: {
    Tables: {
      transactions: {
        Row: {
          id: string;
          user_id: string;
          type: 'income' | 'expense';
          description: string;
          amount: number;
          category: string;
          date: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['transactions']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['transactions']['Insert']>;
      };
    };
  };
}
