import { faker } from "@faker-js/faker";
faker.locale = "es"

export const generateProducts = () => {
  return {
    title: faker.title.findTitle(),
    description: faker.description.findDescription(),
    price: faker.price.findPrice(),
    code: faker.code.findCode(),
    stock: faker.stock.findStock(),
    status: faker.status.findStatus(),
  };
};