// import { useLayoutStore } from '@/store/modules/layout'
import type { AxiosResponse } from 'axios'
import axios from 'axios'
import { ElNotification } from 'element-plus'
import { router } from '@/router/index'

const EFUN = () => { }
const useLayoutStore = () => ({
    logout: EFUN,
    getStatus: { ACCESS_TOKEN: '' },

})

// 创建 axios 实例
const request = axios.create({
    // API 请求的默认前缀
    baseURL: import.meta.env.VUE_APP_API_BASE_URL as string | undefined,
    timeout: 60000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error: any) => {
    const { logout } = useLayoutStore()

    if (error?.response?.status === 401) {
        logout()
    } else {
        ElNotification({
            title: '请求失败',
            message: error.message,
            type: 'error'
        })
    }

    return Promise.reject(error?.response?.status)
}

// request interceptor
request.interceptors.request.use(config => {
    const { getStatus } = useLayoutStore()
    const token = getStatus.ACCESS_TOKEN
    // 如果 token 存在
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    if (token) {
        config.headers['token'] = token
    }
    return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response: AxiosResponse<IResponse>) => {
    const { data } = response
    const { logout } = useLayoutStore()

    if (data.code !== 200) {
        let title = '请求失败'
        if (data.code === 401) {
            logout()
            title = '身份认证失败'
            location.href = `${location.origin}/robot_admin/login`
        } else if (data.code === 403) {
            router.push({ path: '/main/401' })
        }

        ElNotification({
            title,
            message: data.msg,
            type: 'error'
        })

        return Promise.reject({ code: data.code, msg: data.msg || 'Error' })
    }
    return response
}, errorHandler)

export default request