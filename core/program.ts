import path from 'path'
import ts, * as TS from 'typescript'
import { TypeScriptNodeSearch } from './nodeSearch'

/**
 * 进入Node筛选节点
 */
function createSearch (program: TS.Program): TypeScriptNodeSearch {
  return new TypeScriptNodeSearch(program)
}

/** copy from https://github.com/YousefED/typescript-json-schema/blob/c7fc59a913922df32b2166c796fc1a00660a99cb/typescript-json-schema.ts */
/**
 * 从`tsconfig.json`里读取配置
 *
 * read config from `tsconfig.json`
 *
 * `tsconfig.json`から構成を読み取ります
 *
 *
 *
 * @param tsConfigFile
 *
 *  文件路径
 *
 *  filepath
 *
 *  資料
 *
 * @param entry
 *
 *  入口文件，若不传则使用package.json的main或当前目录的index.ts/index.js
 *
 *  the entry of project, if undefined, it will be the main of `package.json` or `index.ts`
 */
export function readProgramFromTsConfig (tsConfigFile: string, entry?: string): TypeScriptNodeSearch {
  const result = TS.parseConfigFileTextToJson(
    tsConfigFile,
    TS.sys.readFile(tsConfigFile)!
  )
  const configObject = result.config

  // 生成配置对象
  const configParseResult = TS.parseJsonConfigFileContent(
    configObject,
    TS.sys,
    path.dirname(tsConfigFile),
    {},
    path.basename(tsConfigFile)
  )
  const options = configParseResult.options
  options.noEmit = true
  delete options.out
  delete options.outDir
  delete options.outFile
  delete options.declaration
  delete options.declarationDir
  delete options.declarationMap

  const program = TS.createProgram({
    rootNames: configParseResult.fileNames,
    options,
    projectReferences: configParseResult.projectReferences
  })
  return createSearch(program)
}

export function createProgramFromFile (
  files: string[],
  jsonCompilerOptions: any = {},
  basePath: string = './'
): ts.Program {
  const compilerOptions = ts.convertCompilerOptionsFromJson(jsonCompilerOptions, basePath).options
  const options: ts.CompilerOptions = {
    noEmit: true,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
    allowUnusedLabels: true
  }
  for (const k in compilerOptions) {
    // eslint-disable-next-line no-prototype-builtins
    if (compilerOptions.hasOwnProperty(k)) {
      options[k] = compilerOptions[k]
    }
  }
  return ts.createProgram(files, options)
}
