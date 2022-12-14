# Purpose
This npm package is an auto-instrumentation agent for your applications to generate and export traces. It is a pre-requisite for [Cascade](https://github.com/try-cascade) users who wish to deploy their applications on AWS ECS with observability, and is compatible with AWS X-Ray as the tracing backend.

# Set Up Tracing Agent
1. install the cascade-agent package
```bash
npm install cascade-agent
```

2. require `cascade-agent` and specify the name of the service at the top of each service's server code
```bash
require('cascade-agent')('my-service');
```

# View Traces on AWS X-Ray
- prior to deployment on ECS, you will be required to provide the following AWS user credentials:
  - `AWS_REGION`
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`

That's it! Head over to [Cascade Compose](https://github.com/try-cascade/cascade-compose) to finish deploying your application and start viewing traces.