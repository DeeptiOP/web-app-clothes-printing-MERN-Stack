import { useState, useEffect } from 'react';
import { getProducts } from '../api/products';

const BackendTest = () => {
  const [status, setStatus] = useState('Testing...');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testBackend = async () => {
      try {
        setStatus('🔄 Connecting to backend...');
        
        // Test backend connection
        const response = await fetch('http://localhost:5000/api/health');
        if (!response.ok) throw new Error('Backend server not responding');
        
        const healthData = await response.json();
        setStatus('✅ Backend connected: ' + healthData.message);
        
        // Test products API
        setStatus('🔄 Fetching products...');
        const productsData = await getProducts();
        setProducts(productsData.data || []);
        setStatus(`✅ Success! Found ${productsData.data?.length || 0} products`);
        
      } catch (err) {
        console.error('Backend test failed:', err);
        setError(err.message);
        setStatus('❌ Backend connection failed');
      }
    };

    testBackend();
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #ddd', 
      borderRadius: '8px', 
      margin: '20px',
      backgroundColor: error ? '#ffe6e6' : '#e6ffe6'
    }}>
      <h3>🧪 Backend Integration Test</h3>
      <p><strong>Status:</strong> {status}</p>
      
      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          <strong>Error:</strong> {error}
          <br />
          <small>Make sure your backend server is running on port 5000</small>
        </div>
      )}
      
      {products.length > 0 && (
        <div style={{ marginTop: '15px' }}>
          <strong>✅ Products from Backend:</strong>
          <ul>
            {products.slice(0, 3).map((product, index) => (
              <li key={index}>
                {product.name} - ₹{product.price}
              </li>
            ))}
            {products.length > 3 && <li>... and {products.length - 3} more</li>}
          </ul>
        </div>
      )}
      
      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        <p>Expected backend URL: http://localhost:5000</p>
        <p>Test endpoints: /api/health, /api/products</p>
      </div>
    </div>
  );
};

export default BackendTest;
