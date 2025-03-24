import { useState, useRef, useEffect,useReducer  } from "react";
import styles from "./addItem.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark,faImage,faTimes } from "@fortawesome/free-solid-svg-icons";
import Preview from "./preview";
import SeeImage from "./seeImage";
const cx = classNames.bind(styles);

const initialState = {
    openModel: false,
    preview: false,
    category: "",
    categories: ["Quần áo", "Giày dép", "Phụ kiện"],
    showNewCategoryInput: false,
    newCategory: "",
    itemName: "",
    images: [],
    imagePreviews: [],
    selectedImage: null,
    sizes: [],
    price: "",
    description: ""
};

function reducer(state, action) {
    switch (action.type) {
        case "OPEN_MODAL":
            return { ...state, openModel: true };
        case "CLOSE_MODAL":
            return { ...state, openModel: false, preview: false };
        case "SET_CATEGORY":
            return { ...state, category: action.payload, showNewCategoryInput: action.payload === "new" };
        case "ADD_NEW_CATEGORY":
            return {
                ...state,
                categories: [...state.categories, state.newCategory],
                category: state.newCategory,
                newCategory: "",
                showNewCategoryInput: false
            };
        case "SET_ITEM_NAME":
            return { ...state, itemName: action.payload };
        case "ADD_IMAGE":
            return { ...state, imagePreviews: [...state.imagePreviews, action.payload] };
            case "REMOVE_IMAGE":
                const index = action.payload;
                const deletedImage = state.imagePreviews[index]?.url;
    
                // Cập nhật danh sách ảnh
                const updatedPreviews = state.imagePreviews.filter((_, i) => i !== index);
                const updatedImages = state.images.filter((_, i) => i !== index);
    
                // Giải phóng bộ nhớ của ảnh bị xóa
                if (deletedImage) {
                    URL.revokeObjectURL(deletedImage);
                }
    
                // Cập nhật ảnh đang xem trong modal
                const nextIndex = index === 0 ? 0 : index - 1;
                const newSelectedImage = state.selectedImage === deletedImage
                    ? updatedPreviews[nextIndex]?.url || null
                    : state.selectedImage;
    
                return {
                    ...state,
                    images: updatedImages,
                    imagePreviews: updatedPreviews,
                    selectedImage: newSelectedImage,
                };
        case "SET_SIZES":
            return {
                ...state,
                sizes: state.sizes.includes(action.payload)
                    ? state.sizes.filter(size => size !== action.payload)
                    : [...state.sizes, action.payload]
            };
        case "SET_PRICE":
            return { ...state, price: action.payload };
        case "SET_DESCRIPTION":
            return { ...state, description: action.payload };
        case "TOGGLE_PREVIEW":
            return { ...state, preview: !state.preview };
        case "SET_SELECTED_IMAGE":
            return { ...state, selectedImage: action.payload };
        default:
            return state;
    }
}

