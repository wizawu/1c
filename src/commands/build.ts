import * as assert from "assert"
import * as chalk from "chalk"
import * as fs from "fs"
import * as path from "path"
import * as webpack from "webpack"

import { EXIT_STATUS } from "../const"
import { getTopPackages } from "../compiler/parseJAR"

const autoprefixer = require("autoprefixer")

export interface Options {
    watch: boolean
    targetModule: boolean
    output: string
}

function compiler(instdir: string, instmod: string, entries: string[], options: Options) {
    let context = process.cwd()
    let entry = {}
    if (fs.lstatSync(options.output).isDirectory()) {
        entries.forEach(file => {
            if (/\.ts$/.test(file)) {
                entry[`${options.output}/${path.basename(file, ".ts")}.js`] = file
            } else if (/\.tsx$/.test(file)) {
                entry[`${options.output}/${path.basename(file, ".tsx")}.js`] = file
            } else {
                throw "invalid entry suffix"
            }
        })
    } else {
        assert.strictEqual(entries.length, 1)
        entry[options.output] = entries[0]
    }

    let cssLoaders = [{
        loader: "style-loader"
    }, {
        loader: "css-loader",
        options: { minimize: true },
    }, {
        loader: "postcss-loader",
        options: {
            plugins: [
                autoprefixer({
                    browsers: [
                        "last 3 versions",
                        "safari >= 6",
                        "IE >= 9",
                    ]
                })
            ]
        }
    }]

    let globalVars = {}
    if (fs.existsSync(`${context}/lib`)) {
        let jars = fs.readdirSync(`${context}/lib`).filter(file => /\.jar$/.test(file))
        jars.forEach(jar => {
            getTopPackages(`${context}/lib/${jar}`).forEach(pkg =>
                globalVars[pkg] = `typeof ${pkg} === "undefined" ? Packages.${pkg} : ${pkg}`
            )
        })
    }

    return webpack({
        devtool: "cheap-source-map",
        context: context,
        resolve: { extensions: [".js", ".ts", ".tsx"] },
        resolveLoader: { modules: [instmod] },
        entry: entry,
        output: {
            path: context,
            filename: "[name]",
            libraryTarget: options.targetModule ? "commonjs2" : undefined,
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                loader: "ts-loader",
            }, {
                test: /\.json$/,
                loader: "json-loader",
            }, {
                test: /^[^!]+\.css$/,
                use: cssLoaders,
            }, {
                test: /^[^!]+\.less$/,
                use: cssLoaders.concat({ loader: "less-loader" })
            }]
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
            }),
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: options.watch ? '"development"' : '"production"'
                },
                ...globalVars,
            }),
        ].slice(options.watch ? 1 : 0)
    })
}

export default function (instdir: string, instmod: string, entries: string[], options: Options) {
    if (entries.length === 0) {
        console.error(chalk.yellow("no entry to build"))
        process.exit(EXIT_STATUS.BUILD_ENTRY_ERROR)
    } else if (entries.some(entry => !/\.tsx?$/.test(entry))) {
        console.error(chalk.red("entry suffix should be .ts or .tsx"))
        process.exit(EXIT_STATUS.BUILD_ENTRY_ERROR)
    } else if (!fs.existsSync(options.output) ||
        (entries.length === 1 && /\.tsx?$/.test(options.output)) ||
        (entries.length > 1 && !fs.lstatSync(options.output).isDirectory())
    ) {
        console.error(chalk.red("invalid -o option"))
        process.exit(EXIT_STATUS.BUILD_OUTPUT_ERROR)
    } else if (!fs.existsSync("tsconfig.json")) {
        console.error(chalk.red("no tsconfig.json in current directory"))
        process.exit(EXIT_STATUS.TSCONFIG_NOT_FOUND)
    }

    let statsOptions = {
        children: false,
        chunks: false,
        colors: true,
        version: false,
    }

    if (options.watch) {
        compiler(instdir, instmod, entries, options).watch({ poll: true }, (err, stats) => {
            console.log(`Clock: ${new Date().toLocaleTimeString()}`)
            console.log(stats.toString(statsOptions))
        })
    } else {
        compiler(instdir, instmod, entries, options).run((err, stats) => {
            console.log(stats.toString(statsOptions))
            if (stats.hasErrors()) process.exit(EXIT_STATUS.WEBPACK_COMPILE_ERROR)
        })
    }
}
