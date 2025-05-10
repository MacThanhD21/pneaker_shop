import React from 'react';
import Loading from '../assets/mui/Loading';
import { Link } from 'react-router-dom';
import { formatVNDPrice } from '../utils/formatPrice';

const OrderSum = ({ cartProducts, loading, link, onClick, orderPage }) => {
  const deliveryTax = cartProducts?.length > 0 ? 10000 : 0;
  const salesTax = cartProducts?.length > 0 ? 20000 : 0;
  console.log(cartProducts);
  const originalPriceCalculated = cartProducts?.reduce(
    (acc, val) => Number(acc) + (Number(val.productPrice) * Number(val.quantity)),
    0
  );

  // Kiểm tra điều kiện miễn phí vận chuyển
  const isFreeShipping = originalPriceCalculated >= 1000000;
  const finalDeliveryTax = isFreeShipping ? 0 : deliveryTax;

  const totalPriceCalculated =
    originalPriceCalculated &&
    Number(originalPriceCalculated) + Number(finalDeliveryTax) + Number(salesTax);

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6">
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col space-y-6">
          <h3 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-4">
            Tổng đơn hàng
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-gray-600">
              <span>Tạm tính:</span>
              <span className="font-medium text-gray-800">
                {formatVNDPrice(originalPriceCalculated)}
              </span>
            </div>

            <div className="flex justify-between items-center text-gray-600">
              <span>Phí vận chuyển:</span>
              {isFreeShipping ? (
                <span className="font-medium text-emerald-600">Miễn phí</span>
              ) : (
                <span className="font-medium text-gray-800">
                  {formatVNDPrice(deliveryTax)}
                </span>
              )}
            </div>

            <div className="flex justify-between items-center text-gray-600">
              <span>Thuế VAT:</span>
              <span className="font-medium text-gray-800">
                {formatVNDPrice(salesTax)}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-bold text-gray-800">Tổng cộng:</h4>
              <div className="text-2xl font-bold text-rose-600">
                {formatVNDPrice(totalPriceCalculated)}
              </div>
            </div>
          </div>

          {onClick && (
            <div className="space-y-4">
              <Link to={link} className="block w-full">
                <button
                  onClick={handleClick}
                  className="w-full bg-gradient-to-r from-rose-600 to-rose-800 text-white font-medium py-3 px-6 rounded-xl 
                    hover:from-rose-700 hover:to-rose-900 transition-all duration-300 shadow-md hover:shadow-lg 
                    transform hover:-translate-y-0.5"
                >
                  {orderPage ? 'Xác nhận thông tin' : 'Tiến hành thanh toán'}
                </button>
              </Link>

              <p className="text-center text-xs text-gray-500">
                Bằng cách nhấn "Tiến hành thanh toán", bạn đồng ý với{' '}
                <Link to="/terms" className="text-rose-600 hover:underline">
                  Điều khoản và Điều kiện
                </Link>{' '}
                của chúng tôi
              </p>
            </div>
          )}

          <div className="rounded-lg bg-rose-50 p-4 space-y-3">
            <h4 className="text-sm font-semibold text-rose-800">Lưu ý:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-rose-600">•</span>
                Đơn hàng sẽ được xử lý trong vòng 24 giờ
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600">•</span>
                Miễn phí vận chuyển cho đơn hàng trên 1.000.000đ
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600">•</span>
                Hỗ trợ đổi trả trong vòng 7 ngày
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSum;
