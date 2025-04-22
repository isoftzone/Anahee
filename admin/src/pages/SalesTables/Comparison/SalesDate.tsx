import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { downloadExcel } from 'react-export-table-to-excel';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import IconBell from '../../../components/Icon/IconBell';
import IconFile from '../../../components/Icon/IconFile';
import IconPrinter from '../../../components/Icon/IconPrinter';
import { IRootState } from '../../../store';
import Dropdown from '../../../components/Dropdown';
import IconCaretDown from '../../../components/Icon/IconCaretDown';
import { BASE_URL } from '../../../config';


const col = ['id', 'COMPANYID', 'TRANSPORTID', 'AFIRMNAME', 'ACTELEPHONENO', 'ACMOBILENO', 'ACADDRESSLINE1',
    'ACADDRESSLINE2', 'ACADDRESSLINE3', 'STATUS', 'AGENTNAME', 'ADOB', 'APERSONALIDTYPE', 'APERSONALID', 'APMOBILENO',
    'APEMAILID', 'APADDRESSLINE1', 'APADDRESSLINE2', 'APADDRESSLINE3', 'APCITY', 'APSTATE', 'APCOUNTRY', 'APDISTRICT',
    'APPINCODE', 'ABANKNAME', 'AACCOUNTTYPE', 'AACCOUNTNO', 'AACCOUNTHOLDERNAME', 'ABRANCHNAME', 'AIFSCCODE', 'ACHEQUENO',
    'ACHEQUEREMARK', 'AMICRCODE', 'ATPNOBANK', 'CREATEDBY', 'CREATEDON', 'UPDATEDBY', 'UPDATEDON', 'ACCITY', 'ACSTATE',
    'ACCOUNTRY', 'ACDISTRICT', 'ACPINCODE', 'REMARK', 'GSTNO'];

