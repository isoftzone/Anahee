import React, { useState, useEffect, Fragment } from 'react';
import { Tab } from '@headlessui/react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import ReactQuill from 'react-quill';
import { useParams, useNavigate } from 'react-router-dom';

interface ItemState {
    [key: string]: string | File | null | File[];
}

interface Variation {
    color: string;
    images: ImageListType;
    sizes: { name: string; stock: string }[];
}

interface Record {
    PRIMENAME: string;
}
type SlabItem = {
    id: number;
    QuantityFrom: string;
    QuantityTo: string;
    SALEPRICE: string;
    sp1: string;
    sp2: string;
    sp3: string;
    sp4: string;
};

const ItemMaster: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState<ItemState>({
        PRODUCT: '',
        BRAND: '',
        SCOLOR: '',
        COLOR: '',
        I_SIZE: '',
        STYLE: '',
        SUBGROUP: '',
        Group: '',
        GENDER: '',
        BUYER: '',
        SUBCATEGORY: '',
        CATEGORY: '',
        MATERIAL: '',
        COMPANY: '',
        SEASON: '',
        PACKING: '',
        UNIT: '',
        DEALER: '',
        SECTION: '',
        STATUS: '',
        BARCODE: '',
        ITEMID: '',
        ITEMNAME: '',
        BOXSIZE: '',
        HSNCODE: '',
        RATE: '',
        TAX: '',
        PURPRICE: '',
        MARKDOWN: '',
        MRP: '',
        MARKUP: '',
        SALEPRICE: '',
        EXPIRYDAYS: '',
        LOOKUP: '',
        REMARK: '',
        addExp: '',
        DESCRIPTION: '',
        Product_Details: '',
    });

    const [variations, setVariations] = useState<Variation[]>([{ color: '', images: [], sizes: [{ name: '', stock: '' }] }]);
    const [dropdownValues, setDropdownValues] = useState<{ [key: string]: string[] }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [slabs, setSlabs] = useState<SlabItem[]>([
        // {
        //     id: Date.now(),
        //     QuantityFrom: '',
        //     QuantityTo: '',
        //     SALEPRICE: '',
        //     sp1: '',
        //     sp2: '',
        //     sp3: '',
        //     sp4: '',
        // },
    ]);

    // Fetch item data if in edit mode
    useEffect(() => {
        const fetchItemData = async () => {
            if (id) {
                try {
                    setLoading(true);
                    const response = await axios.get(`${BASE_URL}/getItemsById/${id}`, {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true,
                    });

                    if (response.data.success && response.data.data) {
                        const itemData = response.data.data;
                        setItem({
                            BARCODE: itemData.BARCODE || '',
                            ITEMNAME: itemData.ITEMNAME || '',
                            ITEMID: itemData.ITEMID || '',
                            BOXSIZE: itemData.BOXSIZE || '',
                            HSNCODE: itemData.HSNCODE || '',
                            RATE: itemData.RATE || 0,
                            TAX: itemData.TAX || 0,
                            PURPRICE: itemData.PURPRICE || 0,
                            MARKUP: itemData.MARKUP || '',
                            MRP: itemData.MRP || 0,
                            MARKDOWN: itemData.MARKDOWN || '',
                            SALEPRICE: itemData.SALEPRICE || 0,
                            EXPIRYDAYS: itemData.EXPIRYDAYS || 0,
                            LOOKUP: itemData.LOOKUP || '',
                            REMARK: itemData.REMARK || '',
                            PRODUCT: itemData.PRODUCT || '',
                            BRAND: itemData.BRAND || '',
                            SCOLOR: itemData.SCOLOR || '',
                            COLOR: itemData.COLOR || '',
                            I_SIZE: itemData.I_SIZE || '',
                            STYLE: itemData.STYLE || '',
                            SUBGROUP: itemData.SUBGROUP || '',
                            GENDER: itemData.GENDER || '',
                            BUYER: itemData.BUYER || '',
                            SUBCATEGORY: itemData.SUBCATEGORY || '',
                            CATEGORY: itemData.CATEGORY || '',
                            MATERIAL: itemData.MATERIAL || '',
                            COMPANY: itemData.COMPANY || '',
                            SEASON: itemData.SEASON || '',
                            PACKING: itemData.PACKING || '',
                            UNIT: itemData.UNIT || '',
                            SECTION: itemData.SECTION || '',
                            STATUS: itemData.STATUS || 'Active',
                            DESCRIPTION: itemData.DESCRIPTION || '',
                            Product_Details: itemData.PRODUCT_DETAILS || '',
                            PHOTO: itemData.PHOTO || '',
                        });

                        if (itemData.variations && itemData.variations.length > 0) {
                            setVariations(
                                itemData.variations.map((v) => ({
                                    color: v.color || '',
                                    images: (v.images || []).map((imgUrl: string) => ({
                                        dataURL: imgUrl.startsWith('http') ? imgUrl : `${BASE_URL}/public/images/banner/${imgUrl}`,
                                    })),
                                    sizes:
                                        v.sizes?.map((s) => ({
                                            name: s.name || '',
                                            stock: s.stock || 0,
                                        })) || [],
                                }))
                            );
                        }
                    }
                } catch (error) {
                    console.error('Error fetching item data:', error);
                    alert('Failed to load item data');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchItemData();
    }, [id]);

    // Fetch dropdown values
    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const response = await axios.post(
                    `${BASE_URL}/postcmbAW`,
                    {
                        TblName: 'MASTER',
                        FldName: 'PRIMENAME',
                        FldCode: 'PRIMEKEYID',
                        OrdBy: 'SEQUENCE',
                        WhFldName: ['Product', 'Status', 'Colour', 'Brand', 'Style', 'Size', 'Buyer', 'Season', 'Company', 'Section', 'Category'],
                    },
                    {
                        headers: { 'Content-Type': 'application/json' },
                    }
                );

                setDropdownValues({
                    product: response.data.Product.map((item: Record) => item.PRIMENAME),
                    status: response.data.Status.map((item: Record) => item.PRIMENAME),
                    brand: response.data.Brand.map((item: Record) => item.PRIMENAME),
                    color: response.data.Colour.map((item: Record) => item.PRIMENAME),
                    style: response.data.Style.map((item: Record) => item.PRIMENAME),
                    size: response.data.Size.map((item: Record) => item.PRIMENAME),
                    buyer: response.data.Buyer.map((item: Record) => item.PRIMENAME),
                    season: response.data.Season.map((item: Record) => item.PRIMENAME),
                    company: response.data.Company.map((item: Record) => item.PRIMENAME),
                    section: response.data.Section.map((item: Record) => item.PRIMENAME),
                    category: response.data.Category.map((item: Record) => item.PRIMENAME),
                });
            } catch (error) {
                console.error('Error fetching dropdown data', error);
            }
        };

        fetchDropdownData();
    }, []);

    // Variation handlers
    const addVariation = () => {
        setVariations([...variations, { color: '', images: [], sizes: [{ name: '', stock: '' }] }]);
    };

    const removeVariation = (index: number) => {
        const updated = [...variations];
        updated.splice(index, 1);
        setVariations(updated);
    };

    const handleVariationChange = (index: number, field: string, value: string) => {
        const updated = [...variations];
        updated[index][field] = value;
        setVariations(updated);
    };

    const handleVariationImageChange = (index: number, imageList: ImageListType) => {
        const updated = [...variations];
        updated[index].images = imageList;
        setVariations(updated);
    };

    const addSize = (varIndex: number) => {
        const updated = [...variations];
        updated[varIndex].sizes.push({ name: '', stock: '' });
        setVariations(updated);
    };

    const removeSize = (varIndex: number, sizeIndex: number) => {
        const updated = [...variations];
        updated[varIndex].sizes.splice(sizeIndex, 1);
        setVariations(updated);
    };

    const handleSizeChange = (varIndex: number, sizeIndex: number, field: string, value: string) => {
        const updated = [...variations];
        updated[varIndex].sizes[sizeIndex][field] = value;
        setVariations(updated);
    };

    const resetForm = () => {
        setItem({
            PRODUCT: '',
            BRAND: '',
            SCOLOR: '',
            COLOR: '',
            I_SIZE: '',
            STYLE: '',
            SUBGROUP: '',
            Group: '',
            GENDER: '',
            BUYER: '',
            SUBCATEGORY: '',
            CATEGORY: '',
            MATERIAL: '',
            COMPANY: '',
            SEASON: '',
            PACKING: '',
            UNIT: '',
            DEALER: '',
            SECTION: '',
            STATUS: '',
            BARCODE: '',
            ITEMID: '',
            ITEMNAME: '',
            BOXSIZE: '',
            HSNCODE: '',
            RATE: '',
            TAX: '',
            PURPRICE: '',
            MARKDOWN: '',
            MRP: '',
            MARKUP: '',
            SALEPRICE: '',
            EXPIRYDAYS: '',
            LOOKUP: '',
            REMARK: '',
            addExp: '',
            DESCRIPTION: '',
            Product_Details: '',
        });
        setVariations([{ color: '', images: [], sizes: [{ name: '', stock: '' }] }]);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleProductDetailsChange = (value: string) => {
        setItem((prev) => ({ ...prev, Product_Details: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const formData = new FormData();

            Object.keys(item).forEach((key) => {
                if (item[key] !== null) {
                    formData.append(key, item[key] as string);
                }
            });

            formData.append('variations', JSON.stringify(variations));

            variations.forEach((variation, varIndex) => {
                variation.images.forEach((image, imgIndex) => {
                    if (image.file) {
                        formData.append(`variation_${varIndex}_image_${imgIndex}`, image.file);
                    }
                });
            });

            const endpoint = id ? `${BASE_URL}/updateItemById/${id}` : `${BASE_URL}/addItem`;
            const method = id ? 'put' : 'post';

            const response = await axios[method](endpoint, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            alert(response.data.message);
            if (!id) {
                resetForm();
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`Error ${id ? 'updating' : 'saving'} item`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!id) return;

        if (confirm('Are you sure you want to delete this item?')) {
            try {
                setLoading(true);
                const response = await axios.delete(`${BASE_URL}/delete/${id}`);
                if (response.data.success) {
                    alert('Item deleted successfully!');
                }
            } catch (error) {
                console.error('Error deleting item:', error);
                alert('Failed to delete item');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleAddSlab = () => {
        setSlabs((prev) => [
            ...prev,
            {
                id: Date.now() + Math.random(),
                QuantityFrom: '',
                QuantityTo: '',
                SALEPRICE: '',
                sp1: '',
                sp2: '',
                sp3: '',
                sp4: '',
            },
        ]);
    };

    // Handle removing a slab
    const handleRemoveSlab = (id: number) => {
        setSlabs((prev) => prev.filter((slab) => slab.id !== id));
    };

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const { name, value } = e.target;
        setSlabs((prev) => prev.map((slab) => (slab.id === id ? { ...slab, [name]: value } : slab)));
    };

    return (
        <div className="w-full p-3 mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{id ? 'Edit Item' : 'Add New Item'}</h2>

            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <p className="text-lg font-medium">Loading...</p>
                    </div>
                </div>
            )}

            <Tab.Group>
                <Tab.List className="flex border-b border-gray-200 mb-6">
                    {['General Detail', 'Additional Details'].map((tab) => (
                        <Tab as={Fragment} key={tab}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-800'
                                    } px-4 py-2 text-sm font-medium focus:outline-none`}
                                >
                                    {tab}
                                </button>
                            )}
                        </Tab>
                    ))}
                </Tab.List>

                <Tab.Panels>
                    <Tab.Panel>
                        <div className="space-y-6 p-3 bg-white">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-3 border border-gray-200 rounded-lg">
                                {['ITEMNAME', 'BARCODE', 'PRODUCT', 'BRAND', 'CATEGORY', 'SUBCATEGORY', 'PRODUCT DETAIL'].map((field) => (
                                    <div key={field}>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{field}</label>
                                        {['CATEGORY', 'SUBCATEGORY', 'BRAND', 'PRODUCT'].includes(field) ? (
                                            <select
                                                name={field}
                                                value={typeof item[field] === 'string' ? item[field] : ''}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            >
                                                <option value="">Select</option>
                                                {dropdownValues[field.toLowerCase()]?.map((option, idx) => (
                                                    <option key={idx} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type="text"
                                                name={field}
                                                value={item[field] as string}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                placeholder={`Enter ${field}`}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Product Variations Section */}

                            <div>
                                <div className="flex my-3 justify-between items-center flex-col md:flex-row">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 ">Product Variations</h3>
                                    <button type="button" className="btn btn-primary" onClick={addVariation}>
                                        + Add Variation
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {variations.map((variation, varIndex) => (
                                        <div key={varIndex} className="border border-gray-200 rounded-lg p-3 shadow-sm">
                                            <div className="my-3 ">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Color Images (Max 6)</label>
                                                <ImageUploading
                                                    multiple
                                                    value={variation.images}
                                                    onChange={(imageList) => handleVariationImageChange(varIndex, imageList)}
                                                    maxNumber={6}
                                                    dataURLKey="dataURL"
                                                >
                                                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                                        <div className="space-y-4">
                                                            <div
                                                                {...dragProps}
                                                                onClick={onImageUpload}
                                                                className={`border-2 border-dashed rounded-lg p-3 text-center cursor-pointer ${
                                                                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                                                                }`}
                                                            >
                                                                <div className="flex flex-col items-center justify-center space-y-2">
                                                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={2}
                                                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                        />
                                                                    </svg>
                                                                    <p className="text-sm text-gray-600">Drag & drop images here or click to browse</p>
                                                                    <p className="text-xs text-gray-500">Supports JPG, PNG up to 5MB</p>
                                                                </div>
                                                            </div>

                                                            {imageList.length > 0 && (
                                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                                                    {imageList.map((image, index) => (
                                                                        <div key={index} className="relative group">
                                                                            <img src={image.dataURL} alt={`Variation ${varIndex + 1}`} className="w-full h-32 object-cover rounded-md shadow-sm" />
                                                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center rounded-md transition-all duration-200">
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => onImageRemove(index)}
                                                                                    className="opacity-0 group-hover:opacity-100 text-white bg-red-500 rounded-full p-1 hover:bg-red-600 focus:outline-none transition-all duration-200"
                                                                                >
                                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                                    </svg>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </ImageUploading>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                                                    <select
                                                        value={variation.color}
                                                        onChange={(e) => handleVariationChange(varIndex, 'color', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                    >
                                                        <option value="" disabled>
                                                            Select a color
                                                        </option>
                                                        {dropdownValues['color']?.map((option, idx) => (
                                                            <option key={idx} value={option}>
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="pt-4 border-t border-gray-200">
                                                    <div className="flex justify-between items-center mb-4 flex-col md:flex-row md:items-center">
                                                        <h4 className="text-sm font-medium text-gray-700 mb-2 md:mb-0">Sizes</h4>
                                                        <div className="flex flex-col items-center md:flex-row md:space-x-4">
                                                            <div className="flex flex-col items-center md:flex-row md:space-x-4 mb-2 md:mb-0">
                                                                <label className="flex items-center space-x-2 text-sm">
                                                                    <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                                                    <span>Same Size</span>
                                                                </label>
                                                                <label className="flex items-center space-x-2 text-sm">
                                                                    <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                                                    <span>Same Slab</span>
                                                                </label>
                                                            </div>
                                                            <button type="button" onClick={() => addSize(varIndex)} className="mt-2 btn btn-primary md:mt-0">
                                                                + Add Size
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {variation.sizes.map((size, sizeIndex) => (
                                                        <div key={sizeIndex} className="mb-6 p-3 border border-gray-200 rounded-lg shadow-sm">
                                                            <div className="flex justify-end pt-2">
                                                                <button type="button" onClick={() => removeSize(varIndex, sizeIndex)} className="btn btn-danger">
                                                                    Remove Size
                                                                </button>
                                                            </div>
                                                            <div className="mb-4">
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                                                                <select
                                                                    value={size.name}
                                                                    onChange={(e) => handleSizeChange(varIndex, sizeIndex, 'name', e.target.value)}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                                >
                                                                    <option value="" disabled>
                                                                        Select a size
                                                                    </option>
                                                                    {dropdownValues['size']?.map((option, idx) => (
                                                                        <option key={idx} value={option}>
                                                                            {option}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>

                                                            <div className="space-y-4">
                                                                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                                                    {[
                                                                        { label: 'Rate', field: 'RATE' },
                                                                        { label: 'Tax', field: 'TAX' },
                                                                        { label: 'Purchase Price', field: 'PURPRICE' },
                                                                        { label: 'MarkUp(%)', field: 'MARKUP' },
                                                                        { label: 'MRP', field: 'MRP' },
                                                                        { label: 'Mark Down(%)', field: 'MARKDOWN' },
                                                                        { label: 'Sale Price', field: 'SALEPRICE' },
                                                                        { label: 'SP1', field: 'SP1' },
                                                                        { label: 'SP2', field: 'SP2' },
                                                                        { label: 'SP3', field: 'SP3' },
                                                                        { label: 'SP4', field: 'SP4' },
                                                                        { label: 'Length (cm)', field: 'lengthcm' },
                                                                        { label: 'Width (cm)', field: 'widthcm' },
                                                                        { label: 'Height (cm)', field: 'heightcm' },
                                                                        { label: 'Volumetric Weight', field: 'volumetricweight' },
                                                                        { label: 'Net Weight', field: 'netweight' },
                                                                        { label: 'Gross Weight', field: 'grossweight' },
                                                                        { label: 'Shipping Weight', field: 'shippingweight' },
                                                                    ].map(({ label, field }) => (
                                                                        <div key={field}>
                                                                            <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
                                                                            <input
                                                                                type="text"
                                                                                name={field}
                                                                                value={(item[field] as string) || ''}
                                                                                onChange={handleChange}
                                                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>

                                                                {/* Slab Rate Section */}
                                                                <div className="mt-6">
                                                                    <div className="flex justify-end items-center mb-4">
                                                                        <div className="flex justify-end">
                                                                            <button type="button" onClick={handleAddSlab} className="btn btn-primary">
                                                                                + Add Slab Rate
                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                    {/* Only render this section when there are slabs to show */}
                                                                    {slabs.length > 0 && (
                                                                        <div className="space-y-4">
                                                                            {slabs.map((slab) => (
                                                                                <div key={slab.id} className="p-3 border border-gray-200 rounded-lg">
                                                                                    <div className="flex justify-between items-start md:items-center mb-3">
                                                                                        <h5 className="text-sm font-bold text-gray-700">Slab Rate</h5>
                                                                                        <button type="button" onClick={() => handleRemoveSlab(slab.id)} className="btn btn-danger text-xs">
                                                                                            Remove Slab
                                                                                        </button>
                                                                                    </div>
                                                                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4">
                                                                                        {[
                                                                                            { label: 'Qty From', field: 'QuantityFrom' },
                                                                                            { label: 'Qty To', field: 'QuantityTo' },
                                                                                            { label: 'Sale Price', field: 'SALEPRICE' },
                                                                                            { label: 'SP1', field: 'sp1' },
                                                                                            { label: 'SP2', field: 'sp2' },
                                                                                            { label: 'SP3', field: 'sp3' },
                                                                                            { label: 'SP4', field: 'sp4' },
                                                                                        ].map(({ label, field }) => (
                                                                                            <div key={field}>
                                                                                                <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    name={field}
                                                                                                    value={slab[field as keyof SlabItem]}
                                                                                                    onChange={(e) => handleChanges(e, slab.id)}
                                                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                                                                                                />
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex justify-center pt-4 border-t border-gray-200">
                                                    <button type="button" onClick={() => removeVariation(varIndex)} className="px-4 py-2 btn btn-danger">
                                                        Remove Variation
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center mt-6">
                                <input
                                    type="checkbox"
                                    name="addExp"
                                    checked={item.addExp === 'true'}
                                    onChange={(e) =>
                                        handleChange({
                                            target: {
                                                name: 'addExp',
                                                value: e.target.checked ? 'true' : 'false',
                                            },
                                        } as React.ChangeEvent<HTMLInputElement>)
                                    }
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="m-2 block text-sm text-gray-700">Add Exp.</label>
                            </div>

                            <div className="flex justify-center space-x-4 pt-6 border-t border-gray-200">
                                <button type="button" onClick={() => navigate('/Components/item-manager')} className="px-4 py-2 btn btn-danger">
                                    Cancel
                                </button>
                                {id && (
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        Delete
                                    </button>
                                )}
                                <button type="button" onClick={handleSubmit} className="px-4 py-2 btn btn-primary">
                                    {id ? 'Update' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </Tab.Panel>
                    <Tab.Panel>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-3 border border-gray-200 rounded-lg">
                            {[
                                'PRODUCT',
                                'BRAND',
                                'STYLE',
                                'SUBGROUP',
                                'Group',
                                'GENDER',
                                'BUYER',
                                'SUBCATEGORY',
                                'CATEGORY',
                                'MATERIAL',
                                'COMPANY',
                                'SEASON',
                                'PACKING',
                                'UNIT',
                                'DEALER',
                                'SECTION',
                                'STATUS',
                            ].map((field) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{field}</label>
                                    <select
                                        name={field}
                                        value={typeof item[field] === 'string' ? item[field] : ''}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    >
                                        <option value="">Select</option>
                                        {dropdownValues[field.toLowerCase()]?.map((option, idx) => (
                                            <option key={idx} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default ItemMaster;
