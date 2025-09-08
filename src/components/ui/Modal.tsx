import { Dialog, Portal, createOverlay, CloseButton, Checkbox, CheckboxGroup, Fieldset, For, Button } from "@chakra-ui/react"
import { topping } from "@/mocks/products";
import { useCart } from "@/components/context/context";
import { useState } from "react";
import type { Topping, Product } from "@/types/types"

interface Props {
  product: Product
}

export const Modal = createOverlay((props: Props) => {
  const { product, ...rest } = props;
  const { addToCart } = useCart();

  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

  const availableToppingList = topping.filter((item) => product.availableToppingIdList?.includes(item.id));
  const orderProduct = structuredClone(product);
  delete orderProduct.availableToppingIdList;

  const updateSelectedToppings = (item: Topping) => {
    if (selectedToppings.includes(item)) {
      setSelectedToppings(selectedToppings.filter((topping) => topping !== item))
    } else {
      setSelectedToppings([...selectedToppings, item]);
    }
  }

  const onAddButtonClick = () => {
    orderProduct.toppingList = selectedToppings;
    addToCart(orderProduct);
    Modal.close("topping")
  }

  return (
    <Dialog.Root {...rest}>
      <Portal>
        <Dialog.Backdrop minWidth="375px" height="100%" />
        <Dialog.Positioner minWidth="375px" height="100%">
          <Dialog.Content>
            <CloseButton position="absolute" top="0" right="0" onClick={() => Modal.close("topping")} />
            <Dialog.Body spaceY="4">
              <Fieldset.Root>
                <CheckboxGroup name="addIngredients" paddingRight="40px">
                  <Fieldset.Legend fontSize="sm" mb="2">
                    Выберите дополнительные ингредиенты
                  </Fieldset.Legend>
                  <Fieldset.Content>
                    <For each={availableToppingList}>
                      { (item) => (
                        <Checkbox.Root key={item.id} value={item.id} onCheckedChange={() => updateSelectedToppings(item)}>
                          <Checkbox.HiddenInput />
                          <Checkbox.Control />
                          <Checkbox.Label>{`${item.name} - ${item.price} руб.`}</Checkbox.Label>
                        </Checkbox.Root>
                      ) }
                    </For>
                  </Fieldset.Content>
                </CheckboxGroup>
              </Fieldset.Root>
              <Button width="100%" onClick={onAddButtonClick}>Добавить</Button>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
})
