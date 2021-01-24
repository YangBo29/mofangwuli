/**
 * author : yangbo
 * date : 2020/02/18 14:34:04
 * fileName: bubble.jsx
 * description : 气泡弹窗
 **/

import React from 'react';
import Notification from 'rc-notification';
import utils from '@utils';
import './index.less';

const { noop, isObject } = utils;

let defaultDuration = 3; // 默认时长
let defaultTop = 50; // 默认到定距离
let messageInstance = null; // 当前dom元素
let key = 1; //　id
let prefixCls = 'gqy-bubble'; // 类名
let transitionName = 'gqy-move-up'; //　切换类名
let getContainer; //　获取元素
let maxCount = 1; //　最大存在数量

const defaultConfig = {
    prefixCls: '',
    transitionName: '',
    maxCount: 1,
    duration: 2,
    top: 50,
    getContainer,
};

const ArgProps = {
    content: null,
    duration: null,
    type: '',
    onClose: noop,
    key: 1,
};

function getMessageInstance(callback) {
    if (messageInstance) {
        callback(messageInstance);
        return;
    }

    Notification.newInstance(
        {
            prefixCls,
            transitionName,
            style: { top: defaultTop }, // 覆盖原来的样式
            getContainer,
            maxCount,
        },
        instance => {
            if (messageInstance) {
                callback(messageInstance);
                return;
            }
            messageInstance = instance;
            callback(instance);
        },
    );
}

function notice(args = ArgProps) {
    const duration = args.duration !== undefined ? args.duration : defaultDuration;
    const target = args.key || key++;
    const closePromise = new Promise(resolve => {
        const callback = () => {
            if (typeof args.onClose === 'function') {
                args.onClose();
            }
            return resolve(true);
        };

        getMessageInstance(instance => {
            instance.notice({
                key: target,
                duration,
                content: (
                    <div
                        className={`${prefixCls}-container ${
                            args.type ? `${prefixCls}-${args.type}` : ''
                        }`}
                    >
                        <span>{args.content}</span>
                    </div>
                ),
                onClose: callback,
            });
        });
    });

    const result = () => {
        if (messageInstance) {
            messageInstance.removeNotice(target);
        }
    };
    result.then = (filled = noop, rejected = noop) => closePromise.then(filled, rejected);
    result.promise = closePromise;
    return result;
}

const api = {
    open: notice,
    config(options = defaultConfig) {
        if (options.top !== undefined) {
            defaultTop = options.top;
            messageInstance = null;
        }
        if (options.prefixCls !== undefined) {
            prefixCls = options.prefixCls;
        }
        if (options.duration !== undefined) {
            defaultDuration = options.duration;
        }
        if (options.maxCount !== undefined) {
            maxCount = options.maxCount;
            messageInstance = null;
        }
        if (options.transitionName !== undefined) {
            transitionName = options.transitionName;
            messageInstance = null;
        }
        if (options.getContainer !== undefined) {
            getContainer = options.getContainer;
        }
    },
    destroy() {
        if (messageInstance) {
            messageInstance.destroy();
            messageInstance = null;
        }
    },
};

const TYPES = ['default', 'success', 'error', 'info', 'loading', 'warning'];

TYPES.forEach(type => {
    api[type] = (content = ArgProps, duration = defaultDuration, onClose = noop) => {
        if (isObject(content)) {
            return api.open({ ...content, type });
        }

        if (typeof duration === 'function') {
            onClose = duration;
            duration = undefined;
        }

        api.open({ content, duration, type, onClose });
    };
});

api.warn = api.warning;

export default api;
