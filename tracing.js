const { Resource } = require("@opentelemetry/resources");
const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions");
const { CollectorTraceExporter } = require('@opentelemetry/exporter-collector-grpc');
const { BatchSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { trace } = require("@opentelemetry/api");

// instrument express, http, grpc, aws services & register instrumentations
const { ExpressInstrumentation } = require("opentelemetry-instrumentation-express");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const { GrpcInstrumentation } = require('@opentelemetry/instrumentation-grpc');
const { AwsInstrumentation } = require("@opentelemetry/instrumentation-aws-sdk");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");

// xray components
const { AWSXRayPropagator } = require("@opentelemetry/propagator-aws-xray");
const { AWSXRayIdGenerator } = require("@opentelemetry/id-generator-aws-xray");

// exporter
module.exports = (serviceName) => {
  const exporter = new CollectorTraceExporter();

  const tracerConfig = {
    idGenerator: new AWSXRayIdGenerator(),
    instrumentations: [],
    resource: Resource.default().merge(new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName
    }))
  }

  const traceProvider = new NodeTracerProvider(tracerConfig);
  traceProvider.addSpanProcessor(new BatchSpanProcessor(exporter));

  // register the tracer provider w an X-ray propagator
  traceProvider.register({
    propagator: new AWSXRayPropagator(),
  });

  registerInstrumentations({
    instrumentations: [
      new HttpInstrumentation(),
      new GrpcInstrumentation(),
      new ExpressInstrumentation(),
      new AwsInstrumentation({
        suppressInternalInstrumentation: true
      }),
    ],
    tracerProvider: traceProvider,
  });

  return trace.getTracer(serviceName);
};