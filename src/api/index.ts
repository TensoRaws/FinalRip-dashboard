import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { storeToRefs } from 'pinia'

import type {
  ClearTaskRequest,
  ClearTaskResponse,
  NewTaskRequest,
  NewTaskResponse,
  OSSPresignedURLRequest,
  OSSPresignedURLResponse,
  PingResponse,
  StartTaskRequest,
  StartTaskResponse,
  TaskListResponse,
  TaskListResquest,
} from '@/api/type'
import { useSettingStore } from '@/store/setting'

function api(isJson: boolean = false): AxiosInstance {
  const { apiURL, apiToken } = storeToRefs(useSettingStore())

  const ContentType = isJson ? 'application/json' : 'multipart/form-data'

  return axios.create({
    baseURL: apiURL.value,
    headers: {
      'Content-Type': ContentType,
      token: apiToken.value,
    },
  })
}

// GET /
export async function Ping(): Promise<PingResponse> {
  try {
    const response = await api().get('/')
    return response.data
  } catch (error) {
    console.error('Error ping:', error)
    throw error
  }
}

// POST /api/v1/task/new
export async function NewTask(data: NewTaskRequest): Promise<NewTaskResponse> {
  try {
    const response = await api().post('/api/v1/task/new', data)
    return response.data
  } catch (error) {
    console.error('Error creating task:', error)
    throw error
  }
}

// POST /api/v1/task/start
export async function StartTask(data: StartTaskRequest): Promise<StartTaskResponse> {
  try {
    const response = await api().post('/api/v1/task/start', data)
    return response.data
  } catch (error) {
    console.error('Error starting task:', error)
    throw error
  }
}

// GET /api/v1/task/oss/presigned
export async function GetOSSPresignedURL(
  data: OSSPresignedURLRequest,
): Promise<OSSPresignedURLResponse> {
  try {
    const response = await api().get('/api/v1/task/oss/presigned', { params: data })
    return response.data
  } catch (error) {
    console.error('Error getting presigned URL:', error)
    throw error
  }
}

// POST /api/v1/task/clear
export async function ClearTask(data: ClearTaskRequest): Promise<ClearTaskResponse> {
  try {
    const response = await api().post('/api/v1/task/clear', data)
    return response.data
  } catch (error) {
    console.error('Error clearing task:', error)
    throw error
  }
}

// GET /api/v1/task/list
export async function GetTaskList(data: TaskListResquest): Promise<TaskListResponse> {
  try {
    const response = await api().get('/api/v1/task/list', { params: data })
    return response.data
  } catch (error) {
    console.error('Error getting task list:', error)
    throw error
  }
}
