import {Definition} from "@hotwired/stimulus"

export interface ECMAScriptModule {
    __esModule: boolean
    default?: object
}



function flatten(obj: object) {
    var result = {};
    var tempResult = {};
    
    for (var property in obj)
    {
        if(obj[property]["__esModule"])
        {
            tempResult = {};
            tempResult[property] = obj[property]
            result ={
                ...result,
                ...tempResult
            }
        }
        else if((typeof obj) === 'object'){
            tempResult = {};
            tempResult = flatten(obj[property])
            result ={
                ...result,
                ...tempResult
            }
            
        }
    }
    return result;
    
}

// Declare a flatten function that takes
// object as parameter and returns the
// flatten object
const flattenObj = (ob) => {

    // The object which contains the
    // final result
    let result = {};

    // loop through the object "ob"
    for (const i in ob) {

        // We check the type of the i using
        // typeof() function and recursively
        // call the function again
        if (!ob[i]["__esModule"]) {
            const temp = flattenObj(ob[i]);
            for (const j in temp) {

                // Store temp in result
                result[i + "-" + j] = temp[j];
            }
        }

        // Else store ob[i] in result directly
        else {
            result[i] = ob[i];
        }
    }
    return result;
};


export function definitionsFromContext(context: object): Definition[] {
    var flatContext = flattenObj(context)
    return Object.keys(flatContext)
        .map((key: any) => definitionForModuleWithContextAndKey(flatContext, key))
        .filter((value: any) => value) as Definition[]
}

export function definitionForModuleWithContextAndKey(context: any, key: string): Definition | undefined {
    const identifier = identifierForContextKey(key)
    if (identifier) {
        return definitionForModuleAndIdentifier(Object(context)[key], identifier)
    }
}

export function definitionForModuleAndIdentifier(module: ECMAScriptModule, identifier: string): Definition | undefined {
    const controllerConstructor = module.default as any
    if (typeof controllerConstructor == "function") {
        return {identifier, controllerConstructor}
    }
}

export function identifierForContextKey(key: string): string | undefined {
    const logicalName = (key.match(/^(?:\.\/)?(.+)(?:[_-]controller\+?)/))[1];
    if (logicalName) {
        return logicalName.replace(/_/g, "-").replace(/\//g, "--")
    }
    return key
}