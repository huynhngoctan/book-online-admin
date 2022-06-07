import {
    faMagnifyingGlass,
    faSpinner,
    faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);
export default function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <span>Admin</span>
                </div>
                <div className={cx('search')}>
                    <input
                        className={cx('search-input')}
                        type="text"
                        placeholder="Tìm kiếm theo tên người dùng hoặc sản phẩm"
                    />
                    <FontAwesomeIcon
                        className={cx('loading')}
                        icon={faSpinner}
                    />
                    <FontAwesomeIcon
                        className={cx('clear')}
                        icon={faXmarkCircle}
                    />
                    <button className={cx('search-button')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
                <div className="acount-action">Acount</div>
            </div>
        </div>
    );
}
