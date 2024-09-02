export interface Error {
  message: string
  [property: string]: any
}

export interface PingResponse {
  error?: Error
  success: boolean
  [property: string]: any
}

export interface NewTaskRequest {
  video_key: string
  [property: string]: any
}

export interface NewTaskResponse {
  error?: Error
  success: boolean
  [property: string]: any
}

export interface OSSPresignedURLRequest {
  video_key: string
  [property: string]: any
}

export interface OSSPresignedURLResponse {
  data?: {
    exist: boolean
    url: string
    [property: string]: any
  }
  error?: Error
  success: boolean
  [property: string]: any
}

export interface TaskListResquest {
  completed: boolean
  pending: boolean
  running: boolean
  [property: string]: any
}

export interface TaskListResponse {
  data?: {
    create_at: string
    encode_key: string
    encode_param: string
    encode_url: string
    key: string
    script: string
    status: string
    url: string
    [property: string]: any
  }[]
  error?: Error
  success: boolean
  [property: string]: any
}
