const CONFIG_API = {
    HTTP_URL: '',
    VAD_URL: '',
}

if (import.meta.env.DEV) {
    CONFIG_API.HTTP_URL = 'http://127.0.0.1:8000'
    CONFIG_API.VAD_URL = window.location.origin + import.meta.env.BASE_URL + 'vad/'
} else {
    CONFIG_API.HTTP_URL = 'https://app8073.acapp.acwing.com.cn'
    CONFIG_API.VAD_URL = 'https://app8073.acapp.acwing.com.cn/static/frontend/vad/'
}

export default CONFIG_API