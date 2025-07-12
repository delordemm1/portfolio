/**
 * Checks if a string is in 'YYYY-MM' format and converts it to a Date object.
 * Appends '-01' to represent the first day of the month for consistent parsing.
 *
 * @param dateString The string to check and convert.
 * @returns A Date object if the format is valid, otherwise null.
 */
export function convertYearMonthToDate(dateString: string | null | undefined): Date | null {
	// Return null for null, undefined, or empty string inputs
	if (!dateString) {
	  return null;
	}
  
	// Regular expression to validate 'YYYY-MM' format
	const regex = /^\d{4}-\d{2}$/;
  
	if (regex.test(dateString)) {
	  // If valid, create a date for the first day of that month (UTC)
	  // to avoid timezone-related issues.
	  return new Date(`${dateString}-01T00:00:00Z`);
	}
  
	// Return null if the format is invalid
	return null;
  }