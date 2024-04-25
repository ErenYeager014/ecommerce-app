export interface Billboard {
    id: string;
    label: string;
    imageURL: string;

}

export interface Category {
    id: string;
    name: string;
    Billboard: string;
}

export interface Size {
    id: string;
    name: string;
    value: string;
}

export interface Color {
    id: string;
    name: string;
    value: string;
}

export interface Image {
    id: string;
    url: string;
}

export interface product {
    id: string;
    category: Category;
    name: string;
    price: string;
    isFeatured: boolean;
    sizes: Size;
    colors: Color;
    Image: Image[];
}