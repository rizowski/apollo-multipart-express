const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const typeDefs = gql`
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    uploads: [File]
  }

  type Mutation {
    singleUpload(file: Upload!): File!
  }
`;

const resolvers = {
  Query: {
    uploads: (parent, args) => {}
  },
  Mutation: {
    singleUpload: (parent, args) => {
      return args.file.then(file => {
        //Contents of Upload scalar: https://github.com/jaydenseric/graphql-upload#class-graphqlupload
        //file.stream is a node stream that contains the contents of the uploaded file
        //node stream api: https://nodejs.org/api/stream.html
        console.log(file.filename);
        return file;
      });
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready`);
});
