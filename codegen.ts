import type { CodegenConfig } from "@graphql-codegen/cli";
import { environments } from "./src/environments";

const config: CodegenConfig = {
  schema: environments.GRAPHQL_BASE_URL,
  documents: ["src/graphql/queries.ts"],
  ignoreNoDocuments: true,
  generates: {
    "./src/graphql/generated/": {
      preset: "client",
      config: {
        documentMode: "string",
      },
    },
    "./schema.graphql": {
      plugins: ["schema-ast", "typescript-operations"],
      config: {
        includeDirectives: true,
        useTypeImports: true,
      },
    },
  },
};

export default config;
