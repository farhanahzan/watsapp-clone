import React from 'react';

export default function UseVerifyAlreadyExists(
  verifydata,
  comparedata,
  bywhat
) {
  let verify = false;
  if (verifydata?.length > 0) {
    verify = verifydata.some(
      (item) => item.data[`${bywhat}`] === comparedata[`${bywhat}`]
    );
  }
  return verify;
}
