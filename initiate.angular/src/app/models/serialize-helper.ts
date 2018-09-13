export class SerializeHelper {
    fillFromObj(jsonObj: any) {
        for (var propName in jsonObj) {
            this[propName] = jsonObj[propName];
        }
    }
}