import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);
export default function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}></div>
        </div>
    );
}
