export interface Sneaker {
    id : number;
    brand: string; // Brand of the sneaker
    model: string; // Model name
    purchasedPrice: number; // Price of purchase
    soldPrice:number;
    purchasedDate: string; // Date of purchase (ISO string format)
    currentDistance: number; // Distance traveled in KM
    targetDistance: number; // Target distance in KM
    usageCount: number; // Number of uses
    order: number;
}
