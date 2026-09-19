import { execSync } from 'child_process'
import { platform } from 'os'

export interface ScannedItem {
  processName: string
  version?: string
  manufacturer?: string
  os?: string
}

export interface RunningProcess {
  processName: string
}

// ── macOS ────────────────────────────────────────────────────────────────────

function scanMacos(): ScannedItem[] {
  const os = 'macOS'
  try {
    const raw = execSync('system_profiler SPApplicationsDataType -json', { timeout: 30_000 })
    const parsed = JSON.parse(raw.toString()) as {
      SPApplicationsDataType?: Array<{
        _name: string
        version?: string
        obtained_from?: string
      }>
    }
    return (parsed.SPApplicationsDataType ?? []).map((app) => ({
      processName: app._name,
      version: app.version,
      manufacturer: app.obtained_from,
      os,
    }))
  } catch {
    return []
  }
}

function runningMacos(): RunningProcess[] {
  try {
    const raw = execSync("ps -axco command | sort -u", { timeout: 10_000 })
    return raw
      .toString()
      .split('\n')
      .filter(Boolean)
      .filter((line) => line !== 'COMMAND')
      .map((line) => ({ processName: line.trim() }))
  } catch {
    return []
  }
}

// ── Windows ──────────────────────────────────────────────────────────────────

function scanWindows(): ScannedItem[] {
  const os = 'Windows'
  const keys = [
    'HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*',
    'HKLM:\\Software\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*',
    'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*',
  ]
  const psCmd = `Get-ItemProperty ${keys.join(', ')} -ErrorAction SilentlyContinue | Select-Object DisplayName,DisplayVersion,Publisher | ConvertTo-Json`
  try {
    const raw = execSync(`powershell -Command "${psCmd}"`, { timeout: 30_000 })
    const parsed = JSON.parse(raw.toString()) as Array<{
      DisplayName?: string
      DisplayVersion?: string
      Publisher?: string
    }>
    return parsed
      .filter((p) => p.DisplayName)
      .map((p) => ({
        processName: p.DisplayName!,
        version: p.DisplayVersion,
        manufacturer: p.Publisher,
        os,
      }))
  } catch {
    return []
  }
}

function runningWindows(): RunningProcess[] {
  try {
    const raw = execSync(
      'powershell -Command "Get-Process | Select-Object -ExpandProperty ProcessName | Sort-Object -Unique | ConvertTo-Json"',
      { timeout: 10_000 },
    )
    const parsed = JSON.parse(raw.toString()) as string[]
    return parsed.map((name) => ({ processName: name }))
  } catch {
    return []
  }
}

// ── Linux ────────────────────────────────────────────────────────────────────

function scanLinux(): ScannedItem[] {
  const os = 'Linux'
  const items: ScannedItem[] = []

  // dpkg
  try {
    const raw = execSync("dpkg-query -W -f='${Package}\\t${Version}\\t${Maintainer}\\n'", {
      timeout: 20_000,
    })
    for (const line of raw.toString().split('\n').filter(Boolean)) {
      const [processName, version, manufacturer] = line.split('\t')
      if (processName) items.push({ processName, version, manufacturer, os })
    }
    if (items.length > 0) return items
  } catch {
    // dpkg 없음
  }

  // rpm
  try {
    const raw = execSync("rpm -qa --queryformat '%{NAME}\\t%{VERSION}\\t%{VENDOR}\\n'", {
      timeout: 20_000,
    })
    for (const line of raw.toString().split('\n').filter(Boolean)) {
      const [processName, version, manufacturer] = line.split('\t')
      if (processName) items.push({ processName, version, manufacturer, os })
    }
  } catch {
    // rpm 없음
  }

  return items
}

function runningLinux(): RunningProcess[] {
  try {
    const raw = execSync("ps -axco comm | sort -u", { timeout: 10_000 })
    return raw
      .toString()
      .split('\n')
      .filter(Boolean)
      .filter((line) => line !== 'COMM')
      .map((line) => ({ processName: line.trim() }))
  } catch {
    return []
  }
}

// ── 공개 API ─────────────────────────────────────────────────────────────────

export function scanInstalledSoftware(): ScannedItem[] {
  const os = platform()
  if (os === 'darwin') return scanMacos()
  if (os === 'win32') return scanWindows()
  return scanLinux()
}

export function getRunningProcessNames(): string[] {
  const os = platform()
  let procs: RunningProcess[]
  if (os === 'darwin') procs = runningMacos()
  else if (os === 'win32') procs = runningWindows()
  else procs = runningLinux()
  return [...new Set(procs.map((p) => p.processName))]
}
