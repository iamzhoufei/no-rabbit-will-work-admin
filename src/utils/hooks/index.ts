export const useQuery = (): any => {
  const query = {};
  const searchParams = new URLSearchParams(location.search);
  searchParams.forEach((value, key) => {
    query[key] = value;
  });

  return query;
}
