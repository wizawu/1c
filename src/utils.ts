import fs from "fs"
import path from "path"
import { spawnSync } from "child_process"

export function listFilesByExt(dirname: string, ext: string): string[] {
  if (fs.existsSync(dirname)) {
    if (fs.lstatSync(dirname).isDirectory()) {
      return fs.readdirSync(dirname)
        .filter(it => it.endsWith(ext))
        .map(it => path.join(dirname, it))
    } else {
      return []
    }
  } else {
    return []
  }
}

export function javap(classPaths: string[], classList: string[]): string | null {
  const child = spawnSync(
    process.env.JAVAP || path.join(locateJavaBin(), "javap"),
    ["-package", "-cp", ":" + classPaths.join(":"), ...classList]
  )
  if (child.status === 0) {
    return child.stdout.toString()
  } else {
    console.error(child.stderr.toString())
    return null
  }
}

// Return path of JDK `bin` directory
function locateJavaBin(): string {
  if (fs.existsSync("package.json")) {
    const { runtime } = JSON.parse(fs.readFileSync("package.json", "utf-8"))
    if (runtime?.graaljs && fs.existsSync(runtime.graaljs)) {
      let cmd = runtime.graaljs
      if (fs.lstatSync(cmd).isSymbolicLink()) {
        cmd = fs.realpathSync(cmd)
      }
      return path.join(path.dirname(cmd), "..", "..", "..", "bin")
    }
    if (runtime?.nashorn && fs.existsSync(runtime.nashorn)) {
      let cmd = runtime.nashorn
      if (fs.lstatSync(cmd).isSymbolicLink()) {
        cmd = fs.realpathSync(cmd)
      }
      return path.dirname(cmd)
    }
  }
  return process.env.JAVA_HOME ? path.join(process.env.JAVA_HOME, "bin") : ""
}
