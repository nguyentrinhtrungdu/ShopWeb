import styles from './analysisBoard.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from "react";
import { fetchData } from '../../../../services/api'; // Import API service
const cx= classNames.bind(styles)

function AnalysisBoard({ endpoint }) {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        async function getData() {
            const result = await fetchData(endpoint);
            if (result && result.length > 0) {
                setColumns(Object.keys(result[0])); // Lấy tên cột tự động
                setData(result);
            }
        }
        getData();
    }, [endpoint]);

    return (
        <div className={cx("wrapper")}>
            {data.length > 0 ? (
                <table className={cx("table")}>
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th key={col}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
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
        </div>
    );
}
export default AnalysisBoard;