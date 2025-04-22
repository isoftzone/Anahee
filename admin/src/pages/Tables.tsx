import { useEffect, useState, } from 'react';
import CodeHighlight from '../components/Highlight';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import Dropdown from '../components/Dropdown';
import { setPageTitle } from '../store/themeConfigSlice';
import IconCode from '../components/Icon/IconCode';
import IconTrashLines from '../components/Icon/IconTrashLines';
import IconPencil from '../components/Icon/IconPencil';
import IconHorizontalDots from '../components/Icon/IconHorizontalDots';
import IconCircleCheck from '../components/Icon/IconCircleCheck';
import IconSettings from '../components/Icon/IconSettings';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../config'

const Tables = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tables'));
    }, [dispatch]);

    interface UserData {
        id: number;
        name: string;
        email: string;
        password: string;
    }

    const [tableData, setTableData] = useState<UserData[]>([]);
    const [filteredTableData, setFilteredTableData] = useState<UserData[]>([]);
    const [search, setSearch] = useState<string>('');


    useEffect(() => {
        // Fetch data from API
        fetch(`${BASE_URL}/getAllUsers`)
            .then(response => response.json())
            .then(data => {
                setTableData(data);
                setSearch(data)
                setFilteredTableData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [tabs, setTabs] = useState<string[]>([]);
    const toggleCode = (name: string) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };

    const navigate = useNavigate();
    const handleEdit = (id: any) => {
        console.log('Editing user with ID:', id);
    };

    const handleClick = (id: any) => {
        navigate(`/forms/basic/${id}`)
    };

    const handleSearch = (query: string) => {
        setSearch(query);
        const filteredData = filteredTableData.filter(data =>
            (data.name && data.name.toLowerCase().includes(query.toLowerCase())) ||
            (data.email && data.email.toLowerCase().includes(query.toLowerCase())) ||
            (data.password && data.password.toLowerCase().includes(query.toLowerCase()))
        );
        setTableData(filteredData);
    };

    const handleDelete = (id: any) => {
        // Send DELETE request to API
        fetch(`${BASE_URL}/deleteUsers/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    // Update table data after successful deletion
                    setTableData(prevData => prevData.filter(item => item.id !== id));
                    alert("User delete successfully")
                } else {
                    throw new Error('Failed to delete user');
                }
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    };

    return (
        <div className="grid xl:grid-cols-2 gap-6 grid-cols-1">
            {/* progress */}
            <div className="panel" style={{ width: "197%" }} >
                {/* <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Progress Table</h5>
                    <button type="button" onClick={() => toggleCode('code6')} className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600">
                        <span className="flex items-center">
                            <IconCode className="me-2" />
                            Code
                        </span>
                    </button>
                </div> */}
                <input
                    type="text"
                    className="form-input w-auto"
                    placeholder="Search..."
                    onChange={(e) => handleSearch(e.target.value)}
                />

                <div className="table-responsive mb-5">
                    {tableData.length === 0 ? (
                        <p style={{ textAlign: "center" }}>No User Found</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Password</th>

                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.password}</td>

                                        <td className="p-3 border-b border-[#ebedf2] dark:border-[#191e3a] text-center">
                                            <Tippy content="Edit">
                                                <button type="button"
                                                    onClick={() => handleClick(data.id)}
                                                >
                                                    <IconPencil className="ltr:mr-2 rtl:ml-2" />
                                                </button>
                                            </Tippy>
                                            <Tippy content="Delete">
                                                <button type="button"
                                                    onClick={() => handleDelete(data.id)}
                                                >
                                                    <IconTrashLines />
                                                </button>
                                            </Tippy>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                {tabs.includes('code6') && (
                    <CodeHighlight>
                        <pre>
                            {/* Your code here */}
                        </pre>
                    </CodeHighlight>
                )}
            </div>

        </div>
    );
};

export default Tables;
