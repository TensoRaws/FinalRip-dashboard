export interface EncodeTemplate {
  name: string
  url: string
}

export async function getGitHubTemplates(
  repo: string,
  token: string = '',
): Promise<EncodeTemplate[]> {
  const templateList: EncodeTemplate[] = []
  const url = `https://api.github.com/repos/${repo}/contents/templates`

  const response = await fetch(url, {
    headers: {
      Authorization: `token ${token}`,
    },
  })
  const data = await response.json()

  data.forEach((item: any) => {
    templateList.push({
      name: item.name,
      url: item.download_url,
    })
  })

  return templateList
}

export async function getGitHubTemplateContent(template: EncodeTemplate): Promise<string> {
  const response = await fetch(template.url)
  return response.text()
}
