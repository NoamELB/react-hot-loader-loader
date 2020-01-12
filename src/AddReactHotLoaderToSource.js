const {
    PRODUCTION_ENV,
    EXPORT_DEFAULT_REGEX,
    EXPORT_DEFAULT_WITH_TRAILING_SPACES_REGEX,
    IMPORT_STATEMENT,
    DEFAULT_EXPORTED_CLASS_REGEX,
    DEFAULT_EXPORTED_FUNCTION_REGEX,
    EXTEND_KEYWORD,
} = require('./constants');

/**
 * @param {string} source 
 * @returns {string} A modified source which has the hot reload wrapping 
 */
function AddReactHotLoader(source) {
    if (process.env.NODE_ENV === PRODUCTION_ENV || !source || !EXPORT_DEFAULT_REGEX.exec(source)) {
        return source;
    }
    let newSource = getImportLine() + source;
    const className = getExportDefaultClassName(source);
    const functionName = getExportDefaultFunctionName(source);
    const defaultExportedName = className || functionName;
    return defaultExportedName ? transformSource(newSource, defaultExportedName) : transformSourceDefault(newSource);
}

/**
 * @param {string} source 
 * @param {string} defaultExportedName The name of the origin default export name
 * that needs to be wrapped in hot reload
 * @returns {string} A source which includes the hot reload wrapper export
 */
function transformSource(source, defaultExportedName) {
    source = source.replace(EXPORT_DEFAULT_WITH_TRAILING_SPACES_REGEX, '');
    source += `\nexport default hot(module)(${defaultExportedName});`;
    return source;
}

/**
 * @param {string} source 
 * @returns {string} A source which includes the hot reload wrapper export
 */
function transformSourceDefault(source) {
    source = source.replace(EXPORT_DEFAULT_REGEX, 'const reactAppToMakeSuperHot =');
    source += `\nexport default hot(module)(reactAppToMakeSuperHot);`;
    return source;
}

/**
 * @returns {string} An import statement followed with a line break
 */
function getImportLine() {
    return IMPORT_STATEMENT;
}

/**
 * Returns the default exported class name if exists or an empty string
 * @param {string} source
 * @returns {string} A class name which is exported as default
 */
function getExportDefaultClassName(source) {
    const matches = source.match(DEFAULT_EXPORTED_CLASS_REGEX);
    const hasClassName = matches && matches[1] && matches[1] !== EXTEND_KEYWORD;
    return hasClassName ? matches[1] : '';
}

/**
 * Returns the default exported function name if exists or an empty string
 * @param {string} source
 * @return {string} A function name which is exported as default
 */
function getExportDefaultFunctionName(source) {
    const matches = source.match(DEFAULT_EXPORTED_FUNCTION_REGEX);
    const hasFunctionName = matches && matches[1];
    return hasFunctionName ? matches[1] : '';
}

module.exports = AddReactHotLoader;
