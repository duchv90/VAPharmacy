export interface IData {
  id: number;
  index?: number;
  category: string;
  name: string;
  unit: string;
  qty: number;
  vendor_thethao: number;
  vendor_bachhoat: number;
  vendor_giathuoctot: number;
  vendor_topthuoc: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: any | null | object;
  isUpdated?: boolean;
}

export interface IDataResponse extends IData {
  minPrice: number;
}
