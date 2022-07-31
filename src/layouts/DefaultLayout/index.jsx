import Header from './Header';
import Sidebar from './Sidebar';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import { Navigate } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function DefaultLayout({ children }) {
    const userLocal = localStorage.getItem('user');
    return (
        <>
            {userLocal === null ? (
                <Navigate to="/login" replace={true} />
            ) : (
                <div className={cx('wrapper')}>
                    <Header />
                    <div className={cx('container')}>
                        <Sidebar />
                        <div className={cx('content')}>{children}</div>
                    </div>
                </div>
            )}
        </>
    );
}
