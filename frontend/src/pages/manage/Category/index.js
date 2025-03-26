import {AnalysisBoard,AddItems} from '../conponent';
import ProductModal from '../conponent/addItems/autoFocus';
import styles from '../manage.module.scss';
import classNames from 'classnames/bind';

const cx= classNames.bind(styles)

function Category() {
    return (
        <div className={cx('wrapper')}>
           <div className={cx('contents')}>
            <AddItems/>
            <ProductModal/>
            <h1> Danh sách sản phẩm</h1>
            <AnalysisBoard endpoint="products" />
            </div>
        </div>
    );
}
export default Category;