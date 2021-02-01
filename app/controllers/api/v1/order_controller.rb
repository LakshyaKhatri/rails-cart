module Api
  module V1
    class OrderController < Api::V1::ApiController
      def create
        @cart = current_cart
        return render_record_invalid "Order already present." if Order.find_by(cart: @cart).present?

        order_total = @cart.cart_items.joins(:item).sum("items.taxed_price * cart_items.qty")
        order = Order.new(cart: @cart, total: order_total)
        render_record_invalid order.errors unless order.save
        end
      end
    end
  end
end
