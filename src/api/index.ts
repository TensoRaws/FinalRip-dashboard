import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/store/setting'
import type { NewTaskRequest, NewTaskResponse } from '@/api/type'

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
