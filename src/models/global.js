// import setCookie from "../utils/store";

export default {
    // 空间名
    namespace: 'global',

    // 状态机
    state: {
        SCREENSIZE: 1920, // 当前屏幕尺寸， 默认1920
        LAYOUTSIZE: 1440, // 设计稿尺寸 （参照尺寸）
        pathName: '', // 当前页面路由 String
        update: false, // 页面更新
        routerPath: '', // 当前路由名
        code: true, // 代码面板
    },

    // 事件池
    subscriptions: {},

    // dispatch
    effects: {
        // 全局更新
        *update({ payload }, { call, put, select }) {
            yield put({
                type: 'updateAPI',
            });
        },
        // 获取用户token和用户信息
        *storeUserInfo({ payload }, { call, put, select }) {
            yield put({
                type: 'storeUserInfoAPI',
                payload: payload,
            });
        },
        // 清楚用户信息
        *clearUserInfo({ payload }, { call, put, select }) {
            yield put({
                type: 'clearUserInfoAPI',
            });
        },
    },

    // reducers
    reducers: {
        updateState(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
        // 更新
        updateAPI(state, action) {
            return {
                ...state,
                update: !state.update,
            };
        },
        // 更新用户信息
        storeUserInfoAPI(state, action) {
            return {
                ...state,
                userInfo: action.payload,
            };
        },
        // 清空用户信息
        clearUserInfoAPI(state, action) {
            return {
                ...state,
                userInfo: {},
            };
        },
    },
};
