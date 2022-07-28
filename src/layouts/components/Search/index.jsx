import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCaretDown,
    faMagnifyingGlass,
    faSpinner,
    faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';

import AccountItem from '~/components/AccountItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Search.module.scss';
import * as userService from '~/services/userService';
import * as productService from '~/services/productService';
import { useDebounce } from '~/hooks';
import ProductItem from '~/components/ProductItem';

const cx = classNames.bind(styles);

export default function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [productResult, setProductResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchFilter, setSearchFilter] = useState('user');
    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();
    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        setLoading(true);
        const fetchAPI = async () => {
            if (searchFilter === 'user') {
                const results = await userService.searchUser(debounced);
                setSearchResult(results);
            } else {
                const results = await productService.searchProduct(debounced);
                setSearchResult(results);
            }
            setLoading(false);
        };
        fetchAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };
    return (
        <div>
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
                            {searchResult.map((result) => {
                                if (searchFilter === 'user')
                                    return (
                                        <AccountItem
                                            key={result.id}
                                            data={result}
                                        />
                                    );
                                else
                                    return (
                                        <ProductItem
                                            key={result.id}
                                            data={result}
                                        />
                                    );
                            })}
                        </PopperWrapper>
                    </div>
                )}
                interactive
                visible={showResult && searchResult.length > 0}
                onClickOutside={handleHideResult}
                zIndex={98}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        className={cx('search-input')}
                        type="text"
                        value={searchValue}
                        placeholder="Nhập từ khóa"
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setShowResult(true)}
                    />
                    {loading && (
                        <button className={cx('loading')}>
                            <FontAwesomeIcon icon={faSpinner} />
                        </button>
                    )}
                    {searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faXmarkCircle} />
                        </button>
                    )}

                    <Tippy
                        render={(attrs) => (
                            <div
                                className={cx('search-filter-body')}
                                tabIndex="-1"
                                {...attrs}
                            >
                                <PopperWrapper>
                                    <ul className={cx('search-filter-list')}>
                                        <li
                                            className={cx('search-filter-item')}
                                            onClick={() => {
                                                setSearchFilter('user');
                                                handleClear();
                                            }}
                                        >
                                            Tài khoản
                                        </li>
                                        <li
                                            className={cx('search-filter-item')}
                                            onClick={() => {
                                                setSearchFilter('product');
                                                handleClear();
                                            }}
                                        >
                                            Sản phẩm
                                        </li>
                                    </ul>
                                </PopperWrapper>
                            </div>
                        )}
                        interactive
                        zIndex={99}
                    >
                        <div className={cx('search-filter')}>
                            <span>
                                {searchFilter === 'user'
                                    ? 'Tài khoản'
                                    : 'Sản phẩm'}
                            </span>
                            <FontAwesomeIcon
                                className={cx('icon')}
                                icon={faCaretDown}
                            />
                        </div>
                    </Tippy>

                    <button className={cx('search-button')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </Tippy>
        </div>
    );
}
