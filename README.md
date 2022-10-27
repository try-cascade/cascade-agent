# cascade-agent
  - create a package directory
  - create a repo for the package
  - `npm init` to set values for the package (the name of the package will be used when testing with `sudo npm link`)
  - create the entry point js to put the app logic (this will be the contents of `tracing.js`)
    - make sure to `module.export = <func>`

# pre-requisites
  - in order to view traces in aws x-ray, make sure to include the following aws credentials in app's  .env file
    - `AWS_REGION`
    - `AWS_ACCESS_KEY_ID`
    - `AWS_SECRET_ACCESS_KEY`
