export type LanternType = 'red' | 'star' | 'lotus' | 'rabbit' | 'gold';

export type WishCategory = 'doan-vien' | 'binh-an' | 'suc-khoe' | 'tai-loc' | 'hoc-van' | 'tinh-duyen';

export interface Wish {
  id: string;
  author: string;
  location?: string;
  content: string;
  category: WishCategory;
  lanternType: LanternType;
  likes: number;
  createdAt: string;
}

export interface GreetingCardData {
  recipient: string;
  sender: string;
  message: string;
  template: 'moon' | 'lantern' | 'rabbit' | 'cuoi';
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}
