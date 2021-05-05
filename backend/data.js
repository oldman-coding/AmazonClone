import bcrypt from 'bcryptjs';
const data = {
    users: [
        {
            name: "Basir", 
            email: "admin@example.com", 
            password: bcrypt.hashSync('1234', 8), 
            isAdmin: true,
        }, 
        {
            name: "John", 
            email: "user@example.com", 
            password: bcrypt.hashSync('1234', 8), 
            isAdmin: false,
        }
    ],

    products: [
       {
        name: 'Nike Slim Shirt', 
        image: '/images/p1.jpg', 
        price: 120, 
        brand: "Nike", 
        category: "Shirt",
        countInStock: 5,
        rating: 3.5, 
        numReviews: 10, 
        description: "high quality product"

       },
       {
        name: 'Adidas Slim Shirt', 
        image: '/images/p2.jpg', 
        price: 100, 
        countInStock: 10,
        category: "Shirt",
        brand: "Adidas", 
        rating: 2.5, 
        numReviews: 10, 
        description: "high adisas quality product"

       },
       {
        name: 'Puma Slim Shirt', 
        image: '/images/p3.jpg', 
        price: 160, 
        countInStock: 0,
        category: "Pants",
        brand: "puma", 
        rating: 2.5, 
        numReviews: 10, 
        description: "high quality product"

       },
       {
        name: 'Zara Slim Shirt', 
        image: '/images/p4.jpg', 
        price: 120, 
        countInStock: 20,
        category: "Pants",
        brand: "Zara", 
        rating: 4.0, 
        numReviews: 8, 
        description: "high zra quality product"

       },
       {
        name: 'Uniqulo Slim Shirt', 
        image: '/images/p5.jpg', 
        price: 100, 
        countInStock: 150,
        category: "Shoes",
        brand: "Uniqlo", 
        rating: 4, 
        numReviews: 5.0, 
        description: "high uniqlo quality product"

       },
       {
        name: 'Vogue Slim Shirt', 
        image: '/images/p6.jpg', 
        price: 250, 
        countInStock: 10,
        category: "Shoes",
        brand: "Vogue", 
        rating: 5.5, 
        numReviews: 9, 
        description: "high vogue quality product"

       } 

    ]
}

export default data;