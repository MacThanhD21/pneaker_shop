import { useLazyQuery } from '@apollo/client';
import React from 'react';
import MuiError from '../../assets/mui/Alert';
import { FormRow } from '../../components';
import { GET_PRODUCT_BY_ID } from '../../graphql/Queries/productQueries';
import Loading from '../../assets/mui/Loading';
import { EditItemForm } from '../AdminDashboard';
import { useForm } from '../../utils/customHooks';

const EditItem = (productId) => {
  
  const [getProduct, { loading, error }] = useLazyQuery(GET_PRODUCT_BY_ID, {

    
    onCompleted({ getProductById }) {
      values.product = getProductById;
      values.errors = '';
    },
  });

  useEffect(() => {
    if (productId) {
      getProduct({ 
        variables: { 
          productId 
        } 
      });
    }
  }, [productId, getProduct]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* {values.product ? (
        <EditItemForm product={values.product} />
      ) : (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loading />
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Tìm kiếm sản phẩm
                </h2>
                <p className="text-gray-600">
                  Vui lòng nhập ID sản phẩm cần chỉnh sửa
                </p>
              </div>

              <div className="space-y-4">
                <FormRow
                  name="productId"
                  type="text"
                  value={values.productId}
                  onChange={onChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition duration-200"
                  placeholder="Nhập ID sản phẩm..."
                />

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-600 to-rose-800 text-white font-medium py-3 px-6 rounded-xl 
                    hover:from-rose-700 hover:to-rose-900 transition-all duration-300 shadow-md hover:shadow-lg 
                    transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                >
                  Tìm kiếm
                </button>
              </div>

              {(values.errors || error) && (
                <div className="mt-4">
                  <MuiError type="error">
                    {values.errors || error?.message}
                  </MuiError>
                </div>
              )}

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>Lưu ý: Vui lòng nhập đúng ID sản phẩm để tìm kiếm</p>
              </div>
            </form>
          )}
        </div>
      )} */}
      
      <EditItemForm product={values.product} />
    </div>
  );
};

export default EditItem;
