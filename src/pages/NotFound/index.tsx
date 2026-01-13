import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import "./NotFound.css";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1 className="error-title">页面未找到</h1>
        <p className="error-description">
          抱歉，您访问的页面不存在或已被移除。
        </p>
        
        <div className="error-actions">
          <Button 
            variant="primary" 
            onClick={() => navigate(-1)}
          >
             返回上一页
          </Button>
          <Button 
            variant="secondary"
            onClick={() => navigate("/dashboard")}
          >
            🏠 回到首页
          </Button>
        </div>
        
        <div className="error-suggestions">
          <h3>可能的原因：</h3>
          <ul>
            <li>页面地址输入错误</li>
            <li>页面已被删除或移动</li>
            <li>暂时无法访问该页面</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
