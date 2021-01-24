import React, { useEffect, useRef, useState } from 'react';
import styles from './index.less';
// import mainBanner from '@assets/main_banner.jpg';
// import utils from '@utils';
import Modal from '@components/pulgIn/Modal';
import { router } from 'umi';
import md5 from 'md5';
import _ from 'lodash';
import { connect } from 'dva';

const psd = 'b6f1537d278f80282e308a5e65e2c2c7';

function Index(props) {
    const { teacherCheck } = props;
    const { checkTeacher } = props;
    const [show, setShow] = useState(false);
    const inputPsd = useRef();

    function changeShow() {
        setShow(false);
    }

    function checkPsd() {
        const val = _.trim(inputPsd.current.value);

        // 首次登录
        if (md5(val) === psd) {
            checkTeacher();
            router.push('/teacher');
        }
    }

    function goTeacher() {
        // 如果已经登录过
        if (teacherCheck) {
            router.push('/teacher');
            return;
        }
        setShow(true);
    }

    function goStudent() {
        router.push('/student');
    }

    return (
        <div className={styles.content}>
            <div className={styles.content_l} onClick={goTeacher}>
                <span>教师</span>
            </div>
            <div className={styles.content_r} onClick={goStudent}>
                <span>学生</span>
            </div>

            <Modal
                show={show}
                footerShow={true}
                headerColor="#191919"
                headerBg="#ccc"
                onOk={checkPsd}
                onCancel={changeShow}
            >
                <div className={styles.input_group}>
                    请输入密码： <input type="text" className={styles.psd_check} ref={inputPsd} />
                </div>
            </Modal>

            {/* <img
                src={mainBanner}
                alt=""
                className={styles.banner}
                // ref={img}
                // onLoad={computedStyle}
            /> */}
        </div>
    );
}

function MapStateToProps(state) {
    return {
        teacherCheck: state.store.teacherCheck,
    };
}

const MapDispatchToProps = dispatch => {
    return {
        checkTeacher: () => {
            return dispatch({
                type: 'store/checkTeacher',
            });
        },
    };
};

export default connect(MapStateToProps, MapDispatchToProps)(Index);
