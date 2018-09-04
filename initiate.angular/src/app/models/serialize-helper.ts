export class SerializeHelper {
    fillFromJSONObj(jsonObj: any) {
        for (var propName in jsonObj) {
            this[propName] = jsonObj[propName];
        }
    }
}