import styles from './AccountItem.module.scss';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function AccountItem({ data }) {
    return (
        <Link to={`/users/edit/${data.id}`} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.avatar} alt="avatar" />
            <div className={cx('info')}>
                <h4 className={cx('username')}>{data.username}</h4>
                <span className={cx('status')}>{data.status}</span>
            </div>
        </Link>
    );
}
