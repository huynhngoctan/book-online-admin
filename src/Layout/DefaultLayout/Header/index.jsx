import {
    faMagnifyingGlass,
    faSpinner,
    faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
// import { useEffect, useState } from 'react';

import styles from './Header.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';

const cx = classNames.bind(styles);
export default function Header() {
    // const [searchResult, setSearchResult] = useState([]);

    // useEffect(() => {
    //     setTimeout(() => setSearchResult([1, 2, 3]), 3000);
    // }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <span>Admin</span>
                </div>
                <Tippy
                    render={(attrs) => (
                        <div
                            className={cx('search-result')}
                            tabIndex="-1"
                            {...attrs}
                        >
                            <PopperWrapper>
                                <p className={cx('search-result-title')}>
                                    Kết quả tìm kiếm
                                </p>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                    interactive
                    // visible={searchResult.length > 0}
                >
                    <div className={cx('search')}>
                        <input
                            className={cx('search-input')}
                            type="text"
                            placeholder="Tìm kiếm theo tên người dùng hoặc sản phẩm"
                        />
                        <FontAwesomeIcon
                            className={cx('loading')}
                            icon={faSpinner}
                        />
                        <FontAwesomeIcon
                            className={cx('clear')}
                            icon={faXmarkCircle}
                        />
                        <button className={cx('search-button')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </Tippy>

                <Tippy
                    render={(attrs) => (
                        <div
                            className={cx('account-action')}
                            tabIndex="-1"
                            {...attrs}
                        >
                            <PopperWrapper>
                                <ul className={cx('list-action')}>
                                    <li>
                                        <a
                                            className={cx('action-link')}
                                            href="/"
                                        >
                                            Thông tin cá nhân
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className={cx('action-link')}
                                            href="/"
                                        >
                                            Đăng xuất
                                        </a>
                                    </li>
                                </ul>
                            </PopperWrapper>
                        </div>
                    )}
                    interactive
                >
                    <div className={cx('account')}>
                        <img
                            className={cx('avatar')}
                            src="https://lh3.googleusercontent.com/ogw/ADea4I7wyN6WgGDhKr7mh08qsgwi0O2_3kg9d3XzCMuR=s32-c-mo"
                            alt="avatar"
                        />
                        <span className={cx('username')}> Tan Huynh</span>
                    </div>
                </Tippy>
            </div>
        </div>
    );
}
