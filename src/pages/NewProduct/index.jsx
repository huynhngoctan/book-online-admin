// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import Button from '~/components/Button';
import styles from './NewProduct.module.scss';
import images from '~/assets/images';
import { toast, ToastContainer } from 'react-toastify';
import * as productService from '~/services/productService';

const cx = classNames.bind(styles);
export default function NewProduct() {
    const [image, setImage] = useState();
    const initialState = {
        name: '',
        author: '',
        publisher: '',
        publishingYear: 0,
        genre: 'Tiểu thuyết',
        weight: 0,
        numberOfPages: 0,
        status: 'Mở bán',
        description: '',
        stock: 0,
        price: 0,
        linkImage: '',
    };

    const [product, setProduct] = useState(initialState);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formError, setFormError] = useState({});
    const [name, setName] = useState('');
    const [isName, setIsName] = useState(false);

    const handlePreviewImage = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage(file);
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
        } else if (isName) {
            errors.name = 'Tên đăng nhập đã tồn tại';
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

    //Clear preview image
    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image.preview);
        };
    }, [image]);
    // Call API check name
    useEffect(() => {
        if (name) {
            const fetchAPI = async () => {
                const res = await productService.checkName(name);

                if (res.status === 'success') setIsName(true);
                else setIsName(false);
            };
            fetchAPI();
        }
    }, [name]);
    // Call API add product if form is valid
    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmit) {
            const fetchAPI = async () => {
                if (image) {
                    const resUpload = await productService.uploadImage(image);
                    product.linkImage = `http://localhost:8080/api/v1/FileUpload/files/${resUpload}`;
                }
                const res = await productService.createProduct(product);

                res.status === 'success'
                    ? toast.success('Thêm thành công', {
                          autoClose: 3000,
                          position: 'top-right',
                      })
                    : toast.error('Thêm thất bại', {
                          autoClose: 3000,
                          position: 'top-right',
                      });
            };
            fetchAPI();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError]);

    return (
        <div className={cx('wrapper')}>
            <h3>Thêm sản phẩm</h3>
            <form className={cx('form')}>
                <div className={cx('image-wrapper')}>
                    <img
                        className={cx('image')}
                        src={image ? image.preview : images.noImage}
                        alt="img"
                    />
                    <label htmlFor="image">
                        <FontAwesomeIcon icon={faPen} className={cx('icon')} />
                    </label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={handlePreviewImage}
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
                        onChange={(e) => {
                            handleOnChange(e.target.name, e.target.value);
                            setName(e.target.value);
                        }}
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
                    <label className={cx('form-title')} htmlFor="weight">
                        Trọng lượng (gram)
                    </label>
                    <input
                        className={cx('form-control', {
                            error: !!formError.weight,
                        })}
                        type="number"
                        id="weight"
                        name="weight"
                        value={product.weight}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    />
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="numberOfPages">
                        Số trang
                    </label>
                    <input
                        className={cx('form-control', {
                            error: !!formError.numberOfPages,
                        })}
                        type="number"
                        id="numberOfPages"
                        name="numberOfPages"
                        value={product.numberOfPages}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    />
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
                    <textarea
                        id="description"
                        className={cx('form-textarea')}
                        name="description"
                        value={product.description}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    />
                    {/* <CKEditor
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
                    /> */}
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
            <ToastContainer />
        </div>
    );
}
