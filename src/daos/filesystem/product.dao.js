import fs from 'fs';

import FSDao from "./fs.dao.js";

export default class ProductManager {
    constructor() {
        this.path = './product.json';
        this.usedCodes = new Set();
        this.nextId = 1;
    }

    async getAll() {
        try {
            if (fs.existsSync(this.path)) {
                const productsJSON = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(productsJSON);
            } else return [];
        } catch (error) {
            console.log(error);
        }
    }

    async create(product) {
        try {
            const requiredFields = ['title', 'description', 'price', 'stock'];

        // Verificar si todos los campos obligatorios están presentes en el objeto del producto
        const missingFields = requiredFields.filter(field => !(field in product));

        if (missingFields.length > 0) {
            console.log(`Campos obligatorios faltantes: ${missingFields.join(', ')}`);
            return;
        }

            product.id = this.nextId++;
            
            product.status = true;

            product.category = 'verduleria';

            const products = await this.getAll();

            product.code = await this.generateUniqueCode();

            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
        } catch (error) {
            console.log(error);
        }
    }

    async generateUniqueCode() {
        let code;
        do {
            code = Math.floor(1000 + Math.random() * 9000);
        } while (this.usedCodes.has(code));

        this.usedCodes.add(code);
        return code;
    }
    async update(id, updatedFields) {
        try {
            const products = await this.getAll();
            const productIndex = products.findIndex((p) => p.id === id);

            if (productIndex !== -1) {
                products[productIndex] = { ...products[productIndex], ...updatedFields };
                await fs.promises.writeFile(this.path, JSON.stringify(products));
            } else {
                console.log(`Producto con ID ${id} no encontrado.`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async delete(id) {
        try {
            const products = await this.getAll();
            const updatedProducts = products.filter((product) => product.id !== id);

            if (products.length !== updatedProducts.length) {
                await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts));
                console.log(`Producto con ID ${id} eliminado.`);
            } else {
                console.log(`Producto con ID ${id} no encontrado.`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async getById(id) {
        try {
            const products = await this.getAll();
            const product = products.find((p) => p.id === id);

            if (product) {
                return product;
            } else {
                console.log(`Producto con ID ${id} no encontrado.`);
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    }
}