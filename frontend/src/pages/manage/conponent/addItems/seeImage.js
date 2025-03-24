import { useState, useEffect } from "react";
import styles from "./addItem.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function SeeImage({ imgurl, onClose }) {
    const [seeImage, setSeeImage] = useState(null);

    // Cập nhật ảnh khi imgurl thay đổi
    useEffect(() => {
        setSeeImage(imgurl);
    }, [imgurl]);

    const closeSeeImage = () => {
        setSeeImage(null);
        if (onClose) onClose(); // Gọi hàm đóng modal từ component cha (nếu có)
    };

    // Nếu không có ảnh, không hiển thị modal
    if (!seeImage) return null;

    return (
        <div className={cx("image-modal")} onChange={closeSeeImage}>
            <div className={cx("image-modal-content")} onClick={(e) => e.stopPropagation()}>
                <img src={seeImage} alt="Xem trước lớn" className={cx("image-full")} />
                <div className={cx("btn-closeimg")} onClick={closeSeeImage}>✖</div>
            </div>
        </div>
    );
}

export default SeeImage;
