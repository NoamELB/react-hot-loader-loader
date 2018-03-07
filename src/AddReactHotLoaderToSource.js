function AddReactHotLoader(source) {
    if (!source || !/^\s*export\s+default/m.exec(source)) {
        return source;
    }
    let newSource = getImportLine() + source;
    const className = getExportDefaultClassName(source);
    const functionName = getExportDefaultFunctionName(source);
    if (className) {
        newSource = transformSourceForClass(newSource, className);
    } else if (functionName) {
        newSource = transformSourceForNamedFunction(newSource, functionName);
    } else {
        newSource = transformSourceDefault(newSource);
    }
    return newSource;
}

function transformSourceForClass(source, className) {
    source = source.replace(/^\s*export\s+default\s+/m, '');
    source += `\nexport default hot(module)(${className});`;
    return source;
}

function transformSourceForNamedFunction(source, functionName) {
    source = source.replace(/^\s*export\s+default\s+/m, '');
    source += `\nexport default hot(module)(${functionName});`;
    return source;
}

function transformSourceDefault(source) {
    source = source.replace(/^\s*export\s+default/m, 'const reactAppToMakeSuperHot =');
    source += `\nexport default hot(module)(reactAppToMakeSuperHot);`;
    return source;
}

function getImportLine() {
    return `import {hot} from 'react-hot-loader';\n`;
}

function getExportDefaultClassName(source) {
    let className = '';
    const matches = source.match(/^\s*export\s+default\s+class\s+(.*?)\s+/m);
    if (matches && matches[1]) {
        className = matches[1];
    }
    return className;
}

function getExportDefaultFunctionName(source) {
    let functionName = '';
    const matches = source.match(/^\s*export\s+default\s+function\s+(.*?)\s+/m);
    if (matches && matches[1]) {
        functionName = matches[1];
    }
    return functionName;
}

module.exports = AddReactHotLoader;
