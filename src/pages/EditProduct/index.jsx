import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import { useState } from 'react';

import Button from '~/components/Button';
import Image from '~/components/Image';
import styles from './EditProduct.module.scss';

const cx = classNames.bind(styles);
export default function EditProduct() {
    const [image, setImage] = useState(
        'http://isach.info/images/story/cover/nha_gia_kim__paulo_coelho.jpg',
    );
    const initialState = {
        image: 'http://isach.info/images/story/cover/nha_gia_kim__paulo_coelho.jpg',
        stock: 123,
        status: 'active',
        description: 'hello',
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
    };

    const validate = () => {
        const errors = {};
        // eslint-disable-next-line no-useless-escape
        if (product.stock.length === 0) {
            errors.stock = 'Vui lòng nhập số lượng';
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

    console.log(product);

    return (
        <div className={cx('wrapper')}>
            <h3>Chỉnh sửa thông tin</h3>
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
                        <option value="block">Ngừng bán</option>
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
                        Cập nhật
                    </Button>
                    <Button cancel medium to="/products" type="button">
                        Hủy
                    </Button>
                </div>
            </form>
        </div>
    );
}
