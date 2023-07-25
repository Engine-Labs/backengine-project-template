export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string | null;
        };
        Insert: {
          id: string;
          name?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
        };
        Relationships: [];
      };
      comments: {
        Row: {
          body: string;
          created_at: string;
          id: string;
          post_id: string | null;
          user_id: string | null;
        };
        Insert: {
          body: string;
          created_at?: string;
          id: string;
          post_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          body?: string;
          created_at?: string;
          id?: string;
          post_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey";
            columns: ["post_id"];
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      entity_tags: {
        Row: {
          entity_id: string;
          entity_type: string;
          tag_id: string;
        };
        Insert: {
          entity_id: string;
          entity_type: string;
          tag_id: string;
        };
        Update: {
          entity_id?: string;
          entity_type?: string;
          tag_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "entity_tags_tag_id_fkey";
            columns: ["tag_id"];
            referencedRelation: "tags";
            referencedColumns: ["id"];
          },
        ];
      };
      inventory: {
        Row: {
          created_at: string;
          id: string;
          product_id: string | null;
          quantity: number | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          product_id?: string | null;
          quantity?: number | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          product_id?: string | null;
          quantity?: number | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "inventory_product_id_fkey";
            columns: ["product_id"];
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      order_items: {
        Row: {
          created_at: string;
          id: string;
          order_id: string | null;
          product_id: string | null;
          quantity: number | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          order_id?: string | null;
          product_id?: string | null;
          quantity?: number | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          order_id?: string | null;
          product_id?: string | null;
          quantity?: number | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_product_id_fkey";
            columns: ["product_id"];
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      order_tracking: {
        Row: {
          created_at: string;
          id: string;
          order_id: string | null;
          status: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          order_id?: string | null;
          status?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          order_id?: string | null;
          status?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "order_tracking_order_id_fkey";
            columns: ["order_id"];
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
      orders: {
        Row: {
          cancelled_at: string | null;
          completed_at: string | null;
          created_at: string;
          id: string;
          status: string | null;
          user_id: string | null;
        };
        Insert: {
          cancelled_at?: string | null;
          completed_at?: string | null;
          created_at?: string;
          id: string;
          status?: string | null;
          user_id?: string | null;
        };
        Update: {
          cancelled_at?: string | null;
          completed_at?: string | null;
          created_at?: string;
          id?: string;
          status?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      post_categories: {
        Row: {
          category_id: string;
          post_id: string;
        };
        Insert: {
          category_id: string;
          post_id: string;
        };
        Update: {
          category_id?: string;
          post_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "post_categories_category_id_fkey";
            columns: ["category_id"];
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "post_categories_post_id_fkey";
            columns: ["post_id"];
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
        ];
      };
      posts: {
        Row: {
          body: string;
          created_at: string;
          id: string;
          title: string;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          body: string;
          created_at?: string;
          id: string;
          title: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          body?: string;
          created_at?: string;
          id?: string;
          title?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          price: number | null;
          size: string | null;
          style: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          name: string;
          price?: number | null;
          size?: string | null;
          style?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          price?: number | null;
          size?: string | null;
          style?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      shopping_cart_items: {
        Row: {
          created_at: string;
          id: string;
          product_id: string | null;
          quantity: number | null;
          shopping_cart_id: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          product_id?: string | null;
          quantity?: number | null;
          shopping_cart_id?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          product_id?: string | null;
          quantity?: number | null;
          shopping_cart_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "shopping_cart_items_product_id_fkey";
            columns: ["product_id"];
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "shopping_cart_items_shopping_cart_id_fkey";
            columns: ["shopping_cart_id"];
            referencedRelation: "shopping_carts";
            referencedColumns: ["id"];
          },
        ];
      };
      shopping_carts: {
        Row: {
          created_at: string;
          id: string;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "shopping_carts_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      tags: {
        Row: {
          id: string;
          name: string | null;
        };
        Insert: {
          id: string;
          name?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
        };
        Relationships: [];
      };
      user_reviews: {
        Row: {
          comment: string | null;
          created_at: string;
          id: string;
          product_id: string | null;
          rating: number | null;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          comment?: string | null;
          created_at?: string;
          id: string;
          product_id?: string | null;
          rating?: number | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          comment?: string | null;
          created_at?: string;
          id?: string;
          product_id?: string | null;
          rating?: number | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_reviews_product_id_fkey";
            columns: ["product_id"];
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_reviews_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          created_at: string;
          email: string | null;
          id: string;
          password: string | null;
          updated_at: string;
          username: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id: string;
          password?: string | null;
          updated_at?: string;
          username?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: string;
          password?: string | null;
          updated_at?: string;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
