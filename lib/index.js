/**
 * Checks if an object has all properties received, even if they are nested. And 
 * optionally check their value's data type
 * 
 * @param {Object} data Object to check  
 * @param {Array} keys  Array of strings with the property names. It can check 
 *                      nested properties splitted by a dot. And It can contain 
 *                      objects with a the properties {name,type} to evaluate
 *                      data types. ['a','b.c','d'] or [{name:'b.c',type:'string'}]
 */
const checker = (data, keys) => {

    if (!data || !keys || !Array.isArray(keys)) { return false; }

    /**
     * Get object key to validate data types separately
     * @param {Object|String} key Property to check
     */
    const getKeyProperties = (key) => {
        if (!key) { return null; }
        let type, nested, rest;

        // Get all nested names splitted by a dot
        nested = key.name
            ? key.name.split('.')
            : typeof key === 'string'
                ? key.split('.')
                : [];

        // Gets the data type in case it is included
        type = key.type
            ? key.type
            : null;

        // The remaining names after the first dot
        rest = nested.length > 1
            ? nested.slice(1).join('.')
            : null;

        // Gets the key before the first dot
        key = nested.length > 0
            ? nested[0]
            : null;

        return key
            ? { key, type, rest }
            : null;
    };

    /**
     * Checks if the data has the property key and its optional
     * type recursevely if key's name is splitted by a dot
     * @param {Object} _data Object to process
     * @param {Object|String} key Property to check
     */
    const checkKey = (_data, key) => {
        if (!_data ||
            _data.constructor !== Object
        ) {
            return false;
        }
        // Gets the key property
        const keyProperty = getKeyProperties(key);
        return keyProperty
            ? keyProperty.rest
                ? checkKey(
                    _data[keyProperty.key],
                    {
                        name: keyProperty.rest,
                        type: keyProperty.type,
                    }
                )
                : _data.hasOwnProperty(keyProperty.key) &&
                (
                    !keyProperty.type ||
                    typeof _data[keyProperty.key] === keyProperty.type
                )
            : false;
    };

    let isValid;
    for (const key of keys) {
        isValid = checkKey(data, key);
        if (!isValid) { break; }
    }
    return isValid;
};
module.exports = checker;