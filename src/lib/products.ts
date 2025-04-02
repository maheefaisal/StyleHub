export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'men' | 'women';
  image: string;
  sizes: string[];
  colors: string[];
}

// For demo purposes, we'll use placeholder images
const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDYwMCA2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiNlMmUyZTIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSIyOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmLCBtb25vc3BhY2UiIGZpbGw9IiM2NjY2NjYiPlByb2R1Y3QgSW1hZ2UgUGxhY2Vob2xkZXI8L3RleHQ+PC9zdmc+';

// Real images from our local folder
const menImages = [
  '/images/men/99f66dfd-2cff-4156-8576-e08dffb21bb0.webp',
  '/images/men/dark background hyper casual.webp',
  '/images/men/ea9d492f-6df2-40a9-849d-8eb2fbfe9956.webp',
  '/images/men/photograph of Three young dangerous but handsome m.webp',
  '/images/men/Jean paul gaultier inspired.webp'
];

const womenImages = [
  '/images/women/c0a32fd9-95eb-4525-9815-fccae4db51bc.webp',
  '/images/women/0509cb33-e287-4831-a5c4-3aacf871e285.webp',
  '/images/women/37d1d006-645f-4bc1-be40-562a4677d5c2.webp',
  '/images/women/6b03e05e-4ba2-4482-8704-6c6a0ff27736.webp'
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 24.99,
    description: 'Essential cotton t-shirt with a comfortable fit and timeless design.',
    category: 'men',
    image: menImages[0],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Gray']
  },
  {
    id: '2',
    name: 'Slim-Fit Jeans',
    price: 59.99,
    description: 'Modern slim-fit jeans with stretch for maximum comfort.',
    category: 'men',
    image: menImages[1],
    sizes: ['30', '32', '34', '36'],
    colors: ['Blue', 'Black', 'Light Blue']
  },
  {
    id: '3',
    name: 'Casual Button-Down Shirt',
    price: 45.99,
    description: 'Versatile button-down shirt perfect for any casual occasion.',
    category: 'men',
    image: menImages[2],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'White', 'Black']
  },
  {
    id: '4',
    name: 'Hooded Sweatshirt',
    price: 39.99,
    description: 'Cozy hooded sweatshirt with kangaroo pocket and soft inner lining.',
    category: 'men',
    image: menImages[3],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Gray', 'Black', 'Navy']
  },
  {
    id: '5',
    name: 'Fitted Blazer',
    price: 89.99,
    description: 'Elegant blazer with a modern cut, perfect for formal occasions.',
    category: 'men',
    image: menImages[4] || menImages[0],
    sizes: ['38', '40', '42', '44'],
    colors: ['Navy', 'Black', 'Gray']
  },
  {
    id: '6',
    name: 'Floral Summer Dress',
    price: 49.99,
    description: 'Light and airy dress with floral pattern, perfect for warm days.',
    category: 'women',
    image: womenImages[0],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Floral Print', 'Blue', 'Red']
  },
  {
    id: '7',
    name: 'High-Waisted Jeans',
    price: 64.99,
    description: 'Stylish high-waisted jeans with a flattering fit.',
    category: 'women',
    image: womenImages[1],
    sizes: ['26', '28', '30', '32'],
    colors: ['Medium Blue', 'Dark Blue', 'Black']
  },
  {
    id: '8',
    name: 'Oversized Knit Sweater',
    price: 54.99,
    description: 'Cozy oversized sweater with a soft knit texture.',
    category: 'women',
    image: womenImages[2],
    sizes: ['S', 'M', 'L'],
    colors: ['Beige', 'Pink', 'Gray']
  },
  {
    id: '9',
    name: 'Blouse with Bow Detail',
    price: 39.99,
    description: 'Elegant blouse with bow detail at the neckline.',
    category: 'women',
    image: womenImages[3],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Blush']
  },
  {
    id: '10',
    name: 'Leather Jacket',
    price: 149.99,
    description: 'Classic leather jacket with a modern twist, suitable for any season.',
    category: 'women',
    image: womenImages[0],
    sizes: ['S', 'M', 'L'],
    colors: ['Black', 'Brown', 'Tan']
  }
]; 