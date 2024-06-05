export type Order = {
  name: string;
  email: string;
  state: string;
  city: string;
  zip: string;
  street: string;
  house: string;
};

export type Meal = {
  id?: string;
  category: string;
  name: string;
  price: number;
  image?: FileList;
  imageUrl?: string;
  description: string;
  restaurant: string;
};
