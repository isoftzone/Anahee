import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import IconPencil from '../../components/Icon/IconPencil';
const ImageUpdates: React.FC = () => {
    const [images, setImages] = useState<{ id: number; images: string; sequence: number; status: number; sec_name: string; des_l1: string; des_l2: string; des_l3: string }[]>([]);
    const [uploadImages, setUploadImages] = useState<ImageListType>([]);
    const [secName, setSecName] = useState('');
    const [desL1, setDesL1] = useState('');
    const [desL2, setDesL2] = useState('');
    const [desL3, setDesL3] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingImageUrl, setEditingImageUrl] = useState<string>(''); // Store original image URL for editing
    const [error, setError] = useState('');
    const maxNumber = 1;
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/images`);
                setImages(response.data.images);
            } catch (error) {
                setError('Failed to load images');
            }
        };
        fetchImages();
    }, []);
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!secName.trim()) {
            setError('Please enter section name.');
            return;
        }
        if (editingId) {
            try {
                await axios.put(`${BASE_URL}/images/${editingId}`, {
                    sec_name: secName,
                    des_l1: desL1,
                    des_l2: desL2,
                    des_l3: desL3,
                });
                setImages((prevImages) => prevImages.map((img) => (img.id === editingId ? { ...img, sec_name: secName, des_l1: desL1, des_l2: desL2, des_l3: desL3 } : img)));
                setEditingId(null);
                setEditingImageUrl(''); // Clear editing image URL
                resetForm();
            } catch (error) {
                setError('Update failed');
            }
        } else if (uploadImages.length) {
            const formData = new FormData();
            formData.append('image', uploadImages[0].file as File);
            formData.append('sec_name', secName);
            formData.append('des_l1', desL1);
            formData.append('des_l2', desL2);
            formData.append('des_l3', desL3);
            try {
                const response = await axios.post(`${BASE_URL}/upload`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                if (response.data.image) {
                    const newImage = {
                        id: response.data.image.id,
                        images: `${BASE_URL}/public/images/banner/${response.data.image.filename}`,
                        sequence: response.data.image.sequence,
                        status: response.data.image.status,
                        sec_name: response.data.image.sec_name,
                        des_l1: response.data.image.des_l1,
                        des_l2: response.data.image.des_l2,
                        des_l3: response.data.image.des_l3,
                    };
                    setImages((prevImages) => [...prevImages, newImage]);
                }
                resetForm();
            } catch (error) {
                setError('Upload failed');
            }
        }
    };
    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${BASE_URL}/images/${id}`);
            setImages(images.filter((image) => image.id !== id));
        } catch (error) {
            setError('Delete failed');
        }
    };
    const handleEdit = (image: any) => {
        setEditingId(image.id);
        setSecName(image.sec_name);
        setDesL1(image.des_l1);
        setDesL2(image.des_l2);
        setDesL3(image.des_l3);
        setEditingImageUrl(image.images); // Store the original image URL
        setUploadImages([]); // Clear upload images to show original image
    };
    const resetForm = () => {
        setSecName('');
        setDesL1('');
        setDesL2('');
        setDesL3('');
        setUploadImages([]);
        setEditingImageUrl(''); // Clear editing image URL
        setError('');
    };
    // Function to get the image to display in preview
    const getPreviewImage = (): string | undefined => {
        if (uploadImages.length > 0) {
            // If new image is selected, show the new image
            return uploadImages[0].dataURL;
        } else if (editingImageUrl) {
            // If editing and no new image selected, show original image
            return editingImageUrl;
        }
        return undefined;
    };
    return (
        <div className="p-4 border rounded shadow bg-white w-full">
            <h2 className="text-xl font-bold mb-4 text-center sm:text-left">Banners</h2>
            <form className="flex flex-col gap-4 w-full max-w-3xl mx-auto mt-6 p-4 bg-gray-100 rounded shadow-md" onSubmit={handleSave}>
                <ImageUploading value={uploadImages} onChange={setUploadImages} maxNumber={maxNumber}>
                    {({ imageList, onImageUpload, onImageRemove }) => (
                        <div className="w-full">
                            <button className="bg-gray-200 w-full p-2 rounded hover:bg-gray-300 transition" onClick={onImageUpload} type="button">
                                Choose File...
                            </button>
                            {getPreviewImage() && (
                                <div className="mt-2 relative flex justify-center">
                                    <img src={getPreviewImage() ?? undefined} alt="preview" className="border p-2 rounded w-full max-w-xs" />
                                    {uploadImages.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onImageRemove(0);
                                                if (editingId) {
                                                    setUploadImages([]);
                                                }
                                            }}
                                            className="absolute top-0 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </ImageUploading>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Enter Section Name" className="p-2 border border-gray-300 rounded w-full" value={secName} onChange={(e) => setSecName(e.target.value)} required />
                    <input type="text" placeholder="Enter Heading" className="p-2 border border-gray-300 rounded w-full" value={desL1} onChange={(e) => setDesL1(e.target.value)} required />
                    <input type="text" placeholder="Enter Heading 2" className="p-2 border border-gray-300 rounded w-full" value={desL2} onChange={(e) => setDesL2(e.target.value)} required />
                    <input type="text" placeholder="Enter Heading 3" className="p-2 border border-gray-300 rounded w-full" value={desL3} onChange={(e) => setDesL3(e.target.value)} required />
                </div>
                <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition self-center">
                    {editingId ? 'Update' : 'Save'}
                </button>
            </form>
            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
            <div className="overflow-x-auto mt-6">
                <table className="min-w-full border-collapse border border-gray-300 bg-gray-100 text-sm sm:text-base">
                    <thead>
                        <tr className="bg-gray-300 text-black">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Image</th>
                            <th className="border p-2">Sequence</th>
                            <th className="border p-2">Section Name</th>
                            <th className="border p-2">Heading_1</th>
                            <th className="border p-2">Heading_2</th>
                            <th className="border p-2">Heading_3</th>
                            <th className="border p-2">Edit</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {images.map((image) => (
                            <tr key={image.id} className="border hover:bg-gray-200">
                                <td className="border p-2 text-center">{image.id}</td>
                                <td className="border p-2">
                                    <img src={image.images} alt="Uploaded" className=" w-full max-w-xs" />
                                </td>
                                <td className="border p-2 text-center">{image.sequence}</td>
                                <td className="border p-2 text-center">{image.sec_name}</td>
                                <td className="border p-2 text-center">{image.des_l1}</td>
                                <td className="border p-2 text-center">{image.des_l2}</td>
                                <td className="border p-2 text-center">{image.des_l3}</td>
                                <td className="border p-2 text-center cursor-pointer" onClick={() => handleEdit(image)}>
                                    <IconPencil />
                                </td>
                                <td className="border p-2 text-center cursor-pointer">
                                                                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(image.id)}>
                                    🗑
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ImageUpdates;










