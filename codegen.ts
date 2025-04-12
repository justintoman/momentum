import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      "https://eguisehwhhlmucvoqfaf.graphql.us-east-1.nhost.run/v1": {
        headers: {
          "x-hasura-admin-secret": "peepeepoopoo",
        },
      },
    },
  ],
  documents: "src/lib/plans.ts",
  generates: {
    "src/lib/schema.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
        "typescript-nhost",
      ],
    },
  },
};
export default config;
