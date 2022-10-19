const load = async ({ params }) => {
  const title = params.listing;
  return { title };
};
export {
  load
};
