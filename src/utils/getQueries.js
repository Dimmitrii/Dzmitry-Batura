import { gql } from 'graphql-request'

const getQueries = (query, type)=>{
    if(type === "oneProduct"){
        return gql`
            query{
                product(id: "${query}"){
                    id
                    name
                    description
                    gallery
                    brand
                    prices{
                        currency{
                            label
                            symbol
                        }
                        amount
                    }
                    attributes{
                        id
                        name
                        type
                        items{
                            value
                            id
                        }
                    }
                }
            }
        `
    }
    return gql`
        query {
            category(input: { title: "${query}" }) {
                products{
                    brand
                    id
                    name
                    description
                    inStock
                    gallery
                    prices{
                        currency{
                            label
                            symbol
                        }
                        amount
                    }
                    attributes{
                        id
                        name
                        type
                        items{
                            value
                            id
                        }
                    }
                }
            }
        }
    `
}

export default getQueries