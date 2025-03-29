import styles from './showInfor.module.scss';
import classNames from 'classnames/bind';
const cx= classNames.bind(styles)

function ShowInfor({ data,onClose}) {
    if (!data) return null;

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains(cx("modal"))) {
            onClose(); // Gọi hàm đóng modal khi click vào phần ngoài
        }
    };

    return (
        <div className={cx("modal")}  onClick={handleOutsideClick}>
            <div className={cx('contents')}>
            <h3>Thông tin chi tiết</h3>
                {Object.entries(data).map(([key, value]) => (
                    <p key={key}>
                        
                        {key === "image" ? (
                                        <div><strong>{key}:</strong>      <img src={value} alt="image" width="50" height="50" /></div>
                                  
                                    ) : (
                                           <div><strong>{key}:</strong> {value}</div> 
                                    )}
                    </p>
                   
                ))}
            </div>
        </div>
    );
}
export default ShowInfor;