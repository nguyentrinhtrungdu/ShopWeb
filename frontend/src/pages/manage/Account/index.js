import styles from '../manage.module.scss';
import {AnalysisBoard} from '../conponent';
import classNames from 'classnames/bind';
import {endpoint} from '../../../services/api.js';

const cx= classNames.bind(styles)
function Account() {
    return (<div className={cx('wrapper')}>
    <div className={cx('contents')}>
     
     
     <h1> Danh sách sản phẩm</h1>
     <AnalysisBoard endpoint={endpoint.user} />
     </div>
 </div>);
}
export default Account;