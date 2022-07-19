/* eslint-disable jsx-a11y/img-redundant-alt */
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import Button from '~/components/Button';
import images from '~/assets/images';
import styles from './EditProduct.module.scss';
import * as productService from '~/services/productService';

const cx = classNames.bind(styles);
export default function EditProduct() {
    let { productId } = useParams();
    const [image, setImage] = useState();
    const initialState = {
        id: 1,
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
    };

    const validate = () => {
        const errors = {};
        // eslint-disable-next-line no-useless-escape
        if (product.stock.length === 0) {
            errors.stock = 'Vui lòng nhập số lượng';
        }
        return errors;
    };

    // Call API get product
    useEffect(() => {
        const fetchAPI = async () => {
            const product = await productService.getProduct(productId);
            // console.log(product);
            setProduct(product);
        };
        fetchAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //Clear preview image
    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image.preview);
        };
    }, [image]);

    //Call API update product when form is valid
    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmit) {
            const fetchAPI = async () => {
                if (image) {
                    const resUpload = await productService.uploadImage(image);
                    product.linkImage = `http://localhost:8080/api/v1/FileUpload/files/${resUpload}`;
                }

                const res = await productService.updateProduct(
                    productId,
                    product,
                );

                res.status === 'success'
                    ? toast.success('Cập nhật thành công', {
                          autoClose: 3000,
                          position: 'top-right',
                      })
                    : toast.error('Cập nhật thất bại', {
                          autoClose: 3000,
                          position: 'top-right',
                      });
            };
            fetchAPI();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError]);

    // console.log(product);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <h3>Thông tin sản phẩm </h3>
                <div className={cx('product-info')}>
                    <table className={cx('product-table')}>
                        <tbody>
                            <tr>
                                <td className={cx('table-title')}>
                                    Tên sản phẩm:
                                </td>
                                <td className={cx('table-data')}>
                                    {product.name}
                                </td>
                            </tr>
                            <tr>
                                <td className={cx('table-title')}>Tác giả:</td>
                                <td className={cx('table-data')}>
                                    {product.author}
                                </td>
                            </tr>
                            <tr>
                                <td className={cx('table-title')}>Thể loại:</td>
                                <td className={cx('table-data')}>
                                    {product.genre}
                                </td>
                            </tr>
                            <tr>
                                <td className={cx('table-title')}>
                                    Nhà xuất bản:
                                </td>
                                <td className={cx('table-data')}>
                                    {product.publisher}
                                </td>
                            </tr>
                            <tr>
                                <td className={cx('table-title')}>
                                    Năm xuất bản:
                                </td>
                                <td className={cx('table-data')}>
                                    {product.publishingYear}
                                </td>
                            </tr>
                            <tr>
                                <td className={cx('table-title')}>Số trang:</td>
                                <td className={cx('table-data')}>
                                    {product.numberOfPages}
                                </td>
                            </tr>
                            <tr>
                                <td className={cx('table-title')}>
                                    Trọng lượng (gram):
                                </td>
                                <td className={cx('table-data')}>
                                    {product.weight}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={cx('right')}>
                <h3>Chỉnh sửa thông tin</h3>
                <form className={cx('form')}>
                    <div className={cx('image-wrapper')}>
                        <img
                            className={cx('image')}
                            src={
                                image
                                    ? image.preview
                                    : product.linkImage || images.noImage
                            }
                            alt="img"
                        />
                        <label htmlFor="image">
                            <FontAwesomeIcon
                                icon={faPen}
                                className={cx('icon')}
                            />
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            onChange={handlePreviewImage}
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
                        <label className={cx('form-title')} htmlFor="price">
                            Giá bán (*)
                        </label>
                        <input
                            className={cx('form-control', {
                                error: !!formError.price,
                            })}
                            type="number"
                            id="price"
                            name="price"
                            value={product.price}
                            onChange={(e) =>
                                handleOnChange(e.target.name, e.target.value)
                            }
                        />
                        {formError.price && (
                            <span className={cx('form-error')}>
                                {formError.price}
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
                            <option value="Mở bán">Mở bán</option>
                            <option value="Ngừng bán">Ngừng bán</option>
                        </select>
                    </div>
                    <div className={cx('form-group')}>
                        <label
                            className={cx('form-title')}
                            htmlFor="description"
                        >
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
                                // console.log('Editor is ready to use!', editor);
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
                            Cập nhật
                        </Button>
                        <Button cancel medium to="/products" type="button">
                            Hủy
                        </Button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}
