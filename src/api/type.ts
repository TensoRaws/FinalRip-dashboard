export interface Error {
  message: string
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
    url: string
    [property: string]: any
  }
  error?: Error
  success: boolean
  [property: string]: any
}
