import { useMutation } from '@apollo/client';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import React, { useState } from 'react';
import MuiError from '../../assets/mui/Alert';
import Loading from '../../assets/mui/Loading';
import { FormRow } from '../../components';
import { UPDATE_PRODUCT } from '../../graphql/Mutations/productMutation';
import { useForm } from '../../utils/customHooks';

const EditItemForm = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [publicId, setPublicId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [success, setSuccess] = useState(false);

  const initialState = {
    title: product?.title.toString() || '',
    brand: product?.brand.toString() || '',
    model: product?.model.toString() || '',
    price: product?.price.toString() || '',
    size: product?.size.toString() || '',
    color: product?.color.toString() || '',
    image: '',
    productId: product?.id || '',
  };

  const { onChange, onSubmit, values } = useForm(
    editProductCallback,
    initialState
  );

  const [editProdudct, { loading: productLoading, error }] = useMutation(
    UPDATE_PRODUCT,
    {
      variables: values,
      onCompleted() {
        setSuccess(true);
      },
    }
  );

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file[0]);
    formData.append('upload_preset', 'wrhqjxmr');
    setLoading(true);
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dsrhwv8to/image/upload',
        formData
      );
      setLoading(false);
      setPublicId(response.data.public_id);
      setImageUrl(response.data.secure_url);
    } catch (error) {
      console.log(error);
    }
  };

  function editProductCallback() {
    if (imageUrl) {
      values.image = imageUrl;
    }
    editProdudct();
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
              <h2 className="text-2xl font-bold text-gray-800">Chỉnh sửa sản phẩm</h2>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Hình ảnh sản phẩm</h3>
                {loading ? (
                  <div className="flex justify-center items-center h-48 bg-gray-100 rounded-lg">
                    <Loading />
                  </div>
                ) : (
                  <div className="relative">
                    <Image
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                      cloudName="dsrhwv8to"
                      publicId={publicId}
                    />
                    <input
                      type="file"
                      onChange={(e) => uploadImage(e.target.files)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200">
                      <span className="text-white font-medium">Thay đổi hình ảnh</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Form Section */}
            <div className="w-full md:w-2/3">
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormRow
                    exampleText="VD: Yeezy Boost 350 V2 Zebra"
                    labelText="Tên sản phẩm"
                    name="title"
                    type="text"
                    value={values.title}
                    onChange={onChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition duration-200"
                  />

                  <FormRow
                    exampleText="VD: Yeezy"
                    labelText="Thương hiệu"
                    name="brand"
                    type="text"
                    value={values.brand}
                    onChange={onChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition duration-200"
                  />

                  <FormRow
                    exampleText="VD: V2 Zebra"
                    labelText="Mẫu mã"
                    name="model"
                    type="text"
                    value={values.model}
                    onChange={onChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition duration-200"
                  />

                  <FormRow
                    exampleText="VD: đỏ,đen,xanh"
                    labelText="Màu sắc"
                    name="color"
                    type="text"
                    value={values.color}
                    onChange={onChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition duration-200"
                  />

                  <FormRow
                    exampleText="VD: 3500000"
                    labelText="Giá tiền"
                    name="price"
                    type="number"
                    value={values.price}
                    onChange={onChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition duration-200"
                  />

                  <FormRow
                    exampleText="VD: 7.5,8,11"
                    labelText="Kích thước"
                    name="size"
                    value={values.size}
                    type="text"
                    onChange={onChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition duration-200"
                  />
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <button
                    type="submit"
                    className="w-full md:w-1/2 bg-gradient-to-r from-rose-600 to-rose-800 text-white font-medium py-3 px-6 rounded-xl 
                      hover:from-rose-700 hover:to-rose-900 transition-all duration-300 shadow-md hover:shadow-lg 
                      transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                  >
                    Cập nhật sản phẩm
                  </button>

                  {(success || error) && (
                    <div className="w-full md:w-1/2">
                      {success ? (
                        <MuiError type="success">Cập nhật sản phẩm thành công</MuiError>
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

export default EditItemForm;
