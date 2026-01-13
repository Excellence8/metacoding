import React, { useState } from "react";
import "./CommandSimulator.css";

const CommandSimulator: React.FC = () => {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const predefinedCommands = [
    { cmd: "./meta.ps1 status", desc: "查看项目状态" },
    { cmd: "./meta.ps1 generate component basic Button", desc: "生成基础按钮组件" },
    { cmd: "./meta.ps1 generate page dashboard Home", desc: "生成仪表板页面" },
    { cmd: "./view-doc.ps1 overview", desc: "查看项目概览" },
    { cmd: "npm run dev", desc: "启动开发服务器" },
  ];

  const simulateCommand = (cmd: string) => {
    if (!cmd.trim()) return;
    
    setIsRunning(true);
    setCommand(cmd);
    setOutput(prev => [...prev, `$ ${cmd}`]);

    setTimeout(() => {
      let response = "";
      
      if (cmd.includes("meta.ps1 status")) {
        response = `项目状态正常\n组件: 30+ | 页面: 17+\n健康度: 100%`;
      } else if (cmd.includes("generate")) {
        response = `✅ 生成成功\n组件已创建到 src/components/`;
      } else if (cmd.includes("view-doc")) {
        response = `📖 文档加载中...\n✅ 文档已打开`;
      } else if (cmd.includes("npm run dev")) {
        response = `Vite 开发服务器启动成功\n➜ http://localhost:5173/`;
      } else {
        response = `✅ 命令执行成功`;
      }

      setOutput(prev => [...prev, response]);
      setIsRunning(false);
    }, 800);
  };

  const clearOutput = () => {
    setOutput([]);
    setCommand("");
  };

  return (
    <div className="command-simulator">
      <h3>💻 命令行模拟器</h3>
      
      <div className="predefined-commands">
        <p>常用命令:</p>
        <div className="commands-grid">
          {predefinedCommands.map((item, index) => (
            <button
              key={index}
              className="cmd-btn"
              onClick={() => simulateCommand(item.cmd)}
            >
              <code>{item.cmd}</code>
              <span>{item.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="custom-command">
        <p>自定义命令:</p>
        <div className="input-group">
          <span>$</span>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && simulateCommand(command)}
            placeholder="输入命令..."
            disabled={isRunning}
          />
          <button 
            onClick={() => simulateCommand(command)}
            disabled={isRunning || !command.trim()}
          >
            {isRunning ? "运行中..." : "运行"}
          </button>
        </div>
      </div>

      <div className="output">
        <div className="output-header">
          <span>输出</span>
          <button onClick={clearOutput}>清空</button>
        </div>
        <div className="output-content">
          {output.length === 0 ? (
            <div className="empty">运行命令查看输出</div>
          ) : (
            output.map((line, index) => (
              <div key={index} className="output-line">
                {line}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandSimulator;
