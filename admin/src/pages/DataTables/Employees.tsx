import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import IconBell from '../../components/Icon/IconBell';
import IconFile from '../../components/Icon/IconFile';
import IconPrinter from '../../components/Icon/IconPrinter';
import { downloadExcel } from 'react-export-table-to-excel';
import Dropdown from '../../components/Dropdown';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import { IRootState } from '../../store';
import { BASE_URL } from '../../config';

const Employees = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Range Search Table'));
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    // const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    // const [recordsData, setRecordsData] = useState(initialRecords);
    const [initialRecords, setInitialRecords] = useState<UserData[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedState, setSelectedState] = useState('');

    const [recordsData, setRecordsData] = useState(initialRecords);
    const [tempData, setTempData] = useState(initialRecords);
    const [search, setSearch] = useState('');
    const [clientData, setClientData] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });

    interface UserData {
        id: number;
        ACCOUNTHOLDERNAME: string;
        ACCOUNTNO: string;
        ACCOUNTTYPE: string;
        ADDRESS: string;
        ADVANCEGIVEN: number;
        ADVGIVEN: number;
        AGE: string;
        BANKNAME: string;
        BLOODGROUP: string;
        BLOODGRP: string;
        BRANCHNAME: string;
        CHEQUENO: string;
        CHEQUEREMARK: string;
        CITY: string;
        COMPANYID: number;
        COUNTRY: string;
        CREATEDBY: string;
        CREATEDON: string;
        CURRENTSALARY: number;
        CURRSAL: number;
        DISTRICT: string;
        DOB: string;
        DOJ: string;
        EMPID: number;
        FATHERNAME: string;
        FIRSTNAME: string;
        FNAME: string;
        GENDER: string;
        IFSCCODE: string;
        LASTNAME: string;
        LNAME: string;
        LOCATION: string;
        MOBILE: string;
        MOBILENO: string;
        PAYMENT: number;
        PERSONALID: string;
        PERSONALIDTYPE: string;
        PID: string;
        PIDTYPE: string;
        PINCODE: string;
        REFCONT: number;
        REFCONTACT: string;
        REFNAME: string;
        REMARK: string;
        SHIFT: string;
        STATE: string;
        STATUS: string;
        TELEPHONE: string;
        TELEPHONENO: string;
        TITLE: string;
        UPDATEDBY: string;
        UPDATEDON: string;
    }

    useEffect(() => {
        fetch(`${BASE_URL}/getEmployee`)
            .then((response) => response.json())

            .then((data) => {
                let detail = data;
                setClientData(detail);
                setInitialRecords(detail);
                setRecordsData(detail);
                setTempData(detail);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return tempData.filter((item) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.FIRSTNAME.toLowerCase().includes(search.toLowerCase()) ||
                    item.LASTNAME.toLowerCase().includes(search.toLowerCase()) ||
                    item.COMPANYID.toString().includes(search.toLowerCase()) ||
                    // item.email.toLowerCase().includes(search.toLowerCase()) ||
                    item.AGE.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.DOB.toLowerCase().includes(search.toLowerCase()) ||
                    item.MOBILE.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

    // const [minAge, setMinAge] = useState<any>('');
    // const [maxAge, setMaxAge] = useState<any>('');

    // useEffect(() => {
    //     let dt = rowData;
    //     if (minAge !== '' && minAge !== null) {
    //         dt = dt.filter((d) => d.age >= Number(minAge));
    //     }
    //     if (maxAge !== '' && maxAge !== null) {
    //         dt = dt.filter((d) => d.age <= Number(maxAge));
    //     }
    //     if (minAge || maxAge) {
    //         setInitialRecords(dt);
    //         setTempData(dt);
    //     }
    // }, [minAge, maxAge]);

    const formatDate = (date: any) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };

    const col = [
        'Id',
        'FIRSTNAME',
        'LASTNAME',
        'DOB',
        'MOBILE',
        'AGE',
        'COMPANYID',
        'ACCOUNTHOLDERNAME',
        'ACCOUNTNO',
        'ACCOUNTTYPE',
        'ADDRESS',
        'ADVANCEGIVEN',
        'ADVGIVEN',
        'BANKNAME',
        'BLOODGROUP',
        'BLOODGRP',
        'BRANCHNAME',
        'CHEQUENO',
        'CHEQUEREMARK',
        'CITY',
        'COMPANYID',
        'COUNTRY',
        'CREATEDBY',
        'CREATEDON',
        'CURRENTSALARY',
        'CURRSAL',
        'DISTRICT',
        'DOJ',
        'EMPID',
        'FATHERNAME',
        'FNAME',
        'GENDER',
        'IFSCCODE',
        'LNAME',
        'LOCATION',
        'MOBILENO',
        'PAYMENT',
        'PERSONALID',
        'PERSONALIDTYPE',
        'PID',
        'PIDTYPE',
        'PINCODE',
        'REFCONT',
        'REFCONTACT',
        'REFNAME',
        'REMARK',
        'SHIFT',
        'STATE',
        'STATUS',
        'TELEPHONE',
        'TELEPHONENO',
        'TITLE',
        'UPDATEDBY',
        'UPDATEDON',
    ];

    const exportTable = (type: any) => {
        let columns: any = col;
        let records = initialRecords;
        let filename = 'table';

        let newVariable: any;
        newVariable = window.navigator;

        if (type === 'csv') {
            let coldelimiter = ';';
            let linedelimiter = '\n';
            let result = columns
                .map((d: any) => {
                    return capitalize(d);
                })
                .join(coldelimiter);
            result += linedelimiter;
            // eslint-disable-next-line array-callback-return
            records.map((item: any) => {
                // eslint-disable-next-line array-callback-return
                columns.map((d: any, index: any) => {
                    if (index > 0) {
                        result += coldelimiter;
                    }
                    let val = item[d] ? item[d] : '';
                    result += val;
                });
                result += linedelimiter;
            });

            if (result == null) return;
            if (!result.match(/^data:text\/csv/i) && !newVariable.msSaveOrOpenBlob) {
                var data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(result);
                var link = document.createElement('a');
                link.setAttribute('href', data);
                link.setAttribute('download', filename + '.csv');
                link.click();
            } else {
                var blob = new Blob([result]);
                if (newVariable.msSaveOrOpenBlob) {
                    newVariable.msSaveBlob(blob, filename + '.csv');
                }
            }
        } else if (type === 'print') {
            var rowhtml = '<p>' + filename + '</p>';
            rowhtml +=
                '<table style="width: 100%; " cellpadding="0" cellcpacing="0"><thead><tr style="color: #515365; background: #eff5ff; -webkit-print-color-adjust: exact; print-color-adjust: exact; "> ';
            // eslint-disable-next-line array-callback-return
            columns.map((d: any) => {
                rowhtml += '<th>' + capitalize(d) + '</th>';
            });
            rowhtml += '</tr></thead>';
            rowhtml += '<tbody>';

            // eslint-disable-next-line array-callback-return
            records.map((item: any) => {
                rowhtml += '<tr>';
                // eslint-disable-next-line array-callback-return
                columns.map((d: any) => {
                    let val = item[d] ? item[d] : '';
                    rowhtml += '<td>' + val + '</td>';
                });
                rowhtml += '</tr>';
            });
            rowhtml +=
                '<style>body {font-family:Arial; color:#495057;}p{text-align:center;font-size:18px;font-weight:bold;margin:15px;}table{ border-collapse: collapse; border-spacing: 0; }th,td{font-size:12px;text-align:left;padding: 4px;}th{padding:8px 4px;}tr:nth-child(2n-1){background:#f7f7f7; }</style>';
            rowhtml += '</tbody></table>';
            var winPrint: any = window.open('', '', 'left=0,top=0,width=1000,height=600,toolbar=0,scrollbars=0,status=0');
            winPrint.document.write('<title>Print</title>' + rowhtml);
            winPrint.document.close();
            winPrint.focus();
            winPrint.print();
        } else if (type === 'txt') {
            let coldelimiter = ',';
            let linedelimiter = '\n';
            let result = columns
                .map((d: any) => {
                    return capitalize(d);
                })
                .join(coldelimiter);
            result += linedelimiter;
            // eslint-disable-next-line array-callback-return
            records.map((item: any) => {
                // eslint-disable-next-line array-callback-return
                columns.map((d: any, index: any) => {
                    if (index > 0) {
                        result += coldelimiter;
                    }
                    let val = item[d] ? item[d] : '';
                    result += val;
                });
                result += linedelimiter;
            });

            if (result == null) return;
            if (!result.match(/^data:text\/txt/i) && !newVariable.msSaveOrOpenBlob) {
                var data1 = 'data:application/txt;charset=utf-8,' + encodeURIComponent(result);
                var link1 = document.createElement('a');
                link1.setAttribute('href', data1);
                link1.setAttribute('download', filename + '.txt');
                link1.click();
            } else {
                var blob1 = new Blob([result]);
                if (newVariable.msSaveOrOpenBlob) {
                    newVariable.msSaveBlob(blob1, filename + '.txt');
                }
            }
        }
    };
    const header = [
        'Id',
        'FIRSTNAME',
        'LASTNAME',
        'DOB',
        'MOBILE',
        'AGE',
        'COMPANYID',
        'ACCOUNTHOLDERNAME',
        'ACCOUNTNO',
        'ACCOUNTTYPE',
        'ADDRESS',
        'ADVANCEGIVEN',
        'ADVGIVEN',
        'BANKNAME',
        'BLOODGROUP',
        'BLOODGRP',
        'BRANCHNAME',
        'CHEQUENO',
        'CHEQUEREMARK',
        'CITY',
        'COMPANYID',
        'COUNTRY',
        'CREATEDBY',
        'CREATEDON',
        'CURRENTSALARY',
        'CURRSAL',
        'DISTRICT',
        'DOJ',
        'EMPID',
        'FATHERNAME',
        'FNAME',
        'GENDER',
        'IFSCCODE',
        'LNAME',
        'LOCATION',
        'MOBILENO',
        'PAYMENT',
        'PERSONALID',
        'PERSONALIDTYPE',
        'PID',
        'PIDTYPE',
        'PINCODE',
        'REFCONT',
        'REFCONTACT',
        'REFNAME',
        'REMARK',
        'SHIFT',
        'STATE',
        'STATUS',
        'TELEPHONE',
        'TELEPHONENO',
        'TITLE',
        'UPDATEDBY',
        'UPDATEDON',
    ];
    interface YourDataType {
        id: number;
        ACCOUNTHOLDERNAME: string;
        ACCOUNTNO: string;
        ACCOUNTTYPE: string;
        ADDRESS: string;
        ADVANCEGIVEN: number;
        ADVGIVEN: number;
        AGE: string;
        BANKNAME: string;
        BLOODGROUP: string;
        BLOODGRP: string;
        BRANCHNAME: string;
        CHEQUENO: string;
        CHEQUEREMARK: string;
        CITY: string;
        COMPANYID: number;
        COUNTRY: string;
        CREATEDBY: string;
        CREATEDON: string;
        CURRENTSALARY: number;
        CURRSAL: number;
        DISTRICT: string;
        DOB: string;
        DOJ: string;
        EMPID: number;
        FATHERNAME: string;
        FIRSTNAME: string;
        FNAME: string;
        GENDER: string;
        IFSCCODE: string;
        LASTNAME: string;
        LNAME: string;
        LOCATION: string;
        MOBILE: string;
        MOBILENO: string;
        PAYMENT: number;
        PERSONALID: string;
        PERSONALIDTYPE: string;
        PID: string;
        PIDTYPE: string;
        PINCODE: string;
        REFCONT: number;
        REFCONTACT: string;
        REFNAME: string;
        REMARK: string;
        SHIFT: string;
        STATE: string;
        STATUS: string;
        TELEPHONE: string;
        TELEPHONENO: string;
        TITLE: string;
        UPDATEDBY: string;
        UPDATEDON: string;
    }
    function handleDownloadExcel() {
        const col: Array<keyof YourDataType> = [
            'id',
            'FIRSTNAME',
            'LASTNAME',
            'DOB',
            'MOBILE',
            'AGE',
            'COMPANYID',
            'ACCOUNTHOLDERNAME',
            'ACCOUNTNO',
            'ACCOUNTTYPE',
            'ADDRESS',
            'ADVANCEGIVEN',
            'ADVGIVEN',
            'AGE',
            'BANKNAME',
            'BLOODGROUP',
            'BLOODGRP',
            'BRANCHNAME',
            'CHEQUENO',
            'CHEQUEREMARK',
            'CITY',
            'COMPANYID',
            'COUNTRY',
            'CREATEDBY',
            'CREATEDON',
            'CURRENTSALARY',
            'CURRSAL',
            'DISTRICT',
            'DOB',
            'DOJ',
            'EMPID',
            'FATHERNAME',
            'FNAME',
            'GENDER',
            'IFSCCODE',
            'LNAME',
            'LOCATION',
            'MOBILENO',
            'PAYMENT',
            'PERSONALID',
            'PERSONALIDTYPE',
            'PID',
            'PIDTYPE',
            'PINCODE',
            'REFCONT',
            'REFCONTACT',
            'REFNAME',
            'REMARK',
            'SHIFT',
            'STATE',
            'STATUS',
            'TELEPHONE',
            'TELEPHONENO',
            'TITLE',
            'UPDATEDBY',
            'UPDATEDON',
        ];
        downloadExcel({
            fileName: 'table',
            sheet: 'react-export-table-to-excel',
            tablePayload: {
                header,
                body: recordsData.map((row) => col.map((key) => row[key])),
            },
        });
    }

    const capitalize = (text: any) => {
        return text
            .replace('_', ' ')
            .replace('-', ' ')
            .toLowerCase()
            .split(' ')
            .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    };

    useEffect(() => {
        dispatch(setPageTitle('Column Chooser Table'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // show/hide

    const [hideCols, setHideCols] = useState<any>([
        'ACCOUNTHOLDERNAME',
        'ACCOUNTNO',
        'ACCOUNTTYPE',
        'ADDRESS',
        'ADVANCEGIVEN',
        'ADVGIVEN',
        'AGE',
        'BANKNAME',
        'BLOODGROUP',
        'BLOODGRP',
        'BRANCHNAME',
        'CHEQUENO',
        'CHEQUEREMARK',
        'CITY',
        'COMPANYID',
        'COUNTRY',
        'CREATEDBY',
        'CREATEDON',
        'CURRENTSALARY',
        'CURRSAL',
        'DISTRICT',
        'DOB',
        'DOJ',
        'EMPID',
        'FATHERNAME',
        'FNAME',
        'GENDER',
        'IFSCCODE',
        'LNAME',
        'LOCATION',
        'MOBILE',
        'MOBILENO',
        'PAYMENT',
        'PERSONALID',
        'PERSONALIDTYPE',
        'PID',
        'PIDTYPE',
        'PINCODE',
        'REFCONT',
        'REFCONTACT',
        'REFNAME',
        'REMARK',
        'SHIFT',
        'STATE',
        'STATUS',
        'TELEPHONE',
        'TELEPHONENO',
        'TITLE',
        'UPDATEDBY',
        'UPDATEDON',
    ]);

    const showHideColumns = (col: any, value: any) => {
        if (hideCols.includes(col)) {
            setHideCols((col: any) => hideCols.filter((d: any) => d !== col));
        } else {
            setHideCols([...hideCols, col]);
        }
    };

    const cols = [
        { accessor: 'id', title: 'id' },
        { accessor: 'ACCOUNTHOLDERNAME', title: 'ACCOUNTHOLDERNAME' },
        { accessor: 'ACCOUNTNO', title: 'ACCOUNTNO' },
        { accessor: 'ACCOUNTTYPE', title: 'ACCOUNTTYPE' },
        { accessor: 'ADDRESS', title: 'ADDRESS' },
        { accessor: 'ADVANCEGIVEN', title: 'ADVANCEGIVEN' },
        { accessor: 'ADVGIVEN', title: 'ADVGIVEN' },
        { accessor: 'AGE', title: 'AGE' },
        { accessor: 'BANKNAME', title: 'BANKNAME' },
        { accessor: 'BLOODGROUP', title: 'BLOODGROUP' },
        { accessor: 'BLOODGRP', title: 'BLOODGRP' },
        { accessor: 'BRANCHNAME', title: 'BRANCHNAME' },
        { accessor: 'CHEQUENO', title: 'CHEQUENO' },
        { accessor: 'CHEQUEREMARK', title: 'CHEQUEREMARK' },
        { accessor: 'CITY', title: 'CITY' },
        { accessor: 'COMPANYID', title: 'COMPANYID' },
        { accessor: 'COUNTRY', title: 'COUNTRY' },
        { accessor: 'CREATEDBY', title: 'CREATEDBY' },
        { accessor: 'CREATEDON', title: 'CREATEDON' },
        { accessor: 'CURRENTSALARY', title: 'CURRENTSALARY' },
        { accessor: 'CURRSAL', title: 'CURRSAL' },
        { accessor: 'DISTRICT', title: 'DISTRICT' },
        { accessor: 'DOB', title: 'DOB' },
        { accessor: 'DOJ', title: 'DOJ' },
        { accessor: 'EMPID', title: 'EMPID' },
        { accessor: 'FATHERNAME', title: 'FATHERNAME' },
        { accessor: 'FIRSTNAME', title: 'FIRSTNAME' },
        { accessor: 'FNAME', title: 'FNAME' },
        { accessor: 'GENDER', title: 'GENDER' },
        { accessor: 'IFSCCODE', title: 'IFSCCODE' },
        { accessor: 'LASTNAME', title: 'LASTNAME' },
        { accessor: 'LNAME', title: 'LNAME' },
        { accessor: 'LOCATION', title: 'LOCATION' },
        { accessor: 'MOBILENO', title: 'MOBILENO' },
        { accessor: 'PAYMENT', title: 'PAYMENT' },
        { accessor: 'PERSONALID', title: 'PERSONALID' },
        { accessor: 'PERSONALIDTYPE', title: 'PERSONALIDTYPE' },
        { accessor: 'PID', title: 'PID' },
        { accessor: 'PIDTYPE', title: 'PIDTYPE' },
        { accessor: 'PINCODE', title: 'PINCODE' },
        { accessor: 'REFCONT', title: 'REFCONT' },
        { accessor: 'REFCONTACT', title: 'REFCONTACT' },
        { accessor: 'REFNAME', title: 'REFNAME' },
        { accessor: 'REMARK', title: 'REMARK' },
        { accessor: 'SHIFT', title: 'SHIFT' },
        { accessor: 'STATE', title: 'STATE' },
        { accessor: 'STATUS', title: 'STATUS' },
        { accessor: 'TELEPHONE', title: 'TELEPHONE' },
        { accessor: 'TELEPHONENO', title: 'TELEPHONENO' },
        { accessor: 'TITLE', title: 'TITLE' },
        { accessor: 'UPDATEDBY', title: 'UPDATEDBY' },
        { accessor: 'UPDATEDON', title: 'UPDATEDON' },
        { accessor: 'MOBILE', title: 'MOBILE' },
        { accessor: 'COMPANYID', title: 'COMPANYID' },
    ];

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    // useEffect(() => {
    //     setInitialRecords(() => {
    //         return recordsData.filter((item) => {
    //             return (
    //                 item.id.toString().includes(search.toLowerCase()) ||
    //                 item.FIRSTNAME.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.LASTNAME.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.COMPANYID.toString().includes(search.toLowerCase()) ||
    //                 // item.email.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.AGE.toString().toLowerCase().includes(search.toLowerCase()) ||
    //                 item.DOB.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.MOBILE.toLowerCase().includes(search.toLowerCase())
    //             );
    //         });
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name === 'Employee Name') {
            setSelectedEmployee(value);
        } else if (name === 'City') {
            setSelectedCity(value);
        } else if (name === 'State') {
            setSelectedState(value);
        }
    };
    const handleSearch = () => {
        const filteredData = initialRecords.filter((record) => {
            return (
                (selectedEmployee === '' || record.FIRSTNAME === selectedEmployee) 
                && (selectedCity === '' || record.CITY === selectedCity) 
                && (selectedState === '' || record.STATE === selectedState)
            );
        });
        setRecordsData(filteredData);
    };
    const handleReset = () => {
        setSelectedEmployee("");
        setSelectedCity("");
        setSelectedState("");
        setRecordsData(initialRecords.slice(0,10));
    }

    return (
        <div>
            <div className="panel mt-6">
                <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-1">
                    <div className="flex items-center ">
                        <button type="button" onClick={() => exportTable('csv')} className="btn btn-primary btn-sm m-1 ">
                            <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                            CSV
                        </button>
                        <button type="button" onClick={() => exportTable('txt')} className="btn btn-primary btn-sm m-1">
                            <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                            TXT
                        </button>

                        <button type="button" className="btn btn-primary btn-sm m-1" onClick={handleDownloadExcel}>
                            <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                            EXCEL
                        </button>

                        <button type="button" onClick={() => exportTable('print')} className="btn btn-primary btn-sm m-1">
                            <IconPrinter className="ltr:mr-2 rtl:ml-2" />
                            PRINT
                        </button>
                        <button type="button" className="btn btn-primary btn-sm m-1 w-50 h-5 ltr:mr-2 rtl:ml-2"
                        style={{
                            width: "11%",
                            height: "33px"
                        }}
                        onClick={handleReset}
                    >
                        RESET
                    </button>
                        <button type="button" className="btn btn-primary btn-sm m-1" style={{ padding: '8px 16px' }} 
                        onClick={handleSearch}
                        >
                      
                        SEARCH
                        </button>
                        {/* <button type="button" className="btn btn-primary btn-sm m-1" style={{ padding: '8px 23px' }}>
                            CLOSE
                        </button> */}
                    </div>
                    {/* <div className="">
                        <input
                            type="text"
                            value={minAge}
                            onChange={(e) => {
                                setMinAge(e.target.value);
                            }}
                            className="form-input"
                            placeholder="Minimum age..."
                        />
                    </div> */}

                    {/* <div className=" ">
                        <input
                            type="text"
                            value={maxAge}
                            onChange={(e) => {
                                setMaxAge(e.target.value);
                            }}
                            className="form-input"
                            placeholder="Maximum age..."
                        />
                    </div> */}
                    <div className="flex md:items-center md:flex-row flex-col  gap-1">
                        <div className="flex items-center gap-5 ltr:ml-auto rtl:mr-auto">
                            <div className="flex md:items-center md:flex-row flex-col gap-1">
                                <div className="dropdown">
                                    <Dropdown
                                        placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                        btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                        button={
                                            <>
                                                <span className="ltr:mr-1 rtl:ml-1">Columns</span>
                                                <IconCaretDown className="w-5 h-5" />
                                            </>
                                        }
                                    >
                                        <div className="overflow-auto max-h-[300px]">
                                            <ul className="!min-w-[140px]">
                                                {cols.map((col, i) => {
                                                    if (i % 3 === 0) {
                                                        return (
                                                            <li
                                                                key={i}
                                                                className="flex md:flex-row flex-col "
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                }}
                                                            >
                                                                <div className="flex items-center px-4 py-1 md:w-1/3">
                                                                    <label className="cursor-pointer mb-0 flex items-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={!hideCols.includes(col.accessor)}
                                                                            className="form-checkbox mr-2"
                                                                            defaultValue={col.accessor}
                                                                            onChange={(event) => {
                                                                                setHideCols(event.target.value);
                                                                                showHideColumns(col.accessor, event.target.checked);
                                                                            }}
                                                                        />
                                                                        <span>{col.title}</span>
                                                                    </label>
                                                                </div>
                                                                {cols[i + 1] && (
                                                                    <div className="flex items-center px-4 py-1 md:w-1/3">
                                                                        <label className="cursor-pointer mb-0 flex items-center">
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={!hideCols.includes(cols[i + 1].accessor)}
                                                                                className="form-checkbox mr-2"
                                                                                defaultValue={cols[i + 1].accessor}
                                                                                onChange={(event) => {
                                                                                    setHideCols(event.target.value);
                                                                                    showHideColumns(cols[i + 1].accessor, event.target.checked);
                                                                                }}
                                                                            />
                                                                            <span>{cols[i + 1].title}</span>
                                                                        </label>
                                                                    </div>
                                                                )}
                                                                {cols[i + 2] && (
                                                                    <div className="flex items-center px-4 py-1 md:w-1/3">
                                                                        <label className="cursor-pointer mb-0 flex items-center">
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={!hideCols.includes(cols[i + 2].accessor)}
                                                                                className="form-checkbox mr-2"
                                                                                defaultValue={cols[i + 2].accessor}
                                                                                onChange={(event) => {
                                                                                    setHideCols(event.target.value);
                                                                                    showHideColumns(cols[i + 2].accessor, event.target.checked);
                                                                                }}
                                                                            />
                                                                            <span>{cols[i + 2].title}</span>
                                                                        </label>
                                                                    </div>
                                                                )}
                                                            </li>
                                                        );
                                                    } else {
                                                        return null;
                                                    }
                                                })}
                                            </ul>
                                        </div>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>

                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                {/* <div className="mb-4.5 flex md:items-center md:flex-row flex-col gap-5">
                    <div className="flex items-center gap-5">
                        <div className="md:flex-auto flex-1">
                            <input
                                type="text"
                                value={minAge}
                                onChange={(e) => {
                                    setMinAge(e.target.value);
                                }}
                                className="form-input"
                                placeholder="Minimum age..."
                            />
                        </div>
                        <div className="md:flex-auto flex-1">
                            <input
                                type="text"
                                value={maxAge}
                                onChange={(e) => {
                                    setMaxAge(e.target.value);
                                }}
                                className="form-input"
                                placeholder="Maximum age..."
                            />
                        </div>
                    </div>
                </div> */}
                {/* <div className="flex md:items-center md:flex-row flex-col  gap-1">
                    <div >
                        <div style={{display: "ruby"}} >
                        <label>Agent Name </label>&nbsp;&nbsp;&nbsp;
                            <div className="dropdown">
                           
                                <Dropdown
                                    placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                    btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                    button={
                                        <>
                                        
                                            <span className="ltr:mr-1 rtl:ml-1">--All--</span>
                                            <IconCaretDown className="w-5 h-5" />
                                        </>
                                    }
                                >
                                    <ul className="!min-w-[140px]">
                                        {cols.map((col, i) => {
                                            return (
                                                <li
                                                    key={i}
                                                    className="flex flex-col"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    <div className="flex items-center px-4 py-1">
                                                        <label className="cursor-pointer mb-0">
                                                            <option     
                                                                // className="form-checkbox"
                                                                defaultValue={col.accessor}
                                                               
                                                            />
                                                            <span className="ltr:ml-2 rtl:mr-2">{col.title}</span>
                                                        </label>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                      
                <label>Mobile No.</label>
                <input type="text" className="form-input w-auto" placeholder=""  onChange={(e) => setSearch(e.target.value)} />
                                        <button className="form-input w-auto" style={{width:"25%"}}>OK</button>
                </div> */}

                {/* <div >
                        <div style={{display: "ruby"}} >
                        <label>Agent Name </label>&nbsp;&nbsp;&nbsp;
                            <div className="dropdown">
                           
                                <Dropdown
                                    placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                    btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                    button={
                                        <>
                                        
                                            <span className="ltr:mr-1 rtl:ml-1">--All--</span>
                                            <IconCaretDown className="w-5 h-5" />
                                        </>
                                    }
                                >
                                    <ul className="!min-w-[140px]">
                                        {cols.map((col, i) => {
                                            return (
                                                <li
                                                    key={i}
                                                    className="flex flex-col"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    <div className="flex items-center px-4 py-1">
                                                        <label className="cursor-pointer mb-0">
                                                            <option     
                                                                // className="form-checkbox"
                                                                defaultValue={col.accessor}
                                                               
                                                            />
                                                            <span className="ltr:ml-2 rtl:mr-2">{col.title}</span>
                                                        </label>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Dropdown>
                            </div>
                            <div >
                        <div style={{display: "ruby"}} >
                        <label>Agent Name </label>&nbsp;&nbsp;&nbsp;
                            <div className="dropdown">
                           
                                <Dropdown
                                    placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                    btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                    button={
                                        <>
                                        
                                            <span className="ltr:mr-1 rtl:ml-1">--All--</span>
                                            <IconCaretDown className="w-5 h-5" />
                                        </>
                                    }
                                >
                                    <ul className="!min-w-[140px]">
                                        {cols.map((col, i) => {
                                            return (
                                                <li
                                                    key={i}
                                                    className="flex flex-col"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    <div className="flex items-center px-4 py-1">
                                                        <label className="cursor-pointer mb-0">
                                                            <option     
                                                                // className="form-checkbox"
                                                                defaultValue={col.accessor}
                                                               
                                                            />
                                                            <span className="ltr:ml-2 rtl:mr-2">{col.title}</span>
                                                        </label>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                        </div>
                        
                    </div> */}

                <table>
                    <tr>
                        <td>
                            <label htmlFor="">
                                Employee Name
                                <select name="Employee Name" style={{ border: '1px solid ', width: '144px', borderRadius: '5px', margin: '0px 6px' }}
                                 value={selectedEmployee}
                                 onChange={handleDropdownChange}
                                >
                                   
                                    <option value="">--ALL--</option>
                                    {initialRecords.map((record, index) => (
                                        <option key={index} value={record.FIRSTNAME}>
                                            {record.FIRSTNAME}{' '}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </td>
                        <td>
                            <label htmlFor="">
                                City name
                                <select name="City" style={{ border: '1px solid ', borderRadius: '5px', marginLeft: '2%', width: '144px' }}
                                value={selectedCity}
                                onChange={handleDropdownChange}
                                >
                                    
                                    <option value="">--ALL--</option>
                                    {initialRecords.map((record, index) => (
                                        <option key={index} value={record.CITY}>
                                            {record.CITY}{' '}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </td>
                        <td>
                            <label htmlFor="">
                                State
                                <select name="State" style={{ border: '1px solid ', borderRadius: '5px', marginLeft: '3%', width: '144px' }}
                                  value={selectedState}
                                  onChange={handleDropdownChange}
                                >
                                  
                                    <option value="">--ALL--</option>
                                    {initialRecords.map((record, index) => (
                                        <option key={index} value={record.STATE}>
                                            {record.STATE}{' '}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="">
                                Mobile no
                                <input type="text" style={{ border: '1px solid ', borderRadius: '5px', marginLeft: '46px', width: '144px' }} />
                            </label>
                        </td>
                        <td>
                            <label htmlFor="">
                                GSTNo
                                {/* <select name="GSTNo" style={{border:'1px solid ',borderRadius:'5px', margin:'0px 6px', padding:'0px 7px'}}>
                        <option value="">--ALL--</option>

                    </select> */}
                                <input type="text" style={{ border: '1px solid ', borderRadius: '5px', marginLeft: '7%', width: '144px' }} />
                            </label>
                        </td>
                    </tr>
                </table>

                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'id', sortable: true, hidden: hideCols.includes('id') },
                            { accessor: 'FIRSTNAME', sortable: true, hidden: hideCols.includes('First Name') },
                            { accessor: 'LASTNAME', sortable: true, hidden: hideCols.includes('Last Name') },
                            { accessor: 'COMPANYID', title: 'Company Id', sortable: true, hidden: hideCols.includes('COMPANYID') },
                            { accessor: 'AGE', title: 'Age', sortable: true, hidden: hideCols.includes('AGE') },
                            {
                                accessor: 'DOB',
                                title: 'Dob',
                                sortable: true,
                                hidden: hideCols.includes('DOB'),
                                render: ({ DOB }) => <div>{formatDate(DOB)}</div>,
                            },
                            // { accessor: 'email', sortable: true, hidden: hideCols.includes('email') },
                            { accessor: 'MOBILE', title: 'Mobile', sortable: true, hidden: hideCols.includes('MOBILE') },
                            { accessor: 'ACCOUNTHOLDERNAME', title: 'AccountHolderName', sortable: true, hidden: hideCols.includes('ACCOUNTHOLDERNAME') },
                            { accessor: 'ACCOUNTNO', title: 'AccountNo', sortable: true, hidden: hideCols.includes('ACCOUNTNO') },
                            { accessor: 'ACCOUNTTYPE', title: 'AccountType', sortable: true, hidden: hideCols.includes('ACCOUNTTYPE') },
                            { accessor: 'ADDRESS', title: 'Address', sortable: true, hidden: hideCols.includes('ADDRESS') },
                            { accessor: 'ADVANCEGIVEN', title: 'Advance Given', sortable: true, hidden: hideCols.includes('ADVANCEGIVEN') },
                            { accessor: 'ADVGIVEN', title: 'ADVGiven', sortable: true, hidden: hideCols.includes('ADVGIVEN') },
                            { accessor: 'BANKNAME', title: 'BankName', sortable: true, hidden: hideCols.includes('BANKNAME') },
                            { accessor: 'BLOODGROUP', title: 'BloodGroup', sortable: true, hidden: hideCols.includes('BLOODGROUP') },
                            { accessor: 'BLOODGRP', title: 'BloodGRP', sortable: true, hidden: hideCols.includes('BLOODGRP') },
                            { accessor: 'BRANCHNAME', title: 'BranchName', sortable: true, hidden: hideCols.includes('branchname') },
                            { accessor: 'CHEQUENO', title: 'CHEQUENo', sortable: true, hidden: hideCols.includes('CHEQUENO') },
                            { accessor: 'CHEQUEREMARK', title: 'CHEQUEREMARK', sortable: true, hidden: hideCols.includes('CHEQUEREMARK') },
                            { accessor: 'CITY', title: 'City', sortable: true, hidden: hideCols.includes('CITY') },
                            { accessor: 'COUNTRY', title: 'Country', sortable: true, hidden: hideCols.includes('COUNTRY') },
                            { accessor: 'CREATEDBY', title: 'CreatedBy', sortable: true, hidden: hideCols.includes('REATEDBY') },
                            { accessor: 'CREATEDON', title: 'CreateDON', sortable: true, hidden: hideCols.includes('CREATEDONn') },
                            { accessor: 'CURRENTSALARY', title: 'Current Salary', sortable: true, hidden: hideCols.includes('CURRENTSALARY') },
                            { accessor: 'CURRSAL', title: 'CURRSAL', sortable: true, hidden: hideCols.includes('CURRSAL') },
                            { accessor: 'DISTRICT', title: 'DISTRICT', sortable: true, hidden: hideCols.includes('DISTRICT') },
                            { accessor: 'DOJ', title: 'DOJ', sortable: true, hidden: hideCols.includes('DOJ') },
                            { accessor: 'EMPID', title: 'EMPID', sortable: true, hidden: hideCols.includes('EMPID') },
                            { accessor: 'FATHERNAME', title: 'FATHERNAME', sortable: true, hidden: hideCols.includes('FATHERNAME') },
                            { accessor: 'FNAME', title: 'FNAME', sortable: true, hidden: hideCols.includes('FNAME') },
                            { accessor: 'GENDER', title: 'GENDER', sortable: true, hidden: hideCols.includes('GENDER') },
                            { accessor: 'IFSCCODE', title: 'IFSCCODE', sortable: true, hidden: hideCols.includes('IFSCCODE') },
                            { accessor: 'LNAME', title: 'LNAME', sortable: true, hidden: hideCols.includes('LNAME') },
                            { accessor: 'LOCATION', title: 'LOCATION', sortable: true, hidden: hideCols.includes('LOCATION') },
                            { accessor: 'MOBILENO', title: 'MOBILENO', sortable: true, hidden: hideCols.includes('MOBILENO') },
                            { accessor: 'PAYMENT', title: 'PAYMENT', sortable: true, hidden: hideCols.includes('PAYMENT') },
                            { accessor: 'PERSONALID', title: 'PERSONALID', sortable: true, hidden: hideCols.includes('PERSONALID') },
                            { accessor: 'PERSONALIDTYPE', title: 'PERSONALIDTYPE', sortable: true, hidden: hideCols.includes('PERSONALIDTYPE') },
                            { accessor: 'PID', title: 'PID', sortable: true, hidden: hideCols.includes('PIS') },
                            { accessor: 'PIDTYPE', title: 'PIDTYPE', sortable: true, hidden: hideCols.includes('PIDTYPE') },
                            { accessor: 'PINCODE', title: 'PINCODE', sortable: true, hidden: hideCols.includes('PINCODE') },
                            { accessor: 'REFCONT', title: 'REFCONT', sortable: true, hidden: hideCols.includes('REFCONT') },
                            { accessor: 'REFCONTACT', title: 'REFCONTACT', sortable: true, hidden: hideCols.includes('REFCONTACT') },
                            { accessor: 'REFNAME', title: 'REFNAME', sortable: true, hidden: hideCols.includes('REFNAME') },
                            { accessor: 'REMARK', title: 'REMARK', sortable: true, hidden: hideCols.includes('REMARK') },
                            { accessor: 'SHIFT', title: 'SHIFT', sortable: true, hidden: hideCols.includes('SHIFT') },
                            { accessor: 'STATE', title: 'STATE', sortable: true, hidden: hideCols.includes('STATE') },
                            { accessor: 'STATUS', title: 'STATUS', sortable: true, hidden: hideCols.includes('STATUS') },
                            { accessor: 'TELEPHONE', title: 'TELEPHONE', sortable: true, hidden: hideCols.includes('TELEPHONE') },
                            { accessor: 'TELEPHONENO', title: 'TELEPHONENO', sortable: true, hidden: hideCols.includes('TELEPHONENO') },
                            { accessor: 'TITLE', title: 'TITLE', sortable: true, hidden: hideCols.includes('TITLE') },
                            { accessor: 'UPDATEDBY', title: 'UPDATEDBY', sortable: true, hidden: hideCols.includes('UPDATEDBY') },
                            { accessor: 'UPDATEDON', title: 'UPDATEDON', sortable: true, hidden: hideCols.includes('UPDATEDON') },
                        ]}
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
            <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
                {/* <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                    <IconBell />
                </div> */}
                {/* <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
                <a href="https://www.npmjs.com/package/mantine-datatable" target="_blank" className="block hover:underline">
                    https://www.npmjs.com/package/mantine-datatable
                </a> */}
            </div>

            {/* <div className="panel mt-6">
                <div className="mb-4.5 flex md:items-center md:flex-row flex-col gap-5">
                    <div className="flex items-center gap-5">
                        <div className="md:flex-auto flex-1">
                            <input
                                type="text"
                                value={minAge}
                                onChange={(e) => {
                                    setMinAge(e.target.value);
                                }}
                                className="form-input"
                                placeholder="Minimum age..."
                            />
                        </div>
                        <div className="md:flex-auto flex-1">
                            <input
                                type="text"
                                value={maxAge}
                                onChange={(e) => {
                                    setMaxAge(e.target.value);
                                }}
                                className="form-input"
                                placeholder="Maximum age..."
                            />
                        </div>
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'Id', sortable: true },
                            {
                                accessor: 'firstName',
                                title: 'Name',
                                sortable: true,
                                render: ({ firstName, lastName }) => <div>{firstName + ' ' + lastName}</div>,
                            },
                            { accessor: 'company', title: 'Company', sortable: true },
                            { accessor: 'age', title: 'Age', sortable: true },
                            {
                                accessor: 'dob',
                                title: 'Start Date',
                                sortable: true,
                                render: ({ dob }) => <div>{formatDate(dob)}</div>,
                            },
                            { accessor: 'email', title: 'Email', sortable: true },
                            { accessor: 'phone', title: 'Phone No.', sortable: true },
                        ]}
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div> */}
        </div>
    );
};

export default Employees;
