// 为了方便项目中使用本地存储的时候,简化操作, 封装

//! 获取
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res) // tonken数据要转换就转换
  } catch (error) {
    console.log(error)// 不转换就原样输出
  }
}

//! 设置
export function setItem (key, value) {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}

//! 根据key删除本地存储中的一个
export function removeItem (key) {
  window.localStorage.removeItem(key)
}

//! 删除所有本地存储
export function clearItem (key) {
  window.localStorage.clearItem(key)
}
