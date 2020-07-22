//公共方法集合

//formData的参数格式，可用append追加
export function formData(args) {
  let data = new FormData()
  Object.keys(args).forEach(key=>{
    data.append(key,args[key])
  })
  return data
}