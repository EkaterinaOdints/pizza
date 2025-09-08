import { Container, Box, Heading, VisuallyHidden, SimpleGrid, Card, Image, Text, Button, AspectRatio } from "@chakra-ui/react";
import { Modal } from "@/components/ui/Modal"
import { products } from "@/mocks/products.tsx";
import { Link } from 'react-router-dom';

const Catalog = () => {
  return (
    <Box as="section">
      <Container>
        <VisuallyHidden>
          <Heading as="h1">Каталог</Heading>
        </VisuallyHidden>
        <Button asChild position="fixed" zIndex="10" borderRadius="50%" width="100px" height="100px" whiteSpace="wrap">
          <Link to="/cart">Перейти в корзину</Link>
        </Button>
        <SimpleGrid minChildWidth="230px" gap="40px">
          { products.map((product) => {
            return (
              <Card.Root key={product.id}>
                <AspectRatio ratio={1 / 1} width="100%">
                  <Image
                    src={product.img}
                    alt={product.name}
                  />
                </AspectRatio>
                <Card.Title>{product.name}</Card.Title>
                <Text>{`${product.price} руб.`}</Text>
                <Button onClick={() => Modal.open("topping", {product: product})}>Добавить в корзину</Button>
              </Card.Root>
            )
          }) }
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Catalog;