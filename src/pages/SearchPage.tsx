import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { StoreItem } from '../components/StoreItem';

export function SearchPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    
    if (query) {
      performSearch(query);
    } else {
      navigate('/store');
    }
  }, [location, navigate]);

  const performSearch = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const allProducts = await response.json();
      
      
      const filtered = allProducts.filter((product: any) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults(filtered);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const params = new URLSearchParams(location.search);
  const query = params.get('q') || '';

  return (
    <div className="search-page">
      <h1>Результаты поиска: "{query}"</h1>
      
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
      ) : results.length > 0 ? (
        <>
          <p className="text-muted mb-4">Найдено товаров: {results.length}</p>
          <Row md={2} xs={1} lg={3} className="g-3">
            {results.map((item: any) => (
              <Col key={item.id}>
                <StoreItem
                  id={item.id}
                  name={item.title}
                  price={item.price}
                  imgUrl={item.image}
                  description={item.description} 
                 onStorage={item.rating.count}
                />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <div className="text-center my-5">
          <h3>Ничего не найдено</h3>
          <p className="text-muted">Попробуйте изменить запрос</p>
        </div>
      )}
    </div>
  );
}