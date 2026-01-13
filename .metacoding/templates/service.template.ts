import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api"

export interface {{serviceName}}Data {
  // 数据接口定义
}

class {{serviceName}}Service {
  private baseUrl: string

  constructor() {
    this.baseUrl = `${API_BASE_URL}/{{endpoint}}`
  }

  async getAll(): Promise<{{serviceName}}Data[]> {
    try {
      const response = await axios.get<{{serviceName}}Data[]>(this.baseUrl)
      return response.data
    } catch (error) {
      console.error("获取数据失败:", error)
      throw error
    }
  }

  async getById(id: string): Promise<{{serviceName}}Data> {
    try {
      const response = await axios.get<{{serviceName}}Data>(`${this.baseUrl}/${id}`)
      return response.data
    } catch (error) {
      console.error(`获取数据失败 (ID: ${id}):`, error)
      throw error
    }
  }

  async create(data: Omit<{{serviceName}}Data, "id">): Promise<{{serviceName}}Data> {
    try {
      const response = await axios.post<{{serviceName}}Data>(this.baseUrl, data)
      return response.data
    } catch (error) {
      console.error("创建数据失败:", error)
      throw error
    }
  }

  async update(id: string, data: Partial<{{serviceName}}Data>): Promise<{{serviceName}}Data> {
    try {
      const response = await axios.put<{{serviceName}}Data>(`${this.baseUrl}/${id}`, data)
      return response.data
    } catch (error) {
      console.error(`更新数据失败 (ID: ${id}):`, error)
      throw error
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseUrl}/${id}`)
    } catch (error) {
      console.error(`删除数据失败 (ID: ${id}):`, error)
      throw error
    }
  }
}

export default new {{serviceName}}Service()
