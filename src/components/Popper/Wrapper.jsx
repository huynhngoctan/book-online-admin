import styles from './Popper.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function Wrapper({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}
