import { Crop } from 'react-image-crop';

export type localImageCropType = {
  imgSrc: string;
  crop: Crop;
  cropImage: string;
  image: HTMLImageElement | undefined;
};
