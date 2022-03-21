import { User } from 'firebase/auth';
import {
  getDownloadURL,
  ref as FirebaseStorageRef,
  UploadMetadata,
  uploadString,
} from 'firebase/storage';

import { avatarStorageUrl, storage } from './firebase';

/**
 * Storage: 画像アップロード
 */
export const uploadImage = async (currentUser: User, cropImage:string) => {
  const storageRef = FirebaseStorageRef(storage, `avatar/${currentUser.uid}`);
  const metadata: UploadMetadata = {
    cacheControl: 'public,max-age=3600,immutable',
  };
  // Firebase Storageへ画像をアップロード
  await uploadString(storageRef, cropImage, 'data_url', metadata);

  // アップロードした画像のURLで必要な部分を抜き出し
  const resultPhotoURL = (await getDownloadURL(storageRef)).replace(
    `${avatarStorageUrl}${currentUser.uid}?alt=media&token=`,
    ''
  );

  return resultPhotoURL;
};
