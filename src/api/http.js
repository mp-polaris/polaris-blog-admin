import axios from 'axios'


//创建一个axios实例
const service = axios.create({
    //请求超时时间
    timeout:3000
})

//添加请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        return config
    },err => {
        // 对请求错误做些什么
        console.log(err)
    }
)

//添加响应拦截器
service.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        let res = {}
        res.status = response.status
        res.data = response.data
        return res
    },err => {
        // 对响应错误做点什么
        console.log(err)
    }
)

export default service