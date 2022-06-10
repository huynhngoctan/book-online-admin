import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBook,
    faCartShopping,
    faHouse,
    faPaperPlane,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
export default function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <ul className={cx('list-link')}>
                    <Link to="/" className={cx('link-route')}>
                        <li className={cx('link')}>
                            <FontAwesomeIcon
                                className={cx('icon')}
                                icon={faHouse}
                            />
                            Trang chủ
                        </li>
                    </Link>
                    <Link to="/users" className={cx('link-route')}>
                        <li className={cx('link')}>
                            <FontAwesomeIcon
                                className={cx('icon')}
                                icon={faUser}
                            />
                            Tài khoản
                        </li>
                    </Link>

                    <Link to="/products" className={cx('link-route')}>
                        <li className={cx('link')}>
                            <FontAwesomeIcon
                                className={cx('icon')}
                                icon={faBook}
                            />
                            Sản phẩm
                        </li>
                    </Link>
                    <Link to="/orders" className={cx('link-route')}>
                        <li className={cx('link')}>
                            <FontAwesomeIcon
                                className={cx('icon')}
                                icon={faCartShopping}
                            />
                            Đơn hàng
                        </li>
                    </Link>
                    <Link to="/contact" className={cx('link-route')}>
                        <li className={cx('link')}>
                            <FontAwesomeIcon
                                className={cx('icon')}
                                icon={faPaperPlane}
                            />
                            Liên hệ
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}