const SalesDate = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Multiple Tables'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<UserData[]>([]);
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [tempData, setTempData] = useState(initialRecords);
    const [clientData, setClientData] = useState('')
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' })
    const [selectedTransport, setSelectedTransport] = useState("");
    const [selectedFirm, setSelectedFirm] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const [hideCols, setHideCols] = useState<any>(['id', 'COMPANYID','TRANSPORTID','ACADDRESSLINE1','ACTELEPHONENO',
        'ACADDRESSLINE2', 'ACADDRESSLINE3', 'ADOB', 'APERSONALIDTYPE', 'APERSONALID', 'APMOBILENO',
        'APEMAILID', 'APADDRESSLINE1', 'APADDRESSLINE2', 'APADDRESSLINE3', 'APCOUNTRY', 'APDISTRICT',
        'APPINCODE', 'ABANKNAME', 'AACCOUNTTYPE', 'AACCOUNTNO', 'AACCOUNTHOLDERNAME', 'ABRANCHNAME', 'AIFSCCODE', 'ACHEQUENO','ACMOBILENO',
        'ACHEQUEREMARK', 'AMICRCODE', 'ATPNOBANK', 'CREATEDBY', 'CREATEDON', 'UPDATEDBY', 'UPDATEDON', 'ACCITY', 'ACSTATE',
        'ACCOUNTRY', 'ACDISTRICT', 'ACPINCODE', 'REMARK', 'GSTNO']);

    const showHideColumns = (col: any, value: any) => {
        if (hideCols.includes(col)) {
            setHideCols((col: any) => hideCols.filter((d: any) => d !== col));
        } else {
            setHideCols([...hideCols, col]);
        }
    };

    const cols = [

        { accessor: 'id', title: 'ID' },
        { accessor: 'COMPANYID', title: 'Company ID' },
        { accessor: 'TRANSPORTID', title: 'Transport ID' },
        { accessor: 'AFIRMNAME', title: 'Firm Name' },
        { accessor: 'ACADDRESSLINE1', title: 'Address Line 1' },
        { accessor: 'ACADDRESSLINE2', title: 'Address Line 2' },
        { accessor: 'ACADDRESSLINE3', title: 'Address Line 3' },
        { accessor: 'STATUS', title: 'Status' },
        { accessor: 'AGENTNAME', title: 'Agent Name' },
        { accessor: 'ADOB', title: 'Date of Birth' },
        { accessor: 'APERSONALIDTYPE', title: 'Personal ID Type' },
        { accessor: 'APERSONALID', title: 'Personal ID' },
        { accessor: 'APMOBILENO', title: 'Mobile No' },
        { accessor: 'APEMAILID', title: 'Email ID' },
        { accessor: 'APADDRESSLINE1', title: 'Address Line 1' },
        { accessor: 'APADDRESSLINE2', title: 'Address Line 2' },
        { accessor: 'APADDRESSLINE3', title: 'Address Line 3' },
        { accessor: 'APCITY', title: 'City' },
        { accessor: 'APSTATE', title: 'State' },
        { accessor: 'APCOUNTRY', title: 'Country' },
        { accessor: 'APDISTRICT', title: 'District' },
        { accessor: 'APPINCODE', title: 'Pincode' },
        { accessor: 'ABANKNAME', title: 'Bank Name' },
        { accessor: 'AACCOUNTTYPE', title: 'Account Type' },
        { accessor: 'AACCOUNTNO', title: 'Account No' },
        { accessor: 'AACCOUNTHOLDERNAME', title: 'Account Holder Name' },
        { accessor: 'ABRANCHNAME', title: 'Branch Name' },
        { accessor: 'AIFSCCODE', title: 'IFSC Code' },
        { accessor: 'ACHEQUENO', title: 'Cheque No' },
        { accessor: 'ACHEQUEREMARK', title: 'Cheque Remark' },
        { accessor: 'AMICRCODE', title: 'MICR Code' },
        { accessor: 'ATPNOBANK', title: 'TP No Bank' },
        { accessor: 'CREATEDBY', title: 'Created By' },

        { accessor: 'CREATEDON', title: 'Created On' },
        { accessor: 'UPDATEDBY', title: 'Updated By' },
        { accessor: 'UPDATEDON', title: 'Updated On' },
        { accessor: 'ACCITY', title: 'City' },
        { accessor: 'ACSTATE', title: 'State' },
        { accessor: 'ACCOUNTRY', title: 'Country' },
        { accessor: 'ACDISTRICT', title: 'District' },
        { accessor: 'ACPINCODE', title: 'Pincode' },
        { accessor: 'REMARK', title: 'Remark' },
        { accessor: 'GSTNO', title: 'GST No' }
    ];
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
                    item.TRANSPORTID.toString().includes(search.toLowerCase()) ||
                    item.AFIRMNAME.toLowerCase().includes(search.toLowerCase()) ||
                    item.APCITY.toLowerCase().includes(search.toLowerCase()) ||
                    item.APSTATE.toLowerCase().includes(search.toLowerCase()) ||
                    item.STATUS.toLowerCase().includes(search.toLowerCase()) ||
                    item.AGENTNAME.toLowerCase().includes(search.toLowerCase()) 
                    // item.APMOBILENO.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
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
    const header = ['Id', 'COMPANYID', 'TRANSPORTID', 'AFIRMNAME', 'ACTELEPHONENO', 'ACMOBILENO', 'ACADDRESSLINE1',
        'ACADDRESSLINE2', 'ACADDRESSLINE3', 'STATUS', 'AGENTNAME', 'ADOB', 'APERSONALIDTYPE', 'APERSONALID', 'APMOBILENO',
        'APEMAILID', 'APADDRESSLINE1', 'APADDRESSLINE2', 'APADDRESSLINE3', 'APCITY', 'APSTATE', 'APCOUNTRY', 'APDISTRICT',
        'APPINCODE', 'ABANKNAME', 'AACCOUNTTYPE', 'AACCOUNTNO', 'AACCOUNTHOLDERNAME', 'ABRANCHNAME', 'AIFSCCODE', 'ACHEQUENO',
        'ACHEQUEREMARK', 'AMICRCODE', 'ATPNOBANK', 'CREATEDBY', 'CREATEDON', 'UPDATEDBY', 'UPDATEDON', 'ACCITY', 'ACSTATE',
        'ACCOUNTRY', 'ACDISTRICT', 'ACPINCODE', 'REMARK', 'GSTNO'];

    interface UserData {
        id: number;
        COMPANYID: string;
        TRANSPORTID: string;
        AFIRMNAME: string;
        ACTELEPHONENO: string;
        ACMOBILENO: string;
        ACADDRESSLINE1: string;
        ACADDRESSLINE2: string;
        ACADDRESSLINE3: string;
        STATUS: string;
        AGENTNAME: string;
        ADOB: string;
        APERSONALIDTYPE: string;
        APERSONALID: string;
        APMOBILENO: string;
        APEMAILID: string;
        APADDRESSLINE1: string;
        APADDRESSLINE2: string;
        APADDRESSLINE3: string;
        APCITY: string;
        APSTATE: string;
        APCOUNTRY: string;
        APDISTRICT: string;
        APPINCODE: string;
        ABANKNAME: string;
        AACCOUNTTYPE: string;
        AACCOUNTNO: string;
        AACCOUNTHOLDERNAME: string;
        ABRANCHNAME: string;
        AIFSCCODE: string;
        ACHEQUENO: string;
        ACHEQUEREMARK: string;
        AMICRCODE: string;
        ATPNOBANK: string;
        CREATEDBY: string;
        CREATEDON: string;
        UPDATEDBY: string;
        UPDATEDON: string;
        ACCITY: string;
        ACSTATE: string;
        ACCOUNTRY: string;
        ACDISTRICT: string;
        ACPINCODE: string;
        REMARK: string;
        GSTNO: string;

    }
    useEffect(() => {
        // Fetch data from API

        fetch(`${BASE_URL}/getTransport`)
            .then(response => response.json())
            .then(data => {
                let detail = data;
                setClientData(detail);
                setInitialRecords(detail);
                setRecordsData(detail);
                setTempData(detail);
                console.log(detail, 'dataaaaaa');
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    function handleDownloadExcel() {
        const col: Array<keyof UserData> = ['id', 'COMPANYID', 'TRANSPORTID', 'AFIRMNAME', 'ACTELEPHONENO', 'ACMOBILENO', 'ACADDRESSLINE1',
            'ACADDRESSLINE2', 'ACADDRESSLINE3', 'STATUS', 'AGENTNAME', 'ADOB', 'APERSONALIDTYPE', 'APERSONALID', 'APMOBILENO',
            'APEMAILID', 'APADDRESSLINE1', 'APADDRESSLINE2', 'APADDRESSLINE3', 'APCITY', 'APSTATE', 'APCOUNTRY', 'APDISTRICT',
            'APPINCODE', 'ABANKNAME', 'AACCOUNTTYPE', 'AACCOUNTNO', 'AACCOUNTHOLDERNAME', 'ABRANCHNAME', 'AIFSCCODE', 'ACHEQUENO',
            'ACHEQUEREMARK', 'AMICRCODE', 'ATPNOBANK', 'CREATEDBY', 'CREATEDON', 'UPDATEDBY', 'UPDATEDON', 'ACCITY', 'ACSTATE',
            'ACCOUNTRY', 'ACDISTRICT', 'ACPINCODE', 'REMARK', 'GSTNO'];
        downloadExcel({
            fileName: 'table',
            sheet: 'react-export-table-to-excel',
            tablePayload: {
                header,
                body: recordsData.map(row => col.map(key => row[key]))
            },
        });
    };


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

    const capitalize = (text: any) => {
        return text
            .replace('_', ' ')
            .replace('-', ' ')
            .toLowerCase()
            .split(' ')
            .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    };


    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name === 'Transport Name') {
            setSelectedTransport(value);
        } else if (name === 'Transport Firm Name') {
            setSelectedFirm(value);
        } else if (name === 'City') {
            setSelectedCity(value);
        } else if (name === 'State') {
            setSelectedState(value);
        } else if (name === 'Status') {
            setSelectedStatus(value);
        }
    }
    const handleSearch = () => {
        const filteredData = initialRecords.filter(record => {
            return (selectedTransport === "" || record.AGENTNAME === selectedTransport) &&
                (selectedFirm === "" || record.AFIRMNAME === selectedFirm) &&
                (selectedCity === "" || record.ACCITY === selectedCity) &&
                (selectedState === "" || record.ACSTATE === selectedState) &&
                (selectedStatus === "" || record.STATUS === selectedStatus);
        });
        setRecordsData(filteredData);
    }

    const handleReset = () => {
        setSelectedTransport("");
        setSelectedFirm("");
        setSelectedCity("");
        setSelectedState("");
        setSelectedStatus("");
        setRecordsData(initialRecords.slice(0, 10));   
    }
    // function exportTable(arg0: string): void {
    //     throw new Error('Function not implemented.');
    // }

    // function handleDownloadExcel(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    //     throw new Error('Function not implemented.');
    // }

    return (
        <div>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
                <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                    <IconBell />
                </div>
                <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
                <a href="https://www.npmjs.com/package/mantine-datatable" target="_blank" className="block hover:underline">
                    https://www.npmjs.com/package/mantine-datatable
                </a>
            </div> */}
            <div className="panel mt-6">
                <div className="mb-4.5 flex md:items-center md:flex-row flex-col gap-5">
                    <div className="flex items-center gap-5">
                        {/* <div className="md:flex-auto flex-1">
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
                        </div> */}
                        <div className="flex items-center flex-wrap">
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
                            width: "10%",
                            height: "33px"
                        }}
                        onClick={handleReset}
                    >
                        RESET
                    </button>

                            <button type="button" className="btn btn-primary btn-sm m-1" style={{ padding: '8px 28px' }}

                                onClick={handleSearch}                            >

                                SEARCH
                            </button>

                            {/* <button type="button" className="btn btn-primary btn-sm m-1" style={{ padding: '8px 28px' }}>

                                CLOSE                            </button> */}
                        </div>
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
                                                    <li key={i} className="flex md:flex-row flex-col " onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}>
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
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div>
                    <table>
                        <tr>
                            <td>
                                <label htmlFor="">From Date 
                                    <input type="date" style={{ border: '1px solid #e5e7eb', borderRadius: '5px', margin: '0px 6px', width: '144px' }} />

                                </label>
                            </td>
                            <td>
                                <label htmlFor="">To Date 
                                    <input type="date" style={{ border: '1px solid #e5e7eb', borderRadius: '5px', margin: '0px 6px', width: '144px' }} />

                                </label>
                            </td>
                            {/* <td>
            <input className="btn btn-primary" type="button" value="Ok"/>
            </td> */}
                        </tr>
                    </table>
                </div>

                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[

                            { accessor: 'id', title: 'Id', sortable: true, hidden: hideCols.includes('id') },
                            { accessor: 'COMPANYID', title: 'Company ID', sortable: true, hidden: hideCols.includes('COMPANYID') },
                            { accessor: 'TRANSPORTID', title: 'Transport ID', sortable: true, hidden: hideCols.includes('TRANSPORTID') },
                            { accessor: 'AFIRMNAME', title: 'Firm Name', sortable: true, hidden: hideCols.includes('AFIRMNAME') },
                            { accessor: 'ACTELEPHONENO', title: 'Telephone No', sortable: true, hidden: hideCols.includes('ACTELEPHONENO') },
                            { accessor: 'ACMOBILENO', title: 'Mobile No', sortable: true, hidden: hideCols.includes('ACMOBILENO') },
                            { accessor: 'ACADDRESSLINE1', title: 'Address Line 1', sortable: true, hidden: hideCols.includes('ACADDRESSLINE1') },
                            { accessor: 'ACADDRESSLINE2', title: 'Address Line 2', sortable: true, hidden: hideCols.includes('ACADDRESSLINE2') },
                            { accessor: 'ACADDRESSLINE3', title: 'Address Line 3', sortable: true, hidden: hideCols.includes('ACADDRESSLINE3') },
                            { accessor: 'AGENTNAME', title: 'Agent Name', sortable: true, hidden: hideCols.includes('AGENTNAME') },
                            { accessor: 'ADOB', title: 'Date of Birth', sortable: true, hidden: hideCols.includes('ADOB') },
                            { accessor: 'APERSONALIDTYPE', title: 'Personal ID Type', sortable: true, hidden: hideCols.includes('APERSONALIDTYPE') },
                            { accessor: 'APERSONALID', title: 'Personal ID', sortable: true, hidden: hideCols.includes('APERSONALID') },
                            { accessor: 'APMOBILENO', title: 'Mobile No', sortable: true, hidden: hideCols.includes('APMOBILENO') },
                            { accessor: 'APEMAILID', title: 'Email ID', sortable: true, hidden: hideCols.includes('APEMAILID') },
                            { accessor: 'APADDRESSLINE1', title: 'Address Line 1', sortable: true, hidden: hideCols.includes('APADDRESSLINE1') },
                            { accessor: 'APADDRESSLINE2', title: 'Address Line 2', sortable: true, hidden: hideCols.includes('APADDRESSLINE2') },
                            { accessor: 'APADDRESSLINE3', title: 'Address Line 3', sortable: true, hidden: hideCols.includes('APADDRESSLINE3') },
                            { accessor: 'APCITY', title: 'City', sortable: true, hidden: hideCols.includes('APCITY') },
                            { accessor: 'APSTATE', title: 'State', sortable: true, hidden: hideCols.includes('APSTATE') },
                            { accessor: 'APCOUNTRY', title: 'Country', sortable: true, hidden: hideCols.includes('APCOUNTRY') },
                            { accessor: 'APDISTRICT', title: 'District', sortable: true, hidden: hideCols.includes('APDISTRICT') },
                            { accessor: 'APPINCODE', title: 'Pincode', sortable: true, hidden: hideCols.includes('APPINCODE') },
                            { accessor: 'ABANKNAME', title: 'Bank Name', sortable: true, hidden: hideCols.includes('ABANKNAME') },
                            { accessor: 'AACCOUNTTYPE', title: 'Account Type', sortable: true, hidden: hideCols.includes('AACCOUNTTYPE') },
                            { accessor: 'AACCOUNTNO', title: 'Account No', sortable: true, hidden: hideCols.includes('AACCOUNTNO') },
                            { accessor: 'AACCOUNTHOLDERNAME', title: 'Account Holder Name', sortable: true, hidden: hideCols.includes('AACCOUNTHOLDERNAME') },
                            { accessor: 'ABRANCHNAME', title: 'Branch Name', sortable: true, hidden: hideCols.includes('ABRANCHNAME') },
                            { accessor: 'AIFSCCODE', title: 'IFSC Code', sortable: true, hidden: hideCols.includes('AIFSCCODE') },
                            { accessor: 'ACHEQUENO', title: 'Cheque No', sortable: true, hidden: hideCols.includes('ACHEQUENO') },
                            { accessor: 'ACHEQUEREMARK', title: 'Cheque Remark', sortable: true, hidden: hideCols.includes('ACHEQUEREMARK') },
                            { accessor: 'AMICRCODE', title: 'MICR Code', sortable: true, hidden: hideCols.includes('AMICRCODE') },
                            { accessor: 'ATPNOBANK', title: 'TP No Bank', sortable: true, hidden: hideCols.includes('ATPNOBANK') },
                            { accessor: 'CREATEDBY', title: 'Created By', sortable: true, hidden: hideCols.includes('CREATEDBY') },
                            { accessor: 'CREATEDON', title: 'Created On', sortable: true, hidden: hideCols.includes('CREATEDON') },
                            { accessor: 'UPDATEDBY', title: 'Updated By', sortable: true, hidden: hideCols.includes('UPDATEDBY') },
                            { accessor: 'UPDATEDON', title: 'Updated On', sortable: true, hidden: hideCols.includes('UPDATEDON') },
                            { accessor: 'ACCITY', title: 'City', sortable: true, hidden: hideCols.includes('ACCITY') },
                            { accessor: 'ACSTATE', title: 'State', sortable: true, hidden: hideCols.includes('ACSTATE') },
                            { accessor: 'ACCOUNTRY', title: 'Country', sortable: true, hidden: hideCols.includes('ACCOUNTRY') },
                            { accessor: 'ACDISTRICT', title: 'District', sortable: true, hidden: hideCols.includes('ACDISTRICT') },
                            { accessor: 'ACPINCODE', title: 'Pincode', sortable: true, hidden: hideCols.includes('ACPINCODE') },
                            { accessor: 'REMARK', title: 'Remark', sortable: true, hidden: hideCols.includes('REMARK') },
                            { accessor: 'GSTNO', title: 'GST No', sortable: true, hidden: hideCols.includes('GSTNO') },
                            { accessor: 'STATUS', title: 'Status', sortable: true, hidden: hideCols.includes('STATUS') },

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
        </div>
    );
};

export default SalesDate;


