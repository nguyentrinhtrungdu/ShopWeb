import styles from './logout.module.scss'
import classNames from 'classnames/bind';
import '@fortawesome/fontawesome-free/css/all.min.css';

const cx= classNames.bind(styles)

function logout() {
    return(
        <button className={cx('btn-logout')}><i className="fa-solid fa-right-from-bracket"></i></button>
    )
}

export default logout;