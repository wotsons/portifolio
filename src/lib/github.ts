import { cacheLife } from "next/cache";

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface Contributions {
  total: number;
  days: ContributionDay[];
}

export interface Repo {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  pushedAt: string;
}

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

/** Last-year contribution calendar. Returns null on any failure so the UI can degrade. */
export async function getContributions(user: string): Promise<Contributions | null> {
  "use cache";
  cacheLife("hours");
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(user)}?y=last`,
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      total: Record<string, number>;
      contributions: ContributionDay[];
    };
    return { total: data.total.lastYear ?? 0, days: data.contributions };
  } catch {
    return null;
  }
}

export async function getRecentRepos(user: string, limit = 5): Promise<Repo[] | null> {
  "use cache";
  cacheLife("hours");
  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(user)}/repos?sort=pushed&per_page=${limit}&type=owner`,
      { headers },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as Array<{
      name: string;
      description: string | null;
      html_url: string;
      language: string | null;
      stargazers_count: number;
      pushed_at: string;
      fork: boolean;
    }>;
    return (
      data
        // Skip forks and the profile README repo (named after the user).
        .filter((r) => !r.fork && r.name.toLowerCase() !== user.toLowerCase())
        .map((r) => ({
          name: r.name,
          description: r.description,
          url: r.html_url,
          language: r.language,
          stars: r.stargazers_count,
          pushedAt: r.pushed_at,
        }))
    );
  } catch {
    return null;
  }
}

/** Groups days into week columns (Sunday-first), padding the first week. */
export function toWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  if (days.length === 0) return [];
  const firstDow = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells: (ContributionDay | null)[] = [...Array(firstDow).fill(null), ...days];
  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}
