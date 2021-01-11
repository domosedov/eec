import { InMemoryCache } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        todo(_, { args, toReference }) {
          if (args) {
            return toReference({
              __typename: "Todo",
              id: args.id,
            });
          }
        },
      },
    },
  },
});
