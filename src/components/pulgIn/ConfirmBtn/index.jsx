/**
 * author : yangbo
 * date : 2020/01/16 10:42:03
 * fileName: index.jsx
 * description : 确认取消按钮组
 **/

import React from 'react';
import styles from './index.less';
import utils from '@utils';

const { noop } = utils;

export default function ConfirmBtn(props) {
    const {
        cancelShow = true, // 是否显示取消按钮
        cancelText = '取消', // 取消按钮文案
        onCancel = noop, // 取消按钮回调函数
        cancelStyle = {}, //取消按钮样式
        okStyle = {}, //确认按钮样式
        okShow = true, // 是否显示确定按钮
        okText = '确定', // 确定按钮文案
        onOk = noop, // 确定按钮回调函数
        bottom = null, // 按钮距底距离
    } = props;

    // 绑定 关闭 行为
    function bindCancelHandle() {
        if (onCancel && typeof onCancel === 'function') {
            onCancel();
        }
    }

    // 绑定 确认 行为
    function bindOkHandle() {
        if (onOk && typeof onOk === 'function') {
            if (onOk()) onCancel();
        }
    }

    return (
        <div className={styles.confirm_container} style={{ paddingBottom: bottom }}>
            {cancelShow ? (
                <span
                    className={styles.confirm_cancel}
                    style={cancelStyle}
                    onClick={bindCancelHandle}
                >
                    {cancelText}
                </span>
            ) : null}
            {okShow ? (
                <span className={styles.confirm_ok} style={okStyle} onClick={bindOkHandle}>
                    {okText}
                </span>
            ) : null}
        </div>
    );
}
