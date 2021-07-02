import moment from 'moment';

import {JsonClassConverter, JsonConverterConfigurationInterface} from '../lib/jsonClassConverter';

import {ClassA} from './model/classA';

import jsonConvConfigUtil from './data/jsonConvConfigUtil';
import localConversionSchema from './data/conversion-schema.json';

import classAData from './data/mock-json-data.json';

const jsonConverterConfig: JsonConverterConfigurationInterface = {
    conversionSchema: localConversionSchema,
    conversionFunctionsMapArray: jsonConvConfigUtil.functionsMapArray,
    classesMapArray: jsonConvConfigUtil.classesMapArray
};

describe('JsonClassConverter', () => {

    let converterInstance: JsonClassConverter;
    let classAConvertedArray: Array<ClassA>;
    let jsonMap: Map<number, any>;

    beforeAll(() => {
        converterInstance = new JsonClassConverter(jsonConverterConfig);

        jsonMap = Array.from(classAData).reduce((previousValue: Map<number, any>, currentValue: any) => {
            return previousValue.set(Number(currentValue.id), currentValue);
        }, new Map<number, any>());
    });

    it('converterInstance should be created', () => {
        expect(converterInstance).toBeTruthy();
        expect(converterInstance instanceof JsonClassConverter).toBeTruthy();
    });

    it('converting class A', () => {
        classAConvertedArray = converterInstance.convert<ClassA>(classAData, 'ClassA');
        expect(classAConvertedArray.length).toEqual(classAData.length);
        classAConvertedArray.forEach((classA) => {
            expect(classA !== null && classA !== undefined).toBeTruthy();
            expect(classA instanceof ClassA).toBeTruthy();
            expect(classA.getBirthDateDay()).toBeTruthy();
            const fromJsonClassA = jsonMap.get(classA.id);
            expect(fromJsonClassA).toBeTruthy();
            expect(classA.fullName).toEqual(fromJsonClassA.name.full_name);
            expect(moment(classA.birthDate).isSame(moment(fromJsonClassA.date_of_birth, jsonConvConfigUtil.dateFormat))).toBeTruthy();
        });
    });

    it('converting class A back to Json', () => {
        const convertToJson = converterInstance.convertToJson(classAConvertedArray as any);
        expect(convertToJson instanceof Array).toBeTruthy();
        expect(convertToJson.length).toEqual(jsonMap.size);
        convertToJson.forEach((convertedJsonFromClassA: any) => {
            const fromJsonClassA = jsonMap.get(convertedJsonFromClassA.id);
            if (convertedJsonFromClassA.id === 1) {
            }
            expect(fromJsonClassA).toBeTruthy();
            expect(fromJsonClassA).toEqual(convertedJsonFromClassA);
        });
    });

    it.skip('converting class A with object array map', () => {
        const objMap: { [key: number]: any } = {};
        classAData.forEach(classAItem => objMap[classAItem.id] = classAItem);
        classAConvertedArray = converterInstance.convert<ClassA>(objMap, 'ClassA');
        expect(classAConvertedArray.length).toEqual(classAData.length);
        classAConvertedArray.forEach((classA) => {
            expect(classA !== null && classA !== undefined).toBeTruthy();
            expect(classA instanceof ClassA).toBeTruthy();
            expect(classA.getBirthDateDay()).toBeTruthy();
            const fromJsonClassA = jsonMap.get(classA.id);
            expect(fromJsonClassA).toBeTruthy();
            expect(classA.fullName).toEqual(fromJsonClassA.name.full_name);
            expect(moment(classA.birthDate).isSame(moment(fromJsonClassA.date_of_birth, jsonConvConfigUtil.dateFormat))).toBeTruthy();
        });
    });

});
