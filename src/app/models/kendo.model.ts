export interface KendoProduct {
        ProductID: number,
        ProductName: string,
        UnitPrice: number,
        Category: {
            CategoryID: number,
            CategoryName: string
        }
}