import ts from 'typescript'

export enum OutputType {
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

export interface TypeOutputBasic {
  type: OutputType

  isTypeWithParam: (this: TypeOutputBasic) => this is TypeWithParam

  isTypeWithChild: (this: TypeOutputBasic) => this is TypeWithChild

}

export interface TypeWithParam extends TypeOutputBasic {
  type: OutputType.Array | OutputType.Promise
  param?: TypeOutputBasic
}

export interface TypeWithChild extends TypeOutputBasic {
  type: OutputType.ObjectOrInterface
  children?: {
    [key: string]: TypeOutputBasic
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function typeOutputBasicCreate (obj: any): TypeOutputBasic {
  return {
    ...obj,
    isTypeWithChild: function () {
      return this.type === OutputType.ObjectOrInterface
    },
    isTypeWithParam: function () {
      return this.type === OutputType.Array || this.type === OutputType.Promise
    }
  }
}

export class DefaultOutputHelper {
  public constructor (symbols: ts.Type[], protected readonly typeChecker: ts.TypeChecker) {

  }
}
