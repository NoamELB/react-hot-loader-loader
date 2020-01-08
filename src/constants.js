const PRODUCTION_ENV = 'production';
const EXPORT_DEFAULT_REGEX = /^\s*export\s+default/m;
const EXPORT_DEFAULT_WITH_TRAILING_SPACES_REGEX = /^\s*export\s+default\s+/m;
const DEFAULT_EXPORTED_CLASS_REGEX = /^\s*export\s+default\s+class\s+(.*?)\s+/m;
const DEFAULT_EXPORTED_FUNCTION_REGEX = /^\s*export\s+default\s+function\s+([^(\s]*)\s?\(/m;
const IMPORT_STATEMENT = "import {hot} from 'react-hot-loader';\n";
const EXTEND_KEYWORD = 'extends';

module.exports = {
    PRODUCTION_ENV,
    EXPORT_DEFAULT_REGEX,
    EXPORT_DEFAULT_WITH_TRAILING_SPACES_REGEX,
    DEFAULT_EXPORTED_CLASS_REGEX,
    DEFAULT_EXPORTED_FUNCTION_REGEX,
    IMPORT_STATEMENT,
    EXTEND_KEYWORD,
};
