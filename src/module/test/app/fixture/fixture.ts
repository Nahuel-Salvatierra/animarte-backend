export const user1 = {
  id: 1,
  name: 'name1',
  lastName: 'lastName1',
  email: 'email1@email.com',
  password: 'password',
  hash: 'asdf',
};

export const category1 = {
  id: 1,
  name: 'category1',
  price: 99,
};

export const product1 = {
  id: 1,
  title: 'title1',
  description: 'description1',
  image: 'image1',
  category: category1.id,
};

export const fixtureTrees = {
  User: [user1],
  Category:[category1],
  Product:[product1]
};
