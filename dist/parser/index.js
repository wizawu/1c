"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
var antlr4_1 = __importDefault(require("antlr4"));
var definition = __importStar(require("./definition"));
var JavapLexer_1 = require("../grammar/JavapLexer");
var JavapParser_1 = require("../grammar/JavapParser");
var utils_1 = require("../utils");
var common_1 = require("./common");
var PARSE_CHUNK = 500;
function parse(classPaths, counter, classList, typeRoot) {
    var buffer = [];
    for (var i = 0; i < classList.length; i += PARSE_CHUNK) {
        var output = utils_1.javap(classPaths, classList.slice(i, i + PARSE_CHUNK));
        if (output === null) {
            return false;
        }
        else {
            buffer.push(output);
        }
    }
    var input = buffer.join("\n");
    var lexer = new JavapLexer_1.JavapLexer(new antlr4_1.default.InputStream(input));
    var tokens = new antlr4_1.default.CommonTokenStream(lexer);
    var parser = new JavapParser_1.JavapParser(tokens);
    var context = parser.compilationUnit();
    var interfaces = context.classOrInterface()
        .map(function (it) { return it.interfaceDeclaration(); }).filter(function (it) { return it; });
    for (var _i = 0, interfaces_1 = interfaces; _i < interfaces_1.length; _i++) {
        var it = interfaces_1[_i];
        var className = common_1.qualifiedName(it.type(0));
        var count = it.interfaceBody().interfaceMember()
            .filter(function (it) { return it.methodDeclaration(); }).length;
        if (it.type().length === 1) {
            counter[className] = [count];
        }
        else {
            counter[className] = [count, common_1.qualifiedName(it.type(1))];
        }
    }
    if (typeRoot) {
        return definition.generate(context, counter, typeRoot);
    }
    else {
        return true;
    }
}
exports.parse = parse;