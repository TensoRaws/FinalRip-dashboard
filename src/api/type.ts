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
