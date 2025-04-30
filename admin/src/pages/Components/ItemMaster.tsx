import React, { useState, useEffect, Fragment } from 'react';
import { Tab } from '@headlessui/react';
import axios from 'axios'; // Import Axios
import { BASE_URL } from '../../config';
import { cl } from '@fullcalendar/core/internal-common';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import ReactQuill from 'react-quill';
interface ItemState {
    [key: string]: string | File | null | File[];
    // images: File[];
    // PHOTO: File[];
}
interface Variation {
    color: string;
    images: ImageListType;
    sizes: { name: string; stock: string }[];
}

const ItemMaster: React.FC = () => {
    //To fill combo box
    const [item, setItem] = useState<ItemState>({
        // CompanyID:'',
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
        // image: null,
        addExp: '',
        // PHOTO: [],
        // images: [],
        DESCRIPTION: '',
        Product_Details: '',
    });

    interface Record {
        PRIMENAME: string;
    }
    // Add product variations state
    const [variations, setVariations] = useState<Variation[]>([
        {
            color: '',
            images: [],
            sizes: [{ name: '', stock: '' }],
        },
    ]);

    // Add variation functions
    const addVariation = () => {
        setVariations([
            ...variations,
            {
                color: '',
                images: [],
                sizes: [{ name: '', stock: '' }],
            },
        ]);
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
    const [dropdownValues, setDropdownValues] = useState<{ [key: string]: string[] }>({});
    const [items, setItems] = useState<ItemState[]>([]); // Store fetched items
    const [editId, setEditId] = useState<number | null>(null);

    const [loading, setLoading] = useState<boolean>(true); // Track loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `${BASE_URL}/postcmbAW`,
                    {
                        TblName: 'MASTER',
                        FldName: 'PRIMENAME',
                        FldCode: 'PRIMEKEYID',
                        OrdBy: 'SEQUENCE',
                        WhFldName: ['Product', 'Status', 'Colour', 'Brand', 'Style', 'Size', 'Buyer', 'Season', 'Company', 'Section', 'Category'], // Modify your backend to handle an array of field names
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                console.log('Combined API response:', response.data);

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
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);

    const resetForm = () => {
        setItem({
            // CompanyID: '',
            Product: '',
            Brand: '',
            sColor: '',
            Color: '',
            I_Size: '',
            Style: '',
            SubGroup: '',
            Group: '',
            Gender: '',
            Buyer: '',
            SubCategory: '',
            Category: '',
            Material: '',
            Company: '',
            Season: '',
            Packing: '',
            Unit: '',
            Dealer: '',
            Section: '',
            Status: '',
            Barcode: '',
            ItemName: '',
            BoxSize: '',
            HSNCode: '',
            Rate: '',
            Tax: '',
            PurPrice: '',
            MarkUp: '',
            MRP: '',
            MarkDown: '',
            SalePrice: '',
            ExpiryDays: '',
            LookUp: '',
            Remark: '',
            Description: '',
            // image: null,
            addExp: '',
            // images: [],
            // PHOTO: [],
            Product_Details: '',
        });
    };

    const fetchHometableData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/items}`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            console.log('hello', response);
            setItems(response.data.items);
            console.log('object1111', response.data.items);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const SaveData = async () => {
        // Create the data object with all necessary fields
        const formData = new FormData();

        // Append all item data
        Object.keys(item).forEach((key) => {
            if (item[key] !== null) {
                formData.append(key, item[key] as string);
            }
        });

        // Append variations data
        formData.append('variations', JSON.stringify(variations));

        // Add images with proper field names
        variations.forEach((variation, varIndex) => {
          variation.images.forEach((image, imgIndex) => {
            if (image.file) {
              formData.append(`variation_${varIndex}_image_${imgIndex}`, image.file);
            }
          });
        });

        try {
            setLoading(true); // Set loading state to true
            let itemId: number | undefined;

            if (editId) {
                // Update existing item
                const res = await axios.put(`${BASE_URL}/update/${editId}`, formData, {
                    //data
                    // headers: {
                    //     'Content-Type': 'application/json', //'multipart/form-data'  // application/json
                    // },
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                itemId = editId; // Assign editId to itemId
                alert(res.data.message);
            } else {
                // Add new item
                const res = await axios.post(`${BASE_URL}/addItem`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert(res.data.message);
            }

            // Fetch updated data and reset form

            fetchHometableData();
            resetForm();
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while saving the item.');
        } finally {
            setLoading(false); // Set loading state to false
        }
    };

    const handleUpdateItem = async (id: number) => {
        console.log('Updating Item ID___:', id);
        if (!id) {
            alert('Invalid item ID');
            return;
        }

        // Create the data object with all necessary fields
        const data = {
            BARCODE: item.BARCODE,
            ITEMNAME: item.ITEMNAME,
            ITEMID: item.ITEMID,
            BOXSIZE: item.BOXSIZE,
            HSNCODE: item.HSNCODE,
            RATE: item.RATE,
            TAX: item.TAX,
            PURPRICE: item.PURPRICE,
            MARKUP: item.MARKUP,
            MRP: item.MRP,
            MARKDOWN: item.MARKDOWN,
            SALEPRICE: item.SALEPRICE,
            EXPIRYDAYS: item.EXPIRYDAYS,
            LOOKUP: item.LOOKUP,
            REMARK: item.REMARK,
            PRODUCT: item.PRODUCT,
            BRAND: item.BRAND,
            SCOLOR: item.SCOLOR,
            COLOR: item.COLOR,
            I_SIZE: item.I_SIZE,
            STYLE: item.STYLE,
            SUBGROUP: item.SUBGROUP,
            GENDER: item.GENDER,
            BUYER: item.BUYER,
            SUBCATEGORY: item.SUBCATEGORY,
            CATEGORY: item.CATEGORY,
            MATERIAL: item.MATERIAL,
            COMPANY: item.COMPANY,
            SEASON: item.SEASON,
            PACKING: item.PACKING,
            UNIT: item.UNIT,
            SECTION: item.SECTION,
            STATUS: item.STATUS,
            DESCRIPTION: item.DESCRIPTION,
            image: item.image instanceof File ? item.image : null,
            Product_Details: item.Product_Details,
        };

        console.log(data); // Debugging

        setLoading(true); // Set loading state to true

        try {
            const response = await axios.put(`${BASE_URL}/update/${id}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                alert('Item updated successfully!');
                console.log(response);
            } else {
                alert('Error updating item');
            }

            fetchHometableData();
            resetForm();
        } catch (error) {
            console.error('Error updating item:', error);
            alert('An error occurred while updating the item.');
        } finally {
            setLoading(false); // Set loading state to false
        }
    };

    const handleDeleteItem = async (id: number) => {
        try {
            const response = await axios.delete(`${BASE_URL}/delete/${id}`);
            if (response.data.success) {
                alert('Item deleted successfully!');
                setItems(items.filter((item) => Number(item.id) !== id)); // Remove the item from the state
            } else {
                alert('Error deleting item');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('An error occurred while deleting the item.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setItem((prev) => ({ ...prev, [name]: value }));
    };
    const handleProductDetailsChange = (value: string) => {
        setItem((prev) => ({ ...prev, Product_Details: value }));
    };
    const handleEditItem = async (id: number) => {
        console.log('Editing Item ID:', id);
        setEditId(id); // Set the editId state

        try {
            const response = await axios.get(`${BASE_URL}/items/${id}`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            if (response.data.items && response.data.items.length > 0) {
                setItem(response.data.items[0]); // Set the item state with the fetched data
                console.log('Fetched Item Data:', response.data.items[0]);
            } else {
                console.error('Item data is undefined or missing:', response.data);
                alert('Item data is missing or undefined.');
            }
        } catch (error) {
            console.error('Error fetching item data:', error);
            alert('An error occurred while fetching the item data.');
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Item Master</h2>
            <Tab.Group>
                <Tab.List className="mt-3 flex flex-wrap border-b border-gray-300">
                    {['General Detail'].map((tab) => (
                        <Tab as={Fragment} key={tab}>
                            {({ selected }) => <button className={`${selected ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'} px-4 py-2 focus:outline-none`}>{tab}</button>}
                        </Tab>
                    ))}
                </Tab.List>

                <Tab.Panels>
                    <Tab.Panel>
                        <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { field: 'ItemId', type: 'input' },
                                    { field: 'ItemName', type: 'input' },
                                    { field: 'Product_Details', type: 'quill', fullWidth: true },
                                    { field: 'Rate', type: 'input' },
                                    { field: 'Tax', type: 'input' },
                                    { field: 'PurPrice', type: 'input' },
                                    { field: 'MRP', type: 'input' },
                                    { field: 'SalePrice', type: 'input' },
                                    { field: 'DESCRIPTION', type: 'textarea', fullWidth: true },
                                ].map(({ field, type, fullWidth }) => (
                                    <div key={field} className={fullWidth ? 'col-span-full' : ''}>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{field}</label>
                                        {type === 'input' && (
                                            <input
                                                type="text"
                                                name={field}
                                                value={item[field] as string}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                                                placeholder={`Enter ${field}`}
                                            />
                                        )}
                                        {type === 'textarea' && (
                                            <textarea
                                                name={field}
                                                value={item[field] as string}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-500"
                                                rows={3}
                                            />
                                        )}
                                        {type === 'quill' && (
                                            <ReactQuill
                                                theme="snow"
                                                className="border border-gray-300 rounded-md shadow-sm quill-editor"
                                                modules={{
                                                    toolbar: [
                                                        [{ font: [] }, { size: [] }],
                                                        ['bold', 'italic', 'underline', 'strike'],
                                                        [{ color: [] }, { background: [] }],
                                                        [{ script: 'super' }, { script: 'sub' }],
                                                        [{ header: [false, 1, 2, 3, 4, 5, 6] }, 'blockquote', 'code-block'],
                                                        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                                                        ['direction', { align: [] }],
                                                        ['link', 'image', 'video'],
                                                        ['clean'],
                                                    ],
                                                }}
                                                value={item[field] as string}
                                                onChange={handleProductDetailsChange}
                                                placeholder={`Edit Product Details Here...`}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* New Product Variations Tab */}

                        <div className="container mt-4">
                            <h3 className="text-xl font-semibold mb-4">Product Variations</h3>
                            <div className="space-y-6">
                                {variations.map((variation, varIndex) => (
                                    <div key={varIndex} className="border p-3 mb-3 rounded-lg">
                                        <div className="mb-4">
                                            <label className="block font-medium">Upload Images (Max 6 per color)</label>
                                            <ImageUploading
                                                multiple
                                                value={variation.images}
                                                onChange={(imageList) => handleVariationImageChange(varIndex, imageList)}
                                                maxNumber={6} // Limit to 6 images per variant
                                                dataURLKey="dataURL"
                                            >
                                                {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                                    <div className="upload__image-wrapper">
                                                        <button type="button" onClick={onImageUpload} className="w-full p-2 border rounded bg-gray-500 text-white" {...dragProps}>
                                                            Choose Images (Max 6)
                                                        </button>
                                                        <div className="grid gap-4 sm:grid-cols-3 grid-cols-1 mt-2">
                                                            {imageList.map((image, index) => (
                                                                <div key={index} className="custom-file-container__image-preview relative">
                                                                    <button
                                                                        type="button"
                                                                        className="custom-file-container__image-clear bg-dark-light dark:bg-dark dark:text-white-dark rounded-full block w-fit p-0.5 absolute top-0 left-0"
                                                                        title="Clear Image"
                                                                        onClick={() => onImageRemove(index)}
                                                                    >
                                                                        ×
                                                                    </button>
                                                                    <img src={image.dataURL} alt="img" className="object-cover shadow rounded w-full !max-h-48" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </ImageUploading>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="flex-1">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                                                <select
                                                    value={variation.color}
                                                    onChange={(e) => handleVariationChange(varIndex, 'color', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                                                >
                                                    <option value="" selected disabled>
                                                        Select a color
                                                    </option>
                                                    {dropdownValues['color']?.map((option, idx) => (
                                                        <option key={idx} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <strong className="block text-sm font-medium text-gray-700 mb-2">Sizes:</strong>
                                            {variation.sizes.map((size, sizeIndex) => (
                                                <div key={sizeIndex} className="flex gap-2 mt-2">
                                                    <div className="flex-1">                                                  
                                                        <select
                                                            value={size.name}
                                                            onChange={(e) => handleSizeChange(varIndex, sizeIndex, 'name', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                                                        >
                                                            <option value="" selected disabled>
                                                                Select a size
                                                            </option>
                                                            {dropdownValues['size']?.map((option, idx) => (
                                                                <option key={idx} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="flex-1">
                                                      
                                                        <input
                                                            type="number"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                                                            placeholder="Enter Stock"
                                                            value={size.stock}
                                                            onChange={(e) => handleSizeChange(varIndex, sizeIndex, 'stock', e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="w-auto">
                                                        <button type="button" className="btn btn-outline-danger" onClick={() => removeSize(varIndex, sizeIndex)}>
                                                            ×
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="flex gap-2 mt-2">
                                       
                                                <button type="button" className="btn btn-secondary flex-1" onClick={() => addSize(varIndex)}>
                                                    + Add Size
                                                </button>
                                                <div className="flex-1">

                                                    <button type="button" className="btn btn-danger w-full" onClick={() => removeVariation(varIndex)}>
                                                        Remove Variation
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <button type="button" className="btn btn-primary ms-3" onClick={addVariation}>
                                    + Add Variation
                                </button>
                            </div>
                        </div>
                        <div className="mb-4 flex items-center gap-2">
                            <input type="checkbox" name="addExp" onChange={handleChange} className="w-4 h-4" />
                            <label className="font-medium">Add Exp.</label>
                        </div>
                        <div className="flex justify-center gap-4 mt-6">
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" onClick={SaveData}>
                                Save
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={() => handleUpdateItem(Number(item.ItemId))} // Ensure item.id is set>
                            >
                                Update
                            </button>
                            <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => handleEditItem(Number(item.ItemId))}>
                                Edit
                            </button>
                            <button type="button" className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => handleDeleteItem(Number(item.ItemId))}>
                                Cancel
                            </button>
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default ItemMaster;
