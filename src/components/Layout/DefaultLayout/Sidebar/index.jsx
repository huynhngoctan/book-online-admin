import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
export default function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h1>Hello</h1>
            </div>
        </div>
    );
}
