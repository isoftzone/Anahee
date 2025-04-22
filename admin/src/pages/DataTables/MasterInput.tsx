import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { downloadExcel } from 'react-export-table-to-excel';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import IconBell from '../../components/Icon/IconBell';
import IconFile from '../../components/Icon/IconFile';
import IconPrinter from '../../components/Icon/IconPrinter';
import { IRootState } from '../../store';
import { BASE_URL } from '../../config';
import axios from 'axios';

const col = ['id', 'PRIMENAME', 'SEQUENCE'];

interface Option {
    value: string;
    label: string;
    CODETYPE: string
}

const MasterInput = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Multiple Tables'));
    });

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<UserData[]>([]);
    const [recordsData, setRecordsData] = useState<UserData[]>([]);
    const [tempData, setTempData] = useState<UserData[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
    const [selectedField, setSelectedField] = useState<string>('All');
    const [options, setOptions] = useState<Option[]>([]);
    // const [dataLoaded, setDataLoaded] = useState(false); // New state

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/getCodetype`);
                const data = await response.json();
                setOptions(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [])

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
                    item.SEQUENCE.toString().includes(search.toLowerCase()) ||
                    item.PRIMENAME.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    const header = ['Id', 'PRIMENAME', 'SEQUENCE'];

    interface UserData {
        id: number;
        PRIMENAME: string;
        SEQUENCE: string;
    }

    const handleDownloadExcel = () => {
        const col: Array<keyof UserData> = ['id', 'PRIMENAME', 'SEQUENCE'];
        downloadExcel({
            fileName: 'table',
            sheet: 'react-export-table-to-excel',
            tablePayload: {
                header,
                body: recordsData.map(row => col.map(key => row[key])),
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

    const handleDropdownChange = (event: any) => {
        setSelectedField(event.target.value);
        // setDataLoaded(false); // Reset data loaded state
        setPage(1); // Reset to the first page when a new dropdown value is selected
    };


    const handleSearchClick = async () => {
        // debugger
        if (selectedField !== "All") {
            try {
                const response = await axios.get(`${BASE_URL}/getMasterSet?codetype=${selectedField}&page=${page}&limit=${pageSize}`);
                // const data = await response.json();
                const res = response.data.records.map((item: any, index: number) => ({
                    ...item,
                     id: (page - 1) * pageSize + index + 1,
                }));
                console.log(response, "resss")

                setInitialRecords(res);
                setRecordsData(res);
                setTempData(res);
    setTotalRecords(response.data.totalRecords);
    // setDataLoaded(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else if (selectedField == "All") {

            try {
                const response = await axios.get(`${BASE_URL}/getMasterSet?&page=${page}`);
                // const data = await response.json();
                // console.log('my master data',data)
                // const dataWithId = data.map((item: any, index: number) => ({
                //     ...item,
                //      id: (page - 1) * pageSize + index + 1,
                // }));
                setInitialRecords(response.data.records);
                setRecordsData(response.data.records);
                setTempData(response.data.records);
                setTotalRecords(response.data.totalRecords);
    // setDataLoaded(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        else {
            setInitialRecords([]);
            setRecordsData([]);
            setTempData([]);
        }
    };

    const handleReset = () => {
        setSelectedField('');
        setInitialRecords([]);
        setRecordsData([]);
        setTempData([]);
        setPage(1); // Reset to the first page when reset
    };

    return (
        <div>
            <div className="panel mt-6">
                <div className="mb-4.5 flex md:items-center md:flex-row flex-col gap-5">
                    <div className="flex items-center gap-5">
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

                            <button
                                type="button"
                                className="btn btn-primary btn-sm m-1 w-50 h-5 ltr:mr-2 rtl:ml-2"
                                style={{
                                    width: "12%",
                                    height: "33px"
                                }}
                                onClick={handleSearchClick}
                                // onChange={handleDropdownChange}
                            >
                                SEARCH
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary btn-sm m-1 w-50 h-5 ltr:mr-2 rtl:ml-2"
                                style={{
                                    width: "10%",
                                    height: "33px"
                                }}
                                onClick={handleReset}
                            >
                                RESET
                            </button>
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
                                <label htmlFor="">Master Input
                                    <select
                                        name="Brand Name"
                                        style={{ border: '1px solid #e5e7eb', borderRadius: '5px', margin: '0px 6px', width: '144px' }}
                                        value={selectedField}
                                        onChange={handleDropdownChange}
                                    >
                                        <option value="All">ALL</option>
                                        {options.map(option => (
                                            <option key={option.CODETYPE} value={option.CODETYPE}>{option?.CODETYPE}</option>
                                        ))}
                                    </select>
                                </label>
                            </td>
                        </tr>
                    </table>
                </div>

                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'Id', sortable: true },
                            { accessor: 'PRIMENAME', title: 'Prime Name', sortable: true },
                            { accessor: 'SEQUENCE', title: 'Sequence', sortable: true }
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
        </div>
    );
};

export default MasterInput;