function ProductModal() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const fileInputRef = useRef(null);
    const sizeOptions = ["S", "M", "L", "XL"];

    const handleOpenModal = () => dispatch({ type: "OPEN_MODAL" });
    const handleCloseModal = () => dispatch({ type: "CLOSE_MODAL" });
    const handleCategoryChange = (e) => dispatch({ type: "SET_CATEGORY", payload: e.target.value });
    const handleAddCategory = () => dispatch({ type: "ADD_NEW_CATEGORY" });
    const handleItemNameChange = (e) => dispatch({ type: "SET_ITEM_NAME", payload: e.target.value });
    const handlePriceChange = (e) => dispatch({ type: "SET_PRICE", payload: e.target.value });
    const handleDescriptionChange = (e) => dispatch({ type: "SET_DESCRIPTION", payload: e.target.value });
    const handleSizeChange = (size) => dispatch({ type: "SET_SIZES", payload: size });
    const handlePreview = () => dispatch({ type: "TOGGLE_PREVIEW" });

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imagePreviews = files.map(file => ({
            url: URL.createObjectURL(file),
            file
        }));
        imagePreviews.forEach(img => dispatch({ type: "ADD_IMAGE", payload: img }));
    };

    const handleRemoveImage = (index) => {

        dispatch({ type: "REMOVE_IMAGE", payload: index });
    }
   
    const openSeeImage = (url) => dispatch({ type: "SET_SELECTED_IMAGE", payload: url });
    const closeSeeImage = () => dispatch({ type: "SET_SELECTED_IMAGE", payload: null });

    return (
        <div className={cx("wrapper")}>
            <div className={cx("btn-openModel")} onClick={handleOpenModal}>
                <FontAwesomeIcon icon={faPlus} />
            </div>

            {state.openModel && (
                <div className={cx("modal")}>
                    {!state.preview ? (
                        <div className={cx("contents")}>
                            {/* Dropdown chọn loại hàng */}
                            <select className={cx("form-modal")} value={state.category} onChange={handleCategoryChange}>
                                <option value="">Chọn loại hàng</option>
                                {state.categories.map((cat, index) => (
                                    <option key={index} value={cat}>{cat}</option>
                                ))}
                                <option value="new">+ Thêm loại hàng mới</option>
                            </select>

                            {/* Ô nhập loại hàng mới */}
                            {state.showNewCategoryInput && (
                                <div className={cx("new-category")}>
                                    <input
                                        className={cx("form-modal")}
                                        type="text"
                                        placeholder="Nhập loại hàng mới"
                                        value={state.newCategory}
                                        onChange={(e) => dispatch({ type: "SET_NEW_CATEGORY", payload: e.target.value })}
                                    />
                                    <div className={cx("btn-new-category")} onClick={handleAddCategory}>
                                        <FontAwesomeIcon icon={faPlus} /> Thêm
                                    </div>
                                </div>
                            )}

                            {/* Tên sản phẩm */}
                            <input
                                className={cx("form-modal")}
                                type="text"
                                placeholder="Tên sản phẩm"
                                value={state.itemName}
                                onChange={handleItemNameChange}
                            />

                            {/* Upload ảnh */}
                            <label className={cx("upload-label")}>
                                <FontAwesomeIcon icon={faImage} /> Chọn ảnh
                                <input type="file" accept="image/*" multiple onChange={handleImageChange} ref={fileInputRef} hidden />
                            </label>

                            {/* Xem trước ảnh */}
                            <div className={cx("preview-container")}>
                                {state.imagePreviews.map((preview, index) => (
                                    <div key={index} className={cx("image-preview-wrapper")} onClick={() => openSeeImage(preview.url)}>
                                        <img src={preview.url} alt={`Xem trước ${index}`} className={cx("image-preview")} />
                                        <button className={cx("btn-remove")} onClick={() => handleRemoveImage(index)}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Chọn size */}
                            <div className={cx("size-options")}>
                                <p>Chọn size:</p>
                                {sizeOptions.map((size) => (
                                    <label key={size} className={cx("size-label")}>
                                        <input
                                            className={cx("checkbox")}
                                            type="checkbox"
                                            value={size}
                                            checked={state.sizes.includes(size)}
                                            onChange={() => handleSizeChange(size)}
                                        />
                                        <p className={cx("sizeofcheckbox")}>{size}</p>
                                    </label>
                                ))}
                            </div>

                            {/* Giá sản phẩm */}
                            <input className={cx("form-modal")} type="number" placeholder="Giá sản phẩm" value={state.price} onChange={handlePriceChange} />

                            {/* Mô tả sản phẩm */}
                            <textarea className={cx("form-modal")} placeholder="Nhập mô tả sản phẩm..." value={state.description} onChange={handleDescriptionChange} />

                            {/* Nút tiếp tục */}
                            <button className={cx("btn-preview")} onClick={handlePreview}>Tiếp tục</button>

                            {/* Nút đóng modal */}
                            <div className={cx("btn-closeModel")} onClick={handleCloseModal}>
                                <FontAwesomeIcon icon={faXmark} />
                            </div>
                        </div>
                    ) : (
                        <Preview {...state} handleEdit={handlePreview} handleAddItem={() => {}} />
                    )}
                    <SeeImage imgurl={state.selectedImage} onClose={closeSeeImage} />
                </div>
            )}
        </div>
    );
}

export default ProductModal;
