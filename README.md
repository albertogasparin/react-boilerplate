React Bower boilerplate
=====================

The minimal dev environment to get started with React.  
Includes:
- React
- React router
- Reflux
- Node Sass
- Source maps output
- Karma + Jasmine for testing


## Development Server

```
npm install
npm start
open http://localhost:3000
```

Now edit `app/Application/index.jsx`.  
Your changes will appear without reloading the browser.


## How-to's

### Add Javascript libraries with Bower 

Install the library as usual. Then open `webpack.config.js` and add an additional line after the `config` variable:

```
config.addVendor('libname', '/libpath/libfile.js');
```

Where `libname` is the name that you will use with require (es: 'jquery') and `libpath` is the library path **relative** to the Bower folder (so without `bower_components`). If you want to use different files between dev/production environments, then use `isProduction` flag.


## Testing

To test with Karma, install karma-cli or run:

```
./node_modules/karma/bin/karma start
```

For an example of how to setup a test for a Component, have a look at the `Application/__tests__`.
I've written some test helpers in order to easily mock/stub required modules and deal with react router.



### Useful resources

http://substantial.com/blog/2014/11/11/test-driven-react-how-to-manually-mock-components/  


### Examples

https://github.com/WRidder/react-spa  
https://github.com/TYRONEMICHAEL/react-component-boilerplate  
