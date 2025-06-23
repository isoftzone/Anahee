import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import IconHome from '../../components/Icon/IconHome';
import IconDollarSignCircle from '../../components/Icon/IconDollarSignCircle';
import IconUser from '../../components/Icon/IconUser';
import IconPhone from '../../components/Icon/IconPhone';
import IconLinkedin from '../../components/Icon/IconLinkedin';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconFacebook from '../../components/Icon/IconFacebook';
import IconGithub from '../../components/Icon/IconGithub';
import IconPencilPaper from '../../components/Icon/IconPencilPaper';
import Header from '../../components/Layouts/Header';
import { useDispatch } from 'react-redux';

import axios from 'axios';
import { BASE_URL } from '../../config';
import { setUsers } from '../../store/userSlice';
import { use } from 'i18next';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    companyid: number | null;
    PROFILEIMAGE?: string; // add this field
}

const AccountSetting = () => {
    const [profileImg, setProfileImg] = useState<string>('');
    const [previewImg, setPreviewImg] = useState(''); // for local preview
    // const profileImage = useSelector((state: IRootState) => state.user.user.profileImage);
    const [responseData, setresponseData] = useState([]);
    const [COMPANYID, setCOMPANYID] = useState('');
    const [USERID, setUSERID] = useState('');
    const [TITLE, setTITLE] = useState('');
    const [BUSINESSTITLE, setBUSINESSTITLE] = useState('');
    const [FNAME, setFNAME] = useState('');
    const [MNAME, setMNAME] = useState('');
    const [LNAME, setLNAME] = useState('');
    const [PHONE, setPHONE] = useState('');
    const [MOBILE, setMOBILE] = useState('');
    const [EMAIL, setEMAIL] = useState('');
    const [STATUS, setSTATUS] = useState('');
    const [USERTYPE, setUSERTYPE] = useState('');
    const [USERNAME, setUSERNAME] = useState('');
    const [PASSWORD, setPASSWORD] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [CREATEDBY, setCREATEDBY] = useState('');
    const [CREATEDON, setCREATEDON] = useState('');
    const [UPDATEDBY, setUPDATEDBY] = useState('');
    const [UPDATEDON, setUPDATEDON] = useState('');
    const [DS_ON, setDS_ON] = useState('');
    const [DS_OFF, setDS_OFF] = useState('');
    const [FULLNAME, setFULLNAME] = useState('');
    const [COUNTRY, setCOUNTRY] = useState('');
    const [LOCATION, setLOCATION] = useState('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [countries, setCountries] = useState<string[]>([]);
    const [LocalData, setLocalData] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('userData');
        return storedUser ? (JSON.parse(storedUser) as User) : null;
    });
    const [PROFESSION, setPROFESSION] = useState('');
    const [ADDRESS, setADDRESS] = useState('');
    const [WEBSITE, setWEBSITE] = useState('');

    const [PROFILEIMAGE, setPROFILEIMAGE] = useState<File | null>(null);
    const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' });
    const navigate = useNavigate();

    // let users = useSelector((state: IRootState) => state.user);

    const storedUser = JSON.parse(localStorage.getItem('userData') || '{}') as User;

    useEffect(() => {
        const storedUser = localStorage.getItem('userData');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser) as User;
            setLocalData(parsedUser);
        }
    }, []);
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await axios.get('https://countriesnow.space/api/v0.1/countries/positions');
                if (res.data && res.data.data) {
                    setCountries(res.data.data.map((c: any) => c.name));
                }
            } catch (err) {
                console.error('Failed to fetch countries:', err);
            }
        };
        fetchCountries();
    }, []);

    //       useEffect(() => {
    //     if (!LocalData) {
    //       const storedUser = localStorage.getItem("userData");
    //       if (storedUser) {
    //         setLocalData(JSON.parse(storedUser));
    //         console.log(storedUser);
    //       }
    //     }
    //   }, []);

    // // Get the item from localStorage
    // const userString = localStorage.getItem('userData');

    // let Id: number | null = null;

    // if (userString) {
    //     const userLocal: User = JSON.parse(userString);
    //     Id = userLocal.id;
    // }

    // console.log('User ID 223232:', Id);
    // useEffect(() => {
    //     console.log(profileImage);
    // }, [profileImage]);

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const response = await axios.get(`${BASE_URL}/getid_userMaster/${LocalData.id}`, {
    //                 // withCredentials: true,
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             });
    //             const userData = response.data;
    //             setresponseData(userData);
    //             // Now set individual field values
    //             setTITLE(userData.TITLE || '');
    //             setBUSINESSTITLE(userData.BUSINESSTITLE || '');
    //             setFNAME(userData.FNAME || '');
    //             setMNAME(userData.MNAME || '');
    //             setLNAME(userData.LNAME || '');

    //             setPHONE(userData.PHONE || '');
    //             setMOBILE(userData.MOBILE || '');
    //             setSTATUS(userData.STATUS || '');
    //             setUSERNAME(userData.USERNAME || '');
    //             setPASSWORD(userData.PASSWORD || '');
    //             setCREATEDBY(userData.CREATEDBY || '');
    //             setCREATEDON(userData.CREATEDON || '');

    //             setUPDATEDBY(userData.UPDATEDBY || '');
    //             setUPDATEDON(userData.UPDATEDON || '');
    //             setDS_ON(userData.DS_ON || '');
    //             setDS_OFF(userData.DS_OFF || '');
    //             setFULLNAME(userData.FULLNAME || '');
    //             setPROFESSION(userData.PROFESSION || '');
    //             setCOUNTRY(userData.COUNTRY || '');

    //             setEMAIL(userData.EMAIL || '');

    //             setProfileImg(userData.PROFILEIMAGE || '');

    //             setUSERTYPE(userData.USERTYPE || '');

    //             setADDRESS(userData.ADDRESS || '');
    //             setLOCATION(userData.LOCATION || '');

    //             setWEBSITE(userData.WEBSITE || '');

    //             dispatch(
    //                 setUsers({
    //                     id: userData.USERID,
    //                     name: userData.FNAME + ' ' + userData.LNAME,
    //                     email: userData.EMAIL,
    //                     password: userData.PASSWORD,
    //                     companyid: userData.COMPANYID,
    //                     Profession: userData.PROFESSION,
    //                     mobile:userData.MOBILE,
    //                     createdon: userData.CREATEDON,
    //                     location: userData.LOCATION,
    //                     profileImage: userData.PROFILEIMAGE,
    //                 })
    //             );
    //         } catch (error) {
    //             console.error('Error fetching user data:', error);
    //         }
    //     };
    //     fetchUserData();
    // }, []);
    useEffect(() => {
        const fetchUserData = async () => {
            if (!LocalData) return; // ⛔ Guard clause for null check

            try {
                const response = await axios.get(`${BASE_URL}/getid_userMaster/${LocalData.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const userData = response.data;
                setresponseData(userData);

                // Now set individual field values
                setTITLE(userData.TITLE || '');
                setBUSINESSTITLE(userData.BUSINESSTITLE || '');
                setFNAME(userData.FNAME || '');
                setMNAME(userData.MNAME || '');
                setLNAME(userData.LNAME || '');
                setPHONE(userData.PHONE || '');
                setMOBILE(userData.MOBILE || '');
                setSTATUS(userData.STATUS || '');
                setUSERNAME(userData.USERNAME || '');
                setPASSWORD(userData.password || '');
                setCREATEDBY(userData.CREATEDBY || '');
                setCREATEDON(userData.CREATEDON || '');
                setUPDATEDBY(userData.UPDATEDBY || '');
                setUPDATEDON(userData.UPDATEDON || '');
                setDS_ON(userData.DS_ON || '');
                setDS_OFF(userData.DS_OFF || '');
                setFULLNAME(userData.NAME || '');
                setPROFESSION(userData.PROFESSION || '');
                setCOUNTRY(userData.COUNTRY || '');
                setEMAIL(userData.email || '');
                setProfileImg(userData.PROFILEIMAGE || '');
                setUSERTYPE(userData.USERTYPE || '');
                setADDRESS(userData.ADDRESS || '');
                setLOCATION(userData.LOCATION || '');
                setWEBSITE(userData.WEBSITE || '');

                dispatch(
                    setUsers({
                        id: userData.id,
                        name: `${userData.FNAME} ${userData.LNAME}`,
                        email: userData.email,
                        password: userData.password,
                        companyid: userData.COMPANYID,
                        Profession: userData.PROFESSION,
                        mobile: userData.MOBILE,
                        createdon: userData.CREATEDON,
                        location: userData.LOCATION,
                        profileImage: userData.PROFILEIMAGE,
                    })
                );
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [LocalData]); // ✅ Add LocalData to the dependency array

    // Debounce effect: Update `debouncedData` only when user stops typing

    // useEffect(() => {
    //     return () => {
    //         if (profileImg && profileImg) {
    //             URL.revokeObjectURL(profileImg);
    //         }
    //     };
    // }, [profileImg]);

    // useEffect(() => {
    //     if (Id !== null) {
    //         const savedImage = localStorage.getItem(`user_image_${Id}`);
    //         if (savedImage) {
    //             setProfileImg(savedImage);
    //         }
    //     }
    // }, [Id]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Data = reader.result as string;

            // Store image under a key like "user_image_3"
            // localStorage.setItem(`user_image_${Id}`, base64Data);

            setPreviewImg(reader.result as string);
            setPROFILEIMAGE(file);
        };

        reader.readAsDataURL(file);
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Account Setting'));
    });

    const [tabs, setTabs] = useState<string>('home');

    const toggleTabs = (name: string) => {
        setTabs(name);
    };

    // const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     try {
    //         // let userlocal = localStorage.getItem('userData');
    //         // const userData = JSON.parse(userlocal || '');
    //         // let finalUserId = userData.USERID;

    //         // Create an object with the current form state
    //         const currentFormData = {
    //             COMPANYID,
    //             TITLE,
    //             BUSINESSTITLE,
    //             FNAME,
    //             MNAME,
    //             LNAME,
    //             PHONE,
    //             MOBILE,
    //             EMAIL,
    //             STATUS,
    //             USERTYPE,
    //             USERNAME,
    //             PASSWORD,
    //             CREATEDBY,
    //             CREATEDON,
    //             UPDATEDBY,
    //             UPDATEDON,
    //             DS_ON,
    //             DS_OFF,
    //             FULLNAME,
    //             COUNTRY,
    //             LOCATION,
    //             PROFESSION,
    //             ADDRESS,
    //             WEBSITE,
    //         };

    //         const data = new FormData();

    //         for (const [key, value] of Object.entries(currentFormData)) {
    //             if (value != null) {
    //                 data.append(key, String(value)); // Ensure value is a string before appending
    //             }
    //         }
    //         if (PROFILEIMAGE) {
    //             data.append('PROFILEIMAGE', PROFILEIMAGE);
    //         }

    //         const response = await axios.post(`${BASE_URL}/upload_userMaster`, data, {
    //             withCredentials: true,
    //             headers: { 'Content-Type': 'multipart/form-data' },
    //         });

    //         if (response.status === 200 || response.status === 201) {
    //             const userData = response.data.user;
    //             dispatch(
    //                 setUsers({
    //                     id: userData.USERID,
    //                     name: userData.FNAME + ' ' + userData.LNAME,
    //                     email: userData.EMAIL,
    //                     password: userData.PASSWORD,
    //                     companyid: userData.COMPANYID,
    //                       Profession: userData.PROFESSION,
    //                      mobile:userData.MOBILE,
    //                      createdon: userData.CREATEDON,
    //                      location: userData.LOCATION,
    //                     profileImage: userData.PROFILEIMAGE,
    //                 })
    //             );
    //             //localStorage.setItem('userDatas', JSON.stringify(userData));
    //             setAlert({ message: 'User saved successfully!', type: 'success' });
    //         } else {
    //             setAlert({ message: 'Unexpected server response.', type: 'error' });
    //         }
    //     } catch (error) {
    //         if (axios.isAxiosError(error)) {
    //             setAlert({ message: error.response?.data?.msg || 'Server error.', type: 'error' });
    //         } else {
    //             console.error('Unexpected error:', error);
    //             setAlert({ message: 'Unexpected error occurred.', type: 'error' });
    //         }
    //     }
    // };
    // Above your return statement (inside the component)
    // const imgUrl =
    //     PROFILEIMAGE || // selected new image (base64)
    //     (PROFILEIMAGE ? `${BASE_URL}/${PROFILEIMAGE}`:`${BASE_URL}/${profileImg}` : '/assets/images/profile-035.png');

    //     const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();

    //   try {
    //     const currentFormData = {
    //       COMPANYID,
    //       USERID,
    //       TITLE,
    //       BUSINESSTITLE,
    //       FNAME,
    //       MNAME,
    //       LNAME,
    //       PHONE,
    //       MOBILE,
    //       EMAIL,
    //       STATUS,
    //       USERTYPE,
    //       USERNAME,
    //       PASSWORD,
    //       CREATEDBY,
    //       CREATEDON,
    //       UPDATEDBY,
    //       UPDATEDON,
    //       DS_ON,
    //       DS_OFF,
    //       FULLNAME,
    //       COUNTRY,
    //       LOCATION,
    //       PROFESSION,
    //       ADDRESS,
    //       WEBSITE,
    //     };

    //     const data = new FormData();
    //     for (const [key, value] of Object.entries(currentFormData)) {
    //       if (value != null) {
    //         data.append(key, String(value));
    //       }
    //     }
    //     if (PROFILEIMAGE) {
    //       data.append('PROFILEIMAGE', PROFILEIMAGE);
    //     }

    //     const isUpdate = !!USERID;
    //     const url = isUpdate
    //       ? `${BASE_URL}/update_userMaster`
    //       : `${BASE_URL}/upload_userMaster`;

    //     const response = await axios.post(url, data, {
    //       withCredentials: true,
    //       headers: { 'Content-Type': 'multipart/form-data' },
    //     });

    //     if (response.status === 200 || response.status === 201) {
    //       const userData = response.data.user;
    //       dispatch(
    //         setUsers({
    //           id: userData.USERID,
    //           name: `${userData.FNAME} ${userData.LNAME}`,
    //           email: userData.EMAIL,
    //           password: userData.PASSWORD,
    //           companyid: userData.COMPANYID,
    //           Profession: userData.PROFESSION,
    //           mobile: userData.MOBILE,
    //           createdon: userData.CREATEDON,
    //           location: userData.LOCATION,
    //           profileImage: userData.PROFILEIMAGE,
    //         })
    //       );
    //       setAlert({ message: 'User saved successfully!', type: 'success' });
    //     } else {
    //       setAlert({ message: 'Unexpected server response.', type: 'error' });
    //     }
    //   } catch (error) {
    //     if (axios.isAxiosError(error)) {
    //       setAlert({ message: error.response?.data?.msg || 'Server error.', type: 'error' });
    //     } else {
    //       console.error('Unexpected error:', error);
    //       setAlert({ message: 'Unexpected error occurred.', type: 'error' });
    //     }
    //   }
    // };

    // const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
    //  if (!LocalData) {
    //     setAlert({ message: "User data is missing. Please log in again.", type: "error" });
    //     return;
    //   }
    //   try {
    //     // Collect all current form field values
    //     const currentFormData = {
    //       COMPANYID,
    //       USERID: LocalData.id,
    //       TITLE,
    //       BUSINESSTITLE,
    //       FNAME,
    //       MNAME,
    //       LNAME,
    //       PHONE,
    //       MOBILE,
    //       EMAIL,
    //       STATUS,
    //       USERTYPE,
    //       USERNAME,
    //       PASSWORD,
    //       CREATEDBY,
    //       CREATEDON,
    //       UPDATEDBY,
    //       UPDATEDON,
    //       DS_ON,
    //       DS_OFF,
    //       FULLNAME,
    //       COUNTRY,
    //       LOCATION,
    //       PROFESSION,
    //       ADDRESS,
    //       WEBSITE,
    //     };

    //     const data = new FormData();

    //     // Append only fields that are not null or undefined
    //     for (const [key, value] of Object.entries(currentFormData)) {
    //       if (value !== undefined && value !== null) {
    //         data.append(key, String(value));
    //       }
    //     }

    //     // ✅ Append the image file only if selected (matches backend logic)
    //     if (PROFILEIMAGE) {
    //       data.append('PROFILEIMAGE', PROFILEIMAGE);
    //     }

    //     // Determine if this is an update or insert
    //     const isUpdate = !!USERID;
    //     const url = isUpdate
    //       ? `${BASE_URL}/update_userMaster`
    //       : `${BASE_URL}/upload_userMaster`;

    //     // Send the form data
    //     const response = await axios.post(url, data, {
    //       withCredentials: true,
    //       headers: { 'Content-Type': 'multipart/form-data' },
    //     });

    //     if (response.status === 200 || response.status === 201) {
    //       const userData = response.data.user;

    //       dispatch(
    //         setUsers({
    //           id: userData.USERID,
    //           name: `${userData.FNAME} ${userData.LNAME}`,
    //           email: userData.EMAIL,
    //           password: userData.PASSWORD,
    //           companyid: userData.COMPANYID,
    //           Profession: userData.PROFESSION,
    //           mobile: userData.MOBILE,
    //           createdon: userData.CREATEDON,
    //           location: userData.LOCATION,
    //           profileImage: userData.PROFILEIMAGE,
    //         })
    //       );

    //       setAlert({ message: 'User saved successfully!', type: 'success' });
    //     } else {
    //       setAlert({ message: 'Unexpected server response.', type: 'error' });
    //     }
    //   } catch (error) {
    //     if (axios.isAxiosError(error)) {
    //       setAlert({
    //         message: error.response?.data?.msg || 'Server error.',
    //         type: 'error',
    //       });
    //     } else {
    //       console.error('Unexpected error:', error);
    //       setAlert({ message: 'Unexpected error occurred.', type: 'error' });
    //     }
    //   }
    // };

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!LocalData) {
            setAlert({ message: 'User data is missing. Please log in again.', type: 'error' });
            return;
        }

        try {
            const currentFormData = {
                COMPANYID,
                USERID: LocalData.id,
                TITLE,
                BUSINESSTITLE,
                FNAME,
                MNAME,
                LNAME,
                PHONE,
                MOBILE,
                EMAIL,
                STATUS,
                USERTYPE,
                USERNAME,
                newPassword,
                confirmPassword,
                CREATEDBY,
                CREATEDON,
                UPDATEDBY,
                UPDATEDON,
                DS_ON,
                DS_OFF,
                FULLNAME,
                COUNTRY,
                LOCATION,
                PROFESSION,
                ADDRESS,
                WEBSITE,
            };

            const data = new FormData();

            for (const [key, value] of Object.entries(currentFormData)) {
                if (value !== undefined && value !== null) {
                    data.append(key, String(value));
                }
            }

            if (PROFILEIMAGE) {
                data.append('PROFILEIMAGE', PROFILEIMAGE);
            }

            const isUpdate = !!USERID;
            const url = isUpdate ? `${BASE_URL}/update_userMaster` : `${BASE_URL}/upload_userMaster`;

            const response = await axios.post(url, data, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('name', response);
            if (response.status === 200 || response.status === 201) {
                const userData = response.data.user;

                dispatch(
                    setUsers({
                        id: userData.USERID,
                        name: userData.FNAME,
                        email: userData.EMAIL,
                        password: userData.PASSWORD,
                        companyid: userData.COMPANYID,
                        Profession: userData.PROFESSION,
                        mobile: userData.MOBILE,
                        createdon: userData.CREATEDON,
                        location: userData.LOCATION,
                        profileImage: userData.PROFILEIMAGE,
                    })
                );
                // ✅ Save to localStorage
                localStorage.setItem(
                    'userDatas',
                    JSON.stringify({
                        id: userData.USERID,
                        name: userData.FNAME,
                        email: userData.EMAIL,
                        password: userData.PASSWORD,
                        companyid: userData.COMPANYID,
                        profession: userData.PROFESSION,
                        mobile: userData.MOBILE,
                        createdon: userData.CREATEDON,
                        location: userData.LOCATION,
                        profileImage: userData.PROFILEIMAGE,
                    })
                );

                // ✅ Broadcast to update other components (like Header)
                window.dispatchEvent(new Event('userDataUpdated'));
                // setAlert({ message: "User saved successfully!", type: "success" });

                setTimeout(() => {
                    setAlert({ message: 'User saved successfully!', type: 'success' });

                    setTimeout(() => {
                        setAlert({ message: '', type: '' });
                    }, 3000); // clear 3 seconds after showing
                }, 1000); // delay showing the alert by 700ms
                // clears alert after 3 seconds

                //   setAlert({ message: "User saved successfully!", type: "success" });
            } else {
                setAlert({ message: 'Unexpected server response.', type: 'error' });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setAlert({
                    message: error.response?.data?.msg || 'Server error.',
                    type: 'error',
                });
            } else {
                console.error('Unexpected error:', error);
                setAlert({ message: 'Unexpected error occurred.', type: 'error' });
            }
        }
    };

    const imgUrl = previewImg ? previewImg : PROFILEIMAGE ? `${BASE_URL}/images/banner/${PROFILEIMAGE}` : profileImg ? `${BASE_URL}/images/banner/${profileImg}` : '/assets/images/profile-035.png';

    return (
        <div>
            {alert.message && <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-error'}`}>{alert.message}</div>}
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Users
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Account Settings</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Settings</h5>
                </div>
                <div>
                    <ul className="sm:flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
                        <li className="inline-block">
                            <button
                                onClick={() => toggleTabs('home')}
                                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'home' ? '!border-primary text-primary' : ''}`}
                            >
                                <IconHome />
                                Home
                            </button>
                        </li>
                        <li className="inline-block">
                            <button
                                onClick={() => toggleTabs('payment-details')}
                                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'payment-details' ? '!border-primary text-primary' : ''}`}
                            >
                                <IconDollarSignCircle />
                                Payment Details
                            </button>
                        </li>
                        <li className="inline-block">
                            <button
                                onClick={() => toggleTabs('preferences')}
                                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'preferences' ? '!border-primary text-primary' : ''}`}
                            >
                                <IconUser className="w-5 h-5" />
                                Preferences
                            </button>
                        </li>
                        <li className="inline-block">
                            <button
                                onClick={() => toggleTabs('danger-zone')}
                                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'danger-zone' ? '!border-primary text-primary' : ''}`}
                            >
                                <IconPhone />
                                Danger Zone
                            </button>
                        </li>
                    </ul>
                </div>
                {tabs === 'home' ? (
                    <div>
                        <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black" onSubmit={submitForm} encType="multipart/form-data">
                            <h6 className="text-lg font-bold mb-5">General Information</h6>
                            <div className="flex flex-col sm:flex-row">
                                <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                                    <div className="flex items-center justify-between mb-5">
                                        <h5 className="font-semibold text-lg dark:text-white-light"></h5>
                                        <div>
                                            <input type="file" id="fileInput" className="hidden" accept="image/*" onChange={handleImageChange} />
                                            <label htmlFor="fileInput" className="ltr:ml-auto rtl:mr-auto btn btn-primary p-2 rounded-full cursor-pointer">
                                                {/* Select the image */}
                                                <IconPencilPaper />
                                            </label>
                                        </div>
                                    </div>
                                    {/* Updated image preview */}
                                    {/* {selectedImage && <img src={selectedImage} alt="Selected" className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto" />} */}
                                    <img
                                        src={imgUrl}
                                        onError={(e) => {
                                            e.currentTarget.onerror = null; // Prevent infinite loop
                                            e.currentTarget.src = '/assets/images/profile-035.png';
                                        }}
                                        alt="Selected"
                                        className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto"
                                    />
                                </div>

                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {/* <div>
                                        <label htmlFor="name">Company Id</label>
                                        <input id="COMPANYID" type="text" placeholder="Company Id" value={} name="COMPANYID" className="form-input"  onChange={(e) => setCOMPANYID(e.target.value)} />
                                    </div> */}
                                    {/* <div>
                                        <label htmlFor="name">User Id</label>
                                        <input id="USERID" type="text" placeholder="User Id" name="USERID" className="form-input"  onChange={(e) => setUSERID(e.target.value)} />
                                    </div>{' '} */}
                                    <div>
                                        <label htmlFor="TITLE">Title</label>
                                        <input id="TITLE" value={TITLE} type="text" placeholder="Title" name="TITLE" className="form-input" onChange={(e) => setTITLE(e.target.value)} />
                                    </div>{' '}
                                    <div>
                                        <label htmlFor="name">Bussiness Title</label>
                                        <input
                                            id="BUSINESSTITLE"
                                            value={BUSINESSTITLE}
                                            type="text"
                                            placeholder="Bussiness Title"
                                            name="BUSINESSTITLE"
                                            className="form-input"
                                            onChange={(e) => setBUSINESSTITLE(e.target.value)}
                                        />
                                    </div>{' '}
                                    <div>
                                        <label htmlFor="name">First Name</label>
                                        <input id="FNAME" type="text" value={FNAME} placeholder="First Name" name="FNAME" className="form-input" onChange={(e) => setFNAME(e.target.value)} />
                                    </div>{' '}
                                    <div>
                                        <label htmlFor="name">Mid Name</label>
                                        <input id="MNAME" value={MNAME} type="text" placeholder="Mid Name" name="MNAME" className="form-input" onChange={(e) => setMNAME(e.target.value)} />
                                    </div>{' '}
                                    <div>
                                        <label htmlFor="name">Last Name</label>
                                        <input id="LNAME" value={LNAME} type="text" placeholder="Last Name" name="LNAME" className="form-input" onChange={(e) => setLNAME(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor="name">Mobile</label>
                                        <input id="MOBILE" value={MOBILE} type="number" placeholder="+91-9111111111" name="MOBILE" className="form-input" onChange={(e) => setMOBILE(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input id="EMAIL" value={EMAIL} type="email" placeholder="Jimmy@gmail.com" className="form-input" name="EMAIL" onChange={(e) => setEMAIL(e.target.value)} />
                                    </div>
                                    {/* <div>
                                        <label htmlFor="name">Status</label>
                                        <input id="STATUS" value={STATUS} type="text" placeholder="Active/Inactive" name="STATUS" className="form-input" onChange={(e) => setSTATUS(e.target.value)} />
                                    </div>{' '} */}
                                    {/* <div>
                                        <label htmlFor="name">User Type</label>
                                        <input
                                            id="USERTYPE"
                                            value={USERTYPE}
                                            type="text"
                                            placeholder="Admin/User"
                                            name="USERTYPE"
                                            className="form-input"
                                            onChange={(e) => setUSERTYPE(e.target.value)}
                                        />
                                    </div>{' '} */}
                                    {/* <div>
                                        <label htmlFor="name">User Name</label>
                                        <input id="USERNAME" value={USERNAME} type="text" placeholder="Username" name="USERNAME" className="form-input" onChange={(e) => setUSERNAME(e.target.value)} />
                                    </div>{' '} */}
                                    {/* <div>
                                        <label htmlFor="name">Password</label>
                                        <input
                                            id="PASSWORD"
                                            value={PASSWORD}
                                            type="password"
                                            placeholder="password"
                                            name="PASSWORD"
                                            className="form-input"
                                            onChange={(e) => setPASSWORD(e.target.value)}
                                        /> */}
                                    {/* </div>{' '} */}
                                    <div style={{ position: 'relative' }}>
                                        <label htmlFor="name">Password</label>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            placeholder="Password"
                                            value={PASSWORD}
                                            className="form-input"
                                            style={{ paddingRight: '40px' }}
                                        />
                                        {/* <i
                                            className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`}
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{
                                                position: 'absolute',
                                                top: '70%',
                                                right: '15px',
                                                transform: 'translateY(-50%)',
                                                cursor: 'pointer',
                                                fontSize: '1.5rem',
                                                color: '#777',
                                                display:"block"
                                            }}
                                        ></i> */}
                                         <span
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        top: '70%',
                        right: '15px',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        fontSize: '1.5rem',
                        color: '#777',
                        display: 'block',
                      }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <label htmlFor="name">New Password</label>
                                        <input
                                            type={showNewPassword ? 'text' : 'password'}
                                            name="password"
                                            placeholder="Password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="form-input"
                                            style={{ paddingRight: '40px' }}
                                        />
                                        {/* <i
                                            className={`bi ${showNewPassword ? 'bi-eye' : 'bi-eye-slash'}`}
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            style={{
                                                position: 'absolute',
                                                top: '70%',
                                                right: '15px',
                                                transform: 'translateY(-50%)',
                                                cursor: 'pointer',
                                                fontSize: '1.5rem',
                                                color: '#777',
                                                zIndex:"10"
                                            }}
                                        ></i> */}
                                    </div>
                                    {/* Confirm Password Field */}
                                    <div style={{ position: 'relative' }}>
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="form-input"
                                            style={{ paddingRight: '40px' }}
                                        />
                                        {/* <i
                                            className={`bi ${showConfirmPassword ? 'bi-eye' : 'bi-eye-slash'}`}
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            style={{
                                                position: 'absolute',
                                                top: '70%',
                                                right: '15px',
                                                transform: 'translateY(-50%)',
                                                cursor: 'pointer',
                                                fontSize: '1.5rem',
                                                color: '#777',
                                            }}
                                        ></i> */}
                                    </div>
                                    {/* <div>
                                        <label htmlFor="name">Created By</label>
                                        <input
                                            id="CREATEDBY"
                                            value={CREATEDBY}
                                            type="text"
                                            placeholder="Creator"
                                            name="CREATEDBY"
                                            className="form-input"
                                            onChange={(e) => setCREATEDBY(e.target.value)}
                                        />
                                    </div>{' '} */}
                                    {/* <div>
                                        <label htmlFor="name">Created On</label>
                                        <input
                                            id="CREATEDON"
                                            value={CREATEDON}
                                            type="date"
                                            placeholder="2024-07-12 10:00"
                                            name="CREATEDON"
                                            className="form-input"
                                            onChange={(e) => setCREATEDON(e.target.value)}
                                        />
                                    </div>{' '} */}
                                    {/* <div>
                                        <label htmlFor="name">Updated By</label>
                                        <input
                                            id="UPDATEDBY"
                                            value={UPDATEDBY}
                                            type="text"
                                            placeholder="updater"
                                            name="UPDATEDBY"
                                            className="form-input"
                                            onChange={(e) => setUPDATEDBY(e.target.value)}
                                        />
                                    </div>{' '} */}
                                    {/* <div>
                                        <label htmlFor="name">Updated On</label>
                                        <input
                                            id="UPDATEDON"
                                            value={UPDATEDON}
                                            type="text"
                                            placeholder="updatedon"
                                            name="UPDATEDON"
                                            className="form-input"
                                            onChange={(e) => setUPDATEDON(e.target.value)}
                                        />
                                    </div>{' '} */}
                                    {/* <div>
                                        <label htmlFor="name">DS-ON</label>
                                        <input id="DS_ON" value={DS_ON} type="text" placeholder="dson" name="DS_ON" className="form-input" onChange={(e) => setDS_ON(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor="name">DS-Off</label>
                                        <input id="DS_OFF" value={DS_OFF} type="text" placeholder="dsoff" name="DS_OFF" className="form-input" onChange={(e) => setDS_OFF(e.target.value)} />
                                    </div> */}
                                    {/* //----------------------------------------------------------------------------------------------------------------------------------------------------------------------                    */}
                                    {/* <div>
                                        <label htmlFor="name">Full Name</label>
                                        <input
                                            id="FULLNAME"
                                            value={FULLNAME}
                                            type="text"
                                            placeholder="Jimmy Turner"
                                            name="FULLNAME"
                                            className="form-input"
                                            onChange={(e) => setFULLNAME(e.target.value)}
                                        />
                                    </div> */}
                                    <div>
                                        <label htmlFor="profession">Profession</label>
                                        <input
                                            id="PROFESSION"
                                            value={PROFESSION}
                                            type="text"
                                            placeholder="Web Developer"
                                            name="PROFESSION"
                                            className="form-input"
                                            onChange={(e) => setPROFESSION(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="country">Country</label>
                                        <select value={COUNTRY} id="COUNTRY" className="form-select text-white-dark" name="COUNTRY" onChange={(e) => setCOUNTRY(e.target.value)}>
                                            <option value="">-- Select country --</option>
                                            {countries.map((c) => (
                                                <option key={c} value={c}>
                                                    {c}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="address">Address</label>
                                        <input id="ADDRESS" value={ADDRESS} type="text" placeholder="New York" className="form-input" name="ADDRESS" onChange={(e) => setADDRESS(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor="location">Location</label>
                                        <input id="LOCATION" value={LOCATION} type="text" placeholder="Location" name="LOCATION" className="form-input" onChange={(e) => setLOCATION(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor="web">Website</label>
                                        <input id="WEBSITE" value={WEBSITE} type="text" placeholder="Enter URL" className="form-input" name="WEBSITE" onChange={(e) => setWEBSITE(e.target.value)} />
                                    </div>
                                    {/* <div>
                                        <label className="inline-flex cursor-pointer">
                                            <input type="checkbox" className="form-checkbox" />
                                            <span className="text-white-dark relative checked:bg-none">Make this my default address</span>
                                        </label>
                                    </div> */}
                                    <div className="sm:col-span-2 mt-3">
                                        <button type="submit" className="btn btn-primary">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 bg-white dark:bg-black">
                            <h6 className="text-lg font-bold mb-5">Social</h6>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="flex">
                                    <div className="bg-[#eee] flex justify-center items-center rounded px-3 font-semibold dark:bg-[#1b2e4b] ltr:mr-2 rtl:ml-2">
                                        <IconLinkedin className="w-5 h-5" />
                                    </div>
                                    <input type="text" placeholder="jimmy_turner" className="form-input" />
                                </div>
                                <div className="flex">
                                    <div className="bg-[#eee] flex justify-center items-center rounded px-3 font-semibold dark:bg-[#1b2e4b] ltr:mr-2 rtl:ml-2">
                                        <IconTwitter className="w-5 h-5" />
                                    </div>
                                    <input type="text" placeholder="jimmy_turner" className="form-input" />
                                </div>
                                <div className="flex">
                                    <div className="bg-[#eee] flex justify-center items-center rounded px-3 font-semibold dark:bg-[#1b2e4b] ltr:mr-2 rtl:ml-2">
                                        <IconFacebook className="w-5 h-5" />
                                    </div>
                                    <input type="text" placeholder="jimmy_turner" className="form-input" />
                                </div>
                                <div className="flex">
                                    <div className="bg-[#eee] flex justify-center items-center rounded px-3 font-semibold dark:bg-[#1b2e4b] ltr:mr-2 rtl:ml-2">
                                        <IconGithub />
                                    </div>
                                    <input type="text" placeholder="jimmy_turner" className="form-input" />
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (
                    ''
                )}
                {tabs === 'payment-details' ? (
                    <div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                            <div className="panel">
                                <div className="mb-5">
                                    <h5 className="font-semibold text-lg mb-4">Billing Address</h5>
                                    <p>
                                        Changes to your <span className="text-primary">Billing</span> information will take effect starting with scheduled payment and will be refelected on your next
                                        invoice.
                                    </p>
                                </div>
                                <div className="mb-5">
                                    <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                                        <div className="flex items-start justify-between py-3">
                                            <h6 className="text-[#515365] font-bold dark:text-white-dark text-[15px]">
                                                Address #1
                                                <span className="block text-white-dark dark:text-white-light font-normal text-xs mt-1">2249 Caynor Circle, New Brunswick, New Jersey</span>
                                            </h6>
                                            <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                                                <button className="btn btn-dark">Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                                        <div className="flex items-start justify-between py-3">
                                            <h6 className="text-[#515365] font-bold dark:text-white-dark text-[15px]">
                                                Address #2
                                                <span className="block text-white-dark dark:text-white-light font-normal text-xs mt-1">4262 Leverton Cove Road, Springfield, Massachusetts</span>
                                            </h6>
                                            <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                                                <button className="btn btn-dark">Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-start justify-between py-3">
                                            <h6 className="text-[#515365] font-bold dark:text-white-dark text-[15px]">
                                                Address #3
                                                <span className="block text-white-dark dark:text-white-light font-normal text-xs mt-1">2692 Berkshire Circle, Knoxville, Tennessee</span>
                                            </h6>
                                            <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                                                <button className="btn btn-dark">Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-primary">Add Address</button>
                            </div>
                            <div className="panel">
                                <div className="mb-5">
                                    <h5 className="font-semibold text-lg mb-4">Payment History</h5>
                                    <p>
                                        Changes to your <span className="text-primary">Payment Method</span> information will take effect starting with scheduled payment and will be refelected on your
                                        next invoice.
                                    </p>
                                </div>
                                <div className="mb-5">
                                    <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                                        <div className="flex items-start justify-between py-3">
                                            <div className="flex-none ltr:mr-4 rtl:ml-4">
                                                <img src="/assets/images/card-americanexpress.svg" alt="img" />
                                            </div>
                                            <h6 className="text-[#515365] font-bold dark:text-white-dark text-[15px]">
                                                Mastercard
                                                <span className="block text-white-dark dark:text-white-light font-normal text-xs mt-1">XXXX XXXX XXXX 9704</span>
                                            </h6>
                                            <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                                                <button className="btn btn-dark">Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                                        <div className="flex items-start justify-between py-3">
                                            <div className="flex-none ltr:mr-4 rtl:ml-4">
                                                <img src="/assets/images/card-mastercard.svg" alt="img" />
                                            </div>
                                            <h6 className="text-[#515365] font-bold dark:text-white-dark text-[15px]">
                                                American Express
                                                <span className="block text-white-dark dark:text-white-light font-normal text-xs mt-1">XXXX XXXX XXXX 310</span>
                                            </h6>
                                            <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                                                <button className="btn btn-dark">Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-start justify-between py-3">
                                            <div className="flex-none ltr:mr-4 rtl:ml-4">
                                                <img src="/assets/images/card-visa.svg" alt="img" />
                                            </div>
                                            <h6 className="text-[#515365] font-bold dark:text-white-dark text-[15px]">
                                                Visa
                                                <span className="block text-white-dark dark:text-white-light font-normal text-xs mt-1">XXXX XXXX XXXX 5264</span>
                                            </h6>
                                            <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                                                <button className="btn btn-dark">Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-primary">Add Payment Method</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <div className="panel">
                                <div className="mb-5">
                                    <h5 className="font-semibold text-lg mb-4">Add Billing Address</h5>
                                    <p>
                                        Changes your New <span className="text-primary">Billing</span> Information.
                                    </p>
                                </div>
                                <div className="mb-5">
                                    <form>
                                        <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="billingName">Name</label>
                                                <input id="billingName" type="text" placeholder="Enter Name" className="form-input" />
                                            </div>
                                            <div>
                                                <label htmlFor="billingEmail">Email</label>
                                                <input id="billingEmail" type="email" placeholder="Enter Email" className="form-input" />
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="billingAddress">Address</label>
                                            <input id="billingAddress" type="text" placeholder="Enter Address" className="form-input" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5">
                                            <div className="md:col-span-2">
                                                <label htmlFor="billingCity">City</label>
                                                <input id="billingCity" type="text" placeholder="Enter City" className="form-input" />
                                            </div>
                                            <div>
                                                <label htmlFor="billingState">State</label>
                                                <select id="billingState" className="form-select text-white-dark">
                                                    <option>Choose...</option>
                                                    <option>...</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="billingZip">Zip</label>
                                                <input id="billingZip" type="text" placeholder="Enter Zip" className="form-input" />
                                            </div>
                                        </div>
                                        <button type="button" className="btn btn-primary">
                                            Add
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="panel">
                                <div className="mb-5">
                                    <h5 className="font-semibold text-lg mb-4">Add Payment Method</h5>
                                    <p>
                                        Changes your New <span className="text-primary">Payment Method </span>
                                        Information.
                                    </p>
                                </div>
                                <div className="mb-5">
                                    <form>
                                        <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="payBrand">Card Brand</label>
                                                <select id="payBrand" className="form-select text-white-dark">
                                                    <option value="Mastercard">Mastercard</option>
                                                    <option value="American Express">American Express</option>
                                                    <option value="Visa">Visa</option>
                                                    <option value="Discover">Discover</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="payNumber">Card Number</label>
                                                <input id="payNumber" type="text" placeholder="Card Number" className="form-input" />
                                            </div>
                                        </div>
                                        <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="payHolder">Holder Name</label>
                                                <input id="payHolder" type="text" placeholder="Holder Name" className="form-input" />
                                            </div>
                                            <div>
                                                <label htmlFor="payCvv">CVV/CVV2</label>
                                                <input id="payCvv" type="text" placeholder="CVV" className="form-input" />
                                            </div>
                                        </div>
                                        <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="payExp">Card Expiry</label>
                                                <input id="payExp" type="text" placeholder="Card Expiry" className="form-input" />
                                            </div>
                                        </div>
                                        <button type="button" className="btn btn-primary">
                                            Add
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}
                {tabs === 'preferences' ? (
                    <div className="switch">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                            <div className="panel space-y-5">
                                <h5 className="font-semibold text-lg mb-4">Choose Theme</h5>
                                <div className="flex justify-around">
                                    <div className="flex">
                                        <label className="inline-flex cursor-pointer">
                                            <input className="form-radio ltr:mr-4 rtl:ml-4 cursor-pointer" type="radio" name="flexRadioDefault" defaultChecked />
                                            <span>
                                                <img className="ms-3" width="100" height="68" alt="settings-dark" src="/assets/images/settings-light.svg" />
                                            </span>
                                        </label>
                                    </div>

                                    <label className="inline-flex cursor-pointer">
                                        <input className="form-radio ltr:mr-4 rtl:ml-4 cursor-pointer" type="radio" name="flexRadioDefault" />
                                        <span>
                                            <img className="ms-3" width="100" height="68" alt="settings-light" src="/assets/images/settings-dark.svg" />
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className="panel space-y-5">
                                <h5 className="font-semibold text-lg mb-4">Activity data</h5>
                                <p>Download your Summary, Task and Payment History Data</p>
                                <button type="button" className="btn btn-primary">
                                    Download Data
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="panel space-y-5">
                                <h5 className="font-semibold text-lg mb-4">Public Profile</h5>
                                <p>
                                    Your <span className="text-primary">Profile</span> will be visible to anyone on the network.
                                </p>
                                <label className="w-12 h-6 relative">
                                    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                    <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                </label>
                            </div>
                            <div className="panel space-y-5">
                                <h5 className="font-semibold text-lg mb-4">Show my email</h5>
                                <p>
                                    Your <span className="text-primary">Email</span> will be visible to anyone on the network.
                                </p>
                                <label className="w-12 h-6 relative">
                                    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox2" />
                                    <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white  dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                </label>
                            </div>
                            <div className="panel space-y-5">
                                <h5 className="font-semibold text-lg mb-4">Enable keyboard shortcuts</h5>
                                <p>
                                    When enabled, press <span className="text-primary">ctrl</span> for help
                                </p>
                                <label className="w-12 h-6 relative">
                                    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox3" />
                                    <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white  dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                </label>
                            </div>
                            <div className="panel space-y-5">
                                <h5 className="font-semibold text-lg mb-4">Hide left navigation</h5>
                                <p>
                                    Sidebar will be <span className="text-primary">hidden</span> by default
                                </p>
                                <label className="w-12 h-6 relative">
                                    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox4" />
                                    <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white  dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                </label>
                            </div>
                            <div className="panel space-y-5">
                                <h5 className="font-semibold text-lg mb-4">Advertisements</h5>
                                <p>
                                    Display <span className="text-primary">Ads</span> on your dashboard
                                </p>
                                <label className="w-12 h-6 relative">
                                    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox5" />
                                    <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white  dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                </label>
                            </div>
                            <div className="panel space-y-5">
                                <h5 className="font-semibold text-lg mb-4">Social Profile</h5>
                                <p>
                                    Enable your <span className="text-primary">social</span> profiles on this network
                                </p>
                                <label className="w-12 h-6 relative">
                                    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox6" />
                                    <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white  dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}
                {tabs === 'danger-zone' ? (
                    <div className="switch">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="panel space-y-5">
                                <h5 className="font-semibold text-lg mb-4">Purge Cache</h5>
                                <p>Remove the active resource from the cache without waiting for the predetermined cache expiry time.</p>
                                <button className="btn btn-secondary">Clear</button>
                            </div>
                            <div className="panel space-y-5">
                                <h5 className="font-semibold text-lg mb-4">Deactivate Account</h5>
                                <p>You will not be able to receive messages, notifications for up to 24 hours.</p>
                                <label className="w-12 h-6 relative">
                                    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox7" />
                                    <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                </label>
                            </div>
                            <div className="panel space-y-5">
                                <h5 className="font-semibold text-lg mb-4">Delete Account</h5>
                                <p>Once you delete the account, there is no going back. Please be certain.</p>
                                <button className="btn btn-danger btn-delete-account">Delete my account</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default AccountSetting;
