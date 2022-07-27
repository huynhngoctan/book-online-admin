import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '~/components/Button';
import images from '~/assets/images';
import styles from './EditUser.module.scss';
import { toast, ToastContainer } from 'react-toastify';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);
export default function EditUser() {
    let { userId } = useParams();
    const initialState = {
        id: 1,
        username: '',
        password: '',
        email: '',
        fullname: '',
        birthday: '',
        phone: '',
        address: '',
        role: '',
        status: '',
        avatar: '',
    };

    const [avatar, setAvatar] = useState();

    const [user, setUser] = useState(initialState);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formError, setFormError] = useState({});

    const handlePreviewImage = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        console.log(file.preview);
        setAvatar(file);
    };

    const handleOnChange = (name, value) => {
        setUser({
            ...user,
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
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const regexPhone = /^[0-9]*$/;
        if (user.email.length <= 0) {
            errors.email = 'Vui lòng nhập email';
        } else if (!regexEmail.test(user.email)) {
            errors.email = 'Vui lòng nhập đúng định dạng email';
        }

        if (user.phone.trim().length !== 10 && user.phone.trim().length !== 0) {
            errors.phone = 'Vui lòng nhập đúng 10 kí tự';
        } else if (!regexPhone.test(user.phone.trim())) {
            errors.phone = 'Vui lòng nhập đúng định dạng số điện thoại';
        }
        return errors;
    };

    // Clear Preview avatar url
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);
    // Call API get user
    useEffect(() => {
        const fetchAPI = async () => {
            const user = await userService.getUser(userId);
            console.log(user);
            setUser(user);
        };
        fetchAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Call API if form is valid
    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmit) {
            //Call API
            // console.log(user);
            const fetchAPI = async () => {
                if (avatar) {
                    const resUpload = await userService.uploadAvatar(avatar);
                    user.avatar = `http://localhost:8080/api/v1/FileUpload/files/${resUpload}`;
                }
                const res = await userService.updateUser(userId, user);
                res.status === 'success'
                    ? toast.success('Cập nhật thành công', {
                          autoClose: 3000,
                          position: 'top-right',
                      })
                    : toast.error('Cập nhật thất bại', {
                          autoClose: 3000,
                          position: 'top-right',
                      });
                // console.log(res.data);
            };
            fetchAPI();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError]);

    return (
        <div className={cx('wrapper')}>
            <h3>Chỉnh sửa thông tin</h3>
            <form className={cx('form')}>
                <div className={cx('avatar-wrapper')}>
                    <img
                        className={cx('avatar')}
                        src={
                            avatar
                                ? avatar.preview
                                : user.avatar || images.noImage
                        }
                        alt="avatar"
                    />
                    <label htmlFor="avatar">
                        <FontAwesomeIcon icon={faPen} className={cx('icon')} />
                    </label>
                    <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        onChange={handlePreviewImage}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="username">
                        Tên đăng nhập
                    </label>
                    <input
                        className={cx('form-control', 'disabled')}
                        type="text"
                        id="username"
                        name="username"
                        value={user.username}
                        disabled
                    />
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="fullname">
                        Họ và tên
                    </label>
                    <input
                        className={cx('form-control')}
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={user.fullname}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    />
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="email">
                        Email (*)
                    </label>
                    <input
                        className={cx('form-control', {
                            error: !!formError.email,
                        })}
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    />
                    {formError.email && (
                        <span className={cx('form-error')}>
                            {formError.email}
                        </span>
                    )}
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="phone">
                        Số điện thoại
                    </label>
                    <input
                        className={cx('form-control', {
                            error: !!formError.phone,
                        })}
                        type="text"
                        id="phone"
                        name="phone"
                        value={user.phone}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    />
                    {formError.phone && (
                        <span className={cx('form-error')}>
                            {formError.phone}
                        </span>
                    )}
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="address">
                        Địa chỉ
                    </label>
                    <input
                        className={cx('form-control')}
                        type="text"
                        id="address"
                        name="address"
                        value={user.address}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    />
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="role">
                        Quyền
                    </label>
                    <select
                        id="role"
                        className={cx('form-control')}
                        name="role"
                        value={user.role}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
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
                        value={user.status}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    >
                        <option value="Kích hoạt">Kích hoạt</option>
                        <option value="Khóa">Khóa</option>
                    </select>
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
                    <Button cancel medium to="/users" type="button">
                        Hủy
                    </Button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}
