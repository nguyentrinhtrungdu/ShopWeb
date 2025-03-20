const API_BASE_URL = "http://localhost/api"; // Thay bằng URL của backend

// export const fetchData = async (endpoint) => {
//     try {
//         const response = await fetch(`${API_BASE_URL}/${endpoint}`);
//         if (!response.ok) throw new Error("Lỗi khi fetch dữ liệu!");
//         return await response.json();
//     } catch (error) {
//         console.error("API Error:", error);
//         return null;
//     }
// };
export const fetchData = async (endpoint) => {
    return [
        { id: 1, name: "Sản phẩm A", price: 100000, stock: 10 },
        { id: 2, name: "Sản phẩm B", price: 200000, stock: 5 },
        { id: 3, name: "Sản phẩm C", price: 150000, stock: 8 },
    ];
};