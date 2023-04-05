import { IProduct } from '../models/Product';

export const products: IProduct[] = [
  {
    name: 'Coca-cola',
    price: 5.5,
    qty: 10,
    categories: [
      {
        name: 'bebidas',
        parent: null,
      },
    ],
  },
  {
    name: 'Fanta',
    price: 5.5,
    qty: 10,
    categories: [
      {
        name: 'bebidas',
        parent: null,
      },
    ],
  },
  {
    name: 'ceasar salad',
    price: 10.5,
    qty: 5,
    categories: [
      {
        name: 'saladas',
        parent: null,
      }
    ],
  },
  {
    name: 'salada de frutas',
    price: 10.5,
    qty: 5,
    categories: [
      {
        name: 'saladas',
        parent: null,
      }
    ],
  },
  {
    name: 'brownie',
    price: 7.5,
    qty: 10,
    categories: [
      {
        name: 'doces',
        parent: null,
      }
    ],
  },
  {
    name: 'bolo de chocolate',
    price: 7.5,
    qty: 10,
    categories: [
      {
        name: 'doces',
        parent: null,
      }
    ],
  },
  {
    name: 'bolo de cenoura',
    price: 7.5,
    qty: 10,
    categories: [
      {
        name: 'doces',
        parent: null,
      }
    ],
  },
  {
    name: 'cheesecake',
    price: 10.5,
    qty: 5,
    categories: [
      {
        name: 'sobremesas',
        parent: null,
      }
    ],
  },
  {
    name: 'mousse de chocolate',
    price: 10.5,
    qty: 5,
    categories: [
      {
        name: 'sobremesas',
        parent: null,
      }
    ],
  }
]