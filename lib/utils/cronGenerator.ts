export interface CronParts {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

export interface CronPreset {
  label: string;
  value: string;
  description: string;
}

const cronPresets: CronPreset[] = [
  { label: 'Every minute', value: '* * * * *', description: 'Runs every minute' },
  { label: 'Every hour', value: '0 * * * *', description: 'Runs at the start of every hour' },
  { label: 'Every day at midnight', value: '0 0 * * *', description: 'Runs at midnight every day' },
  { label: 'Every day at noon', value: '0 12 * * *', description: 'Runs at noon every day' },
  { label: 'Every Monday', value: '0 0 * * 1', description: 'Runs at midnight every Monday' },
  { label: 'Every weekday', value: '0 0 * * 1-5', description: 'Runs at midnight Mon-Fri' },
  { label: 'Every weekend', value: '0 0 * * 0,6', description: 'Runs at midnight Sat-Sun' },
  { label: 'First day of month', value: '0 0 1 * *', description: 'Runs at midnight on the 1st' },
  { label: 'Every 5 minutes', value: '*/5 * * * *', description: 'Runs every 5 minutes' },
  { label: 'Every 15 minutes', value: '*/15 * * * *', description: 'Runs every 15 minutes' },
  { label: 'Every 30 minutes', value: '*/30 * * * *', description: 'Runs every 30 minutes' },
];

const cronDescriptions: Record<string, string> = {
  minute: 'Minute (0-59)',
  hour: 'Hour (0-23)',
  dayOfMonth: 'Day (1-31)',
  month: 'Month (1-12)',
  dayOfWeek: 'Weekday (0-6, Sun-Sat)',
};

export function buildCronString(parts: CronParts): string {
  return `${parts.minute} ${parts.hour} ${parts.dayOfMonth} ${parts.month} ${parts.dayOfWeek}`;
}

export function parseCronString(cron: string): CronParts | null {
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) return null;
  return {
    minute: parts[0],
    hour: parts[1],
    dayOfMonth: parts[2],
    month: parts[3],
    dayOfWeek: parts[4],
  };
}

export function getNextRuns(cron: string, count: number = 5): Date[] {
  const parts = parseCronString(cron);
  if (!parts) return [];

  const runs: Date[] = [];
  const now = new Date();
  let current = new Date(now);
  current.setSeconds(0, 0);

  for (let i = 0; i < 1000 && runs.length < count; i++) {
    current = new Date(current.getTime() + 60000);
    
    if (matches(parts.minute, current.getMinutes()) &&
        matches(parts.hour, current.getHours()) &&
        matches(parts.dayOfMonth, current.getDate()) &&
        matches(parts.month, current.getMonth() + 1) &&
        matches(parts.dayOfWeek, current.getDay())) {
      runs.push(new Date(current));
    }
  }
  return runs;
}

function matches(field: string, value: number): boolean {
  if (field === '*') return true;
  if (field.includes('/')) {
    const [, step] = field.split('/');
    return value % parseInt(step) === 0;
  }
  if (field.includes('-')) {
    const [start, end] = field.split('-').map(Number);
    return value >= start && value <= end;
  }
  if (field.includes(',')) {
    return field.split(',').map(Number).includes(value);
  }
  return parseInt(field) === value;
}

export function describeCron(cron: string): string {
  const parts = parseCronString(cron);
  if (!parts) return 'Invalid cron expression';

  const descriptions: string[] = [];

  if (parts.minute === '*') descriptions.push('every minute');
  else if (parts.minute.startsWith('*/')) descriptions.push(`every ${parts.minute.slice(2)} minutes`);
  else descriptions.push(`at minute ${parts.minute}`);

  if (parts.hour === '*') descriptions.push('of every hour');
  else if (parts.hour.startsWith('*/')) descriptions.push(`every ${parts.hour.slice(2)} hours`);
  else descriptions.push(`at hour ${parts.hour}`);

  if (parts.dayOfMonth !== '*') {
    descriptions.push(`on day ${parts.dayOfMonth}`);
  }

  if (parts.month !== '*') {
    const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    descriptions.push(`in ${monthNames[parseInt(parts.month)] || parts.month}`);
  }

  if (parts.dayOfWeek !== '*') {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    descriptions.push(`on ${days[parseInt(parts.dayOfWeek)] || parts.dayOfWeek}`);
  }

  return descriptions.join(' ');
}

export { cronPresets, cronDescriptions };
