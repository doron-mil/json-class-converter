# son-class-converter

[![npm](https://img.shields.io/npm/v/json-class-converter.svg)](https://npmjs.org/package/json-class-converter)


The package is utility to help serialize/deserialize JSON objects into/from specific JS/TS classes.

## Installation


    npm i --save json-class-converter


## Configurations

### Imporing

Add to the imports section 

    import { JsonClassConverter } from 'json-class-converter';

or 

    const { JsonClassConverter } = require('json-class-converter');

### Creation

    const converter = new JsonClassConverter( jsonConverterConfig );

Where jsonConverterConfig is an object ( implemnting JsonConverterConfigurationInterface )
containing :
    
    const jsonConverterConfig : JsonConverterConfigurationInterface = {
      conversionSchema: <Conversion Schema object>,
      classesMapArray: <Map of classes>,
      conversionFunctionsMapArray: <Map of functions >
    };

#### Conversion Schema object

An object that implements an array of ClassConversionSchemaInterface.
Each item in the array represent a class.

Each conversion receipt consists of:

    {    "className": <Name of class>,
          ["propertyConversionArray": <Array of conversions>]
    }
 
propertyConversionArray is optional. If doesn't exist the module will iterate the members of the 
input JSON and will try to find matching fields in the class.

Each element in "Array of conversions" is constructed of
    
    {   "propertyName": <Name of class property>",
        ["propertyNameInJson": <Name of JSON property>],
        ["conversionFunctionName": <Conversion function name>],
        ["conversionFunctionToJsonName": <Conversion function name>],
        ["type": <Class name>],
    }

Apart from propertyName, all other properties are optional:

- propertyName - Class name to be used for convering to/from. The class name must be mentioned in "classesMapArray" 
- propertyNameInJson - is the name as it appears in the JSON file. Use it if different form "propertyName".
- conversionFunctionName - If needed a special conversion from the value in the JSON to the class property's value.
- conversionFunctionToJsonName - If needed a special conversion from the class property's value to the JSON (when serialize to JSON) .
- type - Class name to be used for convering the value (or values, in case it is an array of values). 
The class name must be mentioned in "classesMapArray".

#### Map of classes

This will hold all the classes needed for serialization/deserialization.

Is an array of objects in the structure ( implementing ClassMapEntry ):

    {className: '<Name of Class>', clazz: <Class>}
    
Example :

    classesMapArray =  [
      {className: 'Foo', clazz: Foo},
      {className: 'Area', clazz: Area},
    ]
    
#### Map of functions

This will hold all the functions that are needed for special conversion 
( If no function is specified, value will be copied as is)

Is an array of objects in the structure ( implementing MethodMapEntry ):

    {methodName: '<Name of Method>', method: <Method>}
    
Example :

    functionsMapArray =  [
      {methodName: 'bar', method: bar},
      {methodName: 'dateConversion', method: dateConversion},
    ]

## Using

When need to convert to class (one or array of objects) use :
    
    const exampleJsonObj = {
      firstProperty : 'foo',
      secondProperty : 'bar',
    };
    const convertedNewClassesArray : MyClass[] = this.converter.convert<MyClass>(exampleJsonObj, 'MyClass');
    
If needed only one object, use :

    const convertedNewClass : MyClass = this.converter.convertOneObject<MyClass>(exampleJsonObj, 'MyClass');

If needed to convert to json, use (myClassInstance can be an object or array of objects):

    const jsonObject = this.converter.convertToJson(myClassInstance);

These examples are in TS but can easily be used in JS way - just get rid of the typings:

    const convertedNewClassesArray = this.converter.convert(exampleJsonObj, 'MyClass');
    const convertedNewClass = this.converter.convertOneObject(exampleJsonObj, 'MyClass');
    
    
## Further help
It was developed for my own needs .
I made it, because haven't found something similar.
I will see with time goes ,if there is interest and requests regarding this module, I will enhance this module
accordingly. 
Feel free to open bugs and suggestions. You are also welcome to join and contribute.
I have intentions to export the core functionality so other frameworks will be able to use it as well.

