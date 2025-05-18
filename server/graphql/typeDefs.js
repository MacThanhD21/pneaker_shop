import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Date
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    firstName: String
    lastName: String
    isAdmin: Boolean!
    token: String!
    shoeSize: Float
    shippingAddress: Shipping!
    createdAt: String!
    updatedAt: String!
    currentPassword: String
    topPicks: [String]
  }
  type Query {
    getUserById: User!
    getProducts(page: Int): [Product!]!
    getProductsByTitle(searchQuery: String): [Product!]!
    getProductsPagination(
      page: Int
      productsFiltersInput: ProductsFiltersInput
    ): ProductPagination!
    getProductById(productId: ID!): Product!
    getTopPicksProducts: [Product]!
    getDefaultTopPicks: [Product]!
    getUserCart: Cart!
    getUserOrders: [Order]!
    getAllUsers: [User!]!
    getAllOrders: [Order]!
    getAllBanners: [Banner]!
    getActiveBanners: [Banner]!
  }
  type OrderFix {
    id: ID!
    purchasedBy: ID!
    datePurchased: Date!
    orderProducts: [CartProductsFix!]!
  }
  type CartProductsFix {
    productId: String!
    productPrice: Int!
    size: [Float!]!
  }
  type Banner {
    id: ID!
    image: String!
    title: String!
    description: String
    link: String
    isActive: Boolean!
    order: Int!
    createdAt: String!
    updatedAt: String!
  }
  input ProductsFiltersInput {
    brand: String
    size: Float
    color: String
    price: [Int]
    sort: String
    rates: Float
  }

  type Shipping {
    city: String!
    postalCode: String!
    country: String!
    address: String!
    phoneNumber: String!
  }

  type ProductPagination {
    products: [Product!]!
    numOfPages: Int
  }

  type Product {
    id: ID!
    title: String!
    brand: String!
    model: String!
    price: Float!
    image: String
    rates: Float!
    numReviews: Int!
    userReviews: [ID!]
    reviews: [Reviews]
    color: [String]!
    inStock: Boolean!
    size: [ProductSize]!
    totalPages: Int
    quantity: Int!
    description: String!
    additionalInfo: String!
    imageList: [String]!
  }
  type ProductSize {
    size: Float!
    quantity: Int!
  }
  type TopPicksProducts {
    id: ID!
    title: String!
    rates: Int!
    image: String!
    price: Float!
  }

  type Reviews {
    userId: ID!
    rating: Float!
    comment: String!
    createdAt: String!
    imageList: [String]!
  }

  

  type Order {
    purchasedBy: ID!
    orderProducts: [CartProducts!]!
    datePurchased: Date
    id: ID
  }
  type Cart {
    userId: ID!
    cartProducts: [CartProducts]!
  }
  type CartProducts {
    productId: String!
    size: Float!
    productPrice: Int!
    id: ID
    selected: Boolean!
    quantity: Int!
  }

  input RegisterInput {
    email: String!
    username: String!
    password: String!
    confirmedPassword: String!
  }

  input UpdateUserInput {
    email: String
    username: String
    firstName: String
    lastName: String
    shoeSize: Float
    password: String
    currentPassword: String
  }

  input UpdateShippingInput {
    city: String
    postalCode: String
    country: String
    phoneNumber: String
    address: String
  }

  input AddProductInput {
    title: String!
    model: String!
    brand: String!
    image: String!
    price: String
    color: String
    size: [ProductSizeInput!]!
  }
  input ProductSizeInput {
    size: Float!
    quantity: Int!
  }
  input UpdateProductInput {
    productId: ID
    title: String
    model: String
    brand: String
    image: String
    price: String
    color: String
    size: String
  }
  input FullUserInput {
    email: String
    username: String
    firstName: String
    lastName: String
    password: String
  }
  input BannerInput {
    image: String!
    title: String!
    description: String
    link: String
    order: Int
  }
  input UpdateBannerInput {
    image: String
    title: String
    description: String
    link: String
    isActive: Boolean
    order: Int
  }
  type Mutation {
    login(username: String!, password: String!, recaptchaToken: String!): User!
    register(registerInput: RegisterInput, recaptchaToken: String!): User!
    addProduct(addProductInput: AddProductInput): Product!
    updateProduct(updateProductInput: UpdateProductInput): Product!
    updateUser(updateUserInput: UpdateUserInput): User!
    updateShipping(updateShippingInput: UpdateShippingInput): User!
    addToCart(
      userId: ID!
      productId: ID!
      size: Float!
      productPrice: Int!
      quantity: Int!
    ): Cart!
    deleteProductFromCart(id: ID!): Cart!
    createProductReview(productId: ID!, userRate: Int!, comment: String!): Product!
    createOrder: Order!
    updateCartItemsSelection(cartProductIds: [ID!]!, selected: Boolean!): Cart!
    updateRoleUser(userId: ID!, isAdmin: Boolean!): User!
    deleteUser(userId: ID!): User!
    deleteProduct(productId: ID!): Product!
    updateCartItemQuantity(productId: ID!, size: Float!, quantity: Int!): Cart!
    createBanner(input: BannerInput!): Banner!
    updateBanner(id: ID!, input: UpdateBannerInput!): Banner!
    deleteBanner(id: ID!): Banner!
  }

    
`;
