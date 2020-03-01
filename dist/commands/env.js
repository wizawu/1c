"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var const_1 = require("../const");
var child_process_1 = require("child_process");
function header(tool, link) {
    return "\n" + chalk_1.default.green("[" + tool + "]") + chalk_1.default.gray("(" + link + ")") + "\n";
}
var notFound = function (stdout, stderr) { return (stdout + stderr) || chalk_1.default.red("** not found **\n"); };
function default_1() {
    var ok = true;
    var output = "";
    var options = { stdio: "pipe" };
    var child = child_process_1.spawnSync("node", ["-v"], options);
    output += header("node", "https://nodejs.org/en/download");
    output += notFound(child.stdout, child.stderr);
    if (child.status !== 0)
        ok = false;
    child = child_process_1.spawnSync("npm", ["-v"], options);
    output += header("npm", "npm install -g npm");
    output += notFound(child.stdout, child.stderr);
    if (child.status !== 0)
        ok = false;
    child = child_process_1.spawnSync("java", ["-version"], options);
    output += header("java", "http://openjdk.java.net/install");
    output += notFound(child.stdout, child.stderr);
    if (child.status !== 0)
        ok = false;
    child = child_process_1.spawnSync("which", ["javap"], options);
    output += "javap    - " + notFound(child.stdout, child.stderr);
    if (child.status !== 0)
        ok = false;
    child = child_process_1.spawnSync("which", ["jar"], options);
    output += "jar      - " + notFound(child.stdout, child.stderr);
    if (child.status !== 0)
        ok = false;
    child = child_process_1.spawnSync("gradle", ["-version"], options);
    output += header("gradle", "https://gradle.org/install");
    output += notFound(child.stdout, child.stderr).replace(/(^|\n)\n/g, "$1");
    if (child.status !== 0)
        ok = false;
    if (!ok) {
        console.log("\n" + output.trim() + "\n");
        process.exit(const_1.EXIT_STATUS.BROKEN_ENV);
    }
    else {
        return "\n" + output.trim() + "\n";
    }
}
exports.default = default_1;
