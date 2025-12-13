export interface Warehouse {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
    country: string;
    zipCode: string;
    address: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface CarManufacturer {
  id: string;
  name: string;
  country: string;
}

export interface CarModel {
  id: string;
  manufacturerId: string;
  name: string;
  years: number[];
}

export interface PartCategory {
  id: string;
  name: string;
  parentId?: string;
}

export interface CarPart {
  id: string;
  partNumber: string;
  name: string;
  description: string;
  categoryId: string;
  manufacturerId: string;
  compatibleModels: {
    modelId: string;
    years: number[];
  }[];
  pricing: {
    manufacturerPrice: number;
    dealerPrice: number;
    transportationFee: number;
    currency: string;
  };
  availability: {
    inStock: boolean;
    quantity: number;
    warehouseId: string;
    estimatedDeliveryDays: number;
  };
  specifications?: {
    material?: string;
    weight?: number;
    dimensions?: {
      length?: number;
      width?: number;
      height?: number;
      unit: string;
    };
    oemNumber?: string;
  };
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}
