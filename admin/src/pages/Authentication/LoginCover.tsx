import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import { IRootState } from '../../store';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconGoogle from '../../components/Icon/IconGoogle';
import { BASE_URL } from '../../config';
import axios from 'axios';

const LoginCover = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login Cover'));
    }, [dispatch]);

    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState(themeConfig.locale);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' });

   const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("name,email", email, password);
    
        try {
            const response = await axios.post(`${BASE_URL}/login`, {
                email, password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('login Response:', response); // Debugging line
    
            if (response.status === 200) {
                const userData = response.data.user;
                // Redirect or perform any action after successful login
                localStorage.setItem('userData', JSON.stringify(userData));
                setAlert({ message: 'Login successful!', type: 'success' });
                setTimeout(() => {
                    navigate('/index', { replace: false }); // Use replace option to prevent going back
                }, 1000); // Adjust delay as needed
            } else if (response.status === 401) {
                const { msg } = response.data;
                setAlert({ message: msg, type: 'error' });
            } else {
                // Handle other unexpected responses
                setAlert({ message: 'Unexpected response from server. Please try again.', type: 'error' });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data && error.response.data.msg) {
                    // Handle specific error messages returned from server
                    setAlert({ message: error.response.data.msg, type: 'error' });
                } else {
                    // Handle other Axios errors
                    setAlert({ message: 'Login error occurred. Please try again.', type: 'error' });
                }
            } else {
                // Handle non-Axios errors
                console.error('Login error:', error);
                setAlert({ message: 'An unexpected error occurred. Please try again.', type: 'error' });
            }
        }
    };
    


    return (
        <div>
            {alert.message && (
                <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                    {alert.message}
                </div>
            )}
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                    <div className="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(239,18,98,1)_0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                        <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                        <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
                            <Link to="/" className="w-48 block lg:w-72 ms-10">
                                <img src="/assets/images/auth/logo-white.jpg" alt="Logo" className="w-full" />
                            </Link>
                            <div className="mt-24 hidden w-full max-w-[430px] lg:block">
                                <img src="/assets/images/auth/login.svg" alt="Cover Image" className="w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                        <div className="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
                            <Link to="/" className="w-8 block lg:hidden">
                                <img src="/assets/images/logo.svg" alt="Logo" className="mx-auto w-10" />
                            </Link>
                            <div className="dropdown ms-auto w-max">
                                <Dropdown
                                    offset={[0, 8]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black"
                                    button={
                                        <>
                                            <div>
                                                <img src={`/assets/images/flags/${flag.toUpperCase()}.svg`} alt="image" className="h-5 w-5 rounded-full object-cover" />
                                            </div>
                                            <div className="text-base font-bold uppercase">{flag}</div>
                                            <span className="shrink-0">
                                                <IconCaretDown />
                                            </span>
                                        </>
                                    }
                                >
                                    <ul className="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                                        {themeConfig.languageList.map((item: any) => {
                                            return (
                                                <li key={item.code}>
                                                    <button
                                                        type="button"
                                                        className={`flex w-full hover:text-primary rounded-lg ${flag === item.code ? 'bg-primary/10 text-primary' : ''}`}
                                                        onClick={() => {
                                                            i18next.changeLanguage(item.code);
                                                            // setFlag(item.code);
                                                            setLocale(item.code);
                                                        }}
                                                    >
                                                        <img src={`/assets/images/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="w-5 h-5 object-cover rounded-full" />
                                                        <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="w-full max-w-[440px] lg:mt-16">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
                                <div>
                                    <label htmlFor="Email">Email</label>
                                    <div className="relative text-white-dark">
                                        <input id="Email" type="email" placeholder="Enter Email" className="form-input ps-10 placeholder:text-white-dark" onChange={(e) => setEmail(e.target.value)} />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Password">Password</label>
                                    <div className="relative text-white-dark">
                                        <input id="Password" type="password" placeholder="Enter Password" className="form-input ps-10 placeholder:text-white-dark" onChange={(e) => setPassword(e.target.value)} />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots />
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="inline-flex items-center gap-2">
                                        <input type="checkbox" id="remember-me" className="form-checkbox" />
                                        <label htmlFor="remember-me" className="text-sm text-white-dark">Remember me</label>
                                    </div>
                                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">Forgot Password?</Link>
                                </div>
                                <button type="submit" className="btn btn-primary w-full">
                                    Sign In
                                </button>
                            </form>
                            <div className="mt-6 text-center text-sm text-white-dark">
                                Don't have an account? <Link to="/auth/cover-register" className="text-primary hover:underline">Register</Link>
                            </div>
                            <div className="flex items-center justify-between pt-6 mt-6 border-t border-dashed border-white-dark">
                                <div className="text-white-dark">or sign in with</div>
                                <div className="flex gap-4">
                                    <button className="btn btn-icon btn-icon-circle btn-light">
                                        <IconGoogle />
                                    </button>
                                    <button className="btn btn-icon btn-icon-circle btn-light">
                                        <IconFacebookCircle />
                                    </button>
                                    <button className="btn btn-icon btn-icon-circle btn-light">
                                        <IconTwitter />
                                    </button>
                                    <button className="btn btn-icon btn-icon-circle btn-light">
                                        <IconInstagram />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginCover;

