const AddReactHotLoaderToSource = require('../src/AddReactHotLoaderToSource');
const {exampleFiles, expectedOutputFiles} = require('./exampleFiles');

describe('AddReactHotLoaderToSource', () => {
    Object.keys(exampleFiles).forEach(f => {
        it(`should match expected file for ${f}`, () => {
            expect(AddReactHotLoaderToSource(exampleFiles[f])).toBe(expectedOutputFiles[f]);
        });
    });
});
