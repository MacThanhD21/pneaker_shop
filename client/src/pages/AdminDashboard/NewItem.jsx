import React, { useState, useRef, useEffect } from 'react';
import { Image } from 'cloudinary-react';
import Loading from '../../assets/mui/Loading';
import axios from 'axios';
import { useForm } from '../../utils/customHooks';
import { FormRow } from '../../components';
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT } from '../../graphql/Mutations/productMutation';
import { GET_PRODUCTS } from '../../graphql/Queries/productQueries';
import MuiError from '../../assets/mui/Alert';

const NewItem = ({onCancel, onSubmit}) => {
  const [publicId, setPublicId] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [success, setSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);
  const [sizeRows, setSizeRows] = useState([
    { size: '', quantity: '' },
    { size: '', quantity: '' },
    { size: '', quantity: '' }
  ]);

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const initialState = {
    brand: '',
    model: '',
    title: '',
    color: '',
    price: '',
    image: '',
  };

  const { onChange, values, onSubmit: handleFormSubmit } = useForm(onSubmitHandler, initialState);

  const validateFile = (file) => {
    if (!file) {
      setUploadError('Vui lòng chọn một file ảnh');
      return false;
    }

    // Kiểm tra kích thước file (tối đa 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 5MB');
      return false;
    }

    // Kiểm tra định dạng file
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Định dạng file không hợp lệ. Vui lòng chọn file JPG, JPEG hoặc PNG');
      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!validateFile(file)) return;

    // Cleanup previous preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setUploadError('');
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    uploadImage(file);
  };

  const uploadImage = async (file) => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'wrhqjxmr');
    
    setLoading(true);
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dsrhwv8to/image/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 30000, // 30 seconds timeout
        }
      );
      
      if (response.data && response.data.secure_url) {
        setPublicId(response.data.public_id);
        setImageUrl(response.data.secure_url);
        setUploadError('');
      } else {
        throw new Error('Upload không thành công');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(
        error.response?.data?.message || 
        'Có lỗi xảy ra khi tải lên ảnh. Vui lòng thử lại'
      );
    } finally {
      setLoading(false);
    }
  };

  const [createProduct, { loading: productLoading, error }] = useMutation(
    CREATE_PRODUCT,
    {
      onCompleted() {
        setSuccess(true);
        // Reset form sau khi tạo thành công
        setPreviewUrl('');
        setImageUrl('');
        setPublicId('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      },
      variables: values,
      refetchQueries: [
        {
          query: GET_PRODUCTS,
        },
      ],
    }
  );

  const handleSizeChange = (index, field, value) => {
    const newSizeRows = [...sizeRows];
    newSizeRows[index][field] = value;
    setSizeRows(newSizeRows);
  };

  const addSizeRow = () => {
    setSizeRows([...sizeRows, { size: '', quantity: '' }]);
  };

  const removeSizeRow = (index) => {
    const newSizeRows = sizeRows.filter((_, i) => i !== index);
    setSizeRows(newSizeRows);
  };

  function onSubmitHandler() {
    if (!imageUrl) {
      setUploadError('Vui lòng tải lên hình ảnh sản phẩm');
      return;
    }

    // Validate required fields
    const requiredFields = ['title', 'brand', 'model', 'price'];
    const missingFields = requiredFields.filter(field => !values[field]);
    
    if (missingFields.length > 0) {
      setUploadError(`Vui lòng điền đầy đủ thông tin: ${missingFields.join(', ')}`);
      return;
    }

    // Validate size rows
    const validSizeRows = sizeRows.filter(row => row.size && row.quantity);
    if (validSizeRows.length === 0) {
      setUploadError('Vui lòng nhập ít nhất một kích thước và số lượng');
      return;
    }

    const productData = {
      ...values,
      image: imageUrl,
      size: validSizeRows
    };

    if (onSubmit) {
      onSubmit(productData);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {productLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Image Upload Section */}
            <div className="w-full md:w-1/3 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Thêm sản phẩm mới</h2>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Hình ảnh sản phẩm</h3>
                {loading ? (
                  <div className="flex justify-center items-center h-48 bg-gray-100 rounded-lg">
                    <Loading />
                  </div>
                ) : (
                  <div className="relative group">
                    <label 
                      htmlFor="file-upload"
                      className="block w-full h-48 cursor-pointer"
                    >
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg shadow-md"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400">Chưa có hình ảnh</span>
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="text-white font-medium">
                          {previewUrl ? 'Thay đổi hình ảnh' : 'Tải lên hình ảnh'}
                        </span>
                      </div>
                    </label>
                    <input
                      id="file-upload"
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/jpg"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                )}
                {uploadError && (
                  <p className="text-sm text-red-500 text-center">{uploadError}</p>
                )}
                <p className="text-sm text-gray-500 text-center">
                  Nhấp vào hình ảnh để tải lên hoặc thay đổi
                </p>
              </div>
            </div>

            {/* Form Section */}
            <div className="w-full md:w-2/3">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                    <input
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={onChange}
                      placeholder="Nhập tên sản phẩm (VD: Yeezy Boost 350 V2 Zebra)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Thương hiệu</label>
                    <input
                      type="text"
                      name="brand"
                      value={values.brand}
                      onChange={onChange}
                      placeholder="Nhập thương hiệu (VD: Yeezy, Nike, Adidas)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Mẫu mã</label>
                    <input
                      type="text"
                      name="model"
                      value={values.model}
                      onChange={onChange}
                      placeholder="Nhập mẫu mã (VD: V2 Zebra, Air Force 1)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Màu sắc</label>
                    <input
                      type="text"
                      name="color"
                      value={values.color}
                      onChange={onChange}
                      placeholder="Nhập màu sắc (VD: đỏ, đen, xanh)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Giá tiền</label>
                    <input
                      type="number"
                      name="price"
                      value={values.price}
                      onChange={onChange}
                      placeholder="Nhập giá tiền (VD: 3500000)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition duration-200"
                    />
                  </div>
                </div>

                {/* Size Rows Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-700">Kích thước và số lượng</h3>
                    <button
                      type="button"
                      onClick={addSizeRow}
                      className="px-4 py-2 text-sm font-medium text-rose-600 hover:text-rose-700 transition-colors"
                    >
                      + Thêm kích thước
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {sizeRows.map((row, index) => (
                      <div key={index} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                        <div className="flex-1 space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Kích thước</label>
                          <input
                            type="text"
                            placeholder="Nhập kích thước (VD: 7.5, 8, 8.5)"
                            value={row.size}
                            onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition duration-200"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Số lượng</label>
                          <input
                            type="number"
                            placeholder="Nhập số lượng"
                            value={row.quantity}
                            onChange={(e) => handleSizeChange(index, 'quantity', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition duration-200"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSizeRow(index)}
                          className="p-2 text-gray-500 hover:text-red-500 transition-colors self-end"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-4 pt-6">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={onCancel}
                      className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-rose-600 to-rose-800 rounded-lg 
                        hover:from-rose-700 hover:to-rose-900 transition-all duration-300 shadow-md hover:shadow-lg 
                        transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                    >
                      Thêm sản phẩm mới
                    </button>
                  </div>

                  {(success || error) && (
                    <div className="w-full md:w-1/2">
                      {success ? (
                        <MuiError type="success">Thêm sản phẩm thành công</MuiError>
                      ) : (
                        <MuiError type="error">{error?.message}</MuiError>
                      )}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewItem;