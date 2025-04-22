import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';
import Dropdown from '../../components/Dropdown';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconUser from '../../components/Icon/IconUser';
import IconMail from '../../components/Icon/IconMail';
import IconPhoneCall from '../../components/Icon/IconPhoneCall';
import IconPencil from '../../components/Icon/IconPencil';
import IconMessageDots from '../../components/Icon/IconMessageDots';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../../config';
import axios from 'axios';
import { dE } from '@fullcalendar/core/internal-common';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';

const FrmCodeType = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState('');
    const [initialRecords, setInitialRecords] = useState<UserData[]>([]);
    const [myStatus, setMyStatus] = useState<UsersData[]>([]);
    const [codetype, setCodetype] = useState('');
    const [primekeyid, setPrimekeyid] = useState('');
    const [primename, setPrimename] = useState('');
    const [sequence, setSequence] = useState('');
    const [status, setStatus] = useState('Active');
    const [remark, setRemark] = useState('');
    const [products, setProducts] = useState([]);
    const [productData, setProductData] = useState<UserData[]>([]);
    const [newRecordsData, setNewRecordsData] = useState<UserData[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        codetype: '',
        primekeyid: '',
        primename: '',
        sequence: '',
        status: '',
        remark: ''
    });
    const [user, setUser] = useState<{ name: string, email: string, companyid:string } | null>(null);


    useEffect(() => {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            const user = JSON.parse(userDataString);
            setUser(user);
        }
    }, []);
    interface UserData {
        primekeyid: number,
        primename: string,
        id: number,
        sequence:number,
        status:string,
        remark:string
    }
    interface UsersData{
        PRIMENAME: string,
        PRIMEKEYID: number
    }


    useEffect(() => {
        let pageTitle = '';
        switch (category) {
            case 'brand':
                pageTitle = 'Brand';
                break;
                case 'formName':
                pageTitle = 'FromName';
                break;
                case 'control':
                    pageTitle = 'Control';
                    break;
                    case 'c_name':
                        pageTitle = 'C_Name';
                        break; case 'c_type':
                        pageTitle = 'C_Type';
                        break; case 'c_value':
                        pageTitle = 'C_Value';
                        break; 
            case 'product':
                pageTitle = 'Product';
                break;
            case 'buyer':
                pageTitle = 'Buyer';
                break;
            case 'colour':
                pageTitle = 'Colour';
                break;
            case 'scolor':
                pageTitle = 'Supplier Color';
                break;
            case 'category':
                pageTitle = 'Category';
                break;
            case 'subCategory':
                pageTitle = 'Sub Category';
                break;
            case 'group':
                pageTitle = 'Group';
                break;
            case 'subGroup':
                pageTitle = 'Sub Group';
                break;
            case 'material':
                pageTitle = 'Material';
                break;
            case 'size':
                pageTitle = 'Size';
                break;
            case 'style':
                pageTitle = 'Style';
                break;
            case 'section':
                pageTitle = 'Section';
                break;
            case 'season':
                pageTitle = 'Season';
                break;
            case 'unit':
                pageTitle = 'Unit';
                break;
            case 'packing':
                pageTitle = 'Packing';
                break;
            case 'gender':
                pageTitle = 'Gender';
                break;
            case 'tag':
                pageTitle = 'Tag';
                break;
                case 'seller':
                pageTitle = 'Seller';
                break;
            default:
                pageTitle = '';
        }
        setCurrentPage(pageTitle);
        dispatch(setPageTitle(pageTitle));
        setPage(1); // Reset to the first page on category change
    },  [category, dispatch]);

    useEffect(() => {
        fetchProductData();
    }, [category, page, pageSize, sortStatus]);


    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    useEffect(() => {
        fetchProductData();
    }, [page, pageSize]);


    useEffect(()=>{
        const fetchAll = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/getCodeTypeAllData`,{ params: { codetype: category} });
                console.log('dataaaaaaa',response.data.records)
                setInitialRecords(response.data.records)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchAll()
    },[])

        const findSequence = async (category:any) => {
            try {
                const response = await axios.get(`${BASE_URL}/getNextSequence`, { params: { codetype: category } });
                if (!response.data || !response.data.nextSequence) {
                    throw new Error('Failed to fetch data');
                }
                setSequence(response.data.nextSequence.toString());
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error as needed
            }
        };
    
        // Fetch sequence number when component mounts or when category changes
        useEffect(() => {
            findSequence(category);
        }, [category]);  

        const handleSequenceChange = (e:any) => {
            setSequence(e.target.value);
        };

        const changeStatus =(e:any) =>{
            setStatus(e.target.value);
        }

    useEffect(() => {
        const fetchData = async () => {
            const api = await axios.post(`${BASE_URL}/postcmb`, { TblName: 'MASTER', FldName: 'PRIMENAME', FldCode: 'PRIMEKEYID', OrdBy: 'SEQUENCE', WhFldName: 'Status' }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setMyStatus(api.data);
        }
        fetchData();
    }, []);

    const isPrimenameUnique = (primename:any) => {
        return !initialRecords.some(record => record.primename === primename);
    };

    // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();

    //     if (!user) {
    //         console.error('User is not set');
    //         return;
    //     }

    //     if (!isPrimenameUnique(primename)) {
    //         alert('Prime name already exists');
    //         return;
    //     }

    //     try {
    //         let response;
    //         if (editingId) {
    //             debugger
    //             // If editingId is present, update existing product
    //             response = await axios.put(`${BASE_URL}/editProducts/${editingId}`, {
    //                 codetype: `${category}`,
    //                 updatedby: `${user.name}`,
    //                 primename,
    //                 sequence,
    //                 status,
    //                 remark
    //             });
    //             alert('Data Updated')
    //         } else {
    //             // Otherwise, add new product
    //             debugger
    //             response = await axios.post(`${BASE_URL}/addProducts`, {
    //                 codetype: `${category}`,
    //                 createdby: `${user.name}`,
    //                 companyid: `${user.companyid}`,
    //                 primename,
    //                 sequence,
    //                 status,
    //                 remark,
    //             });
    //         }
    //         alert('Data Submitted Successfully');

    //         // Clear form fields after submission
    //         setPrimename('');
    //         setStatus('');
    //         setSequence('');
    //         setRemark('');
    //         setEditingId(null); // Reset editingId after submit

    //         // Refresh product list after update or add
    //         findSequence(category);
    //         fetchProductData(); // Refresh product list
    //     } catch (error) {
    //         console.error('Error inserting/updating data:', error);
    //     }
    // };
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
         if (!user) {
        console.error('User is not set');
        return;
    }
        if (!isPrimenameUnique(primename)) {
            alert('Prime name already exists');
            return;
        }
    
            let response;
            if (editingId) {
                // If editingId is present, update existing product
                response = await axios.put(`${BASE_URL}/editProducts/${editingId}`, {
                    codetype: `${category}`,
                     updatedby: `${user.name}`, // Replace with actual codetype if needed
                     primename,
                     status,
                     sequence,
                     remark
                });
                alert('Data Updated')
            } else {
             if (!user) {
        console.error('User is not set');
        return;
    }
                // Otherwise, add new product
                response = await axios.post(`${BASE_URL}/addProducts`, {
                    codetype:`${category}`, // Replace with actual codetype if needed
                    createdby: `${user.name}`,
                    companyid:`${user.companyid}`,
                    primename,
                    status,
                    sequence,
                    remark,
                });
                alert('Data Submitted Successfully')
            }
    
            // Clear form fields after submission
            setPrimekeyid('');
            setPrimename('');
            setStatus('');
            setSequence('');
            setRemark('');
            setEditingId(null); // Reset editingId after submit
    
            // Refresh product list after update or add
            fetchProductData(); // Implement fetchProductData to update product list
            findSequence(category);
        } catch (error) {
            console.error('Error inserting/updating data:', error);
        }
    };

    const fetchProductData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getCodeTypeData`, { params: { codetype: category, page, pageSize } });
            setProductData(response.data.records);
            setNewRecordsData(response.data.records);
            setTotalRecords(response.data.total);
            console.log('newData from api', response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    const handleDelete = async (primekeyid:number) => {
        try {
            const response = await axios.delete(`${BASE_URL}/deleteProducts/${primekeyid}`, {
                data: {
                    codetype: category // Pass the codetype in the request body
                }
            });
            console.log('Delete response:', response.data);
            // Optionally, update UI or perform additional actions after successful deletion
            fetchProductData(); // Implement fetchProductData to update product list
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    
    const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, record: { primekeyid: number; primename: string; status: string; sequence: number, remark: string },) => {
        // let EditRecord = p0;
        setEditingId(record.primekeyid.toString());
        // setPrimekeyid(record.primekeyid.toString());
        setPrimename(record.primename);
        setStatus(record.status);
        setSequence(record.sequence.toString()); 
        setRemark(record.remark);
         // Scroll to the top
         window.scrollTo({
            top: 70,
            behavior: 'smooth' // Use 'auto' if you don't want the smooth scrolling effect
        })
    };
    
    
    
    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 py-20">
                        <div className="absolute top-6 end-6">
                        </div>
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold !leading-snug text-primary md:text-4xl">{currentPage}</h1>
                            </div>
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                 
                <div className="relative text-white-dark">
               <label> Prime Name: <input
                        type="text"
                        placeholder="Primename"
                        value={primename}
                        onChange={(e) => setPrimename(e.target.value)}
                        className="form-input ps-10 placeholder:text-white-dark"
                        style={{textTransform:'uppercase'}}
                    />
                    </label>
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconPhoneCall fill={true} />
                    </span>
                </div>
                <div className="relative text-white-dark">
                    <input
                        type="text"
                        placeholder="Sequence"
                        value={sequence}
                        onChange={handleSequenceChange}
                        className="form-input ps-10 placeholder:text-white-dark"
                    />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconPhoneCall fill={true} />
                    </span>
                </div>
                                
                                <label htmlFor="">
                                <select name="cmbStatus"
                                    style={{
                                        width: "144px",
                                        marginLeft: "3px",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: '5px'
                                    }}
                                    onChange={changeStatus}
                                    value='Active'
                                >
                                    <option>Status</option>
                                    {myStatus.map((record, index) => (
                                        <option key={index} value={record.PRIMENAME}>{record.PRIMENAME}</option>
                                    ))}
                                </select>
                            </label>
                                  <div className="relative text-white-dark">
                    <textarea
                        rows={4}
                        placeholder="Remark"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        className="form-textarea resize-none ps-10 placeholder:text-white-dark"
                        style={{textTransform:'uppercase'}}
                    />
                    <span className="absolute start-4 top-2.5">
                        <IconMessageDots fill={true} />
                    </span>
                </div>
                                <button
                    type="submit"
                    className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                >
                    {editingId ? 'Update' : 'Submit'}
                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6">
                                <div className="flex justify-between mb-4">
                                    <h2 className="text-2xl font-bold text text-danger">{currentPage}</h2>
                                </div>
                               
                            </div>
                            <div className="datatables">
                <DataTable
                    highlightOnHover
                    className="whitespace-nowrap table-hover"
                    records={productData}
                    columns={[
                        { accessor: 'primekeyid', title: 'Id', sortable: true },
                        { accessor: 'primename', title: 'Prime Name', sortable: true },
                        { accessor: 'sequence', title: 'Sequence', sortable: true },
                        { accessor: 'remark', title: 'Remark', sortable: true },
                        { accessor: 'status', title: 'Status', sortable: true },
                        {
                            accessor: 'action',
                            title: <div style={{ marginLeft: '40px' }}>Action</div>,
                            render: (record) => (
                                <div className="flex space-x-2">
                                    <button
                                        className='btn btn-warning mr-2'
                                        onClick={(e) => handleEdit(e, record)}
                                        style={{ width: '57px' }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className='btn btn-danger mr-2'
                                        onClick={() => handleDelete(record.primekeyid)}
                                        style={{ padding: '8px' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ),
                        },
                    ]}
                    totalRecords={totalRecords}
                    recordsPerPage={pageSize}
                    page={page}
                    onPageChange={(p) => setPage(p)}
                    recordsPerPageOptions={PAGE_SIZES}
                    onRecordsPerPageChange={(size) => {
                        setPageSize(size);
                        setPage(1); // Reset to first page when page size changes
                    }}
                    sortStatus={sortStatus}
                    onSortStatusChange={setSortStatus}
                />
            </div>
        </div>
    );
};

export default FrmCodeType;
