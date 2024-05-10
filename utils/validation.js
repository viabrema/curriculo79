import dayjs from "dayjs";

function isCpfValid(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
    return false;
  }

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
}

function isDateValid(date) {
  const today = dayjs();
  const birthDate = dayjs(date);

  return birthDate.isValid() && birthDate.isBefore(today);
}

function isTimeRangeValid(startTime, endTime) {
  const format = "HH:mm:ss";
  const start = dayjs(`2000-01-01 ${startTime}`, format);
  const end = dayjs(`2000-01-01 ${endTime}`, format);

  return end.isAfter(start);
}

export { isCpfValid, isDateValid, isTimeRangeValid };
