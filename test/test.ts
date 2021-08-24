import { createProgramFromFile } from '../core/program'
import path from 'path'

const taskId = 1

const program = createProgramFromFile([path.resolve(__dirname, `../example/task${taskId}/index.ts`)])

const files = program.getSourceFiles()

console.log('ok', files)
