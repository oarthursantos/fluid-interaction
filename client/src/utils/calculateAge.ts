export function isMinimumAge(dateOfBirth: Date): boolean {
    const minimumAge = 18;
    const minimumDate = new Date();
    minimumDate.setFullYear(minimumDate.getFullYear() - minimumAge);
  
    return dateOfBirth <= minimumDate;
  }