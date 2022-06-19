import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import Button from '~/components/Button';
import Image from '~/components/Image';
import styles from './NewUser.module.scss';

const cx = classNames.bind(styles);
export default function NewUser() {
    const [avatar, setAvatar] = useState('');
    const initialState = {
        avatar: '',
        username: '',
        password: '',
        fullname: '',
        birthday: '',
        email: '',
        phone: '',
        address: '',
        role: '',
        status: '',
    };

    const [user, setUser] = useState(initialState);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formError, setFormError] = useState({});

    const imageRef = useRef();

    const handleUpdateImage = () => {
        setAvatar(URL.createObjectURL(imageRef.current.files[0]));
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

    console.log(user);

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

        if (user.username.trim().length <= 0) {
            errors.username = 'Vui lòng nhập tên đăng nhập';
        }
        if (user.password.trim().length < 8) {
            errors.password = 'Mật khẩu phải có ít nhất 8 kí tự';
        }
        return errors;
    };

    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmit) {
            //Call API
            console.log(user);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formError]);

    return (
        <div className={cx('wrapper')}>
            <h3>Thêm tài khoản</h3>
            <form className={cx('form')}>
                <div className={cx('avatar-wrapper')}>
                    <Image className={cx('avatar')} src={avatar} alt="avatar" />
                    <label htmlFor="avatar">
                        <FontAwesomeIcon icon={faPen} className={cx('icon')} />
                    </label>
                    <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        onChange={handleUpdateImage}
                        ref={imageRef}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="username">
                        Tên đăng nhập (*)
                    </label>
                    <input
                        className={cx('form-control', {
                            error: !!formError.username,
                        })}
                        type="text"
                        id="username"
                        name="username"
                        value={user.username}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    />
                    {formError.username && (
                        <span className={cx('form-error')}>
                            {formError.username}
                        </span>
                    )}
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-title')} htmlFor="password">
                        Mật khẩu (*)
                    </label>
                    <input
                        className={cx('form-control', {
                            error: !!formError.password,
                        })}
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    />
                    {formError.password && (
                        <span className={cx('form-error')}>
                            {formError.password}
                        </span>
                    )}
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
                    <label className={cx('form-title')} htmlFor="birthday">
                        Ngày sinh
                    </label>
                    <input
                        className={cx('form-control')}
                        type="date"
                        id="birthday"
                        name="birthday"
                        value={user.birthday}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                    />
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
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
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
                        <option value="active">Kích hoạt</option>
                        <option value="block">Khóa</option>
                    </select>
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
                    <Button cancel medium to="/users" type="button">
                        Hủy
                    </Button>
                </div>
            </form>
        </div>
    );
}
