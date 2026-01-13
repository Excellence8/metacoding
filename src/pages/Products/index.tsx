import React, { useState } from "react";
import "./Products.css";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "智能手表", category: "电子产品", price: 299.99, stock: 45, status: "in-stock" },
    { id: 2, name: "无线耳机", category: "电子产品", price: 159.99, stock: 12, status: "low-stock" },
    { id: 3, name: "笔记本电脑", category: "电子产品", price: 1299.99, stock: 8, status: "low-stock" },
    { id: 4, name: "智能手机", category: "电子产品", price: 899.99, stock: 0, status: "out-of-stock" },
    { id: 5, name: "平板电脑", category: "电子产品", price: 499.99, stock: 25, status: "in-stock" },
    { id: 6, name: "蓝牙音箱", category: "音频设备", price: 89.99, stock: 30, status: "in-stock" },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "电子产品",
    price: "",
    stock: "",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-stock": return "#10b981";
      case "low-stock": return "#f59e0b";
      case "out-of-stock": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "in-stock": return "充足";
      case "low-stock": return "低库存";
      case "out-of-stock": return "缺货";
      default: return "未知";
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert("请填写所有必填字段");
      return;
    }

    const newId = Math.max(...products.map(p => p.id)) + 1;
    const stockNum = parseInt(newProduct.stock);
    const status: "in-stock" | "low-stock" | "out-of-stock" = 
      stockNum === 0 ? "out-of-stock" : 
      stockNum < 10 ? "low-stock" : "in-stock";

    const product: Product = {
      id: newId,
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      stock: stockNum,
      status: status
    };

    setProducts([...products, product]);
    
    // 重置表单
    setNewProduct({
      name: "",
      category: "电子产品",
      price: "",
      stock: "",
    });

    alert(`产品 "${product.name}" 已添加！`);
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm("确定要删除这个产品吗？")) {
      setProducts(products.filter(product => product.id !== id));
      alert("产品已删除");
    }
  };

  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
  const inStockProducts = products.filter(p => p.status === "in-stock").length;
  const outOfStockProducts = products.filter(p => p.status === "out-of-stock").length;

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>🛒 产品管理</h1>
        <p>管理您的产品目录和库存</p>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <div className="stat-value">{totalProducts}</div>
            <div className="stat-label">产品总数</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <div className="stat-value">{totalValue.toLocaleString()}</div>
            <div className="stat-label">库存总值</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <div className="stat-value">{inStockProducts}</div>
            <div className="stat-label">有货产品</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⛔</div>
          <div className="stat-info">
            <div className="stat-value">{outOfStockProducts}</div>
            <div className="stat-label">缺货产品</div>
          </div>
        </div>
      </div>

      <div className="products-table-container">
        <h2>📋 产品列表</h2>
        <div className="table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>产品名称</th>
                <th>分类</th>
                <th>价格</th>
                <th>库存</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>#{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <span 
                      className="status-badge"
                      style={{ 
                        background: getStatusColor(product.status),
                        color: "white"
                      }}
                    >
                      {getStatusText(product.status)}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn-small btn-danger"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="add-product-section">
        <h2>➕ 添加新产品</h2>
        <div className="add-product-form">
          <div className="form-group">
            <label>产品名称 *</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              placeholder="输入产品名称"
            />
          </div>
          
          <div className="form-group">
            <label>分类</label>
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
            >
              <option value="电子产品">电子产品</option>
              <option value="音频设备">音频设备</option>
              <option value="家居用品">家居用品</option>
              <option value="服饰鞋帽">服饰鞋帽</option>
              <option value="图书文具">图书文具</option>
            </select>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>价格 *</label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="form-group">
              <label>库存数量 *</label>
              <input
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                placeholder="0"
                min="0"
              />
            </div>
          </div>
          
          <button 
            className="btn-primary"
            onClick={handleAddProduct}
          >
            🚀 添加产品
          </button>
        </div>
      </div>

      <div className="quick-actions">
        <h2>⚡ 快速操作</h2>
        <div className="action-buttons">
          <button 
            className="btn-secondary"
            onClick={() => {
              const csvContent = "data:text/csv;charset=utf-8," 
                + "ID,产品名称,分类,价格,库存,状态\n"
                + products.map(p => 
                    `${p.id},${p.name},${p.category},${p.price},${p.stock},${getStatusText(p.status)}`
                  ).join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", "products-export.csv");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            📥 导出CSV
          </button>
          
          <button 
            className="btn-secondary"
            onClick={() => window.location.href = "/analytics"}
          >
            📈 查看分析
          </button>
          
          <button 
            className="btn-secondary"
            onClick={() => window.location.reload()}
          >
            🔄 刷新页面
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
