export interface IData {
  id: number;
  category: string;
  name: string;
  unit: string;
  qty: number;
  vendor_thethao: number;
  vendor_bachhoat: number;
  vendor_giathuoctot: number;
  vendor_topthuoc: number;
}

export interface IDataResponse extends IData {
  minPrice: number;
}
