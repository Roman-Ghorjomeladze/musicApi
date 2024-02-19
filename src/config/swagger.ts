import YAML from "yamljs";

const swaggerDocument = YAML.load("swagger.yml");

export { swaggerDocument };
