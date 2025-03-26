import styles from './analysisBoard.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from "react";
import { fetchData } from '../../../../services/api'; // Import API service
import ShowInfor from '../showInfor';
import axios  from 'axios';
const cx= classNames.bind(styles)

function AnalysisBoard({ endpoint }) {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState(null);
    // useEffect(() => {
    //     async function getData() {
    //         const result = await fetchData(endpoint);
    //         if (result && result.length > 0) {
    //             setColumns(Object.keys(result[0])); // Lấy tên cột tự động
    //             setData(result);
    //         }
    //     }
    //     getData();
    // }, [endpoint]);
    console.log(endpoint)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(endpoint);
                   
                setData(res.data.data);
                if (res.data.data&& res.data.data.length > 0) {
                    setColumns(Object.keys(res.data.data[0]))
                    setData(res.data.data);
                   
                    
                    
                }

                            
                console.log(res.data)
            } catch (error) {
                console.error('Error fetching users:', error);
            }
            
            
        };
        fetchData();
    }, [endpoint]);
    const handleClickRow = (rowData) => {
        setSelectedRowData(rowData); // Lưu dữ liệu của hàng đã chọn
    };
    const handleCloseModal = () => {
        setSelectedRowData(null); // Đóng modal
    };
    return (
        <div className={cx("wrapper")}>
            {data.length > 0 ? (
                <table className={cx("table")}>
                
                    <thead>
                        <tr>
                            {columns.map((col) => (                               
                                (<th key={col}>{col}</th>)
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr className={cx('row-table')} key={index} onClick={()=>handleClickRow(row)}>
                                {columns.map((col) => (
                                    <td key={col}>{row[col]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className={cx("no-data")}>Không có dữ liệu</p>
            )}
            <ShowInfor data={selectedRowData} onClose={handleCloseModal} />
        </div>
    );
}
export default AnalysisBoard;