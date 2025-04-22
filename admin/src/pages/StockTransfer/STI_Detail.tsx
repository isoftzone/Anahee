import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { downloadExcel } from 'react-export-table-to-excel';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import IconFile from '../../components/Icon/IconFile';
import IconPrinter from '../../components/Icon/IconPrinter';
import Dropdown from '../../components/Dropdown';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import { IRootState } from '../../store';
import { MultiDragPlugin } from 'sortablejs/plugins';
import { BASE_URL } from '../../config';


const col = [
    'id','BARCODE','BOXSIZE','BRAND','BUYER','CATEGORY','CESS','CHECKEDBY','COLOR','COMPANY','COMPANYID','CREATEDBY','CREATEDON','CUSTOME','CUSTOME2','CUSTOMERID','DEALERCODE','DEALERID','DEALERNAME','DISCOUNT','DS_OFF','DS_ON','ESAMOUNT','ESID','ESTAG','EXPIRYDAYS','FINYEAR','FLAG','GENDER','HSNCODE','ITEMDESC','ITEMID','ITEMNAME','ITEMQTY','ITEMTYPE','I_GROUP','I_SIZE','LOCATION','LOOKUP','MARGIN','MARKDOWN','MARKUP','MATERIAL','MAXQTY','MINQTY','MORP','MRP','OMRP','OTAX','PACKEDBY','PACKING','PHOTO','PRODUCT','PURPRICE','QTY','RATE','REMARK','REORDERQTY','SALEPRICE','SCOLOR','SEASON','SECTION','SERIES','SHELFNO','SP1','SP2','SP3','SP4','SRNO','STATUS','STIDATE','STIID','STYLE','SUBCATEGORY','SUBGROUP','SUP_COLOR','TAX','UNIT','UPDATEDBY','UPDATEDON','WSP'
];
const STI_Detail = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Range Search Table'));
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<UserData[]>([]);
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [tempData, setTempData] = useState(initialRecords);
    const [clientData, setClientData] = useState('');
    const [search, setSearch] = useState('');
    const [selectedDealer, setSelectedDealer] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('');
    const [selectedFinYear, setSelectedFinYear] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });

    const [hideCols, setHideCols] = useState<any>(['BARCODE','BOXSIZE','BUYER','CESS','CHECKEDBY','COMPANY','COMPANYID','CREATEDBY','CREATEDON','CUSTOME','CUSTOME2','CUSTOMERID','DEALERCODE','DEALERID','DISCOUNT','DS_OFF','DS_ON','ESAMOUNT','ESID','ESTAG','EXPIRYDAYS','FLAG','GENDER','HSNCODE','ITEMDESC','ITEMID','ITEMNAME','ITEMQTY','ITEMTYPE','I_GROUP','LOOKUP','MARGIN','MARKDOWN','MARKUP','MATERIAL','MAXQTY','MINQTY','MORP','MRP','OMRP','OTAX','PACKEDBY','PACKING','PHOTO','PURPRICE','QTY','RATE','REMARK','REORDERQTY','SALEPRICE','SEASON','SECTION','SERIES','SHELFNO','SP1','SP2','SP3','SP4','SRNO','STATUS','STIDATE','STIID','SUBCATEGORY','SUBGROUP','SUP_COLOR','TAX','UNIT','UPDATEDBY','UPDATEDON','WSP'
    ]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

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
                    item.DEALERNAME.toLowerCase().includes(search.toLowerCase()) ||
                    item.LOCATION.toLowerCase().includes(search.toLowerCase()) ||
                    item.STYLE.toLowerCase().includes(search.toLowerCase()) ||
                    item.BRAND.toLowerCase().includes(search.toLowerCase()) ||
                    item.CATEGORY.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.I_SIZE.toLowerCase().includes(search.toLowerCase()) ||
                    item.PRODUCT.toLowerCase().includes(search.toLowerCase()) ||
                    item.FINYEAR.toLowerCase().includes(search.toLowerCase()) ||
                    item.COLOR.toLowerCase().includes(search.toLowerCase())
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
    const header = ['id','BARCODE','BOXSIZE','BRAND','BUYER','CATEGORY','CESS','CHECKEDBY','COLOR','COMPANY','COMPANYID','CREATEDBY','CREATEDON','CUSTOME','CUSTOME2','CUSTOMERID','DEALERCODE','DEALERID','DEALERNAME','DISCOUNT','DS_OFF','DS_ON','ESAMOUNT','ESID','ESTAG','EXPIRYDAYS','FINYEAR','FLAG','GENDER','HSNCODE','ITEMDESC','ITEMID','ITEMNAME','ITEMQTY','ITEMTYPE','I_GROUP','I_SIZE','LOCATION','LOOKUP','MARGIN','MARKDOWN','MARKUP','MATERIAL','MAXQTY','MINQTY','MORP','MRP','OMRP','OTAX','PACKEDBY','PACKING','PHOTO','PRODUCT','PURPRICE','QTY','RATE','REMARK','REORDERQTY','SALEPRICE','SCOLOR','SEASON','SECTION','SERIES','SHELFNO','SP1','SP2','SP3','SP4','SRNO','STATUS','STIDATE','STIID','STYLE','SUBCATEGORY','SUBGROUP','SUP_COLOR','TAX','UNIT','UPDATEDBY','UPDATEDON','WSP'
    ];

    const formatDate = (date: any) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };
    const cols = [
        { accessor: 'ID', title: 'ID' },
        { accessor: 'BARCODE', title: 'Barcode' },
        { accessor: 'BOXSIZE', title: 'Box Size' },
        { accessor: 'BRAND', title: 'Brand' },
        { accessor: 'BUYER', title: 'Buyer' },
        { accessor: 'CATEGORY', title: 'Category' },
        { accessor: 'CESS', title: 'Cess' },
        { accessor: 'CHECKEDBY', title: 'Checked By' },
        { accessor: 'COLOR', title: 'Color' },
        { accessor: 'COMPANY', title: 'Company' },
        { accessor: 'COMPANYID', title: 'Company ID' },
        { accessor: 'CREATEDBY', title: 'Created By' },
        { accessor: 'CREATEDON', title: 'Created On' },
        { accessor: 'CUSTOME', title: 'Custom E' },
        { accessor: 'CUSTOME2', title: 'Custom E2' },
        { accessor: 'CUSTOMERID', title: 'Customer ID' },
        { accessor: 'DEALERCODE', title: 'Dealer Code' },
        { accessor: 'DEALERID', title: 'Dealer ID' },
        { accessor: 'DEALERNAME', title: 'Dealer Name' },
        { accessor: 'DISCOUNT', title: 'Discount' },
        { accessor: 'DS_OFF', title: 'DS Off' },
        { accessor: 'DS_ON', title: 'DS On' },
        { accessor: 'ESAMOUNT', title: 'Es Amount' },
        { accessor: 'ESID', title: 'Es ID' },
        { accessor: 'ESTAG', title: 'Estag' },
        { accessor: 'EXPIRYDAYS', title: 'Expiry Days' },
        { accessor: 'FINYEAR', title: 'Financial Year' },
        { accessor: 'FLAG', title: 'Flag' },
        { accessor: 'GENDER', title: 'Gender' },
        { accessor: 'HSNCODE', title: 'HSN Code' },
        { accessor: 'ITEMDESC', title: 'Item Description' },
        { accessor: 'ITEMID', title: 'Item ID' },
        { accessor: 'ITEMNAME', title: 'Item Name' },
        { accessor: 'ITEMQTY', title: 'Item Quantity' },
        { accessor: 'ITEMTYPE', title: 'Item Type' },
        { accessor: 'I_GROUP', title: 'Item Group' },
        { accessor: 'I_SIZE', title: 'Item Size' },
        { accessor: 'LOCATION', title: 'Location' },
        { accessor: 'LOOKUP', title: 'Lookup' },
        { accessor: 'MARGIN', title: 'Margin' },
        { accessor: 'MARKDOWN', title: 'Markdown' },
        { accessor: 'MARKUP', title: 'Markup' },
        { accessor: 'MATERIAL', title: 'Material' },
        { accessor: 'MAXQTY', title: 'Max Quantity' },
        { accessor: 'MINQTY', title: 'Min Quantity' },
        { accessor: 'MORP', title: 'Morp' },
        { accessor: 'MRP', title: 'MRP' },
        { accessor: 'OMRP', title: 'OMRP' },
        { accessor: 'OTAX', title: 'OTAX' },
        { accessor: 'PACKEDBY', title: 'Packed By' },
        { accessor: 'PACKING', title: 'Packing' },
        { accessor: 'PHOTO', title: 'Photo' },
        { accessor: 'PRODUCT', title: 'Product' },
        { accessor: 'PURPRICE', title: 'Purchase Price' },
        { accessor: 'QTY', title: 'Quantity' },
        { accessor: 'RATE', title: 'Rate' },
        { accessor: 'REMARK', title: 'Remark' },
        { accessor: 'REORDERQTY', title: 'Reorder Quantity' },
        { accessor: 'SALEPRICE', title: 'Sale Price' },
        { accessor: 'SCOLOR', title: 'S Color' },
        { accessor: 'SEASON', title: 'Season' },
        { accessor: 'SECTION', title: 'Section' },
        { accessor: 'SERIES', title: 'Series' },
        { accessor: 'SHELFNO', title: 'Shelf Number' },
        { accessor: 'SP1', title: 'SP1' },
        { accessor: 'SP2', title: 'SP2' },
        { accessor: 'SP3', title: 'SP3' },
        { accessor: 'SP4', title: 'SP4' },
        { accessor: 'SRNO', title: 'Sr. No' },
        { accessor: 'STATUS', title: 'Status' },
        { accessor: 'STIDATE', title: 'STI Date' },
        { accessor: 'STIID', title: 'STI ID' },
        { accessor: 'STYLE', title: 'Style' },
        { accessor: 'SUBCATEGORY', title: 'Subcategory' },
        { accessor: 'SUBGROUP', title: 'Subgroup' },
        { accessor: 'SUP_COLOR', title: 'Sup Color' },
        { accessor: 'TAX', title: 'Tax' },
        { accessor: 'UNIT', title: 'Unit' },
        { accessor: 'UPDATEDBY', title: 'Updated By' },
        { accessor: 'UPDATEDON', title: 'Updated On' },
        { accessor: 'WSP', title: 'WSP' }
    ];
    


    interface UserData {
        id: number;
        BARCODE: string;
        BOXSIZE: string;
        BRAND: string;
        BUYER: string;
        CATEGORY: string;
        CESS: string;
        CHECKEDBY: string;
        COLOR: string;
        COMPANY: string;
        COMPANYID: number;
        CREATEDBY: string;
        CREATEDON: string;
        CUSTOME: string;
        CUSTOME2: string;
        CUSTOMERID: number;
        DEALERCODE: string;
        DEALERID: number;
        DEALERNAME: string;
        DISCOUNT: string;
        DS_OFF: string;
        DS_ON: string;
        ESAMOUNT: string;
        ESID: number;
        ESTAG: string;
        EXPIRYDAYS: number;
        FINYEAR: string;
        FLAG: string;
        GENDER: string;
        HSNCODE: string;
        ITEMDESC: string;
        ITEMID: number;
        ITEMNAME: string;
        ITEMQTY: number;
        ITEMTYPE: string;
        I_GROUP: string;
        I_SIZE: string;
        LOCATION: string;
        LOOKUP: string;
        MARGIN: string;
        MARKDOWN: string;
        MARKUP: string;
        MATERIAL: string;
        MAXQTY: number;
        MINQTY: number;
        MORP: string;
        MRP: number;
        OMRP: string;
        OTAX: string;
        PACKEDBY: string;
        PACKING: string;
        PHOTO: string;
        PRODUCT: string;
        PURPRICE: string;
        QTY: number;
        RATE: string;
        REMARK: string;
        REORDERQTY: number;
        SALEPRICE: number;
        SCOLOR: string;
        SEASON: string;
        SECTION: string;
        SERIES: string;
        SHELFNO: string;
        SP1: string;
        SP2: string;
        SP3: string;
        SP4: string;
        SRNO: number;
        STATUS: string;
        STIDATE: string;
        STIID: number;
        STYLE: string;
        SUBCATEGORY: string;
        SUBGROUP: string;
        SUP_COLOR: string;
        TAX: string;
        UNIT: string;
        UPDATEDBY: string;
        UPDATEDON: string;
        WSP: string;
    }
    

    useEffect(() => {
        // Fetch data from API

        fetch(`${BASE_URL}/getStiDetail`)
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

    function handleDownloadExcel() {
        const col: Array<keyof UserData> = ['id','BARCODE','BOXSIZE','BRAND','BUYER','CATEGORY','CESS','CHECKEDBY','COLOR','COMPANY','COMPANYID','CREATEDBY','CREATEDON','CUSTOME','CUSTOME2','CUSTOMERID','DEALERCODE','DEALERID','DEALERNAME','DISCOUNT','DS_OFF','DS_ON','ESAMOUNT','ESID','ESTAG','EXPIRYDAYS','FINYEAR','FLAG','GENDER','HSNCODE','ITEMDESC','ITEMID','ITEMNAME','ITEMQTY','ITEMTYPE','I_GROUP','I_SIZE','LOCATION','LOOKUP','MARGIN','MARKDOWN','MARKUP','MATERIAL','MAXQTY','MINQTY','MORP','MRP','OMRP','OTAX','PACKEDBY','PACKING','PHOTO','PRODUCT','PURPRICE','QTY','RATE','REMARK','REORDERQTY','SALEPRICE','SCOLOR','SEASON','SECTION','SERIES','SHELFNO','SP1','SP2','SP3','SP4','SRNO','STATUS','STIDATE','STIID','STYLE','SUBCATEGORY','SUBGROUP','SUP_COLOR','TAX','UNIT','UPDATEDBY','UPDATEDON','WSP'];
        downloadExcel({
            fileName: 'table',
            sheet: 'react-export-table-to-excel',
            tablePayload: {
                header,
                body: recordsData.map((row) => col.map((key) => row[key])),
            },
        });
    }

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
    const showHideColumns = (col: any, value: any) => {
        if (hideCols.includes(col)) {
            setHideCols((col: any) => hideCols.filter((d: any) => d !== col));
        } else {
            setHideCols([...hideCols, col]);
        }
    };

    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name === 'Dealer Name') {
            setSelectedDealer(value);
        } else if (name === 'Location Name') {
            setSelectedLocation(value);
        } else if (name === 'Category') {
            setSelectedCategory(value);
        } else if (name === 'Product') {
            setSelectedProduct(value);
        }else if (name === 'Brand') {
            setSelectedBrand(value);
        }else if (name === 'Size') {
            setSelectedSize(value);
        }else if (name === 'Color') {
            setSelectedColor(value);
        }else if (name === 'Size') {
            setSelectedSize(value);
        }else if (name === 'FinYear') {
            setSelectedFinYear(value);
        }
    };
    const handleSearch = () => {
        const filteredData = initialRecords.filter((record) => {
            return (
                (selectedDealer === '' || record.DEALERNAME === selectedDealer) &&
                (selectedLocation === '' || record.LOCATION === selectedLocation) &&
                (selectedCategory === '' || record.CATEGORY === selectedCategory) &&
                (selectedProduct === '' || record.PRODUCT === selectedProduct)
            );
        });
        setRecordsData(filteredData);
    };

    const handleReset = () => {
        setSelectedDealer("");
        setSelectedLocation("");
        setSelectedCategory("");
        setSelectedProduct("");
        setSelectedBrand("");
        setSelectedSize("");
        setSelectedColor("");
        setSelectedStyle("");
        setSelectedFinYear("");
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
                            height: "33px",
                            padding: '8px 19px'
                        }}
                        onClick={handleReset}
                    >
                        RESET
                    </button>
                            <button 
                            type="button" 
                            className="btn btn-primary btn-sm m-1" 
                            style={{ 
                                padding: '8px 14px' 
                            }}
                            onClick={handleSearch}
                            >
                                SEARCH
                            </button>
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

                        <div className="ltr:ml-auto rtl:mr-auto">
                            <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                </div>

                <table>
                    <thead>
                        <td>
                            <label htmlFor="">Dealer Name
                                <select name="Dealer Name"
                                    style={{
                                        width: "144px",
                                        marginLeft: "3px",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: '5px',
                                        maxHeight: '200px'
                                    }}
                                    value={selectedDealer}
                                    onChange={handleDropdownChange}
                                >
                                    <option value="">--ALL--</option>

                                    {initialRecords.map((record, index) => (
                                        <option key={index} value={record.DEALERNAME}>{record.DEALERNAME}</option>
                                    ))}
                                </select>
                            </label>
                        </td>
                        <td>
                            <label htmlFor="">Location Name
                                <select name="Location Name"
                                    style={{
                                        width: "144px",
                                        marginLeft: "3px",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: '5px',
                                        maxHeight: '200px'
                                    }}
                                    value={selectedLocation}
                                    onChange={handleDropdownChange}
                                >
                                    <option value="">--ALL--</option>

                                    {initialRecords.map((record, index) => (
                                        <option key={index} value={record.LOCATION}>{record.LOCATION}</option>
                                    ))}
                                </select>
                            </label>
                        </td>
                        <td>
                        <label htmlFor="">
                                 From Date
                                <input type="Date" style={{ border: '1px solid #e5e7eb', borderRadius: '5px', marginLeft: '25px', width: '144px' }} />
                            </label>
                        </td>
                        <td>
                        <label htmlFor="">
                                To Date
                                <input type="Date" style={{ border: '1px solid #e5e7eb', borderRadius: '5px', marginLeft: '25px', width: '144px' }} />
                            </label>
                        </td>
                        <td>
                        <label htmlFor="">
                               Bill No. From
                                <input type="text" style={{ border: '1px solid #e5e7eb', borderRadius: '5px', marginLeft: '25px', width: '144px' }} />
                            </label>
                        </td>

                    </thead>
                    <thead>
                        <td>
                        <label htmlFor="">
                                To
                                <input type="text" style={{ border: '1px solid #e5e7eb', borderRadius: '5px', marginLeft: '25px', width: '144px' }} />
                            </label>
                        </td>
                        <td>
                        <label htmlFor="">
                               Design No.
                                <input type="text" style={{ border: '1px solid #e5e7eb', borderRadius: '5px', marginLeft: '25px', width: '144px' }} />
                            </label>
                        </td>
                        <td>
                        <label htmlFor="">
                               Barcode
                                <input type="text" style={{ border: '1px solid #e5e7eb', borderRadius: '5px', marginLeft: '25px', width: '144px' }} />
                            </label>
                        </td>
                        <td>
                            <label htmlFor="">Category
                                <select name="Category"
                                    style={{
                                        width: "144px",
                                        marginLeft: "3px",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: '5px',
                                        maxHeight: '200px'
                                    }}
                                    value={selectedCategory}
                                    onChange={handleDropdownChange}
                                >
                                    <option value="">--ALL--</option>

                                    {initialRecords.map((record, index) => (
                                        <option key={index} value={record.CATEGORY}>{record.CATEGORY}</option>
                                    ))}
                                </select>
                            </label>
                        </td>

                        <td>
                            <label htmlFor="">Product
                                <select name="Product"
                                    style={{
                                        width: "144px",
                                        marginLeft: "3px",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: '5px',
                                        maxHeight: '200px'
                                    }}
                                    value={selectedProduct}
                                    onChange={handleDropdownChange}
                                >
                                    <option value="">--ALL--</option>

                                    {initialRecords.map((record, index) => (
                                        <option key={index} value={record.PRODUCT}>{record.PRODUCT}</option>
                                    ))}
                                </select>
                            </label>
                        </td>
                    </thead>
                    <thead>
                        <td>
                            <label htmlFor="">Brand
                                <select name="Brand"
                                    style={{
                                        width: "144px",
                                        marginLeft: "3px",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: '5px',
                                        maxHeight: '200px'
                                    }}
                                    value={selectedBrand}
                                    onChange={handleDropdownChange}
                                >
                                    <option value="">--ALL--</option>

                                    {initialRecords.map((record, index) => (
                                        <option key={index} value={record.BRAND}>{record.BRAND}</option>
                                    ))}
                                </select>
                            </label>
                        </td>
                        <td>
                            <label htmlFor="">Size
                                <select name="Size"
                                    style={{
                                        width: "144px",
                                        marginLeft: "3px",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: '5px',
                                        maxHeight: '200px'
                                    }}
                                    value={selectedSize}
                                    onChange={handleDropdownChange}
                                >
                                    <option value="">--ALL--</option>

                                    {initialRecords.map((record, index) => (
                                        <option key={index} value={record.I_SIZE}>{record.I_SIZE}</option>
                                    ))}
                                </select>
                            </label>
                        </td>
                        <td>
                            <label htmlFor="">Color
                                <select name="Color"
                                    style={{
                                        width: "144px",
                                        marginLeft: "3px",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: '5px',
                                        maxHeight: '200px'
                                    }}
                                    value={selectedColor}
                                    onChange={handleDropdownChange}
                                >
                                    <option value="">--ALL--</option>

                                    {initialRecords.map((record, index) => (
                                        <option key={index} value={record.COLOR}>{record.COLOR}</option>
                                    ))}
                                </select>
                            </label>
                        </td>
                        <td>
                            <label htmlFor="">Style
                                <select name="Style"
                                    style={{
                                        width: "144px",
                                        marginLeft: "3px",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: '5px',
                                        maxHeight: '200px'
                                    }}
                                    value={selectedStyle}
                                    onChange={handleDropdownChange}
                                >
                                    <option value="">--ALL--</option>

                                    {initialRecords.map((record, index) => (
                                        <option key={index} value={record.STYLE}>{record.STYLE}</option>
                                    ))}
                                </select>
                            </label>
                        </td>
                        <td>
                            <label htmlFor="">Financial Year
                                <select name="Financial Year"
                                    style={{
                                        width: "144px",
                                        marginLeft: "3px",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: '5px',
                                        maxHeight: '200px'
                                    }}
                                    value={selectedFinYear}
                                    onChange={handleDropdownChange}
                                >
                                    <option value="">--ALL--</option>

                                    {initialRecords.map((record, index) => (
                                        <option key={index} value={record.FINYEAR}>{record.FINYEAR}</option>
                                    ))}
                                </select>
                            </label>
                        </td>
                        
                       
                    </thead>
                </table>
            </div>

            <div className="datatables">
                <DataTable
                    highlightOnHover
                    className="whitespace-nowrap table-hover"
                    records={recordsData}
                    columns={[
                        { accessor: 'ID', title: 'ID', sortable: true, hidden: hideCols.includes('id') },
                        { accessor: 'BARCODE', title: 'Barcode', sortable: true, hidden: hideCols.includes('BARCODE') },
                        { accessor: 'BOXSIZE', title: 'Box Size', sortable: true, hidden: hideCols.includes('BOXSIZE') },
                        { accessor: 'BRAND', title: 'Brand', sortable: true, hidden: hideCols.includes('BRAND') },
                        { accessor: 'BUYER', title: 'Buyer', sortable: true, hidden: hideCols.includes('BUYER') },
                        { accessor: 'CATEGORY', title: 'Category', sortable: true, hidden: hideCols.includes('CATEGORY') },
                        { accessor: 'CESS', title: 'Cess', sortable: true, hidden: hideCols.includes('CESS') },
                        { accessor: 'CHECKEDBY', title: 'Checked By', sortable: true, hidden: hideCols.includes('CHECKEDBY') },
                        { accessor: 'COLOR', title: 'Color', sortable: true, hidden: hideCols.includes('COLOR') },
                        { accessor: 'COMPANY', title: 'Company', sortable: true, hidden: hideCols.includes('COMPANY') },
                        { accessor: 'COMPANYID', title: 'Company ID', sortable: true, hidden: hideCols.includes('COMPANYID') },
                        { accessor: 'CREATEDBY', title: 'Created By', sortable: true, hidden: hideCols.includes('CREATEDBY') },
                        { accessor: 'CREATEDON', title: 'Created On', sortable: true, hidden: hideCols.includes('CREATEDON') },
                        { accessor: 'CUSTOME', title: 'Custom Field 1', sortable: true, hidden: hideCols.includes('CUSTOME') },
                        { accessor: 'CUSTOME2', title: 'Custom Field 2', sortable: true, hidden: hideCols.includes('CUSTOME2') },
                        { accessor: 'CUSTOMERID', title: 'Customer ID', sortable: true, hidden: hideCols.includes('CUSTOMERID') },
                        { accessor: 'DEALERCODE', title: 'Dealer Code', sortable: true, hidden: hideCols.includes('DEALERCODE') },
                        { accessor: 'DEALERID', title: 'Dealer ID', sortable: true, hidden: hideCols.includes('DEALERID') },
                        { accessor: 'DEALERNAME', title: 'Dealer Name', sortable: true, hidden: hideCols.includes('DEALERNAME') },
                        { accessor: 'DISCOUNT', title: 'Discount', sortable: true, hidden: hideCols.includes('DISCOUNT') },
                        { accessor: 'DS_OFF', title: 'Discount Off', sortable: true, hidden: hideCols.includes('DS_OFF') },
                        { accessor: 'DS_ON', title: 'Discount On', sortable: true, hidden: hideCols.includes('DS_ON') },
                        { accessor: 'ESAMOUNT', title: 'Es Amount', sortable: true, hidden: hideCols.includes('ESAMOUNT') },
                        { accessor: 'ESID', title: 'Es ID', sortable: true, hidden: hideCols.includes('ESID') },
                        { accessor: 'ESTAG', title: 'Es Tag', sortable: true, hidden: hideCols.includes('ESTAG') },
                        { accessor: 'EXPIRYDAYS', title: 'Expiry Days', sortable: true, hidden: hideCols.includes('EXPIRYDAYS') },
                        { accessor: 'FINYEAR', title: 'Financial Year', sortable: true, hidden: hideCols.includes('FINYEAR') },
                        { accessor: 'FLAG', title: 'Flag', sortable: true, hidden: hideCols.includes('FLAG') },
                        { accessor: 'GENDER', title: 'Gender', sortable: true, hidden: hideCols.includes('GENDER') },
                        { accessor: 'HSNCODE', title: 'HSN Code', sortable: true, hidden: hideCols.includes('HSNCODE') },
                        { accessor: 'ITEMDESC', title: 'Item Description', sortable: true, hidden: hideCols.includes('ITEMDESC') },
                        { accessor: 'ITEMID', title: 'Item ID', sortable: true, hidden: hideCols.includes('ITEMID') },
                        { accessor: 'ITEMNAME', title: 'Item Name', sortable: true, hidden: hideCols.includes('ITEMNAME') },
                        { accessor: 'ITEMQTY', title: 'Item Quantity', sortable: true, hidden: hideCols.includes('ITEMQTY') },
                        { accessor: 'ITEMTYPE', title: 'Item Type', sortable: true, hidden: hideCols.includes('ITEMTYPE') },
                        { accessor: 'I_GROUP', title: 'Item Group', sortable: true, hidden: hideCols.includes('I_GROUP') },
                        { accessor: 'I_SIZE', title: 'Item Size', sortable: true, hidden: hideCols.includes('I_SIZE') },
                        { accessor: 'LOCATION', title: 'Location', sortable: true, hidden: hideCols.includes('LOCATION') },
                        { accessor: 'LOOKUP', title: 'Lookup', sortable: true, hidden: hideCols.includes('LOOKUP') },
                        { accessor: 'MARGIN', title: 'Margin', sortable: true, hidden: hideCols.includes('MARGIN') },
                        { accessor: 'MARKDOWN', title: 'Markdown', sortable: true, hidden: hideCols.includes('MARKDOWN') },
                        { accessor: 'MARKUP', title: 'Markup', sortable: true, hidden: hideCols.includes('MARKUP') },
                        { accessor: 'MATERIAL', title: 'Material', sortable: true, hidden: hideCols.includes('MATERIAL') },
                        { accessor: 'MAXQTY', title: 'Max Quantity', sortable: true, hidden: hideCols.includes('MAXQTY') },
                        { accessor: 'MINQTY', title: 'Min Quantity', sortable: true, hidden: hideCols.includes('MINQTY') },
                        { accessor: 'MORP', title: 'MORP', sortable: true, hidden: hideCols.includes('MORP') },
                        { accessor: 'MRP', title: 'MRP', sortable: true, hidden: hideCols.includes('MRP') },
                        { accessor: 'OMRP', title: 'OMRP', sortable: true, hidden: hideCols.includes('OMRP') },
                        { accessor: 'OTAX', title: 'Other Tax', sortable: true, hidden: hideCols.includes('OTAX') },
                        { accessor: 'PACKEDBY', title: 'Packed By', sortable: true, hidden: hideCols.includes('PACKEDBY') },
                        { accessor: 'PACKING', title: 'Packing', sortable: true, hidden: hideCols.includes('PACKING') },
                        { accessor: 'PHOTO', title: 'Photo', sortable: true, hidden: hideCols.includes('PHOTO') },
                        { accessor: 'PRODUCT', title: 'Product', sortable: true, hidden: hideCols.includes('PRODUCT') },
                        { accessor: 'PURPRICE', title: 'Purchase Price', sortable: true, hidden: hideCols.includes('PURPRICE') },
                        { accessor: 'QTY', title: 'Quantity', sortable: true, hidden: hideCols.includes('QTY') },
                        { accessor: 'RATE', title: 'Rate', sortable: true, hidden: hideCols.includes('RATE') },
                        { accessor: 'REMARK', title: 'Remarks', sortable: true, hidden: hideCols.includes('REMARK') },
                        { accessor: 'REORDERQTY', title: 'Reorder Quantity', sortable: true, hidden: hideCols.includes('REORDERQTY') },
                        { accessor: 'SALEPRICE', title: 'Sale Price', sortable: true, hidden: hideCols.includes('SALEPRICE') },
                        { accessor: 'SCOLOR', title: 'Secondary Color', sortable: true, hidden: hideCols.includes('SCOLOR') },
                        { accessor: 'SEASON', title: 'Season', sortable: true, hidden: hideCols.includes('SEASON') },
                        { accessor: 'SECTION', title: 'Section', sortable: true, hidden: hideCols.includes('SECTION') },
                        { accessor: 'SERIES', title: 'Series', sortable: true, hidden: hideCols.includes('SERIES') },
                        { accessor: 'SHELFNO', title: 'Shelf Number', sortable: true, hidden: hideCols.includes('SHELFNO') },
                        { accessor: 'SP1', title: 'Selling Price 1', sortable: true, hidden: hideCols.includes('SP1') },
                        { accessor: 'SP2', title: 'Selling Price 2', sortable: true, hidden: hideCols.includes('SP2') },
                        { accessor: 'SP3', title: 'Selling Price 3', sortable: true, hidden: hideCols.includes('SP3') },
                        { accessor: 'SP4', title: 'Selling Price 4', sortable: true, hidden: hideCols.includes('SP4') },
                        { accessor: 'SRNO', title: 'Serial Number', sortable: true, hidden: hideCols.includes('SRNO') },
                        { accessor: 'STATUS', title: 'Status', sortable: true, hidden: hideCols.includes('STATUS') },
                        { accessor: 'STIDATE', title: 'STI Date', sortable: true, hidden: hideCols.includes('STIDATE') },
                        { accessor: 'STIID', title: 'STI ID', sortable: true, hidden: hideCols.includes('STIID') },
                        { accessor: 'STYLE', title: 'Style', sortable: true, hidden: hideCols.includes('STYLE') },
                        { accessor: 'SUBCATEGORY', title: 'Subcategory', sortable: true, hidden: hideCols.includes('SUBCATEGORY') },
                        { accessor: 'SUBGROUP', title: 'Subgroup', sortable: true, hidden: hideCols.includes('SUBGROUP') },
                        { accessor: 'SUP_COLOR', title: 'Supplier Color', sortable: true, hidden: hideCols.includes('SUP_COLOR') },
                        { accessor: 'TAX', title: 'Tax', sortable: true, hidden: hideCols.includes('TAX') },
                        { accessor: 'UNIT', title: 'Unit', sortable: true, hidden: hideCols.includes('UNIT') },
                        { accessor: 'UPDATEDBY', title: 'Updated By', sortable: true, hidden: hideCols.includes('UPDATEDBY') },
                        { accessor: 'UPDATEDON', title: 'Updated On', sortable: true, hidden: hideCols.includes('UPDATEDON') },
                        { accessor: 'WSP', title: 'Wholesale Price', sortable: true, hidden: hideCols.includes('WSP') }
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
    );
};

export default STI_Detail;
