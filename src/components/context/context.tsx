import { createContext, ReactNode, useState, useEffect, useContext } from "react";
import type { Product, FormData } from "@/types/types";
import { LS_KEY, DEFAULT_FORM_DATA } from "@/constants/constants";


interface ContextType {
  stepNumber: number,
  setStep: React.Dispatch<React.SetStateAction<number>>,

  addToCart: (item: Product) => void,
  order: Product[],
  clearOrder: () => void,

  calcProductTotalPrice: (item: Product) => number,
  totalPrice: number,
  
  formData: FormData,
  setFormData: React.Dispatch<FormData>,
  isFormValid: boolean,
  setFormValid: React.Dispatch<React.SetStateAction<boolean>>,
}

interface Props {
  children: ReactNode
}

const Context = createContext<ContextType | undefined>(undefined);

const getFormData = (): FormData => {
  const localStorageFormData = localStorage.getItem(LS_KEY.FORM);

  return localStorageFormData ? JSON.parse(localStorageFormData) : { ...DEFAULT_FORM_DATA };
}

const getOrder = (): Product[] => {
  const localStorageOrder = localStorage.getItem(LS_KEY.ORDER);

  return localStorageOrder ? JSON.parse(localStorageOrder) : [];
}

const getStep = (): number => {
  const localStorageStep = localStorage.getItem(LS_KEY.STEP);

  return localStorageStep ? Number(localStorageStep) : 0;
}

const calcProductTotalPrice = (item: Product) => {
  let productPrice = 0;

  productPrice += item.price;

  item.toppingList?.forEach((topping) => {
    productPrice += topping.price;
  })

  return productPrice;
}

const calcTotalPrice = (order: Product[]) => {
  let price = 0;

  order.forEach((item) => {
    price += calcProductTotalPrice(item);
  })

  return price;
}

const updateLSFormData = (data: FormData) => {
  localStorage.setItem(LS_KEY.FORM, JSON.stringify(data));
}

const updateLSCart = (order: Product[]) => {
  localStorage.setItem(LS_KEY.ORDER, JSON.stringify(order))
}

const updateLSStep = (step: number) => {
  localStorage.setItem(LS_KEY.STEP, step.toString())
}

export const ContextProvider = (props: Props) => {
  const { children } = props;

  const [order, setOrder] = useState(getOrder());
  const [stepNumber, setStep] = useState(getStep());
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState(getFormData());
  const [isFormValid, setFormValid] = useState(false);

  useEffect(() => {
    setTotalPrice(calcTotalPrice(order));
  }, [order]);

  useEffect(() => {
    updateLSFormData(formData);
  }, [formData]);

  useEffect(() => {
    updateLSStep(stepNumber)
  }, [stepNumber]);

  const updateCart = (newOrder: Product[]) => {
    setOrder(newOrder);
    updateLSCart(newOrder);
  };

  const addToCart = (item: Product) => {
    const newOrder = [...order, item];
    updateCart(newOrder);
  }

  const clearOrder = () => {
    updateCart([]);
    setFormData({ ...DEFAULT_FORM_DATA });
    setStep(0);
  }

  return (
    <Context.Provider value={{
      stepNumber,
      setStep,
      addToCart,
      order,
      clearOrder,
      calcProductTotalPrice,
      totalPrice,
      formData,
      setFormData,
      isFormValid,
      setFormValid
    }}>
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