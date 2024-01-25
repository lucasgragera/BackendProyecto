import { CartModel } from "./models/cart.model.js";

export default class CartDaoMongoDB {
  // async addProductToCart(cid, pid) {
  

  async getAll() {
    try {
      const response = await CartModel.find({}).lean();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const response = await CartModel.findById(id).populate('products');
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async create(obj) {
    try {
      const response = await CartModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, obj) {
    try {
      const response = await CartModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id) {
    try {
      const response = await CartModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async addProductToCart(cid, id) {
    try {

      const cart = await CartModel.findOne({ _id: cid });

      if (cart.products.some((elemento) => elemento._id == id)) {
      // if (cart.products.some((elemento) => elemento._id == pid)) {  
        const indexProducto = cart.products.findIndex(
          (elemento) => elemento._id == id
          // (elemento) => elemento._id == pid
        );
        cart.products[indexProducto].quantity += 1;
      } else {
        cart.products.push(id);
        // cart.products.push(pid);
      }
      cart.save();
      console.log(cart)
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
  async removeProdToCart(cart, prod) {
    try {
      cart.products = cart.products.filter(
        (p) => p.product._id.toString() !== prod.product._id.toString()
      );
      cart.save();
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
  async updateProdQuantityToCart(cart, prod, quantity) {
    try {
      prod.quantity = quantity;
      cart.save();
      return prod;
    } catch (error) {
      console.log(error);
    }
  }
  async clearCart(cart) {
    try {
      cart.products = [];
      cart.save();
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
}