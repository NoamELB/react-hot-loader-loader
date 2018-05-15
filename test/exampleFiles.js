// Case 1
const emptyFile = ``;
const expectedEmptyFile = emptyFile;

// Case 2
const fileWithoutAnyExport = `class WithoutAnyExportDefault extends Component {
    render() {
        return 'whatever';
    }
}`;

const expectedFileWithoutAnyExport = fileWithoutAnyExport;

// Case 3
const exportClass = `export default class ExportedClass extends Component {
    render() {
        return 'whatever';
    }
}`;

const expectedExportClass = `import {hot} from 'react-hot-loader';
class ExportedClass extends Component {
    render() {
        return 'whatever';
    }
}
export default hot(module)(ExportedClass);`;

// Case 4
const exportClassAtBottom = `class ExportedClassAtBottom extends Component {
    render() {
        return 'whatever';
    }
}
export default ExportedClass;`;

const expectedExportClassAtBottom = `import {hot} from 'react-hot-loader';
class ExportedClassAtBottom extends Component {
    render() {
        return 'whatever';
    }
}
const reactAppToMakeSuperHot = ExportedClass;
export default hot(module)(reactAppToMakeSuperHot);`;

// Case 5
const functionalComponent = `export default function exportedFunction () {
    return 'whatever';
}`;
const expectedFunctionalComponent = `import {hot} from 'react-hot-loader';
function exportedFunction () {
    return 'whatever';
}
export default hot(module)(exportedFunction);`;

// Case 6
const functionalComponentOnBottom = `function exportedFunctionOnBottom () {
    return 'whatever';
}
export default exportedFunctionOnBottom;`;

const expectedFunctionalComponentOnBottom = `import {hot} from 'react-hot-loader';
function exportedFunctionOnBottom () {
    return 'whatever';
}
const reactAppToMakeSuperHot = exportedFunctionOnBottom;
export default hot(module)(reactAppToMakeSuperHot);`;

// Case 7
const arrowFunction = `export default () => 'whatever';`;

const expectedArrowFunction = `import {hot} from 'react-hot-loader';
const reactAppToMakeSuperHot = () => 'whatever';
export default hot(module)(reactAppToMakeSuperHot);`;

// Case 8
const wrappedWithHOC = `export class WrappedWithHOC extends Component {
    render() {
        return 'export default';
    }
}
export default connect({}, {})(WrappedWithHOC);`;

const expectedWrappedWithHOC = `import {hot} from 'react-hot-loader';
export class WrappedWithHOC extends Component {
    render() {
        return 'export default';
    }
}
const reactAppToMakeSuperHot = connect({}, {})(WrappedWithHOC);
export default hot(module)(reactAppToMakeSuperHot);`;

// Case 9
const exportAnonymousClass = `export default class extends Component {
    render() {
        return 'whatever';
    }
}`;

expectedExportAnonymousClass = `import {hot} from 'react-hot-loader';
const reactAppToMakeSuperHot = class extends Component {
    render() {
        return 'whatever';
    }
}
export default hot(module)(reactAppToMakeSuperHot);`;

// Case 10
const functionalComponentNoSpacing = `export default function exportedFunction() {
    return 'whatever';
}`;
const expectedFunctionalComponentNoSpacing = `import {hot} from 'react-hot-loader';
function exportedFunction() {
    return 'whatever';
}
export default hot(module)(exportedFunction);`;

const functionalComponentWithParams = `export default function exportedFunction({ name }) {
    return 'whatever';
}`;
const expectedFunctionalComponentWithParams = `import {hot} from 'react-hot-loader';
function exportedFunction({ name }) {
    return 'whatever';
}
export default hot(module)(exportedFunction);`;

const functionalComponentNoName = `export default function () {
    return 'whatever';
}`;
const expectedFunctionalComponentNoName = `import {hot} from 'react-hot-loader';
const reactAppToMakeSuperHot = function () {
    return 'whatever';
}
export default hot(module)(reactAppToMakeSuperHot);`;

const functionalComponentNoNameAndNoSpace = `export default function() {
    return 'whatever';
}`;
const expectedFunctionalComponentNoNameAndNoSpace = `import {hot} from 'react-hot-loader';
const reactAppToMakeSuperHot = function() {
    return 'whatever';
}
export default hot(module)(reactAppToMakeSuperHot);`;


const exampleFiles = {
    emptyFile,
    fileWithoutAnyExport,
    exportClass,
    exportClassAtBottom,
    functionalComponent,
    functionalComponentOnBottom,
    arrowFunction,
    wrappedWithHOC,
    exportAnonymousClass,
    functionalComponentNoSpacing,
    functionalComponentWithParams,
    functionalComponentNoName,
    functionalComponentNoNameAndNoSpace,
};

const expectedOutputFiles = {
    emptyFile: expectedEmptyFile,
    fileWithoutAnyExport: expectedFileWithoutAnyExport,
    exportClass: expectedExportClass,
    exportClassAtBottom: expectedExportClassAtBottom,
    functionalComponent: expectedFunctionalComponent,
    functionalComponentOnBottom: expectedFunctionalComponentOnBottom,
    arrowFunction: expectedArrowFunction,
    wrappedWithHOC: expectedWrappedWithHOC,
    exportAnonymousClass: expectedExportAnonymousClass,
    functionalComponentNoSpacing: expectedFunctionalComponentNoSpacing,
    functionalComponentWithParams: expectedFunctionalComponentWithParams,
    functionalComponentNoName: expectedFunctionalComponentNoName,
    functionalComponentNoNameAndNoSpace: expectedFunctionalComponentNoNameAndNoSpace,
};

module.exports = {exampleFiles, expectedOutputFiles};
