import styles from './AccountItem.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://lh3.googleusercontent.com/ogw/ADea4I7wyN6WgGDhKr7mh08qsgwi0O2_3kg9d3XzCMuR=s32-c-mo"
                alt="avatar"
            />
            <div className={cx('info')}>
                <h4 className={cx('username')}>Tan Huynh</h4>
                <span className={cx('status')}>Kích hoạt</span>
            </div>
        </div>
    );
}
