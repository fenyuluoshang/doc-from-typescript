
export function hello (code: string) {
  return 'aaa'
}

export interface User {
  id: number,
  name: string,
  avatar: string
}

export function getUserList (): Promise<User[]> {
  return Promise.resolve([]);
}