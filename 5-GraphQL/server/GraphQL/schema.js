const { buildSchema } = require("graphql");
//The schema defines the structure of your GraphQL API. It describes the types, queries, and mutations available.

module.exports = buildSchema(`

    enum FactCategories{
    HISTORY 
    SCIENCE
    ART
    SPORTS
    TECHNOLOGY
    OTHER
    }

    type user{
    _id:ID
    email:String!
    password:String!
    }

    type Fact{
    _id:ID
    content:String!
    upVotes:[votes!]!
    downVotes:[votes!]!
    upvoteCount:Int!
    downvoteCount:Int!
    category:FactCategories!
    }

    type votes{
    _id:ID
    fact:Fact!
    isUpVote:Boolean!
    }

    type AuthResult{
    jwt:String!
    }

    type Query{
    hello : String!
    getFacts: [Fact!]!
    getFactsByCategory(category: FactCategories!): [Fact!]!
    }

    type Mutation{
    createFact(content:String! , category:FactCategories!):Fact!
    autenticate(email:String! , password:String!):AuthResult!
    vote(factId:ID! , isUpVote:Boolean!):Fact!
    deleteFact(factId:ID!):Boolean!
    }

    schema{
    query:Query
    mutation:Mutation
    }
    
`);
