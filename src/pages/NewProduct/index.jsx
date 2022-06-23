import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import Button from '~/components/Button';
import Image from '~/components/Image';
import styles from './NewProduct.module.scss';

const cx = classNames.bind(styles);
export default function NewProduct() {
    const [image, setImage] = useState('');
    const initialState = {
        image: '',
        name: '',
        stock: '',
        author: '',
        publisher: '',
        publishingYear: '',
        genre: '',
        status: '',
        description: '',
    };

    const [product, setProduct] = useState(initialState);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formError, setFormError] = useState({});

    const imageRef = useRef();

    const handleUpdateImage = () => {
        setImage(URL.createObjectURL(imageRef.current.files[0]));
    };

    const handleOnChange = (name, value) => {
        setProduct({
            ...product,
            [name]: value,
        });
    };
    const handleValidate = () => {
        setFormError(validate);
        setIsSubmit(true);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    };

    console.log(product);

    const validate = () => {
        const errors = {};
        // eslint-disable-next-line no-useless-escape
        if (product.name.length <= 0) {
            errors.name = 'Vui lòng nhập tên';
        }
        if (product.stock.length <= 0) {
            errors.stock = 'Vui lòng nhập số lượng';
        }
        if (product.author.length <= 0) {
            errors.author = 'Vui lòng nhập tên tác giả';
        }
        if (product.publisher.length <= 0) {
            errors.publisher = 'Vui lòng nhập tên nhà xuất bản';
        }
        if (product.publishingYear.length <= 0) {
            errors.publishingYear = 'Vui lòng nhập năm xuất bản';
        }
        return errors;
    };

    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmit) {
            //Call API
            console.log(product);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError]);

    return (
        <div className={cx('wrapper')}>
            <h3>Thêm sản phẩm</h3>
            <form className={cx('form')}>
                <div className={cx('image-wrapper')}>
                    <Image className={cx('image')} src={image} alt="image" />
                    <label htmlFor="image">
                        <FontAwesomeIcon icon={faPen} className={cx('icon')} />
                    </label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={handleUpdateImage}
                        ref={imageRef}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="name">
                        Tên sản phẩm (*)
                    </label>
                    <input
                        className={cx('form-control', {
                            error: !!formError.name,
                        })}
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    />
                    {formError.name && (
                        <span className={cx('form-error')}>
                            {formError.name}
                        </span>
                    )}
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="stock">
                        Số lượng (*)
                    </label>
                    <input
                        className={cx('form-control', {
                            error: !!formError.stock,
                        })}
                        type="number"
                        id="stock"
                        name="stock"
                        value={product.stock}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    />
                    {formError.stock && (
                        <span className={cx('form-error')}>
                            {formError.stock}
                        </span>
                    )}
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="author">
                        Tác giả (*)
                    </label>
                    <input
                        className={cx('form-control', {
                            error: !!formError.author,
                        })}
                        type="text"
                        id="author"
                        name="author"
                        value={product.author}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    />
                    {formError.author && (
                        <span className={cx('form-error')}>
                            {formError.author}
                        </span>
                    )}
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="publisher">
                        Nhà xuất bản (*)
                    </label>
                    <input
                        className={cx('form-control', {
                            error: !!formError.publisher,
                        })}
                        type="text"
                        id="publisher"
                        name="publisher"
                        value={product.publisher}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    />
                    {formError.publisher && (
                        <span className={cx('form-error')}>
                            {formError.publisher}
                        </span>
                    )}
                </div>
                <div className={cx('form-group')}>
                    <label
                        className={cx('form-title')}
                        htmlFor="publishingYear"
                    >
                        Năm xuất bản (*)
                    </label>
                    <input
                        className={cx('form-control', {
                            error: !!formError.publishingYear,
                        })}
                        type="number"
                        id="publishingYear"
                        name="publishingYear"
                        value={product.publishingYear}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    />
                    {formError.publishingYear && (
                        <span className={cx('form-error')}>
                            {formError.publishingYear}
                        </span>
                    )}
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="genre">
                        Thể loại
                    </label>
                    <select
                        id="genre"
                        className={cx('form-control')}
                        name="genre"
                        value={product.genre}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    >
                        <option value="Tiểu thuyết">Tiểu thuyết</option>
                        <option value="Sách giáo khoa">Sách giáo khoa</option>
                    </select>
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="status">
                        Trạng thái
                    </label>
                    <select
                        id="status"
                        name="status"
                        className={cx('form-control')}
                        value={product.status}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    >
                        <option value="active">Mở bán</option>
                        <option value="block">Ngừng kinh doanh</option>
                    </select>
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="description">
                        Mô tả
                    </label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={product.description}
                        onReady={(editor) => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            handleOnChange('description', data);
                        }}
                    />
                </div>
                <div className={cx('actions')}>
                    <Button
                        edited
                        medium
                        type="button"
                        onClick={handleValidate}
                    >
                        Thêm
                    </Button>
                    <Button cancel medium to="/products" type="button">
                        Hủy
                    </Button>
                </div>
            </form>
        </div>
    );
}
