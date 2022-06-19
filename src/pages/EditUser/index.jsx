import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import Button from '~/components/Button';
import Image from '~/components/Image';
import styles from './EditUser.module.scss';

const cx = classNames.bind(styles);
export default function EditUser() {
    const [avatar, setAvatar] = useState(
        'https://lh3.googleusercontent.com/ogw/ADea4I7wyN6WgGDhKr7mh08qsgwi0O2_3kg9d3XzCMuR=s32-c-mo',
    );
    const initialState = {
        avatar: 'https://lh3.googleusercontent.com/ogw/ADea4I7wyN6WgGDhKr7mh08qsgwi0O2_3kg9d3XzCMuR=s32-c-mo',
        fullname: 'Huỳnh Ngọc Tấn',
        email: 'hntan2000@gmail.com',
        phone: '0987654321',
        address: 'Hồ Chí Minh',
        role: 'user',
        status: 'block',
    };

    const [user, setUser] = useState(initialState);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formError, setFormError] = useState({});

    const imageRef = useRef();

    const handleUpdateImage = () => {
        setAvatar(URL.createObjectURL(imageRef.current.files[0]));
    };

    const handleOnChange = (name, value) => {
        console.log(name, value);
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

        if (user.phone.trim().length !== 10) {
            errors.phone = 'Vui lòng nhập đúng 10 kí tự';
        } else if (!regexPhone.test(user.phone.trim())) {
            errors.phone = 'Vui lòng nhập đúng định dạng số điện thoại';
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
            <h3>Chỉnh sửa thông tin</h3>
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
                        Cập nhật
                    </Button>
                    <Button cancel medium to="/users" type="button">
                        Hủy
                    </Button>
                </div>
            </form>
        </div>
    );
}
