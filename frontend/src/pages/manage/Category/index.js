import {AnalysisBoard,AddItems} from '../conponent';
import styles from '../manage.module.scss';
import classNames from 'classnames/bind';
import {endpoint} from '../../../services/api.js';
import { useState } from 'react';
const cx= classNames.bind(styles)

function Category() {
   
    
    return (
        <div className={cx('wrapper')}>
           <div className={cx('contents')}>
            <AddItems/>
            
            <h1> Danh sách sản phẩm</h1>
            <AnalysisBoard endpoint={endpoint.products} />
            </div>
        </div>
    );
}
export default Category;