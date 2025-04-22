import React, { useState, useEffect, Fragment } from 'react';
import { Tab } from '@headlessui/react';
import axios from 'axios'; // Import Axios
import { BASE_URL } from '../../config';
import { cl } from '@fullcalendar/core/internal-common';
import ImageUploading, { ImageListType } from 'react-images-uploading';

interface ItemState {
    [key: string]: string | File | null | File[];
    // images: File[];
    // PHOTO: File[];
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
    });

    interface Record {
        PRIMENAME: string;
    }

    const [dropdownValues, setDropdownValues] = useState<{ [key: string]: string[] }>({});
    const [items, setItems] = useState<ItemState[]>([]); // Store fetched items
    const [editId, setEditId] = useState<number | null>(null);
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Track loading state



    const [products, setProducts] = useState<Record[]>([]);
    const [colors, setColors] = useState<Record[]>([]);
    const [brands, setBrands] = useState<Record[]>([]);
    const [statuses, setStatuses] = useState<Record[]>([]);
    const [styles, setStyles] = useState<Record[]>([]);
    const [sizes, setSizes] = useState<Record[]>([]);
    const [buyers, setBuyers] = useState<Record[]>([]);
    const [seasons, setSeasons] = useState<Record[]>([]);
    const [company, setCompany] = useState<Record[]>([]);
    const [sections, setSections] = useState<Record[]>([]);
    const [category, setCategory] = useState<Record[]>([]);
    const [loadingImages, setLoadingImages] = useState(false);
    const [fetchedImages, setFetchedImages] = useState(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const maxNumber = 6; // Maximum number of images allowed


    

    // useEffect(() => {
    //     axios
    //         .get(`${BASE_URL}/dropdowns`)
    //         .then((res) => {
    //             setDropdownValues(res.data);
    //         })
    //         .catch((err) => {
    //             console.error('Error fetching dropdown values:', err);
    //         });
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post(`${BASE_URL}/postcmbAW`, {TblName: 'MASTER',FldName: 'PRIMENAME',FldCode: 'PRIMEKEYID',OrdBy: 'SEQUENCE',WhFldName: ['Product', 'Status','Colour','Brand','Style','Size','Buyer','Season','Company','Section','Category'] // Modify your backend to handle an array of field names
            }, {
              headers: {
                "Content-Type": "application/json"
              }
            });
            console.log("Combined API response:", response.data);
            setProducts(response.data.Product);
            setStatuses(response.data.Status);
            setBrands(response.data.Brand);
            setColors(response.data.Colour);
            setStyles(response.data.Style);
            setSizes(response.data.Size);
            setBuyers(response.data.Buyer);
            setSeasons(response.data.Season);
            setCompany(response.data.Company);
            setSections(response.data.Section);
            setCategory(response.data.Category);

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
            console.error("Error fetching data", error);
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
            Description:'',
            // image: null,
            addExp: '',
            // images: [],
            // PHOTO: [],
        });
        setImages([]); // Clear the images state
    };

    const fetchHometableData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/items}`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            console.log("hello",response)
            setItems(response.data.items);
            console.log("object1111",response.data.items)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const SaveData = async () => {
        // Create the data object with all necessary fields
        const formData = new FormData();
        const data = {
            // CompanyID: item.CompanyID,
            Barcode: item.Barcode,
            ItemName: item.ItemName,
            ItemId: item.ItemId,
            BoxSize: item.BoxSize,
            HSNCode: item.HSNCode,
            Rate: item.Rate,
            Tax: item.Tax,
            PurPrice: item.PurPrice,
            MarkUp: item.MarkUp,
            MRP: item.MRP,
            MarkDown: item.MarkDown,
            SalePrice: item.SalePrice,
            ExpiryDays: item.ExpiryDays,
            LookUp: item.LookUp,
            Remark: item.Remark,
            Product: item.Product,
            Brand: item.Brand,
            sColor: item.sColor,
            Color: item.Color,
            I_Size: item.I_Size,
            Style: item.Style,
            SubGroup: item.SubGroup,
            Gender: item.Gender,
            Buyer: item.Buyer,
            SubCategory: item.SubCategory,
            Category: item.Category,
            Material: item.Material,
            Company: item.Company,
            Season: item.Season,
            Packing: item.Packing,
            Unit: item.Unit,
            Section: item.Section,
            Status: item.Status,
            DESCRIPTION: item.Description,
            // image: item.image instanceof File ? item.image : null,
            // PHOTO: item.PHOTO instanceof File ? item.PHOTO : null,

        };
        // Object.keys(item).forEach((key) => {
        //     if (item[key] !== null && key !== 'images') {
        //         formData.append(key, item[key] as string);
        //     }
        // });
        Object.keys(item).forEach((key) => {
            if (item[key] !== null && key !== 'photo') {
                formData.append(key, item[key] as string);
            } else if (key === 'photo' && item[key] instanceof File) {
                // If images is a single file, append it
                formData.append(key, item[key]);
            } else if (key === 'photo' && item[key] instanceof FileList) {
                // If images is a list of files, loop through and append each one
                Array.from(item[key]).forEach(file => formData.append(key, file));
            }
        });
        
        
        console.log(data); // Debugging
        images.forEach((image, index) => {
            formData.append('photo', image.file); // Correct
        });
        try {
            setLoading(true); // Set loading state to true
            let itemId: number | undefined;

            if (editId) {
                // Update existing item
                await axios.put(`${BASE_URL}/update/${editId}`, formData, {   //data
                    headers: {
                        'Content-Type': 'application/json', //'multipart/form-data'  // application/json
                    },
                });
                itemId = editId; // Assign editId to itemId
            } else {
                // Add new item
                await axios.post(`${BASE_URL}/addItem`, formData, {         //data
                    headers: {
                        'Content-Type': 'application/json', //  'multipart/form-data'  
                    },
                });
                
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
            DESCRIPTION:item.DESCRIPTION,
            image: item.image instanceof File ? item.image : null,
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

    const handleImageChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        console.log('Image List before update:', images);
        setImages(imageList as never[]);
        console.log('Image List after update:', imageList);
    };

    // Example function: Dynamically add images to state
    const addImagesDynamically = (imageFiles: File[]) => {
        setSelectedImages(imageFiles);
    };

    // const fetchImagesFromAPI = async () => {
    //     const formData = new FormData();
    //     selectedImages.forEach((file) => {
    //         formData.append("photo", file); // Ensure this key matches the backend
    //     });
    //     try {
    //         const response = await axios.post(`${BASE_URL}/photoupload`, formData, {
    //             headers: { "Content-Type": "multipart/form-data" },
    //         });
    //         console.log("Upload Success:", response.data);
    //         alert("Images uploaded successfully!");
    //     } catch (error) {
    //         console.error("Error uploading images:", error);
    //         alert("An error occurred while uploading images.");
    //     }
    // };
    const fetchImagesFromAPI = async () => {
        const formData = new FormData();
        formData.append('ItemId', item.ItemId);
            console.log(item);
        images.forEach((image) => {
            formData.append("photo", image.file);
        });
    
        try {
            const response = await axios.post(`${BASE_URL}/photoupload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Upload Success:", response.data);
            alert("Images uploaded successfully!");
        } catch (error) {
            console.error("Error uploading images:", error);
            alert("An error occurred while uploading images.");
        }
    };
    
    
    
    
    
    
    
    

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Item Master</h2>
            <Tab.Group>
                <Tab.List className="mt-3 flex flex-wrap border-b border-gray-300">
                    {['Additional Details', 'Descriptions', 'Product Images'].map((tab) => (
                        <Tab as={Fragment} key={tab}>
                            {({ selected }) => <button className={`${selected ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'} px-4 py-2 focus:outline-none`}>{tab}</button>}
                        </Tab>
                    ))}
                </Tab.List>

                <Tab.Panels>
                    <Tab.Panel>
                        <div className="grid grid-cols-4 gap-4 p-4 border rounded">
                            {['Barcode', 'ItemId', 'ItemName', 'BoxSize', 'HSNCode', 'Rate', 'Tax', 'PurPrice', 'MarkUp', 'MRP', 'MarkDown', 'SalePrice', 'ExpiryDays','DESCRIPTION'].map((field) => (
                                <div key={field}>
                                    <label className="block font-medium">{field}</label>
                                    <input type="text" name={field} value={item[field] as string} onChange={handleChange} className="w-full p-2 border rounded" />
                                </div>
                            ))}
                        </div>
                    </Tab.Panel>

                    <Tab.Panel>
                        <div className="grid grid-cols-4 gap-4 p-4 border rounded">
                            {[
                                'Product',
                                'Brand',
                                'sColor',
                                'Color',
                                'Size',
                                'Style',
                                'SubGroup',
                                'Group',
                                'Gender',
                                'Buyer',
                                'SubCategory',
                                'Category',
                                'Material',
                                'Company',
                                'Season',
                                'Packing',
                                'Unit',
                                'Dealer',
                                'Section',
                                'Status',
                            ].map((field) => (
                                <div key={field}>
                                    <label className="block font-medium">{field}</label>
                                    <select name={field} value={typeof item[field] === 'string' ? item[field] : ''} onChange={handleChange} className="w-full p-2 border rounded">
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
                    {/* Third Tab - Image Upload, Checkbox & Action Buttons */}
                    <Tab.Panel>
                        <div className="p-4 border rounded">
                            {/* <div className="mb-4">
                                <label className="block font-medium">Upload Image</label>
                                <input type="file" onChange={handleImageChange} className="w-full p-2 border rounded" accept="image/*" />
                                {item.image instanceof File && <img src={URL.createObjectURL(item.image)} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />}
                            </div> */}

                            <div className="mb-4">
                                <label className="block font-medium">Upload Images</label>
                                <ImageUploading multiple value={images} onChange={handleImageChange} maxNumber={maxNumber}>
                                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                        <div className="upload__image-wrapper">
                                            {/* <input type="file" onChange={onImageUpload} className="w-full p-2 border rounded" accept="image/*" /> */}
                                            {/* Button to trigger file selection */}
                                            <button
                                                type="button"
                                                onClick={onImageUpload}
                                                className="w-full p-2 border rounded bg-gray-500 text-white"
                                                {...dragProps} // Optional: Add drag-and-drop support
                                            >
                                                Choose Images
                                            </button>
                                            <button
                                                type="button"
                                                onClick={fetchImagesFromAPI}
                                                className="w-full p-2 border rounded bg-green-500 text-white mt-2"
                                            >
                                                {loadingImages ? 'Loading...' : 'Click Here To Save Images'}
                                            </button>
                                            {/* Display uploaded images */}
                                            &nbsp;
                                            <div className="grid gap-4 sm:grid-cols-3 grid-cols-1">
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
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default ItemMaster;
