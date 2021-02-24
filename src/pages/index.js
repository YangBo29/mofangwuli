import React, { useRef, useState } from 'react';
import styles from './index.less';
// import mainBanner from '@assets/main_banner.jpg';
// import utils from '@utils';
import Modal from '@components/pulgIn/Modal';
import { router } from 'umi';
import md5 from 'md5';
import _ from 'lodash';
import { connect } from 'dva';
import Teacher from '@assets/index/teacher.png';
import Student from '@assets/index/student.png';
import TBG from '@assets/index/tbg.png';
import TBGH from '@assets/index/tbg_h.png';
import SBG from '@assets/index/sbg.png';
import SBGH from '@assets/index/sbg_h.png';

const psd = 'b6f1537d278f80282e308a5e65e2c2c7';

function Index(props) {
    const { teacherCheck } = props;
    const { checkTeacher } = props;
    const [show, setShow] = useState(false);
    const inputPsd = useRef();
    const [ts, setTS] = useState(false);
    const [ss, setSS] = useState(false);

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

    function tHover(state) {
        setTS(state);
    }

    function sHover(state) {
        setSS(state);
    }

    return (
        <div className={styles.content}>
            <div className={styles.modification}>
                <div
                    className={styles.teacher}
                    onMouseEnter={tHover.bind(null, true)}
                    onMouseLeave={tHover.bind(null, false)}
                    onClick={goTeacher}
                >
                    <img src={Teacher} alt="" />
                    <img src={ts ? TBGH : TBG} alt="" className={styles.tbg} />
                </div>
                <div
                    className={styles.student}
                    onMouseEnter={sHover.bind(null, true)}
                    onMouseLeave={sHover.bind(null, false)}
                    onClick={goStudent}
                >
                    <img src={Student} alt="" />
                    <img src={ss ? SBGH : SBG} alt="" className={styles.sbg} />
                </div>
                <div className={styles.sub1}></div>
                <div className={styles.sub2}></div>
                <div className={styles.sub3}></div>
                <div className={styles.sub4}></div>
                <div className={styles.sub5}></div>
                <div className={styles.sub6}>
                    <div className={styles.sub_c1}></div>
                    <div className={styles.sub_c2}></div>
                </div>
                <div className={styles.sub7}>
                    <div className={styles.sub_c1}></div>
                    <div className={styles.sub_c2}></div>
                </div>
            </div>
            {/* <div className={styles.content_l} onClick={goTeacher}>
                <span>教师</span>
            </div>
            <div className={styles.content_r}>
                <span>学生</span>
            </div> */}

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
