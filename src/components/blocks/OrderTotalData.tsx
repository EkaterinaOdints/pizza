import { Flex, Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { useCart } from "@/components/context/context";

const formFieldsTranslates = {
  firstName: "Имя",
  phone: "Телефон",
  address: "Адрес",
  comments: "Комментарий"
}

interface Props {
  description: string
}

type FieldKeys = "firstName" | "phone" | "address" | "comments";

const OrderTotalData = (props: Props) => {
  const { description } = props;
  const { order, calcProductTotalPrice, totalPrice, formData } = useCart();

  return (
    <SimpleGrid width="100%" gap="10px" gridColumn="3">
      <Heading as="h2" textStyle="3xl" marginBottom="15px">{description}</Heading>
      <Flex flexDirection="column" gap="10px" border="1px solid black" padding="15px">
        <Heading as="h3" textStyle="2xl" marginBottom="10px">Состав заказа:</Heading>
        {order.map((item, index) => {
          return (
            <Flex justifyContent="space-between" gap="15px" key={`${item.id}${index}`}>
              <Box>
                <Text fontWeight="700">{item.name}</Text>
                {item.toppingList.length > 0 && 
                  <Box>
                    <Text textStyle="sm">Дополнительно:</Text>
                    {item.toppingList.map((topping) => {
                      return (
                        <Text textStyle="xs" key={topping.id}>{topping.name}</Text>
                      )
                    })}
                  </Box>}
              </Box>
              <Text fontWeight="700">{`${calcProductTotalPrice(item)} руб.`}</Text>
            </Flex>
          )
        })}
        <Flex justifyContent="space-between" gap="15px" fontWeight="700" textStyle="2xl" borderTop="1px solid black" marginTop="15px">
          <Text>Итого</Text>
          <Text>{`${totalPrice} руб.`}</Text>
        </Flex>
      </Flex>
      <Flex flexDirection="column" gap="10px" border="1px solid black" padding="15px">
        <Heading as="h3" textStyle="2xl" marginBottom="10px">Данные клиента:</Heading>
        {Object.keys(formData).map((item) => {
          const id = item as FieldKeys;
            return (
              <Flex flexDirection="column" gap="5px">
                <Text fontWeight="700">{`${formFieldsTranslates[id]}:`}</Text>
                <Text>{formData[id]}</Text>
              </Flex>
            )
          })
        }
      </Flex>
    </SimpleGrid>
  )
};

export default OrderTotalData;