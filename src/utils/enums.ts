export class EnumName {
  private enumMap: Map<string, Map<any, string>>

  constructor() {
    this.enumMap = new Map()
  }
  /**
   * 添加枚举成员
   * @param name
   * @param value
   * @param label
   * @returns
   */
  add(name: string, value: any, label: string) {
    if (!this.enumMap.has(name)) {
      this.enumMap.set(name, new Map())
    }
    this.enumMap.get(name)?.set(value, label)
    return this
  }

  // 根据值获取枚举成员的标签
  getLabel(name: string, value: any): string | undefined {
    const enumValues = this.enumMap.get(name)
    if (enumValues) {
      return enumValues.get(value)
    }
    return undefined
  }

  // 根据标签获取枚举成员的键
  getKey(name: string, label: string): any | undefined {
    const enumValues = this.enumMap.get(name)
    if (enumValues) {
      for (const [key, value] of enumValues) {
        if (value === label) {
          return key
        }
      }
    }
    return undefined
  }

  // 获取枚举成员的键值对数组
  getArray(name: string): [any, string][] | undefined {
    const enumValues = this.enumMap.get(name)
    if (enumValues) {
      return Array.from(enumValues.entries())
    }
    return undefined
  }
}
export class Enum {
  private enumMap: Map<any, any>

  constructor() {
    this.enumMap = new Map()
  }

  /**
   * 添加枚举成员
   * @param value
   * @param label
   * @returns
   */
  add(value: any, label: string) {
    this.enumMap.set(value, { label })
    return this
  }

  // 根据值获取枚举成员的标签
  getLabel(value: any): string | undefined {
    return this.enumMap.get(value)
  }

  // 根据标签获取枚举成员的键
  getKey(label: string): any | undefined {
    for (const [key, value] of this.enumMap.entries()) {
      if (value === label) {
        return key
      }
    }
    return undefined
  }

  // 获取枚举成员的键值对数组
  getArray(): { label: string; value: any }[] {
    return Array.from(this.enumMap.entries()).map(([value, label]) => ({
      label,
      value,
    }))
  }
}

export const AllEnum = {
  // 菜单类型
  MenuType: new Enum().add('0', '目录').add('1', '菜单').add('2', '按钮'),
  // 菜单状态
  MenuStatus: new Enum().add('0', '禁用').add('1', '启用'),
  // 角色状态
  RoleStatus: new EnumName()
    .add('RoleStatus', '0', '禁用')
    .add('RoleStatus', '1', '启用')
    .add('RoleStatus', '2', '锁定')
    .add('RoleStatus', '3', '过期')
    .add('RoleType', '0', '系统')
    .add('RoleType', '1', '业务'),
}

// console.log(AllEnum)
