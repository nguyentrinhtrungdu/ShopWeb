import { useState } from "react";
import styles from "./addItem.module.scss";
import classNames from "classnames/bind";
import SeeImage from "./seeImage";
const cx = classNames.bind(styles);
function Preview({ category, itemName, price, description, sizes, imagePreviews, handleEdit, handleAddItem })
{

    const [selectedImage, setSelectedImage] = useState(imagePreviews.length > 0 ? imagePreviews[0].url : null);
    const openSeeImage = (imgurl) => {
        setSelectedImage(imgurl);
    };

    const closeSeeImage = () => {
        setSelectedImage(null);
    };
    return(
                <div className={cx('modal')}> 
                  <div className={cx('contents')}>
                                    <h2>Xem Trước Sản Phẩm</h2>
                                    <p className={cx('form-modal')}><strong>loại hàng:</strong> {category}</p>
                                    <p className={cx('form-modal')}><strong>Tên:</strong> {itemName}</p>
                                    <p className={cx('form-modal')}><strong>Giá:</strong> {price} VND</p>
                                    <p className={cx('form-modal')}><strong>Mô tả:</strong> {description}</p>
                                    <p className={cx('form-modal')}><strong>Size:</strong> {sizes.join(", ")}</p>
        
                                    {/* Hiển thị ảnh */}
                                    <div className={cx('preview-container')}>
                                            {imagePreviews.map((preview, index) => (
                                            <div key={index} className={cx('image-preview-wrapper')} onClick={() => openSeeImage(preview.url)}>
                                                <img src={preview.url} alt={`Xem trước ${index}`} className={cx('image-preview')} />
                                                
                                            </div>
                                        ))}
                                    </div>
                                    <div className={cx('btn-accept')}>
                                        <button onClick={handleEdit}>Chỉnh sửa</button>
                                        <button onClick={handleAddItem}>Xác nhận </button>
                                    </div>
                                </div>
                                <SeeImage imgurl={selectedImage} onClose={closeSeeImage} />
              </div>
    )
}
export default Preview;