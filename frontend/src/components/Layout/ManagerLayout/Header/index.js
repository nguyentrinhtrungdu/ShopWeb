import styles from './Header_ma.module.scss';
import classNames from 'classnames/bind';
import ButtonChangePage from '../conponents/Buttonchangepage';
import Logout from '../conponents/logout';
const cx= classNames.bind(styles)
function Header() {
    return (
      <header className={cx('wrapper')}>
        <div className={cx('content')} >
          <div className={cx('title-container')}>
              <h1>TRANG QUẢN LÝ</h1>
          </div>
          <div className={cx('btn-container')}>
              <ButtonChangePage page="/category" label={"Quản lý kho"}/>
              <ButtonChangePage page="/orders" label={"Quản lý đơn hàng"}/>
              <ButtonChangePage page="/account" label={"Quản lý tài khoản"}/>
              
          </div>
          <div className={cx('logout-container')}>
              <Logout/>
          </div>
        </div>
      </header>
    );
  }
  
  export default Header;