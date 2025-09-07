import { Box, Card, Image, Text, SimpleGrid, Heading } from "@chakra-ui/react";
import { useCart } from "@/components/context/context"

interface Props {
  description: string
}

const OrderComposition = (props: Props) => {
  const { description } = props;
  const { order, calcProductTotalPrice, totalPrice } = useCart();

  return (
    <SimpleGrid width="100%" gap="10px" gridColumn="1">
      <Heading as="h2" textStyle="3xl" marginBottom="15px">{description}</Heading>
      {order.map((item, index) => {
        return (
          <Card.Root key={`${item.id}${index}`}>
            <Image
              src={item.img}
              alt={item.name}
              maxHeight="100px"
            />
            <Text fontWeight="700">{`${item.name} - ${item.price} руб.`}</Text>
            {item.toppingList.length > 0 && 
              <Box>
                <Text textStyle="sm">Дополнительно:</Text>
                {item.toppingList.map((topping) => {
                  return (
                    <Text textStyle="xs" key={topping.id}>{`${topping.name} - ${topping.price} руб.`}</Text>
                  )
                })}
              </Box>
            }
              <Text fontWeight="700" marginTop="10px">{`Итого: ${calcProductTotalPrice(item)} руб.`}</Text>
          </Card.Root>
        )
      })}
      <Text fontWeight="700" textStyle="2xl">{`Итого: ${totalPrice} руб.`}</Text>
    </SimpleGrid>
  )
};

export default OrderComposition;