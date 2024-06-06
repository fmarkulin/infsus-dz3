const { Client, logger } = await import("camunda-external-task-client-js")

// konfiguracija klijenta
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger }
const client = new Client(config)

export default client
