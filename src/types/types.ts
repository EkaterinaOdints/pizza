export interface Topping {
  id: string, 
  name: string, 
  price: number
}

export interface OrderProduct {
  id: string,
  name: string,
  price: number,
  img: string,
  toppingList: Topping[]
}

export interface FormData {
  firstName: string,
  phone: string,
  address: string,
  comments: string,
}