import { graph, connector, config } from "@grafbase/sdk";

const g = graph.Standalone();

const etix = connector.OpenAPI("Etix", {
  url: "https://api.etix.com/v3/",
  schema: "https://api.etix.com/v3/openapi.json",
  headers: (headers) => {
    headers.set("Authorization", { forward: "Authorization" });
  },
  transforms: (schema) => {
    schema.exclude("Mutation.*");
  },
});

g.datasource(etix);

export default config({
  graph: g,
  auth: {
    rules: (rules) => {
      rules.public();
    },
  },
});
