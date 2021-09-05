import ts from 'typescript'

export enum OutputType {
  SourceFile = 0,
  ObjectOrInterface = 1,
  Array = 2,
  Boolean = 3,
  Number = 4,
  String = 5,
  Any = 6,
  Unknow = 7,
  Null = 8,
  Undefined = 9,
  Promise = 10
}

export class TypeOutputBasic {
  type: OutputType

  isTypeWithParam: (this: TypeOutputBasic) => this is TypeWithParam

  isTypeWithChild: (this: TypeOutputBasic) => this is TypeWithChild

  isTypeOfSOurceFile: (this: TypeOutputBasic) => this is TypeOfSourceFile
}

export interface TypeWithParam extends TypeOutputBasic {
  type: OutputType.Array | OutputType.Promise
  param: TypeOutputBasic
}

export interface TypeWithChild extends TypeOutputBasic {
  type: OutputType.ObjectOrInterface
  children: {
    [key: string]: TypeOutputBasic
  }
}

export interface TypeOfSourceFile extends TypeOutputBasic {
  type: OutputType.SourceFile
  exports: {
    [key: string]: TypeOutputBasic
  }
}

export class TypeOutputBasicGen implements TypeOutputBasic {
  type: OutputType

  constructor (type: OutputType) {
    this.type = type
  }

  isTypeWithChild (): this is TypeWithChild {
    return this.type === OutputType.ObjectOrInterface
  }

  isTypeWithParam (): this is TypeWithParam {
    return this.type === OutputType.Array || this.type === OutputType.Promise
  }

  isTypeOfSOurceFile (): this is TypeOfSourceFile {
    return this.type === OutputType.SourceFile
  }

  param?: TypeOutputBasic

  children?: { [key: string]: TypeOutputBasic }

  exports?: { [key: string]: TypeOutputBasic }
}

export class DefaultOutputHelper {
  public constructor (protected readonly symbols: ts.Type[], protected readonly typeChecker: ts.TypeChecker) {

  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private symbolToOutputType (symbol: ts.Symbol) {
    // TODO：
    // if(symbol.flags)
  }
}
