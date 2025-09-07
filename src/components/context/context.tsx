import { createContext, ReactNode, useState, useEffect, useContext } from "react";
import type { OrderProduct, FormData } from "@/types/types";

const LS_ORDER_KEY = "order";
const LS_FORM_KEY = "formData";
const LS_STEP_KEY = "currentOrderStep";

interface ContextType {
  stepNumber: number,
  setStep: React.Dispatch<React.SetStateAction<number>>,

  addToCart: (item: OrderProduct) => void,
  order: OrderProduct[],
  clearOrder: () => void,
  isOrderCleared: boolean,
  setOrderCleared: React.Dispatch<React.SetStateAction<boolean>>,

  calcProductTotalPrice: (item: OrderProduct) => number,
  totalPrice: number,
  
  formData: FormData,
  setFormData: React.Dispatch<FormData>,
  isFormValid: boolean,
  setFormValid: React.Dispatch<React.SetStateAction<boolean>>,
  setOnFormSubmit: React.Dispatch<React.SetStateAction<boolean>>, 
  onFormSubmit: boolean,
}

interface Props {
  children: ReactNode
}

const Context = createContext<ContextType | undefined>(undefined);

const getFormData = (): FormData => {
  const localStorageFormData = localStorage.getItem(LS_FORM_KEY);

  return localStorageFormData ? JSON.parse(localStorageFormData) : {
    firstName: "",
    phone: "",
    address: "",
    comments: "",
  };
}

const getOrder = (): OrderProduct[] => {
  const localStorageOrder = localStorage.getItem(LS_ORDER_KEY);

  return localStorageOrder ? JSON.parse(localStorageOrder) : [];
}

const calcProductTotalPrice = (item: OrderProduct) => {
  let productPrice = 0;
  productPrice += item.price;

  item.toppingList.forEach((topping) => {
    productPrice += topping.price;
  })

  return productPrice;
}

const calcTotalPrice = (order: OrderProduct[]) => {
  let price = 0;

  order.forEach((item) => {
    price += calcProductTotalPrice(item);
  })

  return price;
}

const updateLSFormData = (data: FormData) => {
  localStorage.setItem(LS_FORM_KEY, JSON.stringify(data));
}

const updateLSCart = (order: OrderProduct[]) => {
  localStorage.setItem(LS_ORDER_KEY, JSON.stringify(order))
}

export const ContextProvider = (props: Props) => {
  const { children } = props;

  const [order, setOrder] = useState(getOrder());
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState(getFormData());
  const [isOrderCleared, setOrderCleared]  = useState(false);
  const [isFormValid, setFormValid] = useState(true);
  const [onFormSubmit, setOnFormSubmit] = useState(false);

  const savedStep = localStorage.getItem(LS_STEP_KEY);
  const initialStep = savedStep ? Number(savedStep) : 0;
  const [stepNumber, setStep] = useState(initialStep);

  useEffect(() => {
    setTotalPrice(calcTotalPrice(order));
  }, [order]);

  useEffect(() => {
    if (onFormSubmit) {
      updateLSFormData(formData);
    }
  }, [formData]);

  useEffect(() => {
    localStorage.setItem(LS_STEP_KEY, stepNumber.toString());
  }, [stepNumber]);

  useEffect(() => {
    if (isOrderCleared) {
      setOrder([]);
      updateLSCart([]);
    }
  }, [isOrderCleared]);

  const updateCart = (newOrder: OrderProduct[]) => {
    setOrder(newOrder);
    updateLSCart(newOrder);
  };

  const addToCart = (item: OrderProduct) => {
    const newOrder = [...order, item];
    updateCart(newOrder);
  }

  const clearOrder = () => {
    updateCart([]);
    setFormData({
      firstName: "",
      phone: "",
      address: "",
      comments: "",
    });
    setOrderCleared(true);
    setStep(0);
  }

  return (
    <Context.Provider value={{stepNumber, setStep, addToCart, order, clearOrder, isOrderCleared, setOrderCleared, calcProductTotalPrice, totalPrice, formData, setFormData, isFormValid, setFormValid, setOnFormSubmit, onFormSubmit }}>
      {children}
    </Context.Provider>
  )
}

export const useCart = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useCart must be used inside <ContextProvider>')
  }

  return context;
}