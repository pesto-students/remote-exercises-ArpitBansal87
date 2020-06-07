function timeWas(time, now) {
  const NOW = 1516816290;
  const SECONDS = 1000;
  const MINUTES = SECONDS * 60;
  const HOURS = MINUTES * 60;
  const DAYS = HOURS * 24;
  const WEEKS = DAYS * 7;
  const MONTHS = DAYS * 30;
  const YEARS = MONTHS * 12;
  const currentTime = typeof now !== 'undefined' ? now : NOW;

  const timeDifference = currentTime - time;

  if (timeDifference / SECONDS < 1) return 'just now';
  if (timeDifference / SECONDS < 60) {
    return (
      `${timeDifference / SECONDS
      } second${
        timeDifference / SECONDS !== 1 ? 's' : ''
      } ago`
    );
  } if (timeDifference / MINUTES < 60) {
    return (
      `${timeDifference / MINUTES
      } minute${
        timeDifference / MINUTES !== 1 ? 's' : ''
      } ago`
    );
  } if (timeDifference / HOURS < 24) {
    return (
      `${timeDifference / HOURS
      } hour${
        timeDifference / HOURS !== 1 ? 's' : ''
      } ago`
    );
  } if (timeDifference / DAYS < 7) {
    return (
      `${timeDifference / DAYS
      } day${
        timeDifference / DAYS !== 1 ? 's' : ''
      } ago`
    );
  } if (timeDifference / WEEKS < 5) {
    return (
      `${timeDifference / WEEKS
      } week${
        timeDifference / WEEKS !== 1 ? 's' : ''
      } ago`
    );
  } if (timeDifference / MONTHS < 12) {
    return (
      `${timeDifference / MONTHS
      } month${
        timeDifference / MONTHS !== 1 ? 's' : ''
      } ago`
    );
  }
  return (
    `${timeDifference / YEARS
    } year${
      timeDifference / YEARS !== 1 ? 's' : ''
    } ago`
  );
}

export { timeWas };
