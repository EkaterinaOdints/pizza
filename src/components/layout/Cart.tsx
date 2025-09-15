import { Container, Box, Heading, VisuallyHidden, Button, ButtonGroup, Steps, Stack } from "@chakra-ui/react";
import { useCart } from "@/components/context/context";
import { toaster } from "@/components/ui/toaster";
import { Link } from "react-router-dom";

import OrderComposition from "@/components/blocks/OrderComposition";
import OrderForm from "@/components/blocks/OrderForm";
import OrderTotalData from "@/components/blocks/OrderTotalData";

const steps = [
  {
    title: "Шаг 1",
    description: "Просмотр заказа",
    inner: (description: string) => {
      return <OrderComposition description={description} />
    }
  },
  {
    title: "Шаг 2",
    description: "Ввод данных клиента",
    inner: (description: string) => {
      return <OrderForm description={description} />
    }
  },
  {
    title: "Шаг 3",
    description: "Подтверждение заказа",
    inner: (description: string) => {
      return <OrderTotalData description={description} />
    }
  },
]

const STEPS_BUTTON_WIDTH = "calc(50% - 3px)";

const Cart = () => {
  const { stepNumber, setStep, isFormValid, clearOrder, order } = useCart();

  const renderNextButton = () => {
    let disabled = false;

    switch (stepNumber) {
      case 0: {
        disabled = !order.length
        break
      }
      case 1: {
        disabled = !isFormValid;
        break
      }
    }

    if (stepNumber === steps.length - 1) {
      return (
        <Button asChild width={STEPS_BUTTON_WIDTH}>
          <Link 
            to="/"
            onClick={() => {
              toaster.create({
                description: "Заказ оформлен", 
                type: "info",
              });
              clearOrder();
            }}
          >
            Подтвердить
          </Link>
        </Button>
      )
    }

    return (
      <Button width={STEPS_BUTTON_WIDTH} disabled={disabled}>
        Далее
      </Button>
    )
  }
  
  return (
    <Box as="section">
      <Container>
        <VisuallyHidden>
          <Heading as="h1">Оформление заказа</Heading>
        </VisuallyHidden>
        <Box maxWidth="400px" margin="0 auto">
          <Box>
            <Steps.Root
              orientation="horizontal"
              height="auto"
              defaultStep={0}
              count={steps.length}
              step={stepNumber}
              onStepChange={(e) => {
                if (e.step > steps.length - 1) {
                  return
                }
                setStep(e.step)
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
              }}
            >
              <Steps.List>
                { steps.map((step, index) => (
                  <Steps.Item key={index} index={index} title={step.title}>
                    <Steps.Indicator />
                    <Steps.Title>{step.title}</Steps.Title>
                    <Steps.Separator />
                  </Steps.Item>
                )) }
              </Steps.List>
              <Stack>
                { steps.map((step, index) => (
                  <Steps.Content key={index} index={index}>
                    <Box>
                      { step.inner(step.description) }
                    </Box>
                  </Steps.Content>
                )) }
                <ButtonGroup size="sm" variant="outline" gap="6px" justifyContent="space-between">
                  <Steps.PrevTrigger asChild>
                    { stepNumber === 0 
                    ? <Button asChild width={STEPS_BUTTON_WIDTH} disabled={false}>
                        <Link to="/">Назад</Link>
                      </Button>
                    : <Button width={STEPS_BUTTON_WIDTH}>Назад</Button>
                    }
                  </Steps.PrevTrigger>
                  <Steps.NextTrigger asChild>
                    { renderNextButton() }
                  </Steps.NextTrigger>
                </ButtonGroup>
              </Stack>
            </Steps.Root>
          </Box>
        </Box>
      </Container>
    </Box>
  )
};

export default Cart;