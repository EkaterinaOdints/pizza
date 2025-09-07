import { Box, Heading, Field, Input, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useHookFormMask } from 'use-mask-input';
import { useEffect } from 'react';
import { useCart } from "@/components/context/context"

interface Props {
  description: string,
}

const OrderForm = (props: Props) => {
  const { description } = props;
  const { formData, setFormData, isOrderCleared, setOrderCleared, stepNumber, setFormValid, onFormSubmit } = useCart();
 
  const {
    register,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: formData || {
      firstName: "",
      phone: "",
      address: "",
      comments: "",
    },
  });

  const registerWithMask = useHookFormMask(register);
  const getErrorMessage = (error?: any) => typeof error?.message === "string" ? error.message : null;

  useEffect(() => {
    if (stepNumber === 1 && !isValid) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [stepNumber]);

  useEffect(() => {
    if (stepNumber === 1) {
      setFormValid(isValid)
    }
  }, [isValid]);

  useEffect(() => {
    if (isOrderCleared) {
      reset();
      const timerId = setTimeout(() => {
        setOrderCleared(false);
      }, 1000); 
      return () => clearTimeout(timerId);
    }
  }, [isOrderCleared]);

  useEffect(() => {
    setFormData(getValues());
  }, [onFormSubmit]);

  return (
    <form>
      <Box gridColumn="2">
        <Heading as="h2" textStyle="3xl" marginBottom="15px">{description}</Heading>
        <Stack gap="4" align="flex-start" width="100%">
          <Field.Root invalid={Boolean(errors.firstName)}>
            <Field.Label>Имя*</Field.Label>
            <Input 
              type="text" 
              {...register("firstName", {  
                required : "Имя обязательно", 
                pattern: { 
                  value: /^[A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё\s'-]*$/, 
                  message: "Имя может содержать только буквы, пробелы и дефисы", 
                } 
              })}
            />
            <Field.ErrorText>{getErrorMessage(errors.firstName)}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={Boolean(errors.phone)}>
            <Field.Label>Телефон*</Field.Label>
            <Input 
              type="tel" 
              {...registerWithMask("phone", "+7 (999) 999-99-99", {  
                required : "Телефон обязателен",
                pattern: {
                  value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                  message: "Неверный формат номера",
                }
              })} 
            />
            <Field.ErrorText>{getErrorMessage(errors.phone)}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={Boolean(errors.address)}>
            <Field.Label>Адрес доставки*</Field.Label>
            <Input 
              type="text" 
              {...register("address", {  
                required : "Адрес обязателен",
                pattern: {
                    value: /^[A-Za-zА-Яа-яЁё0-9\s.,\-\/]+$/,
                    message: "Неверный формат адреса",
                  }  
              })}
            />
            <Field.ErrorText>{getErrorMessage(errors.address)}</Field.ErrorText>
          </Field.Root>
          <Field.Root>
            <Field.Label>Комментарий к заказу</Field.Label>
            <Input 
              type="text" 
              {...register("comments")} 
            />
          </Field.Root>
        </Stack>
      </Box>
    </form>
  )
}

export default OrderForm;