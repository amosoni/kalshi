export const CREEM_PRODUCTS = {
  studio_120min: 'prod_ledv4At0YHyjZAmgHIZvs',
  creator_45min: 'prod_mV7HxUv8iLHlVnnk3Oh3n',
  pro_15min: 'prod_2eju68XBWprxJgbbqrcTpl',
  starter_5min: 'prod_1RgXQa6lJz4IGGisxUMzx8',
  payg_2min: 'prod_3IAAOUPKfL67Z6wcIPHVrf',
};

export type CreemProductConfigItem = {
  minutes: number;
  price: number;
};

export const CREEM_PRODUCT_CONFIG: { [productId: string]: CreemProductConfigItem } = {
  prod_ledv4At0YHyjZAmgHIZvs: { minutes: 120, price: 149.99 },
  prod_mV7HxUv8iLHlVnnk3Oh3n: { minutes: 45, price: 69.99 },
  prod_2eju68XBWprxJgbbqrcTpl: { minutes: 15, price: 24.99 },
  prod_1RgXQa6lJz4IGGisxUMzx8: { minutes: 5, price: 9.99 },
  prod_3IAAOUPKfL67Z6wcIPHVrf: { minutes: 2, price: 4.99 },
};
