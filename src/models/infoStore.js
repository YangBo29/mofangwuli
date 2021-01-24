// import setCookie from "../utils/store";

export default {
    // 空间名
    namespace: 'store',

    // 状态机
    state: {
        teacherCheck: false,
    },

    // 事件池
    subscriptions: {},

    // dispatch
    effects: {
        // 全局更新
        *checkTeacher({ payload }, { call, put, select }) {
            yield put({
                type: 'updateState',
                payload: {
                    teacherCheck: true,
                },
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
    },
};
