import NotFound from "@layouts/404";


const notFound = async () => {
  const notFoundData =""
  return <NotFound data={notFoundData} />;
};

export default notFound;
