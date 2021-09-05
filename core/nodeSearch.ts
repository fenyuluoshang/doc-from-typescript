import * as ts from 'typescript'

/**
 * 查询节点
 */
export class TypeScriptNodeSearch {
  /**
   * 当前关注的节点列表
   *
   * the nodes that now on action
   *
   */
  protected actionNode: readonly ts.Node[]

  /**
   * ts.typechecker
   */
  protected readonly typeChecker: ts.TypeChecker

  public constructor (protected readonly program: ts.Program, workDir?: string, files?: string[]) {
    this.actionNode = program.getSourceFiles().filter(item => {
      if (workDir != null) {
        return item.fileName.startsWith(workDir)
      } else if (files != null) {
        return files.includes(item.fileName)
      }
      return true
    })
    this.typeChecker = program.getTypeChecker()
  }

  /**
   * 筛选整个树符合类型的节点
   * @param kinds
   */
  protected inspectFun (kinds: ts.SyntaxKind[], nodes: readonly ts.Node[] = this.actionNode): ts.Node[] {
    let nodeList: ts.Node[] = []
    for (const node of nodes) {
      if (kinds.includes(node.kind)) {
        nodeList.push(node)
      }
      const childNode = this.inspectFun(kinds, node.getChildren())
      nodeList = nodeList.concat(childNode)
    }
    return nodeList
  }

  public getTypeChecker (): ts.TypeChecker {
    return this.typeChecker
  }

  public getTypesAtLoaction (): ts.Type[] {
    return this.actionNode
      .filter(ts.isTypeNode)
      .map(item => this.typeChecker.getTypeFromTypeNode(item))
  }
}
