const {exampleFiles, expectedOutputFiles} = require('./exampleFiles');
const ORIGINAL_NODE_ENV = process.env.NODE_ENV;

beforeEach(() => {
    jest.resetModules();
});

describe('AddReactHotLoaderToSource', () => {
    Object.keys(exampleFiles).forEach(f => {
        it(`should match expected file for ${f}`, () => {
            process.env.NODE_ENV = ORIGINAL_NODE_ENV;
            const AddReactHotLoaderToSource = require('../src/AddReactHotLoaderToSource');
            expect(AddReactHotLoaderToSource(exampleFiles[f])).toBe(expectedOutputFiles[f]);
        });
    });
})

describe('AddReactHotLoaderToSource with NODE_ENV=production', () => {
    Object.keys(exampleFiles).forEach(f => {
        it(`should not modify file ${f}`, () => {
            process.env.NODE_ENV = 'production';
            const AddReactHotLoaderToSource = require('../src/AddReactHotLoaderToSource');
            expect(AddReactHotLoaderToSource(exampleFiles[f])).toBe(exampleFiles[f]);
        });
    });
});
