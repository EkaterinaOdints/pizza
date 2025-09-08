export interface Product {
  id: string,
  name: string,
  price: number,
  img: string,
  availableToppingIdList?: string[]
  toppingList?: Topping[]
}

export interface Topping {
  id: string, 
  name: string, 
  price: number
}

export interface FormData {
  firstName: string,
  phone: string,
  address: string,
  comments: string,
}

export type FieldKeys = "firstName" | "phone" | "address" | "comments";