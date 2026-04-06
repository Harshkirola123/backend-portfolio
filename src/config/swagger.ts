import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Portfolio API",
    description: "Auto generated Swagger docs",
  },
  host: "localhost:5000",
  schemes: ["http"],
};

const outputFile = "../../swagger-output.json";
const endpointsFiles = ["./src/index.ts"];

swaggerAutogen()(outputFile, endpointsFiles, doc);
