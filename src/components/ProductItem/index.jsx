import styles from './ProductItem.module.scss';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function ProductItem({ data }) {
    console.log(data);
    return (
        <Link to={`/products/edit/${data.id}`} className={cx('wrapper')}>
            <Image className={cx('image')} src={data.linkImage} alt="Image" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>{data.name}</h4>
                <span className={cx('author')}>{data.author}</span>
            </div>
        </Link>
    );
}
