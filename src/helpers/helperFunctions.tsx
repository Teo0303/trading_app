export function modifyTime(time: number) {
  let seconds: string | number = Math.floor(time % 60);
  let minutes: string | number = Math.floor((time % (60 * 60)) / 60);
  let hours: string | number = Math.floor((time % (60 * 60 * 24)) / (60 * 60));

  seconds = seconds < 60 ? "0" + seconds : seconds;
  minutes = minutes < 60 ? "0" + minutes : minutes;
  hours = hours < 60 ? "0" + hours : hours;

  return {
    seconds,
    minutes,
    hours
  };
}
