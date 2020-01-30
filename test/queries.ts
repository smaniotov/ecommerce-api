import { gql } from 'apollo-server-core';

export const DELETE_PRODUCT = gql`
    mutation deleteProduct($id: String!) {
        deleteProduct(id: $id) {
            _id
            title
            description
        }
    }
`;

export const GET_PRODUCTS = gql`
    query getProducts($keyword: String, $page: Float, $size: Float, $sort: Float) {
        getProducts(
            sort: $sort
            size: $size
            page: $page
            keyword: $keyword
        ) {
        data {
            _id
            title
            description
            category
        }
        count
     }
    }
`;

export const PRODUCT_TYPE = gql`
    type ProductType {
        _id: String
        title: String!
        description: String!
        category: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
`

export const PAGINATED_PRODUCT_TYPE = gql`
    type PaginatedProductTypeResponse {
        data: [ProductType!]!
        count: Float!
    }
`

export const CREATE_PRODUCT_TYPE = gql`
    input CreateProductInput {
        title: String!
        description: String!
        category: String!
    }
`;

export const CREATE_PRODUCT = gql`
    mutation createProduct($product: CreateProductInput!) {
        createProduct(product: $product) {
            _id,
            title,
            description,
            category,
            createdAt,
            updatedAt
        }
    }
`;
