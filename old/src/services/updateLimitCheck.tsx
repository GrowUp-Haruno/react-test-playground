import { FirebaseError } from 'firebase/app';
import { Dispatch, SetStateAction } from 'react';
import { firebaseErrorCodeType } from '../models/firebaseErrorsType';
import {
  InitialLastUpdate,
  lastUpdatekeyType,
  lastUpdateType,
} from '../providers/LastUpdateProvider';

/**
 * 短時間の変更回数及び前回の更新時間を確認
 * - 前回の更新から1分超過、または更新回数が1分未満の内に規定回数以下なら更新を許可
 * - それ以外の場合はカスタムFirebaseErrorを返す
 * @example updateLimitCheck(lastUpdate, setLastUpdate, '', numberOfLimits, updateInterval, '')
 */
export const updateLimitCheck = (
  lastUpdate: lastUpdateType,
  setLastUpdate: Dispatch<SetStateAction<lastUpdateType>>,
  lastUpdatekey: lastUpdatekeyType,
  numberOfLimits: number,
  updateInterval: number,
  firebaseErrorCode: firebaseErrorCodeType
) => {
  const nowTime = new Date().getTime();
  if (lastUpdate[lastUpdatekey] === InitialLastUpdate[lastUpdatekey]) {
    // プロフィール初変更
    setLastUpdate({ ...lastUpdate, [lastUpdatekey]: { count: 1, time: nowTime } });
  } else {
    if (
      lastUpdate[lastUpdatekey].count < numberOfLimits ||
      lastUpdate[lastUpdatekey].time + updateInterval * 60 * 1000 < nowTime
    ) {
      if (lastUpdate[lastUpdatekey].time + updateInterval * 60 * 1000 < nowTime) {
        setLastUpdate({ ...lastUpdate, [lastUpdatekey]: { count: 1, time: nowTime } });
      } else {
        setLastUpdate({
          ...lastUpdate,
          [lastUpdatekey]: { count: lastUpdate[lastUpdatekey].count + 1, time: nowTime },
        });
      }
    } else {
      // 更新条件の規定値を超えた場合、FirebaseErrorを返す
      throw new FirebaseError(firebaseErrorCode, '');
    }
  }
};
