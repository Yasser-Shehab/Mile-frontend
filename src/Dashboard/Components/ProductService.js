export class ProductService {
  //   getProductsSmall() {
  //     return fetch("data/products-small.json")
  //       .then((res) => res.json())
  //       .then((d) => d.data);
  //   }

  //   getProducts() {
  //     return fetch("data/Products.json")
  //       .then((res) => res.json())
  //       .then((d) => d.data);
  //   }

  getProductsWithOrdersSmall() {
    return fetch("data/Products.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }
}
