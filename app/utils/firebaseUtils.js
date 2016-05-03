export function mergeArrayObjectWithKey(objects) {
    let new_objects = [];
    for (let key in objects) {
        let object = Object.assign(objects[key], {id: key});
        new_objects.push(object);
    }
    return new_objects;
}

export function mergeObjectWithKey(object, key) {
    return Object.assign(object, {id: key});
}