/**
 * author : yangbo
 * date : 2020/01/15 11:24:23
 * fileName: index.jsx
 * description : 遮罩层
 **/

import React from 'react';
import ReactDom from 'react-dom';
import styles from './index.less';
import utils from '@utils';
import ConfirmBtn from '../ConfirmBtn';

const { noop, stopEvent } = utils;

export default function Modal(props) {
    const {
        id = null, // 弹窗ID
        show = false, // 弹窗显隐切换
        closeShow = true, // 右上关闭按钮显隐
        maskClosable = false, // 点击空白处关闭弹窗
        headerShow = true, // 是否显示头部
        title = '标题', // 头部标题
        headerColor = '#fff', // 头部文字颜色
        headerBg = null, // 头部背景色
        headerFS = null, // 头部文字大小true
        footerShow = false, // 是否显示底部
        bottom = null, // 按钮距底距离
        cancelShow = true, // 是否显示取消按钮
        cancelText = '取消', // 取消按钮文案
        onCancel = noop, // 取消按钮回调函数
        okShow = true, // 是否显示确定按钮
        okText = '确定', // 确定按钮文案
        onOk = noop, // 确定按钮回调函数
        children, // 动态内容
    } = props;
    const [onoff, setOnoff] = React.useState(false);
    const modalDom = React.useRef(null);
    const modalId = id;

    // 绑定 关闭 行为
    function bindCancelHandle() {
        if (onCancel && typeof onCancel === 'function') {
            onCancel();
        }
    }

    // 处理关闭后 延迟隐藏面板
    React.useEffect(() => {
        let timer = null;
        if (show) {
            setOnoff(true);
        } else {
            timer = setTimeout(() => {
                setOnoff(false);
            }, 200);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [show]);

    // 处理关闭后 延迟隐藏面板(错误处理)
    // React.useEffect(
    //     e => {
    //         let timer = null;
    //         // 如果当前菜单是展开状态时
    //         if (!show) {
    //             if (modalDom.current) {
    //                 timer = setTimeout(() => {
    //                     document.body.removeChild(modalDom.current);
    //                 }, 200);
    //             }
    //         } else {
    //             document.body.appendChild(modalDom.current);
    //             modalDom.current.style.display = 'block';
    //         }

    //         return () => {
    //             clearTimeout(timer);
    //         };
    //     },
    //     [show],
    // );

    // 创建 modal 结构
    function createModal() {
        return (
            <div
                className={styles.modal_container}
                onClick={maskClosable ? bindCancelHandle : null}
                ref={modalDom}
                data-id={modalId}
                // key={modalId}
            >
                <div
                    className={`${styles.modal_content} ${
                        show ? styles.modal_content_enter : styles.modal_content_leave
                    }`}
                    onClick={stopEvent}
                >
                    {closeShow ? (
                        <span className={styles.close_btn} onClick={bindCancelHandle}></span>
                    ) : null}
                    {headerShow ? (
                        <div
                            className={styles.modal_title}
                            style={{
                                color: headerColor,
                                fontSize: headerFS,
                                background: headerBg,
                            }}
                        >
                            {title}
                        </div>
                    ) : null}
                    <div className={styles.modal_body} onClick={stopEvent}>
                        {children}
                    </div>
                    {footerShow ? (
                        <ConfirmBtn
                            cancelShow={cancelShow} // 是否显示取消按钮
                            cancelText={cancelText}
                            onCancel={onCancel}
                            okShow={okShow}
                            okText={okText}
                            onOk={onOk}
                            bottom={bottom}
                        ></ConfirmBtn>
                    ) : null}
                </div>
            </div>
        );
    }

    return onoff ? ReactDom.createPortal(createModal(), document.body) : null;
}
