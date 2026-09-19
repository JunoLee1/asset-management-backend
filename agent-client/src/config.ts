import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

export interface AgentConfig {
  apiUrl: string
  email: string
  password: string
  userId?: string
}

export function loadConfig(): AgentConfig {
  // 환경 변수 우선
  const fromEnv: Partial<AgentConfig> = {
    apiUrl: process.env['AGENT_API_URL'],
    email: process.env['AGENT_EMAIL'],
    password: process.env['AGENT_PASSWORD'],
    userId: process.env['AGENT_USER_ID'],
  }

  if (fromEnv.apiUrl && fromEnv.email && fromEnv.password) {
    return fromEnv as AgentConfig
  }

  // 파일 fallback
  const configPath = join(process.cwd(), 'agent.config.json')
  if (!existsSync(configPath)) {
    throw new Error(
      'agent.config.json 이 없고 환경 변수(AGENT_API_URL, AGENT_EMAIL, AGENT_PASSWORD)도 설정되지 않았습니다.',
    )
  }

  const raw = JSON.parse(readFileSync(configPath, 'utf-8')) as Partial<AgentConfig>
  if (!raw.apiUrl || !raw.email || !raw.password) {
    throw new Error('agent.config.json 에 apiUrl, email, password 가 모두 필요합니다.')
  }

  return {
    apiUrl: raw.apiUrl,
    email: raw.email,
    password: raw.password,
    userId: raw.userId ?? fromEnv.userId,
  }
}
