
import { useQuery, UseQueryResult } from "react-query";
import { useSearchParams } from "react-router-dom";
import { apiClient } from "./api";
import { Item } from "./types";


function useItems(): UseQueryResult<Item[]> {

  const [search] = useSearchParams()

  return useQuery(['items', search.toString()],
    () =>
      apiClient
        .get('/items', {
          params: search
        })
        .then(res => res.data),
    { staleTime: 120000 }
  )

  /*   const [loading, setLoading] = useState(true);
    const [items, setData] = useState<Array<Item>>([]);
  
    useEffect(() => {
      axios
        .get('http://localhost:3001/items' + (filters ? `?${filters}` : ''))
        .then((res) => {
          setLoading(false);
          setData(res.data);
        });
    }, [filters]);
  
    return { loading, items }; */
}

export default useItems