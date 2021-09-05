/** 测试1，简单单文件解析测试  */

/**
 * 
 * @param code 
 * @returns 
 */
export function hello (code: string) {
  return 'aaa'
}

export interface User {
  id: number,
  name: string,
  avatar: string
}

export interface UserParam {
  id?: number
}

/**
 * 分页数据
 */
export interface PageParam {
  page: number,
  pageSize: number,
}

/**
 * 获取用户列表的接口
 * 
 * @param param 筛选条件
 * @param page 分页条件
 * @returns 返回用户列表
 */
export function getUserList (param: UserParam, page: PageParam): Promise<User[]> {
  return Promise.resolve([]);
}