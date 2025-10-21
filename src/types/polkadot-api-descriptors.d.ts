// Tell TypeScript about your CommonJS exports
declare module "@polkadot-api/descriptors" {
  const paseo: any;
  const paseo_people: any;
  const paseo_asset_hub: any;

  // export everything else as any too if needed
  const descriptors: any;

  export { paseo, paseo_people, paseo_asset_hub };
  export default descriptors;
}
