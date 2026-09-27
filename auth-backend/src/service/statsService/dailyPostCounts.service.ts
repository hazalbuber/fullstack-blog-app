import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// YYYY-MM
const getDailyPostCountsForMonth = async (month: string) => {
	// first day of month (UTC)
	const monthStart = new Date(`${month}-01T00:00:00.000Z`)
	// first day of next month (UTC)
	const nextMonthStart = new Date(monthStart)
	nextMonthStart.setUTCMonth(monthStart.getUTCMonth() + 1)

	// PostgreSQL: generate_series all day for the month
	const rows: { day: Date; count: number }[] = await prisma.$queryRaw`
    WITH days AS (
    --all days in the month
      SELECT generate_series(
        ${monthStart}::date,                                
        (${nextMonthStart}::date - INTERVAL '1 day')::date, 
        INTERVAL '1 day'                                  
      )::date AS day
    )
    SELECT
      d.day,
      -- post count for the day, 0 if none
      COALESCE(COUNT(p."id"), 0)::int AS count
    FROM days d
    -- Istanbul timezone
    LEFT JOIN "Post" p
      ON ( timezone('Europe/Istanbul', p."createdAt")::date = d.day ) 
    GROUP BY d.day
    ORDER BY d.day;
  `
    // javascript results to desired format
	return rows.map((r) => ({
		day: new Date(r.day).toISOString().slice(0, 10), // "YYYY-MM-DD"
		count: Number((r as any).count),
	}))
}

const dailyPostCounts = {
	getDailyPostCountsForMonth,
}

export default dailyPostCounts
