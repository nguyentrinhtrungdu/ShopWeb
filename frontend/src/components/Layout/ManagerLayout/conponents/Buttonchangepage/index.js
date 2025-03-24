import { useNavigate, useLocation } from "react-router-dom";
import styles from './Button.module.scss'
import classNames from 'classnames/bind';

const cx= classNames.bind(styles)

function ButtonChangePage({page,label}) {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = location.pathname === page; // Kiểm tra trang hiện tại


   

    return (
        <div className={cx('btn-manage', {active: isActive})} 
        onClick={()=>{navigate(page)}}
        >
        {label}
        </div>
    );
}

export default ButtonChangePage;