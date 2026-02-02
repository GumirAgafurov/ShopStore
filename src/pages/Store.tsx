import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Pagination, Form } from 'react-bootstrap';
import { StoreItem } from '../components/StoreItem';
import { StoreItemSkeleton } from '../components/StoreItem';

export function Store() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = parseInt(import.meta.env.VITE_ITEMS_PER_PAGE) || 12;
  const API_URL = import.meta.env.VITE_API_URL;
  

  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc'>('name');

  useEffect(() => {
    setLoading(true);
    const url = categoryName
      ? `${API_URL}/products/category/${categoryName}`
      : `${API_URL}/products`;
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        let sortedData = [...data];
        switch(sortBy) {
          case 'price-asc':
            sortedData.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            sortedData.sort((a, b) => b.price - a.price);
            break;
          case 'name':
            sortedData.sort((a, b) => a.title.localeCompare(b.title));
            break;
        }
        
        setProducts(sortedData);
        setCurrentPage(1); 
        setLoading(false);
      });
  }, [categoryName, sortBy, API_URL]);

  
   const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);


  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }


  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
  return (
    <Row md={2} xs={1} lg={3} className="g-3">
      {[...Array(6)].map((_, i) => (
        <Col key={i}><StoreItemSkeleton /></Col>
      ))}
    </Row>
  );
}

  return (
    <>
      <h1>Store{categoryName ? `: ${categoryName}` : ''}</h1>
      

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="text-muted">
          Всего товаров: {products.length}
        </div>
        
        <div className="d-flex align-items-center gap-3">
          <div>
            <span className="me-2">Сортировка:</span>
            <Form.Select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              size="sm"
              style={{ width: '200px' }}
            >
              <option value="name">По названию</option>
              <option value="price-asc">Цена: по возрастанию</option>
              <option value="price-desc">Цена: по убыванию</option>
            </Form.Select>
          </div>
        </div>
      </div>


      <Row md={2} xs={1} lg={3} className="g-3 mb-4">
        {currentItems.map(item => (
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


      {totalPages > 1 && (
        <div className="d-flex justify-content-center">
          <Pagination>
            <Pagination.Prev 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
            

            {pageNumbers.map(number => (
              <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => paginate(number)}
              >
                {number}
              </Pagination.Item>
            ))}
            

            <Pagination.Next
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            />
          </Pagination>
          
          <div className="ms-3 d-flex align-items-center">
            <span className="text-muted">
              Страница {currentPage} из {totalPages}
            </span>
          </div>
        </div>
      )}
    </>
  );
}