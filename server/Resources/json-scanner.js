function cleanseString(str){
    return str.replace(/[^\w\s]/gi,'').toLowerCase()//Remove whitespace, special characters and convert to lower case
}
//return an array of objects according to key, value, or key and value matching
function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else 
        //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
        
        val = cleanseString(val);
        key = cleanseString(key);
        objVal = cleanseString(obj[i].toString());
        if (cleanseString(i.toString()) == key && objVal == val || cleanseString(i.toString()) == key && val == '') { //
            objects.push(obj);
        } else if (objVal == val && key == ''){
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1){
                objects.push(obj);
            }
        }
    }
    return objects;
}

//return an array of values that match on a certain key
function getValues(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (cleanseString(i.toString()) == cleanseString(key)) {
            objects.push(obj[i]);
        }
    }
    return objects;
}

//return an array of keys that match on a certain value
function getKeys(obj, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getKeys(obj[i], val));
        } else if (cleanseString(obj[i].toString()) == cleanseString(val)) {
            objects.push(i);
        }
    }
    return objects;
}

module.exports.getObjects = getObjects;
module.exports.getValues = getValues;
module.exports.getKeys = getKeys;