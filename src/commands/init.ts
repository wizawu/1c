import chalk from "chalk"
import fs from "fs"
import path from "path"
import prompts from "prompts"
import { spawnSync } from "child_process"

import { code as ErrorCode } from "../errors"

export default function (): void {
  console.log("Checking prerequisites...\n")
  if (!check("node", ["-v"]) || !check("npm", ["-v"]) || !check("gradle", ["-v"])) {
    console.error(chalk.red("You should add node, npm and gradle in `PATH` env."))
    process.exit(ErrorCode.BROKEN_ENV)
  }

  if (fs.existsSync("package.json")) {
    console.error(chalk.yellow("package.json already exists."))
    process.exit(ErrorCode.INIT_CONFLICT)
  } else if (fs.existsSync("tsconfig.json")) {
    console.error(chalk.yellow("tsconfig.json already exists."))
    process.exit(ErrorCode.INIT_CONFLICT)
  } else {
    prompts({
      name: "runtime",
      message: "Choose runtime",
      type: "select",
      choices: [
        { value: "graaljs", title: "graal.js (recommended)" },
        { value: "nashorn" },
      ]
    }).then(({ runtime }) => {
      if (runtime === "graaljs") {
        prompts({
          name: "root",
          message: "Input the root path of GraalVM",
          type: "text",
        }).then(({ root }) => initProject(runtime, root))
      }
      if (runtime === "nashorn") {
        prompts({
          name: "root",
          message: "Input the root path of OpenJDK or Oracle JDK",
          type: "text",
        }).then(({ root }) => initProject(runtime, root))
      }
    })
  }
}

function initProject(runtime: "graaljs" | "nashorn", root: string): void {
  const javapPath = path.join(root, "bin", "javap")
  const runtimePath = runtime === "graaljs" ?
    path.join(root, "languages", "js", "bin", "node") :
    path.join(root, "bin", "jjs")
  if (!fs.existsSync(runtimePath)) {
    console.error(chalk.red("Cannot find " + runtimePath))
    process.exit(ErrorCode.INVALID_JDK_ROOT)
  } else if (!fs.existsSync(javapPath)) {
    console.error(chalk.red("Cannot find " + javapPath))
    process.exit(ErrorCode.INVALID_JDK_ROOT)
  }
  // create package.json and tsconfig.json
  fs.writeFileSync("package.json", JSON.stringify({
    dependencies: {},
    mvnDependencies: {},
    runtime: { [runtime]: runtimePath },
  }, null, 2))
  fs.writeFileSync("tsconfig.json", JSON.stringify({
    compilerOptions: {
      typeRoots: [
        path.join(__dirname, "..", "..", "@types"),
        "lib",
        "node_modules/@types",
      ]
    },
    include: [
      "**/*.ts",
    ]
  }, null, 2))
  // create src/main.ts
  fs.mkdirSync("src", { recursive: true })
  if (!fs.existsSync(path.join("src", "main.ts"))) {
    const src = "java.lang.System.out.println(\"Hello\")"
    fs.writeFileSync(path.join("src", "main.ts"), src)
  }
}

export function check(command: string, args: string[]): boolean {
  const { status, stdout, stderr } = spawnSync(command, args)
  if (status === 0) {
    console.log(chalk.green(`[${command}]`))
    console.log(stdout.toString().replace(/\n+/g, "\n").trim() + "\n")
    return true
  } else {
    console.log(chalk.red(`[${command}]`))
    const message = stderr?.toString().trim() || stdout?.toString().trim()
    if (message) {
      console.log(message + "\n")
    } else {
      console.log(chalk.gray("NOT FOUND\n"))
    }
    return false
  }
}
