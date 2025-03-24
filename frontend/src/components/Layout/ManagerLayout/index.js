import Header from "./Header";
import classNames from 'classnames/bind';
import styles from './ManagerLayout.module.scss';
const cx= classNames.bind(styles)
function ManagerLayout({children}) {
    return(
        <div className={cx('wrapper')}>
            <Header />
            {/* <div className={cx('left-box')}></div> */}
            <div className={cx('container')}>
                <div className={cx('content')}> {children}</div>
            </div>
        </div>      
    )
}
export default ManagerLayout;