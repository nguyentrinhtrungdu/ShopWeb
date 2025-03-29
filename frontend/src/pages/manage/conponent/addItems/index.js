import { useState, useRef, useEffect  } from "react";
import styles from "./addItem.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark,faImage,faTimes } from "@fortawesome/free-solid-svg-icons";
import Preview from "./preview";
import SeeImage from "./seeImage";

const cx = classNames.bind(styles);

function AddItems({ apiUrl }) {
    const [itemName, setItemName] = useState("");  // Tên sản phẩm
    const [sizes, setSizes] = useState("");
    const [price, setPrice] = useState("");  // Giá sản phẩm
    const [openModel, setOpenModal] = useState(false);
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [description, setDescription] = useState("")
    const [preview, setPreview] = useState(false);
    const [category, setCategory] = useState(""); // Loại hàng đang chọn
    const [categories, setCategories] = useState(["Áo", "Quần", "Giày"]); // Danh sách loại hàng
    const [newCategory, setNewCategory] = useState(""); // Loại hàng mới
    const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
    const [selectedImage, setSelectedImage] = useState( null);
    const fileInputRef = useRef(null);

    const sizeOptions = ["S", "M", "L", "XL", "XXL"];
    
    // mở modal
    const handleOpenModel = () =>{
        setOpenModal(true)
    };
    const handleCloseModal = () => {
        setOpenModal(false);
        setDescription("");
       
        setImages([]);
        setItemName("");
        setSizes([]);
        setNewCategory("")
        setShowNewCategoryInput("")
        
    };
    // chỉnh ảnh
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 0) {
            // Tạo ID duy nhất cho từng ảnh
            const previews = files.map((file) => ({
                file, // Lưu trực tiếp file để gửi lên server
                url: URL.createObjectURL(file),
                id: `${file.name}-${Date.now()}` // ID duy nhất cho phép chọn ảnh giống nhau
            }));

            setImages((prev) => [...prev, ...previews]);
            setImagePreviews((prev) => [...prev, ...previews]);
            
            if (!selectedImage) {
                setSelectedImage(previews[0].url);
            }
            // Reset input để có thể chọn lại ảnh cũ
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };
   

    const openSeeImage = (imgurl) => {
        setSelectedImage(imgurl);
       
    };

    const closeSeeImage = () => {
        setSelectedImage(null);
        
    };
    const handleRemoveImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    
        setImagePreviews((prev) => {
            const deletedImage = prev[index].url; // Lấy URL ảnh bị xóa
            const updatedPreviews = prev.filter((_, i) => i !== index);
    
            // Giải phóng bộ nhớ của ảnh bị xóa
            URL.revokeObjectURL(deletedImage);
    
            // Nếu ảnh bị xóa là ảnh đang hiển thị trong modal
            const nextIndex = index === 0 ? 0 : index - 1;
            if (selectedImage === deletedImage) {
                if (updatedPreviews.length > 0) {
                    // Nếu ảnh bị xóa là ảnh đầu tiên, chuyển sang ảnh tiếp theo
                    setSelectedImage(updatedPreviews[nextIndex]?.url || null);
                } else {
                    setSelectedImage(null); // Nếu không còn ảnh nào, đóng modal
                }
            }
            else{
                if (updatedPreviews.length > 0) {
                    // Nếu ảnh bị xóa là ảnh đầu tiên, chuyển sang ảnh tiếp theo
                    setSelectedImage(selectedImage );
            }
             }
    
            return updatedPreviews;
        });
    };
    

    // đổi size
    const handleSizeChange = (size) => {
        setSizes((prev) => 
            prev.includes(size) ? prev.filter((s) =>s !==size) :[...prev,size]
    );
    }
    // chọn hàng
    const handleCategoryChange = (e) => {
        const selected = e.target.value;
        if (selected === "new") {
            setShowNewCategoryInput(true);
        } else {
            setCategory(selected);
            setShowNewCategoryInput(false);
        }
    };

    // Thêm loại hàng mới
    const handleAddCategory = () => {
        if (newCategory.trim() && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
            setCategory(newCategory);
            setNewCategory("");
            setShowNewCategoryInput(false);
        }
    };
    // xem preview
    const handlePreview = () => {
        if (!category||!itemName || !price || imagePreviews.length === 0 || sizes.length === 0) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        setPreview(true);
        setSelectedImage(null);
       
    };

    // Khi nhấn "Chỉnh sửa", quay lại form
    const handleEdit = () => {
        if (!selectedImage) {
            setSelectedImage(imagePreviews[0].url);
        }
        setPreview(false);
        setOpenModal(true);
    };
    // thêm item vào data
    const handleAddItem = async () => {
        if (!itemName || !price || !images) {
           
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        const formData = new FormData();
        formData.append("itemName", itemName);
        formData.append("price", price);
        formData.append("image", images);

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (data.success) {
               
                alert("Thêm sản phẩm thành công!");
                setItemName("");
                setPrice("");
                setDescription("");
                setImages([]);
                setSizes([]);
                setPreview(false);
                setOpenModal(false);
            } else {
               
                alert("Thêm sản phẩm thất bại!");
            }
        } catch (error) {
            console.error("Lỗi:", error);
            
            alert("Có lỗi xảy ra!")
        }
    };

    return (
        <div className={cx('wrapper')}>
           
                <div className={cx('btn-openModel')} onClick={handleOpenModel}>
                    <FontAwesomeIcon icon={faPlus} /> 
                </div>
           
            
            {openModel && (    
                <div className={cx('modal')}>
                {!preview ? (
                    <div className={cx('contents')}>
               
                    {/* Dropdown chọn loại hàng */}
                <select className={cx('form-modal')} value={category} onChange={handleCategoryChange}>
                    <option value="">Chọn loại hàng</option>
                    {categories.map((cat, index) => (
                        <option  key={index} value={cat}>
                            {cat}
                        </option>
                    ))}
                    <option value="new">+ Thêm loại hàng mới</option>
                </select>

                {/* Ô nhập loại hàng mới */}
                {showNewCategoryInput && (
                    <div className={cx('new-category')}>
                        <input
                            className={cx('form-modal')}
                            type="text"
                            placeholder="Nhập loại hàng mới"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                        />
                        <div className={cx('btn-new-category')}
                                onClick={handleAddCategory}
                                 >
                                <FontAwesomeIcon icon={faPlus} /> Thêm
                         </div>
                    </div>
                )}
                    <input
                        className={cx('form-modal')}
                        type="text"
                        placeholder="Tên sản phẩm"
                        value={itemName}
                     
                        onChange={(e) => setItemName(e.target.value)}
                    />
                    <label className={cx('upload-label')}>
                            <FontAwesomeIcon icon={faImage} /> Chọn ảnh
                            <input type="file" 
                            accept="image/*"  
                            multiple onChange={handleImageChange} 
                            ref={fileInputRef}
                            hidden />
                    </label>
                    <div className={cx('preview-container')}>
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className={cx('image-preview-wrapper')} onClick={() => openSeeImage(preview.url)}>
                                    <img src={preview.url} alt={`Xem trước ${index}`} className={cx('image-preview')  } />
                                    <button className={cx('btn-remove')} onClick={() => handleRemoveImage(index)}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className={cx('size-options')}>
                            <p>Chọn size:</p>
                            {sizeOptions.map((size) => (
                                <label key={size} className={cx('size-label')}>
                                    <input
                                        className={cx('checkbox')}
                                        type="checkbox"
                                        value={size}
                                        checked={sizes.includes(size)}
                                        onChange={() => handleSizeChange(size)}
                                    />
                                    <p   className={cx('sizeofcheckbox')}>{size}</p>
                                </label>
                            ))}
                        </div>    
                    <input
                        className={cx('form-modal')}
                        type="number"
                        placeholder="Giá sản phẩm"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <textarea 
                        className={cx('form-modal')}
                        placeholder="Nhập mô tả sản phẩm..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button className={cx('btn-preview')} onClick={handlePreview} >
                         Tiếp tục
                    </button>
                    
                    <div className={cx('btn-closeModel')} onClick={handleCloseModal}>
                        <FontAwesomeIcon icon={faXmark} /> 
                    </div>
            </div> ) : 
                        // ======================= Xem trước sản phẩm =======================
                      
                        (<Preview {...{ category, itemName, price, description, sizes, imagePreviews, handleEdit, handleAddItem }} /> )
                    }
                    <SeeImage imgurl={selectedImage} onClose={closeSeeImage} />
                    </div>)}
        </div>
    );
}

export default AddItems;
