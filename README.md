# cascade-agent
  - create a package directory
  - create a repo for the package
  - `npm init` to set values for the package (the name of the package will be used when testing with `sudo npm link`)
  - create the entry point js to put the app logic (this will be the contents of `tracing.js`)
    - make sure to `module.export = <func>`

# testing cascade-agent
  - create a test directory
  - create a `script.js` file
  - import the package we created and use the package (make sure to specify the service)
  - `npm link <package-name>` before running the script
