type ApiResponse<T> = T;

type fieldData = {
    value: string,
    error: string
};

type UserData = {
    password?: string,
    email: string
};

type Product = {
    productId: String,
    name: String,
    displayImage: string,
    price: Number,
    brand: String,
    color: String,
    size: String,
    description: String
}